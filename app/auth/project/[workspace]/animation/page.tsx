'use client';

import { createNewVideoCategory } from '@/action/video';
import SideBarVideo from '@/app/components/SideBarVideo';
import Animation from '@/app/components/workspace/animation/Animation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getAnimationCategoriesByProjectId } from '@/lib/api/Animation';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react'

interface AnimationState {
    id:string
    name: string
    projectId: string | null
}

const page = () => {
    const arr = [
        {
            title: "in-between",
        },
        {
            title : "blocking",
        },
        {
            title: "coloring",
        },
    ]
    const [selected, setSelected] = useState(arr[0].title);

    const data = [
        {
            title: "in-between",
            data: [
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
            ]
         },
        {
            title: "blocking",
            data: [
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
            ]
        },
        {
            title: "coloring",
            data: [
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
                {
                    image: "/images/Elsa-nightGrow.jpeg",
                    aprrove: null,
                    date: "2025/11/12",
                    sendBy: "James",
                    name: "Task Name",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    status: "in-progress",
                },
            ]
        }
    ];

    const [newCategoryName, setNewCategoryName] = useState("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [animationCategories, setAnimationCategories] = useState<AnimationState[]>([]);
    const [aleart, setAleart] = useState(false);
    const [loading, setLoading] = useState(true);
    
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
            console.log("Animation Categories:", categories); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        })
        .catch((error) => {
            console.error("Failed to fetch animation categories:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [projectPath]);


    return (
        <div className='flex flex-row w-full min-h-screen bg-custom !p-0'>
            <SideBarVideo
                setNewCategoryName={setNewCategoryName}
                handleCreateNewVideoCategory={handleCreateNewVideoCategory}
                onSelect={(title) => setSelected(title)}
                data={animationCategories}
                loading={loading}
            />
            {/* <Animation title={selected} data={data} moviePath={MoviePath} /> */}
        </div>
    )
}

export default page