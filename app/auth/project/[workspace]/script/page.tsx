"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'

const Script = () => {
  const arr = [
    {
      id: 123,
      title: "script 1",
      img: "/images/Elsa-nightGrow.jpeg",
    },
    {
      id: 456,
      title: "script 2",
      img: "/images/Elsa-nightGrow.jpeg",
    }
  ]

  const path = usePathname();

  const moviePath = path.split("/")[3];


  return (
    <div className='bg-custom w-full h-screen '>
        <div className='flex flex-row gap-10 p-10'>
          <div className='flex flex-col w-60 h-75 justify-center items-center border-2 border-white border-dashed hover:cursor-pointer'>
            <span className='text-white text-lg'>+</span>
            <span className='text-white text-lg'>New Draft</span>
          </div>
            {arr.map((item, index) => (
              <Link key={index} href={`/auth/project/${moviePath}/script/${item.id}`}>
                <div key={index} className='flex flex-col w-60 h-75 bg-white'>
                  <Image className='h-50 object-cover'
                  src={item.img} width={500} height={100} alt={item.title} />
                  <div className='flex flex-row p-3 relative'>
                    <span className='text-black '>{item.title}</span>
                    <span>
                      <PiDotsThreeOutlineVerticalFill 
                      className=' hover:cursor-pointer text-black absolute right-3 -bottom-8' size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default Script