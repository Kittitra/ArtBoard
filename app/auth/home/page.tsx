"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Note from '@/app/components/drag/Note';
import Tools from '@/app/components/Tools'
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text } from 'react-konva'
import Link from '@/app/components/drag/Link';
import { LinkItem, NoteItem } from '@/lib/type';

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

const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [editingTarget, setEditingTarget] = useState<EditingTarget>(null);
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

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

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
      setLinks((prev) =>
        prev.map((link) =>
          link.id === id ? { ...link, ...updates } : link
        )
      );
    };

    const updateText = (id: string, text: string) => {
      updateNote(id, { text });
    };

    const updateTextLink = (id: string, text: string) => {
      updateLink(id, { text });
    };
  
    const stopEdit = (id: string) => {
      updateNote(id, { isEditing: false });
    };

    const stopEditLink = (id: string) => {
      updateLink(id, { isEditing: false });
    };
  
    // function getTextareaStyle(note: NoteItem) {
    //   if (!stageRef.current || !containerRef.current) return {};
      
    //   const stage = stageRef.current;
    //   const scale = stage.scaleX();
    //   const stagePos = stage.position();
    //   const containerRect = containerRef.current.getBoundingClientRect();
    //   return {
    //     position: "absolute" as const,
    //     left: stagePos.x + note.x * scale,
    //     top: stagePos.y + note.y * scale,
    //     width: note.width * scale,
    //     height: note.height * scale,
    //     padding: `${PADDING * scale}px`,
    //     margin: "0",
    //     fontFamily: FONT.family,
    //     fontSize: `${FONT.size * scale}px`,
    //     lineHeight: FONT.lineHeight.toString(),
    //     letterSpacing: `${FONT.letterSpacing}px`,
    //     color: "#333",
    //     background: "transparent",
    //     border: "none",
    //     outline: "none",
    //     resize: "none",
    //     overflow: "hidden",
    //     whiteSpace: "pre-wrap",
    //     wordWrap: "break-word",
    //     boxSizing: "border-box",
    //   };
    // }

    // function getTextareaLinkStyle(note: LinkItem) {
    //   if (!stageRef.current || !containerRef.current) return {};
      
    //   const stage = stageRef.current;
    //   const scale = stage.scaleX();
    //   const stagePos = stage.position();
    //   return {
    //     position: "absolute" as const,
    //     left: stagePos.x + note.x * scale,
    //     top: stagePos.y + note.y * scale,
    //     width: note.width * scale,
    //     height: note.height * scale,
    //     padding: `${PADDING * scale}px`,
    //     margin: "0",
    //     fontFamily: FONT.family,
    //     fontSize: `${FONT.size * scale}px`,
    //     lineHeight: FONT.lineHeight.toString(),
    //     letterSpacing: `${FONT.letterSpacing}px`,
    //     color: "#333",
    //     background: "transparent",
    //     border: "none",
    //     outline: "none",
    //     resize: "none",
    //     overflow: "hidden",
    //     whiteSpace: "pre-wrap",
    //     wordWrap: "break-word",
    //     boxSizing: "border-box",
    //   };
    // }

    function getTextareaStyleBase(
      item: { x: number; y: number; width: number; height: number }
    ) {
      if (!stageRef.current) return {};

      const stage = stageRef.current;
      const scale = stage.scaleX();
      const stagePos = stage.position();

      return {
        position: "absolute" as const,
        left: stagePos.x + item.x * scale,
        top: stagePos.y + item.y * scale,
        width: item.width * scale,
        height: item.height * scale,
        padding: `${PADDING * scale}px`,
        margin: "0",
        // fontFamily: FONT.family,
        // fontSize: `${FONT.size * scale}px`,
        // lineHeight: FONT.lineHeight.toString(),
        // letterSpacing: `${FONT.letterSpacing}px`,
        // color: "#000",
        // background: "transparent",
        // border: "none",
        outline: "none",
        resize: "none",
        // overflow: "hidden",
        // whiteSpace: "pre-wrap",
        // wordWrap: "break-word",
        // boxSizing: "border-box",
      };
    }


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
    }
  };

  const createNote = (noteData: Omit<NoteItem, 'id'>) => {
    const newNote = {
        ...noteData,
        id: crypto.randomUUID(),
    };
    setNotes((prev) => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const createLink = (noteData: Omit<LinkItem, 'id'>) => {
    const newLink = {
        ...noteData,
        id: crypto.randomUUID(),
    };
    setLinks((prev) => [...prev, newLink]);
    setSelectedLinkId(newLink.id);
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
    });
  }else if (payload.type === "link") {
    createLink({
      x: pos.x,
      y: pos.y,
      width: 200,
      height: 120,
      text: "",
      isEditing: true,
    });
  }
};

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <Navbar />
      <div className="flex flex-row w-full h-[calc(100vh-20px)] justify-between">
        <Tools />
        <div 
          ref={containerRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="bg-[#e8b07f] flex grow relative"
        >
          <Stage 
            width={dimensions.width} 
            height={dimensions.height} 
            ref={stageRef}
            onClick={handleStageClick}
            onTap={handleStageClick}
            draggable = {true}
          >
            <Note updateNote={updateNote} notes={notes} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId}/>
            <Link updateLink={updateLink} links={links} selectedLinkId={selectedLinkId} setSelectedLinkId={setSelectedLinkId}/>
          </Stage>
          {notes.map(
          (note) =>
              note.isEditing && (
              <textarea
                  key={note.id}
                  autoFocus
                  value={note.text}
                  onChange={(e) => updateText(note.id, e.target.value)}
                  onBlur={() => stopEdit(note.id)}
                  style={getTextareaStyleBase(note) as React.CSSProperties}
              />
              )
          )}
          {links.map(
          (link) =>
              link.isEditing && (
              <textarea
                  key={link.id}
                  autoFocus
                  value={link.text}
                  onChange={(e) => updateTextLink(link.id, e.target.value)}
                  onBlur={() => stopEditLink(link.id)}
                  style={getTextareaStyleBase(link) as React.CSSProperties}
              />
              )
          )}
        </div>
        <Menu />
      </div>
    </div>
  )
}

export default Home