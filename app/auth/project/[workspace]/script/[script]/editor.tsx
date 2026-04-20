"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Strike from '@tiptap/extension-strike'
import TextAlign from "@tiptap/extension-text-align";
import { MdOutlineMovie } from "react-icons/md";
import { SceneHeading } from "@/extentions/SceneHeading";
import { Character } from "@/extentions/Character";
import { Transition } from "@/extentions/Transition";
import { Parenthetical } from "@/extentions/Parenthetical";
import { Dialogue } from "@/extentions/Dialogue";
import { Action } from "@/extentions/Action";
import { LuArrowLeftRight, LuMegaphone, LuMessageCircleMore, LuRedo2, LuUndo2 } from "react-icons/lu";
import { LiaTheaterMasksSolid } from "react-icons/lia";
import { useEffect, useRef } from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"
import { BsFileEarmarkPdf, BsThreeDotsVertical } from "react-icons/bs";
import Underline from "@tiptap/extension-underline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiExport } from "react-icons/pi";

const PAGE_HEIGHT = 1123  // A4 px
const PAGE_PADDING = 96   // 1 inch

const styles = StyleSheet.create({
    page: {
      padding: 96,
      fontFamily: "Courier",
      fontSize: 12,
    },
    sceneHeading: {
      textTransform: "uppercase",
      fontWeight: "bold",
      marginTop: 24,
      marginBottom: 0,
    },
    action: {
      marginTop: 12,
      marginBottom: 12,
    },
    character: {
      textTransform: "uppercase",
      marginLeft: "40%",
      marginTop: 12,
    },
    dialogue: {
      marginLeft: "20%",
      marginRight: "20%",
    },
    parenthetical: {
      marginLeft: "30%",
      marginRight: "30%",
    },
    transition: {
      textAlign: "right",
      textTransform: "uppercase",
      marginTop: 12,
    },
  })

