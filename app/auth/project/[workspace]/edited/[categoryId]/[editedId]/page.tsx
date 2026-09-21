'use client';

import { createNewVideo, createNewVideoCategory } from '@/action/video';
import SideBarVideo from '@/app/components/SideBarVideo';
import Animation from '@/app/components/workspace/animation/Animation';
import AnimationViewer from '@/app/components/workspace/animation/AnimationViewer';
import EditedViewer from '@/app/components/workspace/edited/EditedViewer';
import FootageViewer from '@/app/components/workspace/footage/FootageViewer';
import { AnimationVersion, EditedVersion, FootageVersion } from '@/app/generated/prisma';
import { getUserById } from '@/data/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getAnimationById, getAnimationByStateId, getAnimationCategoriesByProjectId, getAnimationVersionsByAnimationId } from '@/lib/api/Animation';
import { getEditedById, getEditedCategoriesByProjectId, getEditedVersionsByEditedId } from '@/lib/api/Edited';
import { getFootageById, getFootageCategoriesByProjectId, getFootageVersionsByFootageId } from '@/lib/api/Footage';
import { getUserByUserId } from '@/lib/api/User';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'

interface EditedState {
    id:string
    name: string
    projectId: string | null
}

interface EditedProps {
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
    const [edited, setEdited] = useState<EditedProps>()
    const [editedVersions, setEditedVersions] = useState<EditedVersion[]>([]);
    const [editedCategories, setEditedCategories] = useState<EditedState[]>([]);
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
                type: "edited"
            })
            .then((data) => {
                const newCategoryEdited = data?.editedCategory;
    
                if (newCategoryEdited) {
                    setEditedCategories((prev) => [newCategoryEdited, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create edited category.");
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
        getEditedCategoriesByProjectId(projectPath)
        .then((categories) => {
            //   console.log("Footage Categories:", categories);
            setEditedCategories(categories);
            // console.log("Footage Categories:", categories); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        })
        .catch((error) => {
            console.error("Failed to fetch footage categories:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [projectPath]);

    useEffect(() => {
        getEditedVersionsByEditedId(VersionPath)
        .then((edited) => {
            setEditedVersions(edited);
            // console.log("version: ", editedVersions)
        })
        .catch((error) => {
            console.error("Failed to fetch edited versions:", error);
        }).finally(() => {
            setLoading(false);
        })

        // console.log("Footage Versions:", ed); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
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
        getEditedById(VersionPath)
        .then((edited) => {
            setEdited(edited);
        })
        .catch((error) => {
            console.error("Failed to fetch edited:", error);
        }).finally(() => {
            setLoading(false);
        })

        // console.log("Footage:", footage); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
    }, [VersionPath]);


    return (
        <div className='flex flex-row w-full min-h-screen bg-custom !p-0'>
            <SideBarVideo
                setNewCategoryName={setNewCategoryName}
                handleCreateNewVideoCategory={handleCreateNewVideoCategory}
                onSelect={(title) => setSelected(title)}
                data={editedCategories}
                loading={loading}
            />
                {users && edited &&  (
                    <EditedViewer
                        versions={editedVersions}
                        comments={[]}
                        moviePath={VersionPath}
                        user={users}
                        editedTitle={edited.title}
                        loading={loading}
                    />
                )}
        </div>
    )
}

export default page