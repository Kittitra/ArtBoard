'use client';

import { createNewVideo, createNewVideoCategory } from '@/action/video';
import SideBarVideo from '@/app/components/SideBarVideo';
import Animation from '@/app/components/workspace/animation/Animation';
import Footage from '@/app/components/workspace/footage/Footage';
import { getUserById } from '@/data/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getAnimationByStateId, getAnimationCategoriesByProjectId } from '@/lib/api/Animation';
import { getFootageByStateId, getFootageCategoriesByProjectId } from '@/lib/api/Footage';
import { getUserByUserId } from '@/lib/api/User';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'

interface FootageState {
    id:string
    name: string
    projectId: string | null
}

interface FootageProps {
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
    const [footageCategories, setFootageCategories] = useState<FootageState[]>([]);
    const [aleart, setAleart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [footage, setFootage] = useState<FootageProps[]>([])
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
                type: "footage"
            })
            .then((data) => {
                const newCategoryFootage = data?.footageCategory;
    
                if (newCategoryFootage) {
                    setFootageCategories((prev) => [newCategoryFootage, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create footage category.");
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
        getFootageCategoriesByProjectId(projectPath)
        .then((categories) => {
            //   console.log("Footage Categories:", categories);
            setFootageCategories(categories);
            // console.log("Footage Categories:", categories); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        })
        .catch((error) => {
            console.error("Failed to fetch footage categories:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [projectPath]);

    useEffect(() => {
        getFootageByStateId(MoviePath)
        .then((footage) => {
            setFootage(footage);
        })
        .catch((error) => {
            console.error("Failed to fetch footage:", error);
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
            console.error("Failed to fetch footage:", error);
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
                data={footageCategories}
                loading={loading}
            />
            {users && <Footage data={footage} moviePath={MoviePath} projectId={projectPath} user={users} />}
        </div>
    )
}

export default page