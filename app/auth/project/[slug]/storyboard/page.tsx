"use client";

import SideBarDesign from '@/app/components/SideBarDesign';
import SideBarStoryBoard from '@/app/components/SideBarStoryBoard';
import SideBarWorkFlow from '@/app/components/SideBarWorkFlow'
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
   const arr = [
             {
                 title: "open_scene",
             },
             {
                 title : "fight_scene",
             },
             {
                 title: "final_scene",
             },
         ]
         const [selected, setSelected] = useState(arr[0].title);
   
         const data = [
           {
               title: "open_scene",
               subClass : {
                 name: [],
               }
           },
       ];

  return (
    <div className='bg-custom !pt-0 w-full h-screen '>
        <SideBarStoryBoard onSelect={(title) => setSelected(title)} items={arr} data={data} />
    </div>
  )
}

export default page

