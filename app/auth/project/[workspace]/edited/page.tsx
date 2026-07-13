'use client';

import SideBarWorkFlow from '@/app/components/SideBarVideo'
import Animation from '@/app/components/workspace/animation/Animation';
import { title } from 'process';
import { useState } from 'react'

const page = () => {
    const arr = [
        {
            title: "shots",
        },
        {
            title : "scene",
        },
        {
            title: "squence",
        },
    ]
    const [selected, setSelected] = useState(arr[0].title);

    const data = [
        {
            title: "shots",
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
            title: "scene",
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
            title: "squence",
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


    return (
        <div className='flex flex-row w-full min-h-screen bg-custom !p-0'>
            <SideBarWorkFlow
                items={arr}
                onSelect={(title) => setSelected(title)}  // ✅ รับค่า
            />
            <Animation title={selected} data={data} />
        </div>
    )
}

export default page