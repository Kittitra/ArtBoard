'use client';

import Navbar from '@/app/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import React, { useState } from 'react'
import Members from '@/app/components/Members';
import Tasks from '@/app/components/Tasks';
import Calendar from '@/app/components/Calendar';

type Props = {}

const Settings = (props: Props) => {
    const [comp, setComp] = useState('members');
    const path = usePathname();
    return (
        <div className='bg-[#3e3e3e] min-h-screen p-20 flex flex-col gap-10'>
            <Navbar />
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col gap-10'>
                    <h1 className='header-text text-white'>#{path.split('/')[2]}</h1>
                    <div className='flex flex-row gap-5'>
                        <Input className='input-custom' placeholder='Project Name' />
                        <Button className='btn-custom'>Rename</Button>
                    </div>
                </div>

                <div className='flex flex-row gap-15'>
                    <div className='w-36 h-36 flex flex-col justify-center items-center gap-3 bg-white border border-black rounded-2xl'>
                        <span><FiUser size={50} /></span>
                        <span className='font-semibold'>Members</span>
                    </div>
                    <div className='w-36 h-36 flex flex-col justify-center items-center gap-3 bg-white border border-black rounded-2xl'>
                        <span><PiDotsThreeOutlineLight size={50} /></span>
                        <span className='font-semibold'>More</span>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex flex-row gap-5 w-full'>
                    <span className={`text-lg rounded-t-lg bg-white px-5 hover:cursor-pointer ${comp === "members" ? "text-black" : "text-gray-300"}`}
                    onClick={() => setComp("members")}>Members</span>
                    <span className={`text-lg rounded-t-lg bg-white px-5 hover:cursor-pointer ${comp === "tasks" ? "text-black" : "text-gray-300"}`} 
                    onClick={() => setComp("tasks")}>Tasks</span>
                    <span className={`text-lg rounded-t-lg bg-white px-5 hover:cursor-pointer ${comp === "calendar" ? "text-black" : "text-gray-300"}`} 
                    onClick={() => setComp("calendar")}>Calendar</span>
                </div>
                <hr />
            </div>

            {comp === "members" && <Members />}
            {comp === "tasks" && <Tasks />}
            {comp === "calendar" && <Calendar />}
        </div>
    )
}

export default Settings