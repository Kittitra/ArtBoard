"use client";

import Menu from '@/app/components/Menu'
import Note from '@/app/components/drag/Note';
import Tools from '@/app/components/Tools'
import Konva from 'konva';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Layer, Rect, Stage } from 'react-konva'
import Link from '@/app/components/drag/Link';
import { LinkItem, NoteItem, BoardItem, ArrowItem, HeaderTextItem, ColorCardItem, DocumentItem, SketchItem, VideoItem, CommentItem, AudioItem, GroupItem, DrawItem, ImageItem } from '@/lib/type';
import Board from '@/app/components/drag/Board';
import ArrowConnector, { getEdgePoint } from '../../drag/ArrowConnector';

import { useHistory } from "@/hooks/useHistory";
import HeaderText from '../../drag/HeaderText';
import ColorCard from '../../drag/ColorCard';
import ColorPicker from './ColorPicker';
import DocumentIcon from '../../drag/DocumentIcon';
import DocumentEditor from '../../drag/DocumentEditor';
import SketchIcon from '../../drag/SketchIcon';
import SketchEditor from '../../drag/SketchEditor';
import VideoIcon from '../../drag/VideoIcon';
import VideoUploader from '../../drag/VideoUploader';
import { VideoPlayer } from '../../drag/VideoPlayer';
import CommentIcon from '../../drag/CommentIcon';
import CommentPanel from '../../drag/CommentPanel';
import { useCurrentUser } from '@/hooks/use-current-user';
import AudioElement from '../../drag/AudioElement';
import AudioPanel from '../../drag/AudioPanel';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import GroupElement, { getItemsInsideGroup } from '../../drag/GroupElement';
import DrawElement from '../../drag/DrawElement';
import DrawEditor from '../../drag/DrawEditor';
import ImageElement from '../../drag/ImageElement';
import ImageUploader from '../../drag/ImageUploader';
import ImageViewer from '../../drag/ImageViewer';

interface CanvasState {
    notes: NoteItem[]
    links: LinkItem[]
    board: BoardItem[]
    arrows: ArrowItem[]
    headerTexts: HeaderTextItem[]
    colorCards: ColorCardItem[]
    documents: DocumentItem[]
    sketches: SketchItem[]
    videos: VideoItem[]
    comments: CommentItem[]
    audios: AudioItem[]
    groups: GroupItem[]
    draws: DrawItem[]
    images: ImageItem[]
}

