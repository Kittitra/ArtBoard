"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Tools from '@/app/components/Tools'
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text } from 'react-konva'

type NoteItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  isEditing: boolean;
  isSelected: boolean;
};

const FONT = {
  family: "Inter, system-ui, -apple-system, sans-serif",
  size: 16,
  lineHeight: 1.4,
  letterSpacing: 0,
};

const PADDING = 8;
const MIN_SIZE = 100;
const RESIZE_HANDLE_SIZE = 12;

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

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

  const createNote = (noteData: Omit<NoteItem, 'id'>) => {
    const newNote = {
      ...noteData,
      id: crypto.randomUUID(),
    };
    setNotes((prev) => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
  };

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

  const startEdit = (id: string) => {
    updateNote(id, { isEditing: true });
    setSelectedNoteId(id);
  };

  const stopEdit = (id: string) => {
    updateNote(id, { isEditing: false });
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedNoteId(null);
      notes.forEach(note => {
        if (note.isEditing) {
          updateNote(note.id, { isEditing: false });
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    stage.setPointersPositions(e);
    const pos = stage.getPointerPosition();
    if (!pos) return;

    try {
      const data = JSON.parse(
        e.dataTransfer.getData("application/x-konva")
      );

      if (data.type === "note") {
        createNote({
          x: pos.x,
          y: pos.y,
          width: 200,
          height: 120,
          text: "",
          isEditing: true,
          isSelected: true,
        });
      }
    } catch (error) {
      console.error("Error parsing drop data:", error);
    }
  };

  function getTextareaStyle(note: NoteItem) {
    if (!stageRef.current || !containerRef.current) return {};
    
    const stage = stageRef.current;
    const scale = stage.scaleX();
    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      position: "absolute" as const,
      left: note.x * scale,
      top: note.y * scale,
      width: note.width * scale,
      height: note.height * scale,
      padding: `${PADDING * scale}px`,
      margin: "0",
      fontFamily: FONT.family,
      fontSize: `${FONT.size * scale}px`,
      lineHeight: FONT.lineHeight.toString(),
      letterSpacing: `${FONT.letterSpacing}px`,
      color: "#333",
      background: "transparent",
      border: "none",
      outline: "none",
      resize: "none",
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      boxSizing: "border-box",
    };
  }

  useEffect(() => {
    if (stageRef.current) {
      // Apply CSS background to stage container
      const container = stageRef.current.container();
      container.style.backgroundColor = 'green';
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <Navbar />
      <div className="flex flex-row w-full h-[calc(100vh-20px)] justify-between">
        <Tools />
        <div 
          ref={containerRef} 
          className="bg-[#F2F2F2] flex grow relative"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ border: "1px solid #ccc" }}
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
              {notes.map((note) => {
                const isSelected = selectedNoteId === note.id;
                
                return (
                  <Group key={note.id}>
                    <Group
                      x={note.x}
                      y={note.y}
                      draggable={!note.isEditing}
                      onClick={() => setSelectedNoteId(note.id)}
                      onTap={() => setSelectedNoteId(note.id)}
                      onDblClick={() => startEdit(note.id)}
                      onDblTap={() => startEdit(note.id)}
                      onDragEnd={(e) => {
                        const { x, y } = e.target.position();
                        updateNote(note.id, { x, y });
                      }}
                    >
                      <Rect
                        width={note.width}
                        height={note.height}
                        fill="white"
                        cornerRadius={8}
                        shadowBlur={4}
                        shadowOpacity={0.1}
                        shadowOffsetY={2}
                        stroke={isSelected ? "gray" : "transparent"}
                        strokeWidth={2}
                      />
                      <Text
                        text={note.text}
                        x={PADDING}
                        y={PADDING}
                        width={note.width - PADDING * 2}
                        fontFamily={FONT.family}
                        fontSize={FONT.size}
                        lineHeight={FONT.lineHeight}
                        letterSpacing={FONT.letterSpacing}
                        fill="#333"
                        opacity={note.isEditing ? 0 : 1}
                        wrap="word"
                      />
                    </Group>
                    
                    {/* Resize Handle */}
                    {isSelected && !note.isEditing && (
                      <Group
                        x={note.x + note.width}
                        y={note.y + note.height}
                        draggable
                        onDragMove={(e) => {
                          const pos = e.target.position();
                          const newWidth = Math.max(MIN_SIZE, pos.x - note.x);
                          const newHeight = Math.max(MIN_SIZE, pos.y - note.y);
                          
                          updateNote(note.id, {
                            width: newWidth,
                            height: newHeight,
                          });
                          
                          // Reset handle position
                          e.target.position({
                            x: note.x + newWidth,
                            y: note.y + newHeight,
                          });
                        }}
                      >
                        <Rect
                          x={-RESIZE_HANDLE_SIZE / 2}
                          y={-RESIZE_HANDLE_SIZE / 2}
                          width={RESIZE_HANDLE_SIZE}
                          height={RESIZE_HANDLE_SIZE}
                          fill="gray"
                          cornerRadius={2}
                          stroke="white"
                          strokeWidth={2}
                        />
                      </Group>
                    )}
                  </Group>
                );
              })}
            </Layer>
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
                  style={getTextareaStyle(note)}
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