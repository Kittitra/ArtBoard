'use client';

import { link } from 'fs'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {

       const pathname = usePathname()
       const org = pathname.split('/')[3]; // Get the third segment of the URL
       const project = pathname.split('/')[5]; 

       const category = pathname.split('/')[6]; // Get the fourth segment of the URL

    const arrIcon = [
        {
            title: "Script",
            icon: "/icons/Script.png",
            link: `/auth/org/${org}/project/${project}/script`,
            category: "script"
        },
        {
            title: "Design",
            icon: "/icons/Design.png",
            link: `/auth/org/${org}/project/${project}/design`,
            category: "design"
        },
        {
            title: "Storyboard",
            icon: "/icons/Storyboard.png",
            link: `/auth/org/${org}/project/${project}/storyboard` ,
            category: "storyboard"
        },
        {
            title: "Animation",
            icon: "/icons/Animation.png",
            link: `/auth/org/${org}/project/${project}/animation`,
            category: "animation"
        },
        {
            title: "Footages",
            icon: "/icons/Footages.png",
            link: `/auth/org/${org}/project/${project}/footages`,
            category: "footages"

        },
        {
            title: "Sounds",
            icon: "/icons/Sounds.png",
            link: `/auth/org/${org}/project/${project}/sounds`,
            category: "sounds"

        },
        {
            title: "Edited",
            icon: "/icons/Edited.png",
            link: `/auth/org/${org}/project/${project}/edited`,
            category: "edited"
        },
        
    ]



  return (
    <div className={`flex flex-col justify-between items-center w-20  shadow-xl/30 bg-[#4E4E4E]  pt-10`}>
        <div className='flex flex-col items-center'>
            {arrIcon.map((item, index) => (
                <React.Fragment key={index}>
                        <Link href={item.link} className='flex flex-col items-center w-fit h-fit rounded-lg mt-5 p-2'>
                            <img
                                src={item.icon}
                                alt={item.title}
                                className={`w-8 h-8 cursor-pointer  p-2 rounded-lg ${category === item.category ? 'bg-[#a6a6a6]' : 'bg-white'}`}
                                />
                            <span className='text-white text-xs mt-1'>{item.title}</span>
                        </Link>
                    {index === 2 && (
                        <div className="w-14 h-[1px] bg-white mt-4"></div>
                    )}
                    {index === 4 && (
                        <div className="w-14 h-[1px] bg-white mt-4"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}

export default Sidebar