const PADDING = 8;

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
    const [arrows, setArrows] = useState<ArrowItem[]>([]);
    const [headerTexts, setHeaderTexts] = useState<HeaderTextItem[]>([]);
    const [draggingArrow, setDraggingArrow] = useState<ArrowItem | null>(null);
    const [draggingArrowId, setDraggingArrowId] = useState<string | null>(null);
    const [colorCards, setColorCards] = useState<ColorCardItem[]>([]);
    const [colorPickerPos, setColorPickerPos] = useState<{ x: number; y: number } | null>(null);
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [openDocId, setOpenDocId] = useState<string | null>(null);
    const [sketches, setSketches] = useState<SketchItem[]>([]);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [audios, setAudios] = useState<AudioItem[]>([]);
    const [groups, setGroups] = useState<GroupItem[]>([]);
    const [draws, setDraws] = useState<DrawItem[]>([]);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [viewImageId, setViewImageId] = useState<string | null>(null);

    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [openImageId, setOpenImageId] = useState<string | null>(null);
    const [selectedDrawId, setSelectedDrawId] = useState<string | null>(null);
    const [openDrawId, setOpenDrawId] = useState<string | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [openVideoId, setOpenVideoId] = useState<string | null>(null);
    const [selectedSketchId, setSelectedSketchId] = useState<string | null>(null);
    const [openSketchId, setOpenSketchId] = useState<string | null>(null);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [colorPickerTargetId, setColorPickerTargetId] = useState<string | null>(null);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
    const [selectedArrowId, setSelectedArrowId] = useState<string | null>(null);
    const [selectedHeaderTextId, setSelectedHeaderTextId] = useState<string | null>(null);
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
    const [openCommentId, setOpenCommentId] = useState<string | null>(null);
    const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null);
    const [openAudioId, setOpenAudioId] = useState<string | null>(null);
    const [versionContent, setVersionContent] = useState<any>(null);

    const session = useCurrentUser();

    const audioPlayer = useAudioPlayer();

    // console.log("version", versions);

    // ทุกครั้งที่ history state เปลี่ยน sync เข้า local
   const isUndoRedo = useRef(false);

    const initialState: CanvasState = {
        notes: versions[0]?.content?.notes || [],
        links: versions[0]?.content?.links || [],
        board: versions[0]?.content?.board || [],
        arrows: versions[0]?.content?.arrows || [],
        headerTexts: versions[0]?.content?.headerTexts || [],
        colorCards: versions[0]?.content?.colorCards || [],
        documents: versions[0]?.content?.documents || [],
        sketches: versions[0]?.content?.sketches || [],
        videos: versions[0]?.content?.videos || [],
        comments: versions[0]?.content?.comments || [],
        audios: versions[0]?.content?.audios || [],
        groups: versions[0]?.content?.groups || [],
        draws: versions[0]?.content?.draws || [],
        images: versions[0]?.content?.images || [],
    };

    const { state, push, undo, redo, canUndo, canRedo, canUndoRef, canRedoRef } = useHistory<CanvasState>(initialState);

    useEffect(() => {
        if (versions.length > 0) {
            const loadedState = {
                notes: versions[0].content?.notes || [],
                links: versions[0].content?.links || [],
                board: versions[0].content?.board || [],
                arrows: versions[0].content?.arrows || [],
                headerTexts: versions[0].content?.headerTexts || [],
                colorCards: versions[0].content?.colorCards || [],
                documents: versions[0].content?.documents || [],
                sketches: versions[0].content?.sketches || [],
                videos: versions[0].content?.videos || [],
                comments: versions[0].content?.comments || [],
                audios: versions[0].content?.audios || [],
                groups: versions[0].content?.groups || [],
                draws: versions[0].content?.draws || [],
                images: versions[0].content?.images || [],
            };

            setNotes(loadedState.notes);
            setLinks(loadedState.links);
            setBoard(loadedState.board);
            setArrows(loadedState.arrows);
            setHeaderTexts(loadedState.headerTexts);
            setColorCards(loadedState.colorCards);
            setDocuments(loadedState.documents);
            setSketches(loadedState.sketches);
            setGroups(loadedState.groups);
            setVideos(loadedState.videos);
            setComments(loadedState.comments);
            setAudios(loadedState.audios);
            setDraws(loadedState.draws);
            setImages(loadedState.images);
            push(loadedState); // ← สำคัญ
        }
    }, [versions[0]?.id]);

    useEffect(() => {
        if (!isUndoRedo.current) return;
        // deep clone กัน reference ปัญหา
        setNotes([...state.notes]);
        setLinks([...state.links]);
        setBoard([...state.board]);
        setArrows([...state.arrows]);
        setHeaderTexts([...state.headerTexts]);
        setColorCards([...state.colorCards]);
        setDocuments([...state.documents]);
        setSketches([...state.sketches]);
        setVideos([...state.videos]);
        setComments([...state.comments]);
        setAudios([...state.audios]);
        setGroups([...state.groups]);
        setDraws([...state.draws]);
        setImages([...state.images]);
        isUndoRedo.current = false;
    }, [state]);

    const handleUndo = useCallback(() => {
        if (!canUndoRef.current) return;  // ← อ่านจาก hook ref โดยตรง
        isUndoRedo.current = true;
        undo();
    }, [undo]);

    const handleRedo = useCallback(() => {
        if (!canRedoRef.current) return;  // ← อ่านจาก hook ref โดยตรง
        isUndoRedo.current = true;
        redo();
    }, [redo]);

    const pushHistory = (snapshot: CanvasState) => {
        push(snapshot);
    };

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

    const updateSketch = (id: string, updates: Partial<SketchItem>) => {
        setSketches((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s));
    };

    const updateAudio = (id: string, updates: Partial<AudioItem>) => {
        setAudios((prev) => prev.map((a) => a.id === id ? { ...a, ...updates } : a));
    };
    
    const stopEdit = (id: string) => {
        updateNote(id, { isEditing: false });
    };

    const stopEditHeaderText = (id: string) => {
        updateHeaderText(id, { isEditing: false });
    }

    const updateBoard = (id: string, updates: Partial<BoardItem>) => {
        setBoard((prev) =>
            prev.map((board) =>
                board.id === id ? { ...board, ...updates } : board
            )
        );
    };

    const updateHeaderText = (id: string, updates: Partial<HeaderTextItem>) => {
        setHeaderTexts((prev) =>
            prev.map((text) =>
                text.id === id ? { ...text, ...updates } : text
            )
        );
    };

    const updateHeaderTextContent = (id: string, text: string) => {
        updateHeaderText(id, { text });
    }

    const updateDoc = (id: string, updates: Partial<DocumentItem>) => {
        setDocuments((prev) => prev.map((d) => d.id === id ? { ...d, ...updates } : d));
    };

    const updateCard = (id: string, updates: Partial<ColorCardItem>) => {
        setColorCards((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c));
    };

    const updateVideo = (id: string, updates: Partial<VideoItem>) => {
        setVideos((prev) => prev.map((v) => v.id === id ? { ...v, ...updates } : v));
    }

    const updateComment = (id: string, updates: Partial<CommentItem>) => {
        setComments((prev) => prev.map((c) => c.id === id ? { ...c, ...updates } : c));
    };

    const updateGroup = (id: string, updates: Partial<GroupItem>) => {
        setGroups((prev) => prev.map((g) => g.id === id ? { ...g, ...updates } : g));
    };

    const updateDraw = (id: string, updates: Partial<DrawItem>) => {
        setDraws((prev) => prev.map((d) => d.id === id ? { ...d, ...updates } : d));
    };

    const updateImage = (id: string, updates: Partial<ImageItem>) => {
        setImages((prev) => prev.map((i) => i.id === id ? { ...i, ...updates } : i));
    };

    const deleteComment = (id: string) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
        setOpenCommentId(null);
    };

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

    const openCaptionEdit = (id: string) => {
        updateCard(id, { isEditingCaption: true });
    };
    
    // updateNote อัปเดต width/height → getTextareaStyleBase อ่านค่าใหม่อัตโนมัติ
    const getTextareaStyleBase = (item: { x: number; y: number; width: number; height: number }, type?: string) => {
        if (!stageRef.current) return {};
        const stage = stageRef.current;
        const scale = stage.scaleX();
        const stagePos = stage.position();

        if(type === "header") {
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
                fontSize: 24 * scale,
                fontWeight: "bold",
                textAlign: "center"
            }
        }

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
    
        const handleSaveVersion = (versionId: string) => {
            const updated = versions.map((v) =>
                v.id === versionId
                    ? { ...v, content: { notes, links, board, arrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images } } // ← อัปเดต content 
                    : v
            );
            updateVersionData(updated); // ← ส่งกลับไปหา parent
        };
    
      const createNote = (noteData: Omit<NoteItem, 'id'>) => {
        const newNote = { ...noteData, id: crypto.randomUUID() };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
        pushHistory({ notes: newNotes, links, board, arrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← ส่งครบ
        setSelectedNoteId(newNote.id);
      };

      const createLink = (linkData: Omit<LinkItem, 'id'>) => {
        const newLink = { ...linkData, id: crypto.randomUUID() };
        const newLinks = [...links, newLink];
        setLinks(newLinks);
        pushHistory({ notes, links: newLinks, board, arrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← ส่งครบ
        setSelectedLinkId(newLink.id);
      };
    
      const createBoard = (boardData: Omit<BoardItem, 'id'>) => {
        const newBoard = { ...boardData, id: crypto.randomUUID() };
        const newBoards = [...board, newBoard];
        setBoard(newBoards);
        pushHistory({ notes, links, board: newBoards, arrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← ส่งครบ
        setSelectedBoardId(newBoard.id);
      };


      const createHeaderText = (textData: Omit<HeaderTextItem, 'id'>) => {
        const newHeaderText = { ...textData, id: crypto.randomUUID() };
        const newHeaderTexts = [...headerTexts, newHeaderText];
        setHeaderTexts(newHeaderTexts);
        pushHistory({ notes, links, board, arrows, headerTexts: newHeaderTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← ส่งครบ
        setSelectedHeaderTextId(newHeaderText.id);
      };

    const createColorCard = (x: number, y: number) => {
        const newCard: ColorCardItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 160,
            height: 120,
            color: "#4A90D9",
            caption: "",
            isEditingCaption: false,
            parentBoardId,
        };
        setColorCards((prev) => [...prev, newCard]);
        pushHistory({ notes, links, board, arrows, headerTexts, colorCards: [...colorCards, newCard], documents, sketches, videos, comments, audios, groups, draws, images });
    };

    const createDocument = (x: number, y: number) => {
        const newDoc: DocumentItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 70,
            height: 80,
            title: "",
            content: "",
            parentBoardId,
        };
        setDocuments((prev) => [...prev, newDoc]);
    };

    const createSketch = (x: number, y: number) => {
        const newSketch: SketchItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 90,
            height: 90,
            thumbnail: null,
            parentBoardId,
        };
        setSketches((prev) => [...prev, newSketch]);
    };

    const createVideo = (x: number, y: number) => {
        const newVideo: VideoItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 200,
            height: 120,
            uploadId: null,       // ← เพิ่ม
            playbackId: null,     // ← เพิ่ม
            thumbnailUrl: null,   // ← เพิ่ม
            status: "idle",
            parentBoardId,        // ← เพิ่ม
        };
        setVideos((prev) => [...prev, newVideo]);
        setOpenVideoId(newVideo.id);  // ← เปิด uploader ทันที
    };

    const createComment = (x: number, y: number) => {
        const newComment: CommentItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 48,
            height: 48,
            author: session?.name || "Anonymous",
            avatar: session?.image || undefined,
            text: "",
            replies: [],
            resolved: false,
            createdAt: new Date().toISOString(),
            parentBoardId,
        };
        setComments((prev) => [...prev, newComment]);
        setOpenCommentId(newComment.id);  // ← เปิด panel ทันที
    };

    const createAudio = (x: number, y: number) => {
        const newAudio: AudioItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 220,
            height: 64,
            url: "",
            title: "",
            status: "idle",
            parentBoardId,
        };
        setAudios((prev) => [...prev, newAudio]);
        setOpenAudioId(newAudio.id);
    };

    const createGroup = (x: number, y: number) => {
        const newGroup: GroupItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 300,
            height: 200,
            title: "Group",
            isEditingTitle: false,
            color: "rgba(240,240,255,0.6)",
            parentBoardId,
        };
        setGroups((prev) => [...prev, newGroup]);
        selectGroup(newGroup.id);
    };

    const createDraw = (x: number, y: number) => {
        const newDraw: DrawItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 300,
            height: 200,
            strokes: [],
            parentBoardId,
        };
        setDraws((prev) => [...prev, newDraw]);
        setOpenDrawId(newDraw.id);
    };

    const createImage = (x: number, y: number) => {
        const newImage: ImageItem = {
            id: crypto.randomUUID(),
            x, y,
            width: 200,
            height: 150,
            url: null,
            publicId: null,
            status: "idle",
            parentBoardId,
        };
        setImages((prev) => [...prev, newImage]);
        setOpenImageId(newImage.id);
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

    const handleSketchSave = (id: string, dataUrl: string) => {
        updateSketch(id, { thumbnail: dataUrl });
        setOpenSketchId(null);
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
        }else if (payload.type === "arrow") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const stagePos = transform.point(pos);
            const newArrow: ArrowItem = {
                id: crypto.randomUUID(),
                fromId: null,
                toId: null,
                fromX: stagePos.x,
                fromY: stagePos.y,
                toX: stagePos.x + 150,
                toY: stagePos.y,
                unconnected: true,
                parentBoardId: parentBoardId,
            };
            const newArrows = [...arrows, newArrow];
            setArrows(newArrows);
            pushHistory({ notes, links, board, arrows: newArrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← เพิ่ม
        }else if (payload.type === "header") {
            createHeaderText({
                x: pos.x,
                y: pos.y,
                width: 250,
                height: 75,
                text: "",
                isEditing: true,
                parentBoardId: parentBoardId,
            })
        }else if (payload.type === "colorcard") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createColorCard(sp.x, sp.y);
        }else if (payload.type === "document") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createDocument(sp.x, sp.y);
        }else if (payload.type === "sketch") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createSketch(sp.x, sp.y);
        }else if (payload.type === "video") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createVideo(sp.x, sp.y);
        }else if (payload.type === "comment") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createComment(sp.x, sp.y);
        }else if (payload.type === "audio") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createAudio(sp.x, sp.y);
        }else if (payload.type === "group") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createGroup(sp.x, sp.y);
        }else if (payload.type === "draw") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createDraw(sp.x, sp.y);
        }else if (payload.type === "image") {
            const transform = stage.getAbsoluteTransform().copy().invert();
            const sp = transform.point(pos);
            createImage(sp.x, sp.y);
        }
    };

    const clearEditingState = () => {
        setNotes(prev => prev.map(n => n.isEditing ? { ...n, isEditing: false } : n));
        setLinks(prev => prev.map(l => l.isEditing ? { ...l, isEditing: false } : l));
        setBoard(prev => prev.map(b => b.isEditingTitle ? { ...b, isEditingTitle: false } : b));
        setHeaderTexts(prev => prev.map(t => t.isEditing ? { ...t, isEditing: false } : t));
        setColorCards(prev => prev.map(c => c.isEditingCaption ? { ...c, isEditingCaption: false } : c));
    };

    const clearSelection = () => {
        setSelectedNoteId(null);
        setSelectedLinkId(null);
        setSelectedBoardId(null);
        setSelectedArrowId(null);
        setSelectedHeaderTextId(null);
        setSelectedCardId(null);
        setSelectedDocId(null);
        setSelectedSketchId(null);
        setSelectedVideoId(null);
        setSelectedCommentId(null);
        setSelectedAudioId(null);
        setSelectedGroupId(null); 
        setSelectedDrawId(null);
        setSelectedImageId(null);  
    };

    const selectNote = (id: string) => {
        clearSelection();
        setSelectedNoteId(id);
        setNotes((prev) => {
            const selected = prev.find((n) => n.id === id);
            const rest = prev.filter((n) => n.id !== id);
            if (!selected) return prev;
            // ย้าย selected ไปท้าย + clear isEditing ทุกตัว
            return [
                ...rest.map((n) => n.isEditing ? { ...n, isEditing: false } : n),
                { ...selected, isEditing: false },
            ];
        });
    };

    const selectHeaderText = (id: string) => {
        clearSelection();
        setSelectedHeaderTextId(id);
        setHeaderTexts((prev) => {
            const selected = prev.find((text) => text.id === id);
            const rest = prev.filter((text) => text.id !== id);
            return selected ? [...rest, selected] : prev; // ← ย้าย selected ไปท้าย
        });
    };

    const selectCard = (id: string) => {
        clearSelection();
        setSelectedCardId(id);
    };

    const selectDoc = (id: string) => {
        clearSelection();
        setSelectedDocId(id);
    };

    const selectSketch = (id: string) => {
        clearSelection();
        setSelectedSketchId(id);
    };

    const selectVideo = (id: string) => {
        clearSelection();
        setSelectedVideoId(id);
    };

    const selectComment = (id: string) => {
        clearSelection();
        setSelectedCommentId(id);
    };

    const selectAudio = (id: string) => {
        clearSelection();
        setSelectedAudioId(id);
    };

    const handleSelectArrow = (id: string | null) => {
        if (id) clearSelection();
        setSelectedArrowId(id);
    };

    const selectGroup = (id: string) => {
        clearSelection();
        setSelectedGroupId(id);
    };

    const selectDraw = (id: string) => {
        clearSelection();
        setSelectedDrawId(id);
    };

    const selectImage = (id: string) => {
        clearSelection();
        setSelectedImageId(id);
    };

    const openColorPicker = (id: string, x: number, y: number) => {
        setColorPickerTargetId(id);
        setColorPickerPos({ x, y });
    };

    const handleColorChange = (color: string) => {
        if (!colorPickerTargetId) return;
        updateCard(colorPickerTargetId, { color });
    };

    const handleStageClick = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            clearSelection();
            clearEditingState();
        }
    };

    const deleteSelected = () => {
        const newNotes = selectedNoteId ? notes.filter((n) => n.id !== selectedNoteId) : notes;
        const newLinks = selectedLinkId ? links.filter((l) => l.id !== selectedLinkId) : links;
        const newBoard = selectedBoardId ? board.filter((b) => b.id !== selectedBoardId) : board;
        const newArrows = selectedArrowId ? arrows.filter((a) => a.id !== selectedArrowId) : arrows;
        const newHeaderTexts = selectedHeaderTextId ? headerTexts.filter((t) => t.id !== selectedHeaderTextId) : headerTexts;
        const newColorCards = selectedCardId ? colorCards.filter((c) => c.id !== selectedCardId) : colorCards;
        const newDocuments = selectedDocId ? documents.filter((d) => d.id !== selectedDocId) : documents;
        const newSketches = selectedSketchId ? sketches.filter((s) => s.id !== selectedSketchId) : sketches;
        const newVideos = selectedVideoId ? videos.filter((v) => v.id !== selectedVideoId) : videos;
        const newComments = selectedCommentId ? comments.filter((c) => c.id !== selectedCommentId) : comments;
        const newAudios = selectedAudioId ? audios.filter((a) => a.id !== selectedAudioId) : audios;
        const newGroups = selectedGroupId ? groups.filter((g) => g.id !== selectedGroupId) : groups;
        const newDraws = selectedDrawId ? draws.filter((d) => d.id !== selectedDrawId) : draws;
        const newImages = selectedImageId ? images.filter((i) => i.id !== selectedImageId) : images;
        
        setNotes(newNotes);
        setLinks(newLinks);
        setBoard(newBoard);
        setArrows(newArrows);
        setHeaderTexts(newHeaderTexts);
        setColorCards(newColorCards);
        setDocuments(newDocuments);
        setSketches(newSketches);
        setVideos(newVideos);
        setComments(newComments);
        setAudios(newAudios);
        setGroups(newGroups);
        setDraws(newDraws);
        setImages(newImages);
        setSelectedNoteId(null);
        setSelectedLinkId(null);
        setSelectedBoardId(null);
        setSelectedArrowId(null);
        setSelectedHeaderTextId(null);
        setSelectedCardId(null);
        setSelectedDocId(null);
        setColorPickerTargetId(null);
        setSelectedSketchId(null);
        setSelectedVideoId(null);
        setSelectedCommentId(null);
        setSelectedAudioId(null);
        setSelectedGroupId(null);
        setSelectedDrawId(null);
        setSelectedImageId(null);

        pushHistory({ notes: newNotes, links: newLinks, board: newBoard, arrows, headerTexts: newHeaderTexts, colorCards: newColorCards, documents: newDocuments, sketches: newSketches, videos: newVideos, comments: newComments, audios: newAudios, groups: newGroups, draws: newDraws, images: newImages });  // ← ส่งครบ
    };

    const handleUndoRef = useRef(handleUndo);
    const handleRedoRef = useRef(handleRedo);
    handleUndoRef.current = handleUndo;  // ← อัปเดตทุก render ทันที
    handleRedoRef.current = handleRedo;  // ← อัปเดตทุก render ทันที

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isEditing = notes.some((n) => n.isEditing) || links.some((l) => l.isEditing) || headerTexts.some((t) => t.isEditing);

            if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === "z") {
                e.preventDefault();
                handleUndoRef.current();
                return;
            }
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z") {
                e.preventDefault();
                handleRedoRef.current();
                return;
            }
            if (e.key === "Delete" && !isEditing) {
                deleteSelected();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    // ← ลด dependency ให้เหลือแค่ที่จำเป็น
    }, [selectedNoteId, selectedLinkId, selectedBoardId, selectedArrowId, selectedHeaderTextId, selectedCardId, selectedDocId, selectedSketchId, selectedVideoId, selectedAudioId, selectedImageId, notes, links, headerTexts, colorCards, documents, sketches, videos, audios, groups, draws, images]);  // ← ครบ
    

    useEffect(() => {
        if (!versions[0]?.id) return;

        const timeout = setTimeout(() => {
            handleSaveVersion(versions[0].id);
        }, 3000);
        
        return () => clearTimeout(timeout);

    }, [notes, links, board, arrows, headerTexts, colorCards, documents, sketches, videos, audios, comments, groups, draws, images]);  // ← ครบ

    const allItems = [...notes, ...links, ...board, ...headerTexts, ...colorCards, ...documents, ...sketches, ...videos, ...comments, ...audios, ...groups, ...draws, ...images];

    // แก้ onConnectHead ให้ track การลาก
    const onConnectHead = (
        arrowId: string,
        side: "from" | "to",
        x: number,
        y: number,
        targetId?: string,
        isDragging?: boolean  // ← เพิ่ม parameter
    ) => {
        if (isDragging) setDraggingArrowId(arrowId);
        else setDraggingArrowId(null);

        setArrows((prev) =>
            prev.map((a) => {
                if (a.id !== arrowId) return a;
                if (targetId) {
                    const target = allItems.find((i) => i.id === targetId);
                    const edgePoint = target
                        ? getEdgePoint(target,
                            side === "from" ? a.toX : a.fromX,
                            side === "from" ? a.toY : a.fromY)
                        : { x, y };
                    return side === "from"
                        ? { ...a, fromId: targetId, fromX: edgePoint.x, fromY: edgePoint.y, unconnected: !a.toId }
                        : { ...a, toId: targetId, toX: edgePoint.x, toY: edgePoint.y, unconnected: !a.fromId };
                }
                return side === "from"
                    ? { ...a, fromId: null, fromX: x, fromY: y, unconnected: true }
                    : { ...a, toId: null, toX: x, toY: y, unconnected: true };
            })
        );
    };

    const deleteArrow = (id: string) => {
        setArrows((prev) => prev.filter((a) => a.id !== id));
    };

    const [, forceUpdate] = useState(0);

    const triggerUpdate = () => forceUpdate((n) => n + 1);

    const handleNoteDragEnd = (id: string, x: number, y: number) => {
        const newNotes = notes.map((n) => n.id === id ? { ...n, x, y } : n);
        setNotes(newNotes);
        pushHistory({ notes: newNotes, links, board, arrows, headerTexts, colorCards, documents, sketches, videos, comments, audios, groups, draws, images });  // ← ครบ
    };

    const [stagePos, setStagePos] = useState({
        x: 0,
        y: 0,
    });

    const [stageScale, setStageScale] = useState(1);
    const [isPanning, setIsPanning] = useState(false);

    const scaleBy = 1.2;

    const handleWheel = (e: any) => {
        e.evt.preventDefault();

        if (!e.evt.ctrlKey) return;

        const stage = stageRef.current;
        if (!stage) return;

        const oldScale = stageScale;

        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        // ตำแหน่ง mouse บน world
        const mousePointTo = {
            x: (pointer.x - stagePos.x) / oldScale,
            y: (pointer.y - stagePos.y) / oldScale,
        };

        // direction
        const direction = e.evt.deltaY > 0 ? -1 : 1;

        // scale ใหม่
        const newScale =
            direction > 0
                ? oldScale * scaleBy
                : oldScale / scaleBy;

        // จำกัด zoom
        const clampedScale = Math.min(Math.max(newScale, 0.2), 5);

        setStageScale(clampedScale);

        // ปรับตำแหน่ง stage ให้ zoom ตาม mouse
        setStagePos({
            x: pointer.x - mousePointTo.x * clampedScale,
            y: pointer.y - mousePointTo.y * clampedScale,
        });
    }

    const [selectionBox, setSelectionBox] = useState<{
        x: number; y: number; width: number; height: number
    } | null>(null);
    const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleMouseDown = (e: any) => {
        if (e.target !== e.target.getStage()) return;
        if (e.evt.button === 2){
            setIsPanning(true);
        }else if(e.evt.button === 0){
            const stage = stageRef.current;
            if (!stage) return;
            const pos = stage.getPointerPosition();
            if (!pos) return;

            const transform = stage.getAbsoluteTransform().copy().invert();
            const stagePos = transform.point(pos);

            setSelectionStart({ x: stagePos.x, y: stagePos.y });
            setSelectionBox({ x: stagePos.x, y: stagePos.y, width: 0, height: 0 });
            setSelectedIds([]);
        }else {
            return;
        }
    };

    const handleMouseMove = (e: any) => {
        if (isPanning) {
            setStagePos((prev) => ({
                x: prev.x + e.evt.movementX,
                y: prev.y + e.evt.movementY,
            }));
            return;
        }
        if (!selectionStart) return;

        const stage = stageRef.current;
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;

        const transform = stage.getAbsoluteTransform().copy().invert();
        const stagePos = transform.point(pos);

        const x = Math.min(selectionStart.x, stagePos.x);
        const y = Math.min(selectionStart.y, stagePos.y);
        const width = Math.abs(stagePos.x - selectionStart.x);
        const height = Math.abs(stagePos.y - selectionStart.y);

        setSelectionBox({ x, y, width, height });
    };

    useEffect(() => {
        const handleWindowMouseUp = () => {
            setIsPanning(false);
            setSelectionStart(null);
        };

        window.addEventListener("mouseup", handleWindowMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleWindowMouseUp);
        };
    }, []);

    const handleMouseUp = () => {
        if (!selectionBox) return;

        // หา element ที่อยู่ใน selection box
        const selected = allItems.filter((item) => {
            return (
                item.x < selectionBox.x + selectionBox.width &&
                item.x + item.width > selectionBox.x &&
                item.y < selectionBox.y + selectionBox.height &&
                item.y + item.height > selectionBox.y
            );
        });

        setSelectedIds(selected.map((i) => i.id));
        setSelectionBox(null);
        setSelectionStart(null);
        setIsPanning(false)
    };

    const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
    const [dragStartItems, setDragStartItems] = useState<typeof allItems>([]);  

    const handleGroupDragStart = (draggedId: string, startX: number, startY: number) => {
        if (!selectedIds.includes(draggedId)) return;
        // เก็บตำแหน่งเริ่มต้นของทุก element ที่ถูกเลือก
        setDragStartPos({ x: startX, y: startY });
        setDragStartItems(allItems.filter((i) => selectedIds.includes(i.id)));
    };

    const handleGroupDragMove = (draggedId: string, currentX: number, currentY: number) => {
        if (!selectedIds.includes(draggedId) || !dragStartPos) return;

        const dx = currentX - dragStartPos.x;
        const dy = currentY - dragStartPos.y;

        const newNotes = notes.map((n) => {
            if (!selectedIds.includes(n.id)) return n;
            // ← เปลี่ยน: รวม draggedId ด้วย ไม่ exclude ออก
            if (n.id === draggedId) return { ...n, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === n.id);
            if (!original) return n;
            return { ...n, x: original.x + dx, y: original.y + dy };
        });

        const newLinks = links.map((l) => {
            if (!selectedIds.includes(l.id)) return l;
            if (l.id === draggedId) return { ...l, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === l.id);
            if (!original) return l;
            return { ...l, x: original.x + dx, y: original.y + dy };
        });

        const newBoard = board.map((b) => {
            if (!selectedIds.includes(b.id)) return b;
            if (b.id === draggedId) return { ...b, x: currentX, y: currentY };  // ← เพิ่ม
            const original = dragStartItems.find((i) => i.id === b.id);
            if (!original) return b;
            return { ...b, x: original.x + dx, y: original.y + dy };
        });

        const newHeaderTexts = headerTexts.map((t) => {
            if (!selectedIds.includes(t.id)) return t;
            if (t.id === draggedId) return { ...t, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === t.id);
            if (!original) return t;
            return { ...t, x: original.x + dx, y: original.y + dy };
        });

        const newColorCards = colorCards.map((c) => {
            if (!selectedIds.includes(c.id)) return c;
            if (c.id === draggedId) return { ...c, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === c.id);
            if (!original) return c;
            return { ...c, x: original.x + dx, y: original.y + dy };
        });

        const newDocuments = documents.map((d) => {
            if (!selectedIds.includes(d.id)) return d;
            if (d.id === draggedId) return { ...d, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === d.id);
            if (!original) return d;
            return { ...d, x: original.x + dx, y: original.y + dy };
        });

        const newSketches = sketches.map((s) => {
            if (!selectedIds.includes(s.id)) return s;
            if (s.id === draggedId) return { ...s, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === s.id);
            if (!original) return s;
            return { ...s, x: original.x + dx, y: original.y + dy };
        });

        const newVideos = videos.map((v) => {
            if (!selectedIds.includes(v.id)) return v;
            if (v.id === draggedId) return { ...v, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === v.id);
            if (!original) return v;
            return { ...v, x: original.x + dx, y: original.y + dy };
        });

        const newComments = comments.map((c) => {
            if (!selectedIds.includes(c.id)) return c;
            if (c.id === draggedId) return { ...c, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === c.id);
            if (!original) return c;
            return { ...c, x: original.x + dx, y: original.y + dy };
        });

        const newAudios = audios.map((a) => {
            if (!selectedIds.includes(a.id)) return a;
            if (a.id === draggedId) return { ...a, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === a.id);
            if (!original) return a;
            return { ...a, x: original.x + dx, y: original.y + dy };
        });

        const newGroups = groups.map((g) => {
            if (!selectedIds.includes(g.id)) return g;
            if (g.id === draggedId) return { ...g, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === g.id);
            if (!original) return g;
            return { ...g, x: original.x + dx, y: original.y + dy };
        });

        const newDraws = draws.map((d) => {
            if (!selectedIds.includes(d.id)) return d;
            if (d.id === draggedId) return { ...d, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === d.id);
            if (!original) return d;
            return { ...d, x: original.x + dx, y: original.y + dy };
        });

        const newImages = images.map((i) => {
            if (!selectedIds.includes(i.id)) return i;
            if (i.id === draggedId) return { ...i, x: currentX, y: currentY };
            const original = dragStartItems.find((item) => item.id === i.id);
            if (!original) return i;
            return { ...i, x: original.x + dx, y: original.y + dy };
        });

        setNotes(newNotes);
        setLinks(newLinks);
        setBoard(newBoard);
        setHeaderTexts(newHeaderTexts);
        setColorCards(newColorCards);
        setDocuments(newDocuments);
        setVideos(newVideos);
        setSketches(newSketches);
        setComments(newComments);
        setAudios(newAudios);
        setGroups(newGroups);
        setDraws(newDraws);
        setImages(newImages);
        triggerUpdate();
    };

    const handleGroupDragEnd = (draggedId: string, currentX: number, currentY: number) => {
        if (!selectedIds.includes(draggedId) || !dragStartPos) {
            // ไม่ได้อยู่ใน group ให้ push history ปกติ
            handleNoteDragEnd(draggedId, currentX, currentY);
            return;
        }

        const dx = currentX - dragStartPos.x;
        const dy = currentY - dragStartPos.y;

        const newNotes = notes.map((n) => {
            if (!selectedIds.includes(n.id)) return n;
            if (n.id === draggedId) return { ...n, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === n.id);
            return original ? { ...n, x: original.x + dx, y: original.y + dy } : n;
        });

        const newLinks = links.map((l) => {
            if (!selectedIds.includes(l.id)) return l;
            const original = dragStartItems.find((i) => i.id === l.id);
            return original ? { ...l, x: original.x + dx, y: original.y + dy } : l;
        });

        const newBoard = board.map((b) => {
            if (!selectedIds.includes(b.id)) return b;
            const original = dragStartItems.find((i) => i.id === b.id);
            return original ? { ...b, x: original.x + dx, y: original.y + dy } : b;
        });

        const newHeaderTexts = headerTexts.map((t) => {
            if (!selectedIds.includes(t.id)) return t;
            if (t.id === draggedId) return { ...t, x: currentX, y: currentY };
            const original = dragStartItems.find((i) => i.id === t.id);
            return original ? { ...t, x: original.x + dx, y: original.y + dy } : t;
        });

        const newColorCards = colorCards.map((c) => {
            if (!selectedIds.includes(c.id)) return c;
            const original = dragStartItems.find((i) => i.id === c.id);
            return original ? { ...c, x: original.x + dx, y: original.y + dy } : c;
        });

        const newDocuments = documents.map((d) => {
            if (!selectedIds.includes(d.id)) return d;
            const original = dragStartItems.find((i) => i.id === d.id);
            return original ? { ...d, x: original.x + dx, y: original.y + dy } : d;
        });

        const newSketches = sketches.map((s) => {
            if (!selectedIds.includes(s.id)) return s;
            const original = dragStartItems.find((i) => i.id === s.id);
            return original ? { ...s, x: original.x + dx, y: original.y + dy } : s;
        });

        const newVideos = videos.map((v) => {
            if (!selectedIds.includes(v.id)) return v;
            const original = dragStartItems.find((i) => i.id === v.id);
            return original ? { ...v, x: original.x + dx, y: original.y + dy } : v;
        });

        const newComments = comments.map((c) => {
            if (!selectedIds.includes(c.id)) return c;
            const original = dragStartItems.find((i) => i.id === c.id);
            return original ? { ...c, x: original.x + dx, y: original.y + dy } : c;
        });

        const newAudios = audios.map((a) => {
            if (!selectedIds.includes(a.id)) return a;
            const original = dragStartItems.find((i) => i.id === a.id);
            return original ? { ...a, x: original.x + dx, y: original.y + dy } : a;
        });

        const newGroups = groups.map((g) => {
            if (!selectedIds.includes(g.id)) return g;
            const original = dragStartItems.find((i) => i.id === g.id);
            return original ? { ...g, x: original.x + dx, y: original.y + dy } : g;
        });

        const newDraws = draws.map((d) => {
            if (!selectedIds.includes(d.id)) return d;
            const original = dragStartItems.find((i) => i.id === d.id);
            return original ? { ...d, x: original.x + dx, y: original.y + dy } : d;
        });

        const newImages = images.map((i) => {
            if (!selectedIds.includes(i.id)) return i;
            const original = dragStartItems.find((item) => item.id === i.id);
            return original ? { ...i, x: original.x + dx, y: original.y + dy } : i;
        });

        setNotes(newNotes);
        setLinks(newLinks);
        setBoard(newBoard);
        setHeaderTexts(newHeaderTexts);
        setVideos(newVideos);
        setColorCards(newColorCards);
        setDocuments(newDocuments);
        setSketches(newSketches);
        setComments(newComments);
        setAudios(newAudios);
        setGroups(newGroups);
        setDraws(newDraws);
        setImages(newImages);
        setDragStartPos(null);
        setDragStartItems([]);
        pushHistory({ notes: newNotes, links: newLinks, board: newBoard, arrows, headerTexts: newHeaderTexts, colorCards: newColorCards, documents: newDocuments, sketches: newSketches, videos: newVideos, comments: newComments, audios: newAudios, groups: newGroups, draws: newDraws, images: newImages });  // ← เพิ่ม arrows และ headerTexts
    };

    const handleGroupItemDragMove = (groupId: string, dx: number, dy: number) => {
        const group = groups.find((g) => g.id === groupId);
        if (!group) return;

        const insideIds = getItemsInsideGroup(group, allItems).map((i) => i.id);
        if (insideIds.length === 0) return;

        setNotes((prev) => prev.map((n) =>
            insideIds.includes(n.id) ? { ...n, x: n.x + dx, y: n.y + dy } : n
        ));
        setLinks((prev) => prev.map((l) =>
            insideIds.includes(l.id) ? { ...l, x: l.x + dx, y: l.y + dy } : l
        ));
        setBoard((prev) => prev.map((b) =>
            insideIds.includes(b.id) ? { ...b, x: b.x + dx, y: b.y + dy } : b
        ));
        setHeaderTexts((prev) => prev.map((t) =>
            insideIds.includes(t.id) ? { ...t, x: t.x + dx, y: t.y + dy } : t
        ));
        setColorCards((prev) => prev.map((c) =>
            insideIds.includes(c.id) ? { ...c, x: c.x + dx, y: c.y + dy } : c
        ));
        setDocuments((prev) => prev.map((d) =>
            insideIds.includes(d.id) ? { ...d, x: d.x + dx, y: d.y + dy } : d
        ));
        setSketches((prev) => prev.map((s) =>
            insideIds.includes(s.id) ? { ...s, x: s.x + dx, y: s.y + dy } : s
        ));
        setVideos((prev) => prev.map((v) =>
            insideIds.includes(v.id) ? { ...v, x: v.x + dx, y: v.y + dy } : v
        ));
        setAudios((prev) => prev.map((a) =>
            insideIds.includes(a.id) ? { ...a, x: a.x + dx, y: a.y + dy } : a
        ));
        setComments((prev) => prev.map((c) =>
            insideIds.includes(c.id) ? { ...c, x: c.x + dx, y: c.y + dy } : c
        ));
        setGroups((prev) => prev.map((g) =>
            insideIds.includes(g.id) ? { ...g, x: g.x + dx, y: g.y + dy } : g
        ));
        setDraws((prev) => prev.map((d) =>
            insideIds.includes(d.id) ? { ...d, x: d.x + dx, y: d.y + dy } : d
        ));
        triggerUpdate();
    };

    const handleGroupItemDragEnd = (groupId: string, dx: number, dy: number) => {
        handleGroupItemDragMove(groupId, dx, dy);
        pushHistory({
            notes, links, board, arrows, headerTexts,
            colorCards, documents, sketches, videos, comments, audios, groups, draws, images,
        });
    };

    const handleImageUploaded = (url: string, publicId: string, naturalW: number, naturalH: number) => {
        if (!openImageId) return;

        const maxSize = 300;
        let width = naturalW;
        let height = naturalH;

        if (width > maxSize || height > maxSize) {
            const ratio = Math.min(maxSize / width, maxSize / height);
            width = width * ratio;
            height = height * ratio;
        }

        updateImage(openImageId, {
            url,
            publicId,
            width,
            height,
            status: "ready",
        });
        setOpenImageId(null);
    };

    return (
        <div className="flex flex-col h-full overflow-y-hidden z-10 w-full">
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
                    x={stagePos.x}
                    y={stagePos.y}
                    scaleX={stageScale}
                    scaleY={stageScale}
                    onClick={handleStageClick}
                    onTap={handleStageClick}
                    draggable={!selectionStart}
                    onContextMenu={(e) => e.evt.preventDefault()}
                    onWheel={handleWheel}

                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <Layer>
                        <ArrowConnector 
                            selectedArrowId={selectedArrowId}
                            onSelectArrow={handleSelectArrow}
                            draggingArrowId={draggingArrowId} allItems={allItems} arrows={arrows} onConnectHead={onConnectHead} onDelete={deleteArrow} draggingArrow={draggingArrow} parentBoardId={parentBoardId}
                         />
                        {/* Selection Box */}
                        {selectionBox && selectionBox.width > 5 && (
                            <Rect
                                x={selectionBox.x}
                                y={selectionBox.y}
                                width={selectionBox.width}
                                height={selectionBox.height}
                                fill="rgba(74, 144, 217, 0.1)"
                                stroke="#4A90D9"
                                strokeWidth={1}
                                dash={[4, 2]}
                                listening={false}
                            />
                        )}
                        {versions.map((version) => (
                            <React.Fragment key={version.id}>
                                    <GroupElement
                                        groups={groups}
                                        selectedGroupId={selectedGroupId}
                                        selectedIds={selectedIds}
                                        parentBoardId={parentBoardId}
                                        allItems={allItems}
                                        updateGroup={updateGroup}
                                        selectGroup={selectGroup}
                                        setSelectedGroupId={setSelectedGroupId}
                                        onDragMove={triggerUpdate}
                                        onDragStart={handleGroupDragStart}
                                        onDragMove_group={handleGroupDragMove}
                                        onDragEnd={handleGroupDragEnd}
                                        onSelect={clearSelection}
                                        onGroupDragMove={handleGroupItemDragMove}
                                        onGroupDragEnd={handleGroupItemDragEnd}
                                    />
                                <Note 
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    selectedIds={selectedIds}
                                    onDragMove={triggerUpdate}  
                                    parentBoardId={parentBoardId} 
                                    updateNote={updateNote} 
                                    notes={notes} 
                                    selectedNoteId={selectedNoteId} 
                                    setSelectedNoteId={setSelectedNoteId} 
                                    selectNote={selectNote} />
                                <Link 
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    selectedIds={selectedIds}
                                    onDragMove={triggerUpdate}  
                                    parentBoardId={parentBoardId} 
                                    updateLink={updateLink} 
                                    links={links} selectedLinkId={selectedLinkId} setSelectedLinkId={setSelectedLinkId} onSelect={clearSelection}/>
                                <Board 
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    selectedIds={selectedIds}
                                    onDragMove={triggerUpdate} 
                                    parentBoardId={parentBoardId} 
                                    updateBoard={updateBoard} 
                                    board={board} 
                                    selectedBoardId={selectedBoardId} 
                                    setSelectedBoardId={setSelectedBoardId} 
                                    startEditBoardTitle={startEditBoardTitle} 
                                    versionId={version.id}
                                    onSelect={clearSelection}
                                />
                                    
                                <HeaderText
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    selectedIds={selectedIds}
                                    onDragMove={triggerUpdate}
                                    parentBoardId={parentBoardId}
                                    updateText={updateHeaderText}
                                    texts={headerTexts}
                                    selectedTextId={selectedHeaderTextId}
                                    setSelectedTextId={setSelectedHeaderTextId}
                                    selectText={selectHeaderText}
                                />
                                <ColorCard
                                    cards={colorCards}
                                    selectedCardId={selectedCardId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateCard={updateCard}
                                    selectCard={selectCard}
                                    setSelectedCardId={setSelectedCardId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenColorPicker={openColorPicker}
                                    onEditCaption={openCaptionEdit}
                                />
                                <DocumentIcon
                                    documents={documents}
                                    selectedDocId={selectedDocId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateDoc={updateDoc}
                                    selectDoc={selectDoc}
                                    setSelectedDocId={setSelectedDocId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenDoc={setOpenDocId}
                                />
                                <SketchIcon
                                    sketches={sketches}
                                    selectedSketchId={selectedSketchId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateSketch={updateSketch}
                                    selectSketch={selectSketch}
                                    setSelectedSketchId={setSelectedSketchId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenSketch={setOpenSketchId}
                                />
                                <VideoIcon
                                    videos={videos}
                                    selectedVideoId={selectedVideoId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateVideo={updateVideo}
                                    selectVideo={selectVideo}
                                    setSelectedVideoId={setSelectedVideoId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenVideo={setOpenVideoId}
                                    onSelect={clearSelection}
                                />
                                <CommentIcon
                                    comments={comments}
                                    selectedCommentId={selectedCommentId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateComment={updateComment}
                                    selectComment={selectComment}
                                    setSelectedCommentId={setSelectedCommentId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenComment={setOpenCommentId}
                                    onSelect={clearSelection}
                                />
                                <AudioElement
                                    audios={audios}
                                    selectedAudioId={selectedAudioId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateAudio={updateAudio}
                                    selectAudio={selectAudio}
                                    setSelectedAudioId={setSelectedAudioId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenAudio={setOpenAudioId}
                                    onSelect={clearSelection}
                                    audioPlayer={audioPlayer}
                                />
                                <DrawElement
                                    draws={draws}
                                    selectedDrawId={selectedDrawId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateDraw={updateDraw}
                                    selectDraw={selectDraw}
                                    setSelectedDrawId={setSelectedDrawId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    onOpenDraw={setOpenDrawId}
                                    onSelect={clearSelection}
                                />
                                <ImageElement
                                    images={images}
                                    selectedImageId={selectedImageId}
                                    selectedIds={selectedIds}
                                    parentBoardId={parentBoardId}
                                    updateImage={updateImage}
                                    selectImage={selectImage}
                                    setSelectedImageId={setSelectedImageId}
                                    onDragMove={triggerUpdate}
                                    onDragStart={handleGroupDragStart}
                                    onDragMove_group={handleGroupDragMove}
                                    onDragEnd={handleGroupDragEnd}
                                    // onOpenImage={setOpenImageId}
                                    onSelect={clearSelection}
                                    onViewImage={setViewImageId}
                                    onOpenImage={(id) => {
                                        const image = images.find((i) => i.id === id);
                                        if (image?.status === "ready") {
                                            setViewImageId(id);    // ← ถ้ามีรูปแล้ว เปิด viewer
                                        } else {
                                            setOpenImageId(id);   // ← ถ้าไม่มี เปิด uploader
                                        }
                                    }}
                                />
                            </React.Fragment>
                        ))}
                    </Layer>
                </Stage>

                {groups.map((g) => {
                    if (!g.isEditingTitle) return null;
                    const stage = stageRef.current;
                    const scaleX = stage?.scaleX() ?? 1;
                    const posX = stage?.position().x ?? 0;
                    const posY = stage?.position().y ?? 0;

                    return (
                        <input
                            key={g.id}
                            autoFocus
                            value={g.title}
                            onChange={(e) => updateGroup(g.id, { title: e.target.value })}
                            onBlur={() => updateGroup(g.id, { isEditingTitle: false })}
                            onKeyDown={(e) => e.key === "Enter" && updateGroup(g.id, { isEditingTitle: false })}
                            style={{
                                position: "absolute",
                                left: posX + g.x * scaleX + 10,
                                top: posY + g.y * (stage?.scaleY() ?? 1) + 4,
                                width: (g.width - 20) * scaleX,
                                height: 18,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                fontSize: 12 * scaleX,
                                fontWeight: 600,
                                color: "#ffffff",
                                zIndex: 300,
                            }}
                        />
                    );
                })}

                {notes.map((note) => note.isEditing && (
                    <textarea
                        key={note.id}
                        value={note.text}
                        onChange={(e) => updateText(note.id, e.target.value)}
                        onBlur={() => stopEdit(note.id)}
                        style={getTextareaStyleBase(note) as React.CSSProperties}
                    />
                ))}

                {headerTexts.map((text) => text.isEditing && (
                    <textarea
                        key={text.id}
                        value={text.text}
                        onChange={(e) => updateHeaderTextContent(text.id, e.target.value)}
                        onBlur={() => stopEditHeaderText(text.id)}
                        style={getTextareaStyleBase(text, "header") as React.CSSProperties}
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

                {/* ColorPicker popup */}
                {colorPickerPos && (
                    <div style={{ position: "absolute", left: colorPickerPos.x, top: colorPickerPos.y, zIndex: 100 }}>
                        <ColorPicker
                            color={colorCards.find((c) => c.id === colorPickerTargetId)?.color || "#ffffff"}
                            onChange={handleColorChange}
                            onClose={() => setColorPickerPos(null)}
                        />
                    </div>
                )}

                {/* Caption input */}
                {colorCards.map((card) => {
                    if (!card.isEditingCaption) return null;
                    const stage = stageRef.current;
                    const scaleX = stage?.scaleX() ?? 1;
                    const scaleY = stage?.scaleY() ?? 1;
                    const posX = stage?.position().x ?? 0;
                    const posY = stage?.position().y ?? 0;

                    return (
                        <input
                            key={card.id}
                            autoFocus
                            value={card.caption}
                            onChange={(e) => updateCard(card.id, { caption: e.target.value })}
                            onBlur={() => updateCard(card.id, { isEditingCaption: false })}
                            onKeyDown={(e) => e.key === "Enter" && updateCard(card.id, { isEditingCaption: false })}
                            style={{
                                position: "absolute",
                                left: posX + card.x * scaleX,
                                top: posY + (card.y + card.height) * scaleY,
                                width: card.width * scaleX,
                                height: 40 * scaleY,
                                background: "white",
                                border: "none",
                                outline: "none",
                                fontSize: 12 * scaleX,
                                padding: "0 10px",
                                zIndex: 200,
                                borderRadius: "5px",
                            }}
                        />
                    );
                })}

                {openDocId && (
                    <DocumentEditor
                        doc={documents.find((d) => d.id === openDocId)!}
                        onClose={() => setOpenDocId(null)}
                        onUpdate={updateDoc}
                    />
                )}

                {openSketchId && (
                    <SketchEditor
                        sketchId={openSketchId}
                        initialData={sketches.find((s) => s.id === openSketchId)?.thumbnail ?? null}
                        onSave={handleSketchSave}
                        onCancel={() => setOpenSketchId(null)}
                    />
                )}

                {openVideoId && (() => {
                    const video = videos.find((v) => v.id === openVideoId);
                    if (!video) return null;

                    if (video.status === "ready" && video.playbackId) {
                        return (
                            <VideoPlayer
                                playbackId={video.playbackId}
                                onClose={() => setOpenVideoId(null)}
                            />
                        );
                    }

                    return (
                        <VideoUploader
                            onStartUpload={() => updateVideo(openVideoId!, { status: "uploading" })}
                            onReady={(uploadId, playbackId, thumbnailUrl) => {
                                updateVideo(openVideoId, {
                                    uploadId,
                                    playbackId,
                                    thumbnailUrl,
                                    status: "ready",
                                });
                                setOpenVideoId(null);
                            }}
                            onClose={() => {
                                const video = videos.find((v) => v.id === openVideoId);
                                if (video?.status === "idle" || video?.status === "error") {
                                    setVideos((prev) => prev.filter((v) => v.id !== openVideoId));
                                }
                                setOpenVideoId(null);
                            }}
                        />
                    );
                })()}

                {openCommentId && (() => {
                    const comment = comments.find((c) => c.id === openCommentId);
                    if (!comment) return null;
                    return (
                        <CommentPanel
                            comment={comment}
                            currentUser={{
                                name: session?.name || "Anonymous",
                                avatar: session?.image || undefined,
                            }}
                            onUpdate={updateComment}
                            onClose={() => {
                                // ถ้ายังไม่ได้พิมพ์อะไรเลยให้ลบทิ้ง
                                if (!comment.text) deleteComment(comment.id);
                                else setOpenCommentId(null);
                            }}
                            onDelete={deleteComment}
                        />
                    );
                })()}

                {openAudioId && (() => {
                    const audio = audios.find((a) => a.id === openAudioId);
                    if (!audio) return null;
                    return (
                        <AudioPanel
                            audio={audio}
                            onUpdate={updateAudio}
                            onClose={() => {
                                if (audio.status === "idle") {
                                    setAudios((prev) => prev.filter((a) => a.id !== openAudioId));
                                }
                                setOpenAudioId(null);
                            }}
                            audioPlayer={audioPlayer}
                        />
                    );
                })()}

                {openDrawId && (() => {
                    const draw = draws.find((d) => d.id === openDrawId);
                    if (!draw) return null;
                    return (
                        <DrawEditor
                            draw={draw}
                            onUpdate={updateDraw}
                            onClose={() => setOpenDrawId(null)}
                        />
                    );
                })()}

                {openImageId && (() => {
                    const image = images.find((i) => i.id === openImageId);
                    if (!image) return null;
                    if (image.status === "ready") return null; // ไม่เปิด uploader ถ้ามีรูปแล้ว

                    return (
                        <ImageUploader
                            onStartUpload={() => updateImage(openImageId, { status: "uploading" })}
                            onUploaded={handleImageUploaded}
                            onClose={() => {
                                if (image.status === "idle") {
                                    setImages((prev) => prev.filter((i) => i.id !== openImageId));
                                }
                                setOpenImageId(null);
                            }}
                        />
                    );
                })()}

                {viewImageId && (() => {
                    const image = images.find((i) => i.id === viewImageId);
                    if (!image?.url) return null;
                    return (
                        <ImageViewer
                            url={image.url}
                            onClose={() => setViewImageId(null)}
                        />
                    );
                })()}

                </div>
                <Menu
                    updateVersionData={updateVersionData}
                    versionContent={versionContent}
                    undo={handleUndo}   // ← เปลี่ยน
                    redo={handleRedo}   // ← เปลี่ยน
                    canUndo={canUndo}
                    canRedo={canRedo}
                    // onSave={() => handleSaveVersion(versions[0]?.id)} // ← ส่ง handler ไป
                />
            </div>
        </div>
    )
}

export default Design