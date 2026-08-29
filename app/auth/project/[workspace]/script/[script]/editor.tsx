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
import { useEffect, useRef, useState } from "react";
import { Document, Page, Text, View, StyleSheet, pdf, Font } from "@react-pdf/renderer"
import { BsFileEarmarkPdf, BsThreeDotsVertical } from "react-icons/bs";
import Underline from "@tiptap/extension-underline";
import { extractText, getDocumentProxy } from "unpdf"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PiExport } from "react-icons/pi";
import { IoSaveOutline } from "react-icons/io5";
import { createDraft, createScript, updateScript } from "@/action/script";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AlertBasic } from "@/app/components/Aleart";
import { usePathname, useRouter } from "next/navigation";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

Font.register({
  family: "Sarabun",
  fonts: [
    { src: "/fonts/Sarabun-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Sarabun-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Sarabun-Italic.ttf", fontStyle: "italic" },
    { src: "/fonts/Sarabun-BoldItalic.ttf", fontWeight: "bold", fontStyle: "italic" },
  ],
})

const PAGE_HEIGHT = 1123  // A4 px
const PAGE_PADDING = 96   // 1 inch

const styles = StyleSheet.create({
    page: {
      padding: 96,
      fontFamily: "Sarabun",  // เปลี่ยนจาก Courier
      fontSize: 11,           // ฟอนต์ไทยอ่านง่ายขึ้นถ้าขยับขนาดนิดหน่อย
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

  const CONTENT_HEIGHT = PAGE_HEIGHT - 2 * PAGE_PADDING // 1123 - 192 = 931

  const paginateBlocks = (blocks: any[], heights: number[]) => {
    const pages: any[][] = [[]]
    let currentHeight = 0

    blocks.forEach((block, i) => {
      const h = heights[i] ?? 0

      if (currentHeight + h > CONTENT_HEIGHT && pages[pages.length - 1].length > 0) {
        pages.push([])
        currentHeight = 0
      }

      pages[pages.length - 1].push(block)
      currentHeight += h
    })

    return pages
  }

  const renderTextNode = (node: any, key: number) => {
    const text = node.text ?? ""
    const marks = node.marks ?? []

    const style: any = {}

    marks.forEach((mark: any) => {
      if (mark.type === "bold") style.fontWeight = "bold"
      if (mark.type === "italic") style.fontStyle = "italic"
      if (mark.type === "underline") style.textDecoration = "underline"
      if (mark.type === "strike") style.textDecoration = "line-through"
    })

    return (
      <Text key={key} style={style}>
        {text}
      </Text>
    )
  }

  const ScreenplayPDF = ({ pages }: { pages: any[][] }) => (
    <Document>
      {pages.map((pageBlocks, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page} wrap={false}>
          {pageBlocks.map((block: any, i: number) => {
            const children = (block.content ?? []).map((node: any, j: number) =>
              renderTextNode(node, j)
            )

            switch (block.type) {
              case "sceneHeading":
                return <Text key={i} style={styles.sceneHeading}>{children}</Text>
              case "action":
              case "paragraph":
                return <Text key={i} style={styles.action}>{children}</Text>
              case "character":
                return <Text key={i} style={styles.character}>{children}</Text>
              case "dialogue":
                return <Text key={i} style={styles.dialogue}>{children}</Text>
              case "parenthetical":
                return <Text key={i} style={styles.parenthetical}>{children}</Text>
              case "transition":
                return <Text key={i} style={styles.transition}>{children}</Text>
              default:
                return <Text key={i}>{children}</Text>
            }
          })}
        </Page>
      ))}
    </Document>
  )

interface DraftProps {
  draft: any;
}

export default function Editor( { draft }: DraftProps ) {
  const pageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)
  // const [scriptId, setScriptId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [aleart, setAleart] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [title, setTitle] = useState("")
  
  const path = usePathname();
  
  const scriptId = path.split("/")[5];

  const user = useCurrentUser();

  const router = useRouter();

  useUnsavedChanges(hasUnsavedChanges);

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
    content: draft?.content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true)
    },
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

    const measureBlockHeights = (): number[] => {
      const proseMirrorEl = pageRef.current?.querySelector(".ProseMirror")
      if (!proseMirrorEl) return []

      // แต่ละ direct child ของ ProseMirror = 1 block ใน JSON content
      const children = Array.from(proseMirrorEl.children) as HTMLElement[]
      return children.map((el) => el.getBoundingClientRect().height)
    }
  

  const exportPDF = async () => {
    const json = editor?.getJSON()
    const blocks = json?.content ?? []

    const heights = measureBlockHeights()
    const pages = paginateBlocks(blocks, heights)

    const blob = await pdf(<ScreenplayPDF pages={pages} />).toBlob()

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "screenplay.pdf"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await getDocumentProxy(new Uint8Array(arrayBuffer))

    let blocks: any[] = []

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i)
      const textContent = await page.getTextContent()

      const lines: { y: number; x: number; chunks: { x: number; text: string }[] }[] = []

      textContent.items.forEach((item: any) => {
        if (item.str.trim() === "") return

        const x = Math.round(item.transform[4])
        const y = Math.round(item.transform[5])

        const existing = lines.find((l) => Math.abs(l.y - y) < 5)

        if (existing) {
          existing.chunks.push({ x, text: item.str })
        } else {
          lines.push({ y, x, chunks: [{ x, text: item.str }] })
        }
      })

      lines.sort((a, b) => b.y - a.y)

      lines.forEach((line) => {
        line.chunks.sort((a, b) => a.x - b.x)

        let fullText = ""
        for (let i = 0; i < line.chunks.length; i++) {
          const curr = line.chunks[i]
          const prev = line.chunks[i - 1]

          if (i === 0) {
            fullText += curr.text
          } else {
            const gap = curr.x - (prev.x + prev.text.length * 7)
            fullText += gap > 3 ? " " + curr.text : curr.text
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

    if (!editor || blocks.length === 0) return

    // แทรกต่อท้ายเนื้อหาเดิม แทนการ setContent ทับทั้งหมด
    const endPos = editor.state.doc.content.size

    editor
      .chain()
      .focus()
      .insertContentAt(endPos, blocks)
      .run()

    setHasUnsavedChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSuccess("")
    setError("")

    try {
      if (!user?.id) {
        setError("Can't find userId")
        return
      }

      const content = JSON.parse(JSON.stringify(editor?.getJSON()))

      if (scriptId) {
        await updateScript({ id: scriptId, content })
        setSuccess("Save Success")
        setHasUnsavedChanges(false)
      } else {
        setError("No script to save. Please use 'Save as' to create one.")
      }
    } catch (err) {
      setError("Save failed, please try again")
      console.error(err)
    } finally {
      setIsSaving(false)
      handleAleart()
    }
  }

  const handleSaveAs = async () => {
    setIsSaving(true)
    setSuccess("")
    setError("")

    if (!title.trim()) {
      setError("Title is required")
      setIsSaving(false)
      return
    }

    try {
      if (!user?.id) {
        setError("Can't find userId")
        return
      }

      const content = JSON.parse(JSON.stringify(editor?.getJSON()))

      const result = await createDraft({
        title,
        userId: user.id,
        projectId: draft?.projectId,
      })

      if (result.error || !result.script) {
        setError(result.error ?? "Failed to create script")
        return
      }

      await updateScript({ id: result.script.id, content })

      router.push(`/auth/project/${draft?.projectId}/script/${result.script.id}`)

      setSuccess(result.success ?? "Save Success")
      setHasUnsavedChanges(false)
    } catch (err) {
      setError("Save failed, please try again")
      console.error(err)
    } finally {
      setIsSaving(false)
      handleAleart()
    }
  }

  const handleAleart = () => {
    setAleart(true);

    setTimeout(() => {
      setAleart(false);
    }, 3000);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  


  if (!editor) return null;

  return (
    <div className="flex flex-col w-full h-full items-center mt-10 relative overflow-x-hidden">
      {/* Aleart */}
      <div
        className={`absolute bottom-4 -right-10
        transition-all duration-300 ease-out
        ${aleart
          ? "opacity-100 -translate-x-15 scale-100"
          : "opacity-0 translate-x-10 scale-95 pointer-events-none"
        }`}
      >
        <AlertBasic message={success || error} />
      </div>
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
              <DropdownMenuTrigger>
                <div>
                  <button className="flex flex-row gap-3 items-center p-2 px-3 rounded-sm  text-black hover:cursor-pointer"
                    disabled={isSaving}
                    >
                        <IoSaveOutline className="" size={20} />
                        <span className="">{isSaving ? "Saving..." : "Save"}</span>
                  </button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem  onClick={handleSave} >Save</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Save as
                      </DropdownMenuItem>
                    </DialogTrigger>

                     <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save as</DialogTitle>
                        <DialogDescription>
                          Enter the title of your script. This is required and must be unique.
                        </DialogDescription>
                        <Input 
                          placeholder="Script Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={isSaving}
                        />
                        {error && (
                            <span className="text-red-500 text-sm mt-1 block">
                                {error}
                            </span>
                        )}
                        <Button className='mt-4' onClick={() => handleSaveAs()} disabled={isSaving}>
                          Create
                        </Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>


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