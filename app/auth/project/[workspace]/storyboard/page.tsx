"use client";

import SideBarDesign from '@/app/components/workspace/design/SideBarDesign';
import SideBarStoryBoard from '@/app/components/workspace/storyboard/SideBarStoryBoard';
import SideBarWorkFlow from '@/app/components/SideBarVideo'
import React, { useState, useTransition } from 'react'
import { Storyboard } from '@/app/generated/prisma/edge';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { createNewStoryboard } from '@/action/storyboard';
import { AlertBasic } from '@/app/components/Aleart';

type Props = {}

const page = (props: Props) => {
    const [storyboard, setStoryboard] = useState<Storyboard[]>([]);
    const [storyboardName, setStoryboardName] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();   
    const [aleart, setAleart] = useState(false);
    
    const user = useCurrentUser();

    const path = usePathname();
    
    const projectPath = path.split("/")[3];

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
                setStoryboardName("");
                handleAleart();
            });
        });
    }
   
  return (
    <div className='bg-custom !pt-0 w-full h-screen relative overflow-x-hidden'>
        <SideBarStoryBoard 
            onSelect={(title) => setStoryboardName(title)} 
            storyboards={storyboard} 
            handleCreateNewStoryboard={handleCreateNewStoryboard} 
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

