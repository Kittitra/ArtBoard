"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
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
import { useCurrentUser } from '@/hooks/use-current-user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createDraft, deleteScript } from '@/action/script'
import { AlertBasic } from '@/app/components/Aleart'
import { getScriptByUserId } from '@/lib/api/Script'
import { getProjectById } from '@/lib/api/Project'

interface ScriptProps {
  id: string;
  title: string;
  createdAt: Date;
}

const Script = () => {
  const [script, setScript] = React.useState<ScriptProps[]>([]);
  const [title, setTitle] = React.useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [aleart, setAleart] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const user = useCurrentUser();

  const path = usePathname();

  const moviePath = path.split("/")[3];

 const handleCreateScript = async () => {
    if (!title.trim()) {
      setError("Script title is required");
      handleAleart();
      return;
    }

    if (!user?.id) return;

    setError("");
    setSuccess("");

    startTransition(() => {
      createDraft({
        title,
        userId: user.id,
        projectId: moviePath,

      })
        .then((data) => {
          const newScript = data?.script;

          if (newScript) {
            setScript((prev) => [newScript, ...prev]); // 🔥 เพิ่มบนสุด
          }

          setError(data?.error);
          setSuccess(data?.success);
          handleAleart();
        })
        .catch(() => {
          setError("Failed to create script.");
          handleAleart();
        })
        .finally(() => {
          setTitle("");
        });
    });
  };

  const handleDelete = (scriptId: string) => {
    try{
      deleteScript(scriptId);
      setSuccess("Deleted successfully");
      setScript((prev) => prev.filter((s) => s.id !== scriptId)); // ✅ อัปเดต UI ทันที
      handleAleart();
    }catch(error){
      setError("Failed to delete script.");
      handleAleart();
    }
  }

  const handleAleart = () => {
    setAleart(true);

    setTimeout(() => {
      setAleart(false);
    }, 3000);
  };

  
  useEffect(() => {
      if (!user?.id) return; // 👈 รอ user มาก่อน

      getProjectById(moviePath).then((data) => {
          setScript(data.scripts);
          // console.log("project: ", data.scripts); // 👈 log ตรงนี้
      }).finally(() => {
          setLoading(false);
      });
  }, [user?.id]); // 👈 สำคัญมาก

  return (
    <div className='bg-custom w-full h-screen relative overflow-x-hidden'>
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
        <div className='flex flex-row gap-10 p-10'>
          <Dialog>
            <DialogTrigger>
              <div className='flex flex-col w-60 h-32 justify-center items-center border-2 border-white border-dashed hover:cursor-pointer'>
                <span className='text-white text-lg'>+</span>
                <span className='text-white text-lg'>New Draft</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Title name</DialogTitle>
                <DialogDescription>
                  Enter the title of your script. This is required and must be unique.
                </DialogDescription>
                <Input 
                  placeholder="Script Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isPending}
                />
                {error && (
                    <span className="text-red-500 text-sm mt-1 block">
                        {error}
                    </span>
                )}
                <Button className='mt-4' onClick={() => handleCreateScript()} disabled={isPending}>
                  Create
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {loading ? 
            <div className="w-full max-w-sm rounded-md border border-white p-4">
                <div className="flex flex-col animate-pulse space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 rounded bg-gray-200"></div>
                      <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                          </div>
                          <div className="h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                </div>
            </div>
          :
            <>
              {script.map((item, index) => (
                <div key={index} className='relative flex flex-col w-60 h-32 bg-white'>
                  {/* Link ครอบแค่ส่วน content ไม่ครอบ dropdown */}
                  <Link href={`/auth/project/${moviePath}/script/${item.id}`} className="flex flex-col h-full">
                    <div className='flex flex-col p-5 h-full justify-between items-start'>
                      <span className='text-black font-bold'>{item.title}</span>
                      <span className='text-gray-500 text-sm mt-10'>
                        Create date: {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>

                  {/* Dropdown อยู่นอก Link และใช้ absolute positioning */}
                  <div
                    className="absolute right-3 bottom-5 z-50"
                    onClick={(e) => e.stopPropagation()} // ✅ กัน event bubbling ขึ้นไป
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                        <PiDotsThreeOutlineVerticalFill
                          className='hover:cursor-pointer text-black'
                          size={20}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </>
          }

        </div>
    </div>
  )
}

export default Script