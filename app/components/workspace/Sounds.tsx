'use client';

import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

interface Props {
    title: string
    data: Data[]
}

interface Data {
    title: string
    data: {
        name: string
        length: string
    }[]
}

const Sounds = ({title, data}: Props) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    setPlayingIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className=' flex flex-col w-full h-full p-10 pt-26 overflow-auto'>
      <div className='w-full flex justify-end'>
        <Button className='btn-custom'>Add Sounds</Button>
      </div>
      {data.map((item, inx) => {
        if(item.title === title){
          return(
              item.data.map((task, index) => (
                <div className='flex flex-col gap-5 text-sm w-full h-fit' key={index}>
                  <div className='flex flex-col gap-5 w-full h-fit mt-10'>
                    <div className='flex flex-row w-full h-fit p-5 px-10 justify-between items-center bg-white rounded-md'>
                      <div className='flex flex-row gap-20'>
                        <span onClick={() => handlePlay(index)}>
                          {playingIndex === index
                            ? <FaPause className='text-xl text-black' />
                            : <FaPlay className='text-xl text-black' />
                          }
                        </span>
                        <span>{task.name}</span>
                      </div>
                      
                      <div className='flex flex-row gap-20'>
                        <span>{task.length}</span>
                        <PiDotsThreeOutlineVerticalFill className='text-2xl text-black' />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )
        }
      })}
      
    </div>
  )
}

export default Sounds