"use client";


import SideBarDesign from '@/app/components/workspace/design/SideBarDesign';
import SideBarStoryBoard from '@/app/components/workspace/storyboard/SideBarStoryBoard';
import SideBarWorkFlow from '@/app/components/SideBarVideo'
import React, { useEffect, useState, useTransition } from 'react'
import { Storyboard } from '@/app/generated/prisma/edge';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { createNewStoryboard, getStoryboardByProjectId } from '@/action/storyboard';
import { AlertBasic } from '@/app/components/Aleart';
import StoryboardBoard from '@/app/components/workspace/storyboard/StoryboardBoard';
import { getStoryboard } from "@/action/storyboard"; // เพิ่ม export นี้ในไฟล์เดียวกับ createNewStoryboard
import type { ShotWithRelations } from "@/action/storyboard";

type Props = {}

const page = (props: Props) => {
    const [storyboard, setStoryboard] = useState<Storyboard[]>([]);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();   
    const [aleart, setAleart] = useState(false);
    const [shots, setShots] = useState<ShotWithRelations[]>([]);
    const [boardLoading, setBoardLoading] = useState(false);

   
    
    const user = useCurrentUser();

    const path = usePathname();
    const projectPath = path.split("/")[3];
    const pathType = path.split("/")[4];
    const boardPath = path.split("/")[5];


    const handleAleart = () => {
        setAleart(true);

        setTimeout(() => {
            setAleart(false);
        }, 3000);
    };

    const handleCreateNewStoryboard = (storyboardName: string) => {
        if(!storyboardName.trim()){
            setError("Storyboard name is required");
            return;
        }

            if(!user?.id || !projectPath) return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            createNewStoryboard({
                title: storyboardName,
                ownerId: user.id,
                projectId: projectPath,
            })
            .then((data) => {
                const newStoryboard = data?.newStoryboard;
    
                if (newStoryboard) {
                    setStoryboard((prev) => [newStoryboard, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create storyboard.");
            })
            .finally(() => {
                // setStoryboardName("");
                handleAleart();
            });
        });
    }

    useEffect(() => {
        getStoryboardByProjectId(projectPath)
        .then((data) => {
            if (data?.storyboards) {
                setStoryboard(data.storyboards);
            } else {
                setError(data?.error || "Failed to fetch storyboards.");
            }
        })
        .catch(() => {
            setError("Failed to fetch storyboards.");
        });
    }, [])

     useEffect(() => {
        if (!boardPath) {
            setShots([]);
            return;
        }

        setBoardLoading(true);
        getStoryboard(boardPath)
            .then((data) => setShots(data.shots))
            .catch(() => {
                setError("Failed to load storyboard.");
                handleAleart();
            })
            .finally(() => setBoardLoading(false));
    }, [boardPath]);

   
  return (
    <div className='flex flex-row bg-custom w-full h-screen relative overflow-x-hidden'>
        <SideBarStoryBoard 
            // onSelect={(title) => setStoryboardName(title)} 
            storyboards={storyboard} 
            handleCreateNewStoryboard={handleCreateNewStoryboard} 
            projectPath={projectPath}
            pathType={pathType}
            boardPath={boardPath}
        />
        <StoryboardBoard
            key={boardPath}
            storyboardId={boardPath}
            projectPath={projectPath}
            // initialShots={shots}
        />

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
    </div>
  )
}

export default page

