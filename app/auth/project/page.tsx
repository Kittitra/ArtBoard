import Navbar from '@/app/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Project = (props: Props) => {
    const film = [
        {
            title: "Sunglasses",
        },
        {
            title: "Officer Kevin",
        }
    ]
  return (
    <div className='flex flex-col bg-custom w-full h-screen px-15 !pt-[5rem] '>
        <Navbar />
        <div className='w-full flex flex-row justify-between '>
            <span className='text-white text-3xl'>All Project</span>
            <div className=' flex flex-row gap-3'>
                <Input className='w-85 text-white placeholder:text-white' placeholder='Search project...' />
            </div>
        </div>

        <div className='w-full flex flex-row gap-5 mt-10 flex-wrap '> 
            <div className='hover-highlight w-64 h-42 border-2 border-white border-dashed rounded-lg flex flex-col justify-center items-center'>
                <span className='text-white text-2xl'>+</span>
                <span className='text-white'>New Project</span>
            </div>

            {film.map((items, index) => (
                <div key={index} className='w-64 h-42 bg-white rounded-lg flex flex-col justify-start items-start p-5 relative'>
                    <Link href={`/auth/project/${items.title.toLowerCase()}/script`}>
                        <span className='text-black hover:cursor-pointer'>{items.title}</span>
                    </Link>
                    <Link href={`/auth/${items.title.toLowerCase()}/settings`}>
                        <span className='absolute bottom-2 right-2 hover:cursor-pointer'>⚙️</span>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Project