const ScreenplayPDF = ({ content }: { content: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {content.map((block: any, i: number) => {
        const text = block.content?.map((n: any) => n.text).join("") ?? ""

        switch (block.type) {
          case "sceneHeading":
            return <Text key={i} style={styles.sceneHeading}>{text}</Text>
          case "action":
          case "paragraph":
            return <Text key={i} style={styles.action}>{text}</Text>
          case "character":
            return <Text key={i} style={styles.character}>{text}</Text>
          case "dialogue":
            return <Text key={i} style={styles.dialogue}>{text}</Text>
          case "parenthetical":
            return <Text key={i} style={styles.parenthetical}>{text}</Text>
          case "transition":
            return <Text key={i} style={styles.transition}>{text}</Text>
          default:
            return <Text key={i}>{text}</Text>
        }
      })}
    </Page>
  </Document>
)

export default function Editor() {
  const pageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) importPDF(file)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Strike,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      SceneHeading,
      Character,
      Dialogue,
      Parenthetical,
      Transition,
      Action,
      Underline,
    ],
    content: "<p>Hello World!</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    // onUpdate: ({ editor }) => {
    //   const json = editor.getJSON();
    //   console.log("Editor content in JSON format:", json);
    // }
  });

  const detectBlockType = (text: string, x?: number): string => {
    const trimmed = text.trim()

    // Scene Heading
    if (/^(INT\.|EXT\.|INT\/EXT\.)/.test(trimmed)) {
      return "sceneHeading"
    }

    // Transition
    if (/TO:$|^FADE (OUT|IN)\.$|^CUT TO:$/.test(trimmed)) {
      return "transition"
    }

    // Parenthetical
    if (/^\(.*\)$/.test(trimmed)) {
      return "parenthetical"
    }

    // ใช้ X position แยก character vs dialogue
    // ค่า X ใน PDF มาตรฐาน Courier 12pt
    if (x !== undefined) {
      if (x > 200 && x < 280) return "character"   // indent กลาง
      if (x > 140 && x <= 200) return "dialogue"    // indent น้อยกว่า character
    }

    // Character — ตัวพิมพ์ใหญ่ สั้น
    if (
      trimmed === trimmed.toUpperCase() &&
      trimmed.length < 40 &&
      trimmed.length > 0 &&
      !/[.!?,]$/.test(trimmed)  // ไม่ลงท้ายด้วยเครื่องหมายวรรคตอน
    ) {
      return "character"
    }

    return "paragraph"
  }

    const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isSceneHeading: ctx.editor?.isActive("sceneHeading"),
      isCharacter: ctx.editor?.isActive("character"),
      isParenthetical: ctx.editor?.isActive("parenthetical"),
      isTransition: ctx.editor?.isActive("transition"),
      isDialogue: ctx.editor?.isActive("dialogue"),
      isAction: ctx.editor?.isActive("action"),
    }),
  });

  const exportPDF = async () => {
    const json = editor?.getJSON()
    const blob = await pdf(
      <ScreenplayPDF content={json?.content ?? []} />
    ).toBlob()

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "screenplay.pdf"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importPDF = async (file: File) => {
    const pdfjsLib = await import("pdfjs-dist")
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let blocks: any[] = []

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i)
      const textContent = await page.getTextContent()

      const lines: { y: number; x: number; chunks: { x: number; text: string }[] }[] = []

      textContent.items.forEach((item: any) => {
        if (item.str.trim() === "") return

        const x = Math.round(item.transform[4])
        const y = Math.round(item.transform[5])

        // tolerance 5px สำหรับแยกบรรทัด
        const existing = lines.find((l) => Math.abs(l.y - y) < 5)

        if (existing) {
          // เก็บแต่ละ chunk พร้อม X position ไว้ก่อน
          existing.chunks.push({ x, text: item.str })
        } else {
          lines.push({ y, x, chunks: [{ x, text: item.str }] })
        }
      })

      // เรียง Y จากบนลงล่าง
      lines.sort((a, b) => b.y - a.y)

      lines.forEach((line) => {
        // เรียง chunk ซ้ายไปขวาตาม X
        line.chunks.sort((a, b) => a.x - b.x)

        // รวม chunk โดยใส่ space ระหว่าง chunk ที่ X ห่างกันพอสมควร
        let fullText = ""
        for (let i = 0; i < line.chunks.length; i++) {
          const curr = line.chunks[i]
          const prev = line.chunks[i - 1]

          if (i === 0) {
            fullText += curr.text
          } else {
            // คำนวณ gap ระหว่าง chunk ก่อนหน้ากับปัจจุบัน
            const gap = curr.x - (prev.x + prev.text.length * 7)
            // ถ้า gap > 3px ใส่ space คั่น
            if (gap > 3) {
              fullText += " " + curr.text
            } else {
              fullText += curr.text
            }
          }
        }

        const trimmed = fullText.trim()
        if (trimmed === "") return

        const blockType = detectBlockType(trimmed, line.x)
        blocks.push({
          type: blockType,
          content: [{ type: "text", text: trimmed }],
        })
      })
    }

    editor?.commands.setContent({ type: "doc", content: blocks })
  }


  if (!editor) return null;

  return (
    <div className="flex flex-col w-full !min-h-screen items-center mt-10 relative">
      {/* Toolbar */}
      <div className="flex flex-row justify-between gap-7 w-full h-15 px-7 bg-[#F1F1F1] fixed top-[43px] left-[74.4px] border-b border-gray-400 z-10">
        <div className="flex flex-row items-center gap-7 w-full">
          <button onClick={() => editor.chain().focus().setNode("sceneHeading").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer ${state?.isSceneHeading ? "bg-gray-300" : ""}`}>
            <MdOutlineMovie />
            <span>Scene</span>
          </button>
          <button onClick={() => editor.chain().focus().setNode("action").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer ${state?.isAction ? "bg-gray-300" : ""}`}>
            <LuMegaphone />
            <span>Action</span>
          </button>
          <button onClick={() => editor.chain().focus().setNode("character").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer ${state?.isCharacter ? "bg-gray-300" : ""}`}>
            <LiaTheaterMasksSolid  />
            <span>Character</span>
          </button>
          <button onClick={() => editor.chain().focus().setNode("dialogue").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer ${state?.isDialogue ? "bg-gray-300" : ""}`}>
            <LuMessageCircleMore />
            <span>Dialogue</span>
          </button>
          <button onClick={() => editor.chain().focus().setNode("parenthetical").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer ${state?.isParenthetical ? "bg-gray-300" : ""}`}>
            <span>( )</span>
            <span>Parenthetical</span>
          </button>
          <button onClick={() => editor.chain().focus().setNode("transition").run()}
            className={ `flex flex-row items-center gap-3 px-3 py-2 rounded-sm hover:cursor-pointer  ${state?.isTransition ? "bg-gray-300" : ""}`}>
            <LuArrowLeftRight />
            <span>Transition</span>
          </button>
          
          <button onClick={() => editor.chain().focus().toggleBold().run()}
            className="!font-bold rounded-sm px-3 py-2  hover:cursor-pointer">
            B
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className=" italic font-mono rounded-sm px-3 py-2 hover:cursor-pointer">
            I
          </button>
           <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${editor.isActive('underline') ? 'is-active' : ''} underline hover:cursor-pointer `}
            >
            U
          </button>
           <div className="control-group">
              <div className="button-group flex flex-row gap-5">
                <button onClick={() => editor.chain().focus().undo().run()}  type="button">
                  <LuUndo2 />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} type="button">
                  <LuRedo2 />
                </button>
              </div>
            </div>
        </div>

        <div className="group flex flex-row items-center w-fit pr-20 gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center justify-start">
                  <button onClick={exportPDF} className="flex flex-row gap-3 rounded-sm hover:cursor-pointer">
                    <BsFileEarmarkPdf size={25} />
                    <span>Export PDF</span>
                  </button>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()  // ป้องกัน dropdown ปิด
                      fileInputRef.current?.click()
                    }}
                    className="flex items-center justify-start cursor-pointer"
                  >
                    <PiExport size={25} />
                    <span>Import PDF</span>
                  </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* พื้นหลังสีเทา */}
      <div 
        ref={pageRef}
        style={{ backgroundColor: "#e5e7eb" }}
        className="w-full pb-20 pt-20">
        {/* กระดาษ A4 */}
        <div
          style={{
            width: "794px",
            minHeight: "1123px",
            backgroundColor: "white",
            margin: "40px auto",
            padding: `${PAGE_PADDING}px`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent ${PAGE_HEIGHT - 1}px,
              #ccc ${PAGE_HEIGHT - 1}px,
              #ccc ${PAGE_HEIGHT}px
            )`,
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}