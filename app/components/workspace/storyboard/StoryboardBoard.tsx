"use client";

import React, { useEffect, useState, useTransition, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Plus,
  GripVertical,
  LayoutGrid,
  Rows3,
  ImagePlus,
  Film,
  X,
} from "lucide-react";
import type { ShotType, CameraMovement, Script } from "@/app/generated/prisma/edge";
import {
  getStoryboard,
  createShot,
  updateShot,
  deleteShot,
  reorderShot,
  attachFrameImage,
  type ShotWithRelations,
  uploadFrameImage,
} from "@/action/storyboard"; // adjust if getStoryboard/etc. live in a different action file
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { getScriptByProjectId } from "@/lib/api/Script";
import { getScriptFromProjectId } from "@/action/script";

const SHOT_TYPES: { value: ShotType; label: string }[] = [
  { value: "WIDE", label: "Wide" },
  { value: "MEDIUM", label: "Medium" },
  { value: "CLOSE_UP", label: "Close-up" },
  { value: "EXTREME_CLOSE_UP", label: "Extreme close-up" },
  { value: "OVER_THE_SHOULDER", label: "Over-the-shoulder" },
  { value: "POV", label: "POV" },
];

const CAMERA_MOVEMENTS: { value: CameraMovement; label: string }[] = [
  { value: "STATIC", label: "Static" },
  { value: "PAN", label: "Pan" },
  { value: "TILT", label: "Tilt" },
  { value: "DOLLY", label: "Dolly" },
  { value: "TRACKING", label: "Tracking" },
  { value: "HANDHELD", label: "Handheld" },
];

type Props = {
  // optional — if the parent page ever wires it through, use it, otherwise fall back to the URL
  storyboardId?: string;
  projectPath: string
};

