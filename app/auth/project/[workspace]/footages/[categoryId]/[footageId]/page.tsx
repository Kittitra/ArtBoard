'use client';

import { createNewVideo, createNewVideoCategory } from '@/action/video';
import SideBarVideo from '@/app/components/SideBarVideo';
import Animation from '@/app/components/workspace/animation/Animation';
import AnimationViewer from '@/app/components/workspace/animation/AnimationViewer';
import FootageViewer from '@/app/components/workspace/footage/FootageViewer';
import { AnimationVersion, FootageVersion } from '@/app/generated/prisma';
import { getUserById } from '@/data/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getAnimationById, getAnimationByStateId, getAnimationCategoriesByProjectId, getAnimationVersionsByAnimationId } from '@/lib/api/Animation';
import { getFootageById, getFootageCategoriesByProjectId, getFootageVersionsByFootageId } from '@/lib/api/Footage';
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
    const [footage, setFootage] = useState<FootageProps>()
    const [footageVersions, setFootageVersions] = useState<FootageVersion[]>([]);
    const [footageCategories, setFootageCategories] = useState<FootageState[]>([]);
    const [aleart, setAleart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<any>(null)
    const [showUploader, setShowUploader] = useState<boolean>(true)
    
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();

    const path = usePathname();
    
    const projectPath = path.split("/")[3];
    const MoviePath = path.split("/")[5];
    const VersionPath = path.split("/")[6];


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
                    setFootageCategories((prev) => [newCategoryAnimation, ...prev]); // 🔥 เพิ่มบนสุด
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
        getFootageVersionsByFootageId(VersionPath)
        .then((footage) => {
            setFootageVersions(footage);
        })
        .catch((error) => {
            console.error("Failed to fetch footage versions:", error);
        }).finally(() => {
            setLoading(false);
        })

        console.log("Footage Versions:", footageVersions); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
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

        // console.log(users)
    }, [user]);
    

    useEffect(() => {
        getFootageById(VersionPath)
        .then((footage) => {
            setFootage(footage);
        })
        .catch((error) => {
            console.error("Failed to fetch footage:", error);
        }).finally(() => {
            setLoading(false);
        })

        console.log("Footage:", footage); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
    }, [VersionPath]);


    return (
        <div className='flex flex-row w-full min-h-screen bg-custom !p-0'>
            <SideBarVideo
                setNewCategoryName={setNewCategoryName}
                handleCreateNewVideoCategory={handleCreateNewVideoCategory}
                onSelect={(title) => setSelected(title)}
                data={footageCategories}
                loading={loading}
            />
                {users && footage &&  (
                    <FootageViewer
                        versions={footageVersions}
                        comments={[]}
                        moviePath={VersionPath}
                        user={users}
                        animationTitle={footage.title}
                        loading={loading}
                    />
                )}
        </div>
    )
}

export default page