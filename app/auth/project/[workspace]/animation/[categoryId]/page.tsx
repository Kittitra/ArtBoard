'use client';

import { createNewVideo, createNewVideoCategory } from '@/action/video';
import SideBarVideo from '@/app/components/SideBarVideo';
import Animation from '@/app/components/workspace/animation/Animation';
import { getUserById } from '@/data/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getAnimationByStateId, getAnimationCategoriesByProjectId } from '@/lib/api/Animation';
import { getUserByUserId } from '@/lib/api/User';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'

interface AnimationState {
    id:string
    name: string
    projectId: string | null
}

interface AnimationProps {
    id: string
    title: string
    content: any
    description: string
    ownerId: string
    stateId: string
    createAt: string
    status: string
}

// interface Users {
//     id:            string         
//     name:          string
//     email:         string        
//     password:      string
//     emailVerified: string
//     image:         string
// }

const page = () => {

    const [selected, setSelected] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [animationCategories, setAnimationCategories] = useState<AnimationState[]>([]);
    const [aleart, setAleart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [animation, setAnimation] = useState<AnimationProps[]>([])
    const [users, setUsers] = useState<any>(null)
    const [showUploader, setShowUploader] = useState<boolean>(true)
    
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();

    const path = usePathname();
    
    const projectPath = path.split("/")[3];
    const MoviePath = path.split("/")[5];
    
    const handleCreateNewVideoCategory = () => {

        if(!newCategoryName.trim()){
            setError("Category name is required");
            return;
            }

            if(!user?.id) return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            createNewVideoCategory({
                name: newCategoryName,
                userId: user.id,
                projectId: projectPath,
                type: "animation"
            })
            .then((data) => {
                const newCategoryAnimation = data?.animationCategory;
    
                if (newCategoryAnimation) {
                    setAnimationCategories((prev) => [newCategoryAnimation, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create animation category.");
            })
            .finally(() => {
                setNewCategoryName("");
                handleAleart();
            });
        });
    }

    const handleAleart = () => {
        setAleart(true);

        setTimeout(() => {
            setAleart(false);
        }, 3000);
    };

    useEffect(() => {
        getAnimationCategoriesByProjectId(projectPath)
        .then((categories) => {
            //   console.log("Animation Categories:", categories);
            setAnimationCategories(categories);
            // console.log("Animation Categories:", categories); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        })
        .catch((error) => {
            console.error("Failed to fetch animation categories:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [projectPath]);

    useEffect(() => {
        getAnimationByStateId(MoviePath)
        .then((animation) => {
            setAnimation(animation);
        })
        .catch((error) => {
            console.error("Failed to fetch animation:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [MoviePath]);

     useEffect(() => {
        if(!user?.id){
            return;
        }
        getUserByUserId(user?.id)
        .then((users) => {
            setUsers(users);
        })
        .catch((error) => {
            console.error("Failed to fetch animation:", error);
        }).finally(() => {
            setLoading(false);
        })

        console.log(users)
    }, [user]);


    return (
        <div className='flex flex-row w-full min-h-screen bg-custom !p-0'>
            <SideBarVideo
                setNewCategoryName={setNewCategoryName}
                handleCreateNewVideoCategory={handleCreateNewVideoCategory}
                onSelect={(title) => setSelected(title)}
                data={animationCategories}
                loading={loading}
            />
            {users && <Animation data={animation} moviePath={MoviePath} projectId={projectPath} user={users} />}
        </div>
    )
}

export default page