const StoryboardBoard = ({ storyboardId: storyboardIdProp, projectPath }: Props) => {
  const pathname = usePathname();
  const boardPath = storyboardIdProp ?? pathname.split("/")[5];

  const [shots, setShots] = useState<ShotWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [scripts, setScripts] = useState<Script[]>([]);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const projectId = useRef<string>(projectPath);
  // ---- fetch real data whenever the storyboard in the URL changes ----
  useEffect(() => {
    if (!boardPath) {
      setShots([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    getStoryboard(boardPath)
      .then((data) => {
        if (!cancelled) setShots(data.shots);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Failed to load storyboard.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [boardPath]);

  // ---- mutations ----

  const addFrame = useCallback(() => {
    if (!boardPath) return;
    const lastId = shots[shots.length - 1]?.id ?? null;
    startTransition(async () => {
      const created = await createShot(boardPath, lastId);
      setShots((s) => [...s, created]);
    });
  }, [shots, boardPath]);

  const removeFrame = useCallback((id: string) => {
    setShots((s) => s.filter((shot) => shot.id !== id));
    startTransition(async () => {
      await deleteShot(id);
    });
  }, []);

  const patchFrame = useCallback(
    (
      id: string,
      patch: Partial<Pick<ShotWithRelations, "shotType" | "cameraMovement" | "description" | "dialogue">>
    ) => {
      setShots((s) => s.map((shot) => (shot.id === id ? { ...shot, ...patch } : shot)));
      startTransition(async () => {
        await updateShot(id, patch);
      });
    },
    []
  );

  const handleImagePick = useCallback((id: string, file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
      reader.onload = () => {
        setShots((s) =>
          s.map((shot) =>
            shot.id === id
              ? { ...shot, frame: { ...(shot.frame as any), imageAssetId: reader.result as string } }
              : shot
          )
        );
      };
      reader.readAsDataURL(file);

      // อัพโหลดจริง + persist เข้า DB
      startTransition(async () => {
        const formData = new FormData();
        formData.append("file", file);
        const frame = await uploadFrameImage(id, formData);
        setShots((s) => s.map((shot) => (shot.id === id ? { ...shot, frame } : shot)));
      });
  }, []);

  // ---- drag & drop reorder ----
  const onDragStart = (id: string) => (e: React.DragEvent) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (id: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (id !== overId) setOverId(id);
  };

  const onDrop = (targetId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const movedId = dragId;
    setDragId(null);
    setOverId(null);
    if (!movedId || movedId === targetId || !boardPath) return;

    setShots((current) => {
      const from = current.findIndex((s) => s.id === movedId);
      const to = current.findIndex((s) => s.id === targetId);
      if (from === -1 || to === -1) return current;
      const next = current.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });

    startTransition(async () => {
      await reorderShot({ storyboardId: boardPath, shotId: movedId, beforeShotId: targetId });
    });
  };

  const onDragEnd = () => {
    setDragId(null);
    setOverId(null);
  };

  useEffect(() => {
    setLoading(true);
    getScriptFromProjectId(projectId.current)
      .then((script) => setScripts(script))
      .catch(() => setLoadError("can't load the script"))
      .finally(() => setLoading(false))
    }, [])
    console.log("script: ", scripts)

  // ---- render ----
  if (!boardPath) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#9b958c] text-sm">
        Select a storyboard from the sidebar to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#1c1b1a] text-[#ece8e1] rounded-none p-5 font-sans">
      <header className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Film size={18} strokeWidth={1.75} />
          <span>Storyboard</span>
          <span className="font-mono text-xs text-[#9b958c] font-normal border border-[#3a3733] rounded-full px-2.5 py-0.5 ml-1">
            {shots.length} shot{shots.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex bg-[#242220] border border-[#3a3733] rounded-lg p-[3px] gap-0.5" role="group" aria-label="Layout">
            <button
              type="button"
              onClick={() => setLayout("list")}
              aria-pressed={layout === "list"}
              className={`flex items-center gap-1.5 text-[12.5px] font-medium px-2.5 py-1.5 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#e8a33d] focus-visible:outline-offset-2 ${
                layout === "list" ? "bg-[#2c2a27] text-[#e8a33d]" : "text-[#9b958c] hover:text-[#ece8e1]"
              }`}
            >
              <Rows3 size={15} strokeWidth={1.75} />
              List
            </button>
            <button
              type="button"
              onClick={() => setLayout("grid")}
              aria-pressed={layout === "grid"}
              className={`flex items-center gap-1.5 text-[12.5px] font-medium px-2.5 py-1.5 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#e8a33d] focus-visible:outline-offset-2 ${
                layout === "grid" ? "bg-[#2c2a27] text-[#e8a33d]" : "text-[#9b958c] hover:text-[#ece8e1]"
              }`}
            >
              <LayoutGrid size={15} strokeWidth={1.75} />
              Grid
            </button>
          </div>

          <button
            type="button"
            onClick={addFrame}
            className="flex items-center gap-1.5 bg-[#e8a33d] text-[#201a0d] text-[13px] font-semibold px-3.5 py-2 rounded-lg hover:brightness-110 transition focus-visible:outline-2 focus-visible:outline-[#e8a33d] focus-visible:outline-offset-2"
          >
            <Plus size={16} strokeWidth={2} />
            Add frame
          </button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl border border-[#322f2c] bg-[#242220] animate-pulse" />
          ))}
        </div>
      ) : loadError ? (
        <div className="text-sm text-[#c1584a] py-10 text-center">{loadError}</div>
      ) : shots.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-[#9b958c] text-center py-14 px-5 border border-dashed border-[#3a3733] rounded-xl">
          <ImagePlus size={28} strokeWidth={1.5} />
          <p className="max-w-[320px] text-[13.5px] m-0">
            No shots yet. Add the first frame to start blocking out the sequence.
          </p>
          <button
            type="button"
            onClick={addFrame}
            className="flex items-center gap-1.5 bg-[#e8a33d] text-[#201a0d] text-[13px] font-semibold px-3.5 py-2 rounded-lg hover:brightness-110 transition"
          >
            <Plus size={16} strokeWidth={2} />
            Add frame
          </button>
        </div>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 items-start"
              : "flex flex-col gap-2.5"
          }
        >
          {shots.map((shot, index) => (
            <FrameCard
              key={shot.id}
              shot={shot}
              index={index}
              layout={layout}
              isDragging={dragId === shot.id}
              isOver={overId === shot.id && dragId !== shot.id}
              onDragStart={onDragStart(shot.id)}
              onDragOver={onDragOver(shot.id)}
              onDrop={onDrop(shot.id)}
              onDragEnd={onDragEnd}
              onPatch={(patch) => patchFrame(shot.id, patch)}
              onRemove={() => removeFrame(shot.id)}
              onPickImage={(file) => handleImagePick(shot.id, file)}
              registerInput={(el) => (fileInputs.current[shot.id] = el)}
              openFilePicker={() => fileInputs.current[shot.id]?.click()}
              scripts={scripts}
            />
          ))}

          <button
            type="button"
            onClick={addFrame}
            className={`flex items-center justify-center gap-1.5 border border-dashed border-[#3a3733] rounded-xl text-[#9b958c] text-[12.5px] hover:border-[#e8a33d] hover:text-[#e8a33d] transition-colors focus-visible:outline-2 focus-visible:outline-[#e8a33d] focus-visible:outline-offset-2 ${
              layout === "grid" ? "flex-col min-h-40" : "flex-row min-h-16"
            }`}
          >
            <Plus size={20} strokeWidth={1.75} />
            <span>Add frame</span>
          </button>
        </div>
      )}
    </div>
  );
};

function FrameCard({
  shot,
  index,
  layout,
  isDragging,
  isOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onPatch,
  onRemove,
  onPickImage,
  registerInput,
  openFilePicker,
  scripts
}: {
  shot: ShotWithRelations;
  index: number;
  layout: "list" | "grid";
  isDragging: boolean;
  isOver: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onPatch: (patch: Partial<Pick<ShotWithRelations, "shotType" | "cameraMovement" | "description" | "dialogue">>) => void;
  onRemove: () => void;
  onPickImage: (file: File | undefined) => void;
  registerInput: (el: HTMLInputElement | null) => void;
  openFilePicker: () => void;
  scripts: Script[]
}) {
  const imageUrl = (shot.frame as any)?.imageAssetId ?? null; // swap for your real asset-URL builder

  const cardBase =
    "bg-[#242220] border rounded-[10px] transition-colors " +
    (isDragging ? "opacity-45 " : "") +
    (isOver ? "border-[#e8a33d] " : "border-[#322f2c] ");

  const cardLayout =
    layout === "grid"
      ? "flex flex-col p-2.5"
      : "grid grid-cols-1 sm:grid-cols-[auto_200px_1fr] gap-3 p-2.5";

  return (
    <article
      className={cardBase + cardLayout}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div
        className={`flex items-center gap-2 mb-2 cursor-grab active:cursor-grabbing ${
          layout === "list"
            ? "border-b sm:border-b-0 sm:border-r border-[#322f2c] pb-2 sm:pb-0 sm:mb-0 sm:flex-col sm:pr-3"
            : ""
        }`}
      >
        <span className="text-[#9b958c] flex">
          <GripVertical size={16} strokeWidth={1.75} />
        </span>
        <span className="font-mono text-xs text-[#e8a33d] font-semibold min-w-5">
          {String(index + 1).padStart(2, "0")}
        </span>
        {shot.scene && (
          <span
            title={shot.scene.heading}
            className="text-[10.5px] text-[#9b958c] border border-[#3a3733] rounded-full px-1.5 py-0.5 whitespace-nowrap"
          >
            Sc.{shot.scene.sceneNumber}
          </span>
        )}
        {layout === "grid" && (
          <select
            value={shot.shotType ?? "WIDE"}
            onChange={(e) => onPatch({ shotType: e.target.value as ShotType })}
            aria-label="Shot type"
            className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-xs rounded-md px-2 py-1.5 w-full"
          >
            {SHOT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove frame"
          className="ml-auto text-[#9b958c] hover:text-[#c1584a] hover:bg-[#c1584a]/10 p-1 rounded-md"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      <div
        
        role="button"
        tabIndex={0}
        
        className={`relative bg-[#171615] border border-[#322f2c] rounded-md flex items-center justify-center overflow-hidden cursor-pointer ${
          layout === "list" ? "aspect-16/10" : "aspect-video"
        }`}
      >
        {imageUrl ? (
          <Dialog>
            <DialogTrigger onClick={(e) => e.stopPropagation()}>
              <img src={imageUrl} alt={`Shot ${index + 1}`} className="w-full h-full object-cover" />
            </DialogTrigger>
            <DialogContent className="flex-col h-screen overflow-auto">
              <DialogHeader>
                <DialogDescription>
                  <img src={imageUrl} alt={`Shot ${index + 1}`} className="w-full object-contain" />
                </DialogDescription>
              </DialogHeader>
               <DialogFooter className="">
                <Button type="button"
                  onClick={openFilePicker}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFilePicker()}
                >
                  Change
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        ) : (
          <div className="flex flex-col items-center gap-1.5 text-[#9b958c] text-[11.5px]"
            onClick={openFilePicker}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFilePicker()}
          >
            <ImagePlus size={22} strokeWidth={1.5} />
            <span>Add image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={registerInput}
          className="hidden"
          onChange={(e) => onPickImage(e.target.files?.[0])}
        />
      </div>

      <div className={`flex flex-col gap-2 ${layout === "grid" ? "mt-2" : ""}`}>
        {layout === "list" && (
          <select
            value={shot.shotType ?? "WIDE"}
            onChange={(e) => onPatch({ shotType: e.target.value as ShotType })}
            aria-label="Shot type"
            className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-xs rounded-md px-2 py-1.5 w-full"
          >
            {SHOT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
            
          </select>
          
          
        )}
        <select
          value={shot.cameraMovement ?? "STATIC"}
          onChange={(e) => onPatch({ cameraMovement: e.target.value as CameraMovement })}
          aria-label="Camera movement"
          className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-xs rounded-md px-2 py-1.5 w-full"
        >
          {CAMERA_MOVEMENTS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Action / description"
          defaultValue={shot.description ?? ""}
          onBlur={(e) => onPatch({ description: e.target.value })}
          rows={2}
          className="bg-[#2c2a27] border border-[#322f2c] text-[#ece8e1] text-[12.5px] rounded-md px-2.5 py-1.5 resize-none leading-snug placeholder:text-[#9b958c] focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
        />
        <textarea
          placeholder="Dialogue / sound"
          defaultValue={shot.dialogue ?? ""}
          onBlur={(e) => onPatch({ dialogue: e.target.value })}
          rows={2}
          className="bg-[#2c2a27] border-l-2 border-l-[#e8a33d]/30 border-y border-r border-[#322f2c] text-[#ece8e1] text-[12.5px] rounded-md px-2.5 py-1.5 resize-none leading-snug placeholder:text-[#9b958c] focus-visible:outline-2 focus-visible:outline-[#e8a33d]"
        />
        
        <Dialog>
          <DialogTrigger className="flex justify-end">
            <Button className="my-2"> 
              Attatch Scene
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">
                Attach the scene
              </DialogTitle>
              <DialogDescription>
                {scripts.map((script) => {
                  return(
                    <div key={script.id} className="flex flex-col gap-2">
                      <div  className="border-2 p-2 rounded-md mb-2">
                        {script.title}
                      </div>
                    </div>
                  )
                })}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

    </article>
  );
}

export default StoryboardBoard;