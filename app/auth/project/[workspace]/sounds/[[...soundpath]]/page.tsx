'use client';

import { createNewSoundFolder, createSound, createSoundVersion, deleteSound, deleteSoundFolder, getFolderByFolderId, getSoundByParent, getSoundFoldersByParent, getSoundVersionsBySoundId, moveSound, moveSoundFolder, renameSound, renameSoundFolder } from "@/action/sound";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFolder } from "react-icons/fa";
import Link from "next/link";
import { Sound, SoundFolder, SoundVersion } from "@/app/generated/prisma";
import { GrDocumentSound } from "react-icons/gr";
import SoundUploader from "@/app/components/workspace/sound/SoundUploader";
import MuxAudio from '@mux/mux-audio-react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface FolderPathItem {
  id: string | null; // null = root
  name: string;
}

// interface Sounds {
//   id: string
//   title: string
//   description: string
//   ownerId: string
//   folderId?: string
//   projectId: string
//   createAt: string
//   status: string
//   versionId: string
//   muxAssetId: string
//   muxPlaybackId: string
//   mimeType: string
// }



const Page = () => {
  const [soundFolders, setSoundFolders] = useState<SoundFolder[]>([]);
  const [soundFoldersModal, setSoundFoldersModal] = useState<SoundFolder[]>([]);
  const [soundFolder, setSoundFolder] = useState<SoundFolder | null | undefined>(null);
  const [soundFolderId, setSoundFolderId] = useState("");
  const [soundFolderName, setSoundFolderName] = useState("");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [soundId, setSoundId] = useState("");
  const [soundVersion, setSoundVersion] = useState<SoundVersion[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [newSoundName, setNewSoundName] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [aleart, setAleart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState<"folder" | "sound" | "idle" | "soundVersion" | "renameFolder" | "renameSound" | "moveFolder" | "moveSound" | "deleteSoundFolder" | "deleteSound" | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [pathStack, setPathStack] = useState<FolderPathItem[]>([
    { id: null, name: "Root" }
  ]);
  const [currentPathStack, setCurrentPathStack] = useState<string | undefined>(undefined);


  const user = useCurrentUser();

  // ✅ ดึงจาก params ตรงๆ แทนการ parse pathname
  const params = useParams<{ workspace: string; soundpath?: string[] }>();
  const projectPath = params.workspace;
  const folderPath = params.soundpath ?? [];

  // id ของ folder ปัจจุบันคือตัวสุดท้ายใน array, ถ้าไม่มี = root
  const currentFolderId = folderPath[folderPath.length - 1];

  const handleAleart = () => {
    setAleart(true);
    setTimeout(() => setAleart(false), 3000);
  };

  const handleCreateNewSoundFolder = () => {
    if (!newFolderName.trim()) {
      setError("Folder name is required");
      return;
    }
    if (!user?.id) return;

    setError("");
    setSuccess("");

    startTransition(() => {
      createNewSoundFolder({
        name: newFolderName,
        projectId: projectPath,
        parentFolderId: currentFolderId, // ✅ ใช้ folder ปัจจุบัน แทนการ fix เป็น undefined เสมอ
        ownerId: user.id
      })
        .then((data) => {
          const newSoundFolder = data?.soundFolder;
          if (newSoundFolder) {
            setSoundFolders((prev) => [newSoundFolder, ...prev]);
          }
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => {
          setError("Failed to create sound folder.");
        })
        .finally(() => {
          setNewFolderName("");
          handleAleart();
        });
    });
  }

  const handleRenameSoundFolder = (folderId: string, newName: string) => {
    if (!newName.trim()) {
      setError("Folder name is required");
      return;
    }

    renameSoundFolder(folderId, newName)
      .then((data) => {
        const updatedFolder = data?.soundFolder;
        if (updatedFolder) {
          setSoundFolders((prev) => prev.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder)));
        }
        setError(data?.error);
        setSuccess(data?.success);
        handleClose();
      })
      .catch(() => {
        setError("Failed to rename sound folder.");
      })
      .finally(() => {
        setNewFolderName("");
        handleAleart();
      });
  }

    const handleMoveSoundFolder = (folderId: string, parentFolder?: string) => {
      if (!folderId) {
        setError("Folder ID is required");
        return;
      }

      moveSoundFolder(folderId, parentFolder)
        .then((data) => {
          const updatedFolder = data?.soundFolder;
          if (updatedFolder) {
            setSoundFolders((prev) => prev.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder)));
          }
          setSoundFolders((prev) => prev.filter((f) => f.id !== folderId));
          setSoundFoldersModal((prev) => prev.filter((f) => f.id !== folderId));
          setError(data?.error);
          setSuccess(data?.success);
          handleClose();
        })
        .catch(() => {
          setError("Failed to move sound folder.");
        })
        .finally(() => {
          setNewFolderName("");
          handleAleart();
        });
    }

    const handleDeleteSoundFolder = (folderId: string) => {
      if (!folderId) {
        setError("Folder ID is required");
        return;
      }
      deleteSoundFolder(folderId)
        .then((data) => {
          setSoundFolders((prev) => prev.filter((f) => f.id !== folderId));
          setSoundFoldersModal((prev) => prev.filter((f) => f.id !== folderId));
          setError(data?.error);
          setSuccess(data?.success);
          handleClose();
        })
        .catch(() => {
          setError("Failed to delete sound folder.");
        })
        .finally(() => {
          setNewFolderName("");
          handleAleart();
        });
    }

    const handleMoveSound = (soundId: string, parentFolderId?: string) => {
      if (!soundId) {
        setError("Sound ID is required");
        return;
      }

      moveSound(soundId, parentFolderId)
        .then((data) => {
          const updatedSound = data?.sound;
          if (updatedSound) {
            setSounds((prev) => prev.map((sound) => (sound.id === updatedSound.id ? updatedSound : sound)));
          }
          setSounds((prev) => prev.filter((s) => s.id !== soundId));
          setError(data?.error);
          setSuccess(data?.success);
          handleClose();
        })
        .catch(() => {
          setError("Failed to move sound.");
        })
        .finally(() => {
          setNewFolderName("");
          handleAleart();
        });
    }

  const handleCreateNewSound = () => {
    if (!newSoundName.trim() || newSoundName == null) {
      setError("Sound name is required");
      return;
    }
    if (!user?.id) return;

    setError("");
    setSuccess("");
    startTransition(() => {
      createSound({
        title: newSoundName,           // ✅ ตรงกับ Sound.title
        projectId: projectPath,
        folderId: currentFolderId,     // ✅ ตรงกับ Sound.folderId
        ownerId: user.id
      })
        .then((data) => {
          const newSound = data?.sound;
          if (newSound) {
            setSounds((prev) => [newSound, ...prev]);
          }
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => {
          setError("Failed to create sound.");
        })
        .finally(() => {
          setNewSoundName("");
          handleAleart();
        });
    });
  }

    const handleRenameSound = (soundId: string, newName: string) => {
      if (!newName.trim()) {
        setError("Sound name is required");
        return;
      }

      renameSound(soundId, newName)
        .then((data) => {
          const updatedSound = data?.sound;
          if (updatedSound) {
            setSounds((prev) => prev.map((sound) => (sound.id === updatedSound.id ? updatedSound : sound)));
          }
          setError(data?.error);
          setSuccess(data?.success);
          handleClose();
        })
        .catch(() => {
          setError("Failed to rename sound.");
        })
        .finally(() => {
          setNewSoundName("");
          handleAleart();
        });
    }

      const handleDeleteSound = (soundId: string) => {
        if (!soundId) {
          setError("Sound ID is required");
          return;
        }
        deleteSound(soundId)
          .then((data) => {
            setSounds((prev) => prev.filter((s) => s.id !== soundId));
            setError(data?.error);
            setSuccess(data?.success);
            handleClose();
          })
          .catch(() => {
            setError("Failed to delete sound.");
          })
          .finally(() => {
            setNewFolderName("");
            handleAleart();
          });
      }

  const handleOpenDialog = (type: "folder" | "sound" | "idle" | "soundVersion" | "renameFolder" | "renameSound" | "moveFolder" | "moveSound" | "deleteSoundFolder" | "deleteSound") => {
    setOpenDialog(type);
  }

  const handleClose = () => {
    setOpenDialog(null);
  }

  const handleOpenUploader = () => {
    setOpenDialog(null);      // ✅ ปิด Dialog ก่อน ไม่ให้ Radix ล็อค pointer-events
    setShowUploader(true);
  };

  const handleCloseUploader = () => {
    setShowUploader(false);
    setOpenDialog("soundVersion"); // ✅ เปิด Dialog กลับมา
  };

  const handleSoundVersionReady = (uploadId: string, playbackId: string) => {
    if (!newSoundName.trim()) {
      setError("Version name is required");
      return;
    }


    startTransition(() => {
      createSoundVersion({
        title: newSoundName || "Untitled version",
        soundId: soundId,
        muxUploadId: uploadId,
        muxPlaybackId: playbackId,
      })
        .then((data) => {
          const newVersion = data?.sound;
          if (newVersion) {
            setSoundVersion((prev) => [newVersion, ...prev]);
          }
          setError(data?.error);
          setSuccess(data?.success);
        })
        .finally(() => {
          setShowUploader(false);
          setOpenDialog("soundVersion"); // ✅ กลับไป dialog เดิมหลังอัพโหลดเสร็จ
          setNewSoundName("");
        });
    });
  };

  useEffect(() => {
    setLoading(true);
    getSoundFoldersByParent(projectPath, currentFolderId) // ✅ ดึงตาม parent ปัจจุบัน
      .then((folders) => {
        setSoundFolders(folders.soundFolders ?? []);
        setLoading(false);
        // console.log("Sound Folders:", folders); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
      })
      .catch((error) => {
        console.error("Error fetching sound folders:", error);
        setLoading(false);
      });

      getSoundFoldersByParent(projectPath, currentPathStack) // ✅ ดึงตาม parent ปัจจุบัน
      .then((folders) => {
        setSoundFoldersModal(folders.soundFolders ?? []);
        setLoading(false);
        // console.log("Sound Folders:", folders); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
      })
      .catch((error) => {
        console.error("Error fetching sound folders:", error);
        setLoading(false);
      });
  }, [projectPath, currentPathStack, newFolderName]); // ✅ refetch ทุกครั้งที่เปลี่ยน folder

  useEffect(() => {
    setLoading(true);
    getFolderByFolderId(currentFolderId)
      .then((folder) => {
        setSoundFolder(folder.soundFolder)
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [currentFolderId])

  useEffect(() => {
    setLoading(true);
    getSoundByParent(projectPath, currentFolderId) // ✅ ดึงตาม parent ปัจจุบัน
      .then((sounds) => {
        setSounds(sounds.sounds ?? []);
        setLoading(false);
        // console.log("Sound Folders:", folders); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
      })
      .catch((error) => {
        console.error("Error fetching sound:", error);
        setLoading(false);
      });
  }, [projectPath, currentFolderId]); // ✅ refetch ทุกครั้งที่เปลี่ยน folder

  useEffect(() => {
      getSoundVersionsBySoundId(soundId)
        .then((soundVersion) => {
          setSoundVersion(soundVersion)
          setLoading(false)
        })
        .catch((error) => {
           console.error("Error fetching sound version:", error);
            setLoading(false);
        })
  }, [soundId]);


  return (
    <div className='bg-custom w-full h-screen relative overflow-x-hidden'>

      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 px-10 py-5 text-white">
        <Link href={`/auth/project/${projectPath}/sounds`}>Root</Link>
        {folderPath.map((id, index) => {
          const pathUpToHere = folderPath.slice(0, index + 1).join('/');
          return (
            <span key={id} className="flex items-center gap-2">
              <span>/</span>
              <Link href={`/auth/project/${projectPath}/sounds/${pathUpToHere}`}>
                {soundFolder?.name}
              </Link>
            </span>
          );
        })}
      </div>

      <div className="flex flex-row justify-start items-center gap-15 w-full h-fit p-5 px-10">
        <span
          className="w-50 h-30 border border-black rounded-md p-2 px-5 bg-white cursor-pointer flex justify-center items-center-safe mr-10 gap-2 text-xl font-semibold"
          onClick={() => handleOpenDialog("idle")}
        >
          <span>+</span>
          <h1>Create New</h1>
        </span>

        {soundFolders.length > 0 && (
          <div className="flex flex-row gap-15">
            {soundFolders.map((folder) => (
                <div key={folder.id} className="flex flex-col items-center">
                  <Link href={`/auth/project/${projectPath}/sounds/${[...folderPath, folder.id].join('/')}`}
                  className="flex flex-col justify-center items-center">
                    <ContextMenu >
                      <ContextMenuTrigger >
                        <FaFolder size={75} className=" text-blue-500" />
                      </ContextMenuTrigger>
                      <ContextMenuContent onClick={(e) => e.stopPropagation()}>
                        <ContextMenuItem onClick={() => {
                          handleOpenDialog("renameFolder")
                          setSoundFolderId(folder.id)
                        }}>Rename</ContextMenuItem>
                        <ContextMenuItem
                          onClick={() => {
                            handleOpenDialog("moveFolder")
                            setSoundFolderId(folder.id)
                            setSoundFolderName(folder.name)
                          }}
                        >
                          Move to
                        </ContextMenuItem>
                        <ContextMenuItem onClick={()=>{
                          handleOpenDialog("deleteSoundFolder")
                          setSoundFolderId(folder.id)
                        }}>Delete</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                    <span className="text-white">{folder.name}</span>
                  </Link>
                </div>
            ))}
          </div>
        )}

        {sounds.length > 0 && (
          <div className="flex flex-row gap-15">
            {sounds.map((sound) => (
                <div key={sound.id} className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  handleOpenDialog("soundVersion")
                  setSoundId(sound.id)
                }}
                
                >
                    <ContextMenu>
                    <ContextMenuTrigger>
                      <GrDocumentSound size={75} className=" text-blue-500" />
                    </ContextMenuTrigger>
                      <ContextMenuContent onClick={(e) => e.stopPropagation()}>
                        <ContextMenuItem onClick={() => {
                            handleOpenDialog("renameSound")
                            setSoundId(sound.id)
                        }}>Rename</ContextMenuItem>
                        <ContextMenuItem
                          onClick={() => {
                            handleOpenDialog("moveSound")
                            setSoundId(sound.id)
                            setSoundFolderName(sound.title)
                            setSoundFolderId("")
                          }}
                        >
                          Move to
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => {
                          handleOpenDialog("deleteSound")
                          setSoundId(sound.id)
                        }}>Delete</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                    <span className="text-white">{sound.title}</span>
                </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialogs เดิมไม่ต้องแก้ */}
      <Dialog open={openDialog === "idle"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a folder to create a new sound folder</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-row justify-start gap-5 pt-5">
            <Button onClick={() => handleOpenDialog("folder")}>Folder</Button>
            <Button onClick={() => handleOpenDialog("sound")}>Sound</Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "folder"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Sound Folder</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-3 justify-between pt-5">
            <Input
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-green-500">{success}</span>}
            <Button onClick={handleCreateNewSoundFolder}>Create Folder</Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "sound"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Sound</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-3 justify-between pt-5">
            <Input
              placeholder="Enter sound name"
              value={newSoundName}
              onChange={(e) => setNewSoundName(e.target.value)}
            />
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-green-500">{success}</span>}
            <Button onClick={handleCreateNewSound}>Create Sound</Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "soundVersion"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sound Versions</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-4 pt-5">

            <Input
              placeholder="Version name"
              value={newSoundName}
              onChange={(e) => setNewSoundName(e.target.value)}
            />
            <Button onClick={() => {
              if(!newSoundName.trim()){
                alert("please fill sound version Name")
              }else{
                handleOpenUploader()
              }
            }}>Add new</Button> 

            <div className="flex flex-col gap-3">
              {soundVersion.map((version) => (
                <div key={version.id} className="flex flex-col justify-start items-start gap-3 border rounded p-3">
                  <span>Title: {version.title} </span>
                  <MuxAudio
                    playbackId={version.muxPlaybackId}
                    metadata={{
                      video_id: version.id,
                      video_title: version.title,
                    }}
                    controls
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "renameFolder" || openDialog === "renameSound"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {openDialog === "renameFolder" ? "Sound Folder" : "Sound"}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-4 pt-5">
            <Input
              placeholder={openDialog === "renameFolder" ? "Folder name" : "Sound name"}
              value={newSoundName}
              onChange={(e) => setNewSoundName(e.target.value)}
            />
            {openDialog === "renameFolder" && ( 
              <Button disabled={isPending} onClick={() => handleRenameSoundFolder(soundFolderId, newSoundName)}>Rename Folder</Button> 
            )}
            {openDialog === "renameSound" && ( 
              <Button disabled={isPending} onClick={() => handleRenameSound(soundId, newSoundName)}>Rename Sound</Button> 
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "moveFolder" || openDialog === "moveSound"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move {soundFolderName} {openDialog === "moveFolder" ? "Folder" : "Sound"}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-4 pt-5">
            <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center gap-2 cursor-pointer flex-wrap">
                  {pathStack.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-3" >
                        <span>
                          {">"}
                        </span>
                        <span 
                          onClick={() => {
                            pathStack.splice(index + 1);
                            setPathStack([...pathStack]);
                            setCurrentPathStack(item.id || undefined);
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

              {soundFoldersModal.map((folder, index) => {
                if(folder.id === soundFolderId) return null; // ไม่ให้เลือกตัวเอง
                 return (
                  <div key={folder.id} className="flex flex-row justify-between items-center gap-3 border rounded p-3 cursor-pointer">
                      <span onClick={() => {
                          const newPath = [{
                            id: folder.id,
                            name: folder.name,
                          }]
                          setPathStack(prev => [...prev, ...newPath]);
                          setCurrentPathStack(folder.id || undefined);
                      }}>
                        {folder.name}
                      </span>
                  </div>
                );
              })}

              {openDialog === "moveFolder" && ( 
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isPending} 
                  onClick={() => handleMoveSoundFolder(soundFolderId, currentPathStack)}
                >
                  Move Folder
                </Button>
              )}
              {openDialog === "moveSound" && ( 
                <Button disabled={isPending} onClick={() => handleMoveSound(soundId, currentPathStack)}>Move Sound</Button>

              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "deleteSoundFolder" || openDialog === "deleteSound"} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {openDialog === "deleteSoundFolder" ? "Sound Folder" : "Sound"}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="w-full flex flex-col gap-4 pt-5">
            {openDialog === "deleteSoundFolder" && ( 
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isPending} onClick={() => handleDeleteSoundFolder(soundFolderId)}>Delete Folder</Button> 
            )}
            {openDialog === "deleteSound" && ( 
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isPending} onClick={() => handleDeleteSound(soundId)}>Delete Sound</Button> 
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {showUploader && (
        <SoundUploader
          onReady={handleSoundVersionReady}
          onClose={handleCloseUploader}
        />
      )}

    </div>
  )
}

export default Page