"use client";

import SideBarDesign from '@/app/components/workspace/design/SideBarDesign';
import SideBarStoryBoard from '@/app/components/workspace/storyboard/SideBarStoryBoard';
import Design from '@/app/components/workspace/design/Design';
import { title } from 'process';
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
  const arr = [
    { title: "Character" },
    { title: "Background" },
    { title: "Enviroment" },
  ]

  const data = [
    {
      title: "Character",
      subClass: [
        {
          name: "james",
          version: [
            {
              id: "123456",
              name: "v.1",
            },
            {
              id: "789",
              name: "v.2",
            },
            {
              id: "101112",
              name: "v.3",
            },
          ]
        }
      ]
    },
  ]

  const [selected, setSelected] = useState(arr[0].title);
  const [version, setVersion] = useState("");


  return (
    // ✅ flex row ให้ sidebar อยู่ซ้าย content อยู่ขวา
    <div className='flex flex-row w-full h-screen'>
      <SideBarDesign
        items={arr}
        data={data}
        onSelect={(title) => setSelected(title)}
        setVersion={(v) => setVersion(v)}
      />
      <div className='flex-1 bg-custom -z-10'>
        <Design version={version} items={arr} data={data} onSelect={(title) => setSelected(title)}/>
      </div>
    </div>
  )
}

export default page