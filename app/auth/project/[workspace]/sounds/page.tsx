'use client';

import SideBarWorkFlow from '@/app/components/SideBarVideo'
import Animation from '@/app/components/workspace/animation/Animation';
import Sounds from '@/app/components/workspace/sound/Sounds';
import { title } from 'process';
import { useState } from 'react'

const page = () => {
    const arr = [
        {
            title: "Scene1",
        },
        {
            title : "Scene2",
        },
        {
            title: "Sequence1",
        },
    ]
    const [selected, setSelected] = useState(arr[0].title);

    const data = [
        {
            title: "Scene1",
            data: [
                {
                    name: "Ost 01",
                    length: "3:45",
                },
            ]
         },
        {
            title: "Scene2",
            data: [
                {
                    name: "Ost 01",
                    length: "3:45",
                },
                {
                    name: "Ost 02",
                    length: "3:45",
                },
            ]
        },
        {
            title: "Sequence1",
            data: [
                {
                    name: "Ost 01",
                    length: "3:45",
                },
                {
                    name: "Ost 02",
                    length: "3:45",
                },
                {
                    name: "Ost 03",
                    length: "3:45",
                },
                {
                    name: "Ost 04",
                    length: "3:45",
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
            <Sounds title={selected} data={data} />
        </div>
    )
}

export default page