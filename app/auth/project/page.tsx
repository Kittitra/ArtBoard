"use client"

import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useTransition } from 'react'
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
import { AlertBasic } from '@/app/components/Aleart'
import { createProject } from '@/action/project'
import { getProjectByUserId } from '@/lib/api/Project'

type Props = {}

interface Project {
    id: string;
    name: string;
    createdAt: Date;

}

const Project = (props: Props) => {
    const [name, setName] = React.useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | undefined>("");
    const [success, setSuccess] = React.useState<string | undefined>("");
    const [aleart, setAleart] = React.useState(false);
    const [project, setProject] = React.useState<Project[]>([]);

    const [loading, setLoading] = React.useState(true);

    const user = useCurrentUser();

    const handleCreateProject = async () => {
        if (!name.trim()) {
            setError("Project name is required"); // 👈 error ตรงนี้
            handleAleart();
            return;
        }

        setError("");
        setSuccess("");
        
        
        startTransition(() => {
            createProject({
                name,
                userId: user?.id || "",
            })
            .then((data) => {
                const newProject = data?.project;
                
                if (newProject) {
                    setProject((prev) => [...prev, newProject]); // ✅ เพิ่มทันที
                }
                setError(data?.error);
                setSuccess(data?.success);
                handleAleart();
            }).catch((error) => {
                setError("Failed to create project. Please try again.");
                handleAleart();
            }).finally(() => {
                setName("");
            })
        });

        getProjectByUserId(user?.id || "").then((data) => {
            setProject(data);
        })
    }

    const handleAleart = () => {
        setAleart(true);

        setTimeout(() => {
            setAleart(false);
        }, 3000);
    };

    useEffect(() => {
        if (!user?.id) return; // 👈 รอ user มาก่อน

        getProjectByUserId(user.id).then((data) => {
            setProject(data);
            // console.log("project: ", data); // 👈 log ตรงนี้
        }).finally(() => {
            setLoading(false);
        });
    }, [user?.id]); // 👈 สำคัญมาก

  return (
    <div className='flex flex-col bg-custom w-full h-screen px-15 !pt-[5rem] relative overflow-x-hidden '>
        <Navbar />
        <div className='w-full flex flex-row justify-between '>
            <span className='text-white text-3xl'>All Project</span>
            <div className=' flex flex-row gap-3'>
                <Input className='w-85 text-white placeholder:text-white' placeholder='Search project...' />
            </div>
        </div>

        <div className='w-full flex flex-row gap-5 mt-10 flex-wrap '> 

            <Dialog>
                <DialogTrigger>
                    <div className={`hover-highlight w-64 h-42 border-2 border-white border-dashed rounded-lg flex flex-col justify-center items-center ${loading ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}`}>
                        <span className='text-white text-2xl'>+</span>
                        <span className='text-white'>New Project</span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Project Title</DialogTitle>
                    <DialogDescription>
                        Enter the title of your project.
                    </DialogDescription>
                    <Input 
                        placeholder="Project Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                    />

                    {error && (
                        <span className="text-red-500 text-sm mt-1 block">
                            {error}
                        </span>
                    )}
                    <Button className='mt-4' onClick={() => handleCreateProject()} disabled={isPending}>
                        Create
                    </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {loading ? 

                <div className="w-full max-w-sm rounded-md border border-white p-4">
                    <div className="flex animate-pulse space-x-4">
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
                     {project.map((items, index) => (
                        <div key={items.id} className='w-64 h-42 bg-white rounded-lg flex flex-col justify-start items-start p-5 relative'>
                            <Link href={`/auth/project/${items.id.toLowerCase()}/script`}>
                                <span className='text-black hover:cursor-pointer'>{items.name}</span>
                            </Link>
                            <span className='text-gray-500 text-sm mt-22'>Create date: {new Date(items.createdAt).toLocaleDateString()}</span>
                            <Link href={`/auth/${items.id.toLowerCase()}/settings`}>
                                <span className='absolute bottom-2 right-2 hover:cursor-pointer'>⚙️</span>
                            </Link>
                        </div>
                    ))}
                </>
            }
        </div>
           

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
        <div className='flex flex-row gap-10 p-10'></div>
    </div>
  )
}

export default Project