"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Note from '@/app/components/drag/Note';
import Tools from '@/app/components/Tools'
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text } from 'react-konva'
import Link from '@/app/components/drag/Link';
import { LinkItem, NoteItem, BoardItem } from '@/lib/type';
import Board from '@/app/components/drag/Board';
import { useDesignStore } from '@/lib/store/designStore';

const FONT = {
  family: "Inter, system-ui, -apple-system, sans-serif",
  size: 16,
  lineHeight: 1.4,
  letterSpacing: 0,
};

const PADDING = 8;
const MIN_SIZE = 100;
const RESIZE_HANDLE_SIZE = 12;

type EditingTarget =
  | { type: "note"; id: string }
  | { type: "link"; id: string }
  | null;

interface Version {
    id: string
    name: string
    content: any
}

interface Props {
    versions:  Version[]
    updateVersionData: (data: Version[]) => void
    parentBoardId?: string
}

const Design = ({ versions, updateVersionData, parentBoardId }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    // const [editingTarget, setEditingTarget] = useState<EditingTarget>(null);
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [board, setBoard] = useState<BoardItem[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

    const [versionContent, setVersionContent] = useState<any>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const updateNote = (id: string, updates: Partial<NoteItem>) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, ...updates } : note
            )
        );
    };
    const updateText = (id: string, text: string) => {
        updateNote(id, { text });
    };

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id ? { ...link, ...updates } : link
            )
        );
    };
    const updateTextLink = (id: string, text: string) => {
        updateLink(id, { text });
    };
    
    const stopEdit = (id: string) => {
        updateNote(id, { isEditing: false });
    };

    // const updateBoard = (id: string, updates: Partial<BoardItem>) => {
    //     setLinks((prev) =>
    //         prev.map((link) =>
    //             link.id === id ? { ...link, ...updates } : link
    //         )
    //     );
    // };

    const updateBoard = (id: string, updates: Partial<BoardItem>) => {
        setBoard((prev) =>
            prev.map((board) =>
                board.id === id ? { ...board, ...updates } : board
            )
        );
    };

    // const stopEditLink = (id: string) => {
    //   updateLink(id, { isEditing: false });
    // };

    const stopEditLink = async (id: string, url: string) => {
        // 1. ส่ง url (จาก text) ไป server
        const res = await fetch("/api/link-preview", {
            method: "POST",
            body: JSON.stringify({ url }),
        });
        const data = await res.json();

        console.log("Fetched preview image:", data.image);

        updateLink(id, {
            isEditing: false,
            previewImage: data.image ?? null, 
            title: data.title ?? undefined,
        });
    };
    
    // updateNote อัปเดต width/height → getTextareaStyleBase อ่านค่าใหม่อัตโนมัติ
    const getTextareaStyleBase = (item: { x: number; y: number; width: number; height: number }) => {
        if (!stageRef.current) return {};
        const stage = stageRef.current;
        const scale = stage.scaleX();
        const stagePos = stage.position();

        return {
            position: "absolute" as const,
            left: stagePos.x + item.x * scale,
            top: stagePos.y + item.y * scale,
            width: item.width * scale,   // ← ขนาดตาม note state
            height: item.height * scale, // ← ขนาดตาม note state
            padding: `${PADDING * scale}px`,
            margin: "0",
            outline: "none",
            resize: "none" as const,
        };
    };
    
    
      const handleStageClick = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          setSelectedNoteId(null);
          setNotes(prev =>
            prev.map(note =>
              note.isEditing ? { ...note, isEditing: false } : note
            )
          );
    
          setSelectedLinkId(null);
          setLinks(prev =>
            prev.map(link =>
              link.isEditing ? { ...link, isEditing: false } : link
            )
          );

          setSelectedBoardId(null);
            setBoard(prev =>
                prev.map(board =>
                    board.isEditingTitle ? { ...board, isEditingTitle: false } : board
                )
            );
        }
      };

        const handleSaveVersion = (versionId: string) => {
            const updated = versions.map((v) =>
                v.id === versionId
                    ? { ...v, content: { notes, links, board } } // ← อัปเดต content
                    : v
            );
            updateVersionData(updated); // ← ส่งกลับไปหา parent
        };
    
      const createNote = (noteData: Omit<NoteItem, 'id'>) => {
        const newNote = {
            ...noteData,
            id: crypto.randomUUID(),
        };
        setNotes((prev) => [...prev, newNote, ]);
        setSelectedNoteId(newNote.id);
      };

      const createLink = (linkData: Omit<LinkItem, 'id'>) => {
        const newLink = {
            ...linkData,
            id: crypto.randomUUID(),
        };
        setLinks((prev) => [...prev, newLink]);
        setSelectedLinkId(newLink.id);
      };
    
      const createBoard = (boardData: Omit<BoardItem, 'id'>) => {
        const newBoard = {
            ...boardData,
            id: crypto.randomUUID(),
        };
        setBoard((prev) => [...prev, newBoard]);
        setSelectedBoardId(newBoard.id);
      };

      const startEditBoardTitle = (id: string) => {
            setBoard((prev) =>
                prev.map((b) => b.id === id ? { ...b, isEditingTitle: true } : b)
            );
            setSelectedBoardId(id);
        };

        const stopEditBoardTitle = (id: string) => {
            setBoard((prev) =>
                prev.map((b) => b.id === id ? { ...b, isEditingTitle: false } : b)
            );
        };

        const updateBoardTitle = (id: string, title: string) => {
            setBoard((prev) =>
                prev.map((b) => b.id === id ? { ...b, title } : b)
            );
        };
    
     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    
      const stage = stageRef.current;
      if (!stage) return;
    
      stage.setPointersPositions(e);
      const pos = stage.getPointerPosition();
      if (!pos) return;
    
      const data = e.dataTransfer.getData("application/x-konva");
      if (!data) return;
    
      const payload = JSON.parse(data);
    
      if (payload.type === "note") {
        createNote({
          x: pos.x,
          y: pos.y,
          width: 200,
          height: 120,
          text: "",
          isEditing: true,
          parentBoardId: parentBoardId,
        });
      }else if (payload.type === "link") {
        createLink({
          x: pos.x,
          y: pos.y,
          width: 200,
          height: 120,
          text: "",
          previewImage: null,
          isEditing: true,
          parentBoardId: parentBoardId,
        });
      }else if(payload.type === "board") {
        createBoard({
          x: pos.x,
          y: pos.y,
          width: 65,
          height: 65,
          text: "",
          isEditing: false,
          isEditingTitle: true,
          title: "",
          parentBoardId: parentBoardId,

        });
      }
    };

    const selectNote = (id: string) => {
        setSelectedNoteId(id);
        setNotes((prev) => {
            const selected = prev.find((n) => n.id === id);
            const rest = prev.filter((n) => n.id !== id);
            return selected ? [...rest, selected] : prev; // ← ย้าย selected ไปท้าย
        });
    };

    const deleteSelected = () => {
        if (selectedNoteId) {
            setNotes((prev) => prev.filter((n) => n.id !== selectedNoteId));
            setSelectedNoteId(null);
        }
        if (selectedLinkId) {
            setLinks((prev) => prev.filter((l) => l.id !== selectedLinkId));
            setSelectedLinkId(null);
        }
        if (selectedBoardId) {
            setBoard((prev) => prev.filter((b) => b.id !== selectedBoardId));
            setSelectedBoardId(null);
        }
    };

    useEffect(() => {
        if (versions.length > 0) {
            setNotes(versions[0].content?.notes || []);
            setLinks(versions[0].content?.links || []);
            setBoard(versions[0].content?.board || []);
        }

    }, [versions[0]?.id]); // ← เปลี่ยนเมื่อ version เปลี่ยน

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Delete") {
                // ไม่ลบถ้ากำลัง edit textarea อยู่
                const isEditing = notes.some((n) => n.isEditing) || links.some((l) => l.isEditing);
                if (!isEditing) deleteSelected();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedNoteId, selectedLinkId, selectedBoardId, notes, links]);
    
    const { currentVersion } = useDesignStore();
    // console.log("version: ", currentVersion)




    return (
        <div className="flex flex-col h-full overflow-y-hidden z-10">
            <div className="flex flex-row w-full h-full justify-between">
                <Tools deleteSelected={deleteSelected} />
                <div 
                    ref={containerRef}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="bg-[#F2F2F2] flex grow relative"
                >
                <Stage 
                    width={dimensions.width} 
                    height={dimensions.height} 
                    ref={stageRef}
                    onClick={handleStageClick}
                    onTap={handleStageClick}
                    draggable = {true}
                >
                    <Layer>
                        {versions.map((version) => (
                            <React.Fragment key={version.id}>
                                <Note parentBoardId={parentBoardId} updateNote={updateNote} notes={notes} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId} selectNote={selectNote}/>
                                <Link updateLink={updateLink} links={links} selectedLinkId={selectedLinkId} setSelectedLinkId={setSelectedLinkId}/>
                                <Board parentBoardId={parentBoardId} updateBoard={updateBoard} board={board} selectedBoardId={selectedBoardId} setSelectedBoardId={setSelectedBoardId} startEditBoardTitle={startEditBoardTitle} versionId={version.id}/>
                            </React.Fragment>
                        ))}
                    </Layer>
                </Stage>

                {notes.map((note) => note.isEditing && (
                    <textarea
                        key={note.id}
                        value={note.text}
                        onChange={(e) => updateText(note.id, e.target.value)}
                        onBlur={() => stopEdit(note.id)}
                        style={getTextareaStyleBase(note) as React.CSSProperties}
                    />
                ))}

                {links.map((link) =>
                    link.isEditing && (
                        <textarea
                            key={link.id}
                            autoFocus
                            value={link.text}
                            onChange={(e) => updateTextLink(link.id, e.target.value)}
                            onBlur={() => stopEditLink(link.id, link.text)}
                            style={{...getTextareaStyleBase(link) as React.CSSProperties,
                                marginTop: link.previewImage ? link.height * 0.6 : 0
                            }}
                        />
                    )
                )}

                {board.map((b) =>
                    b.isEditingTitle && (
                        <input
                            key={b.id}
                            autoFocus
                            value={b.title}
                            onChange={(e) => updateBoardTitle(b.id, e.target.value)}
                            onBlur={() => stopEditBoardTitle(b.id)}
                            onKeyDown={(e) => e.key === "Enter" && stopEditBoardTitle(b.id)}
                            style={{
                                position: "absolute",
                                left: stageRef.current ? stageRef.current.position().x + b.x * stageRef.current.scaleX() : b.x,
                                top: stageRef.current ? stageRef.current.position().y + b.y * stageRef.current.scaleY() - 28 : b.y - 28,
                                width: b.width * (stageRef.current?.scaleX() || 1),
                                background: "transparent",
                                border: "none",
                                borderBottom: "1px solid #aaa",
                                outline: "none",
                                fontSize: 13,
                                fontWeight: 600,
                            }}
                        />
                    )
                )}

                </div>
                <Menu
                    updateVersionData={updateVersionData}
                    versionContent={versionContent}
                    onSave={() => handleSaveVersion(versions[0]?.id)} // ← ส่ง handler ไป
                />
            </div>
        </div>
    )
}

export default Design