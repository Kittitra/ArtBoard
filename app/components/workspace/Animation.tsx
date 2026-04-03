'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image';
import React, { useState } from 'react'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { usePathname } from 'next/navigation';
import SideBarWorkFlow from '@/app/components/SideBarWorkFlow';

interface Props {
    title: string
    data: Data[]
}

interface Data {
    title: string
    data: {
        image: string
        aprrove: boolean | null
        date: string
        sendBy: string
        name: string
        comment: string
        status: string
    }[]
}

const Animation = ({title, data}: Props) => {
  return (
    <div className=' flex flex-col w-full h-full p-10 pt-26 overflow-auto'>
      <div className='w-full flex justify-end'>
        <Button className='btn-custom'>Add Animation</Button>
      </div>
      {data.map((item, inx) => {
        if(item.title === title){
          return(
              item.data.map((task, index) => (
                <div className='flex flex-col gap-5 text-sm w-full h-fit' key={index}>
                  <div className='flex flex-col gap-5 w-full h-fit mt-10'>
                    <div className='flex flex-row gap-10 w-full h-fit justify-start items-center bg-white'>
                      <Image src={task.image} alt='user' width={300} height={250}
                      className='w-1/5' />
                      
                      <RadioGroup defaultValue="comfortable" className="w-fit flex flex-row gap-10 text-sm">
                          <div className="flex flex-col items-center gap-3">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">Approve</Label>
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3">Deny</Label>
                          </div>
                        </RadioGroup>

                      <div className='flex flex-col justify-between items-center gap-5'>
                        <span className='text-gray-400'>Date</span>
                        <span className=''>{task.date}</span>
                      </div>

                      <div className='flex flex-col justify-between items-center gap-5'>
                        <span className='text-gray-400'>Send by</span>
                        <span className=''>{task.sendBy}</span>
                      </div>

                      <div className='flex flex-col justify-between items-center gap-5'>
                        <span className='text-gray-400'>Name</span>
                        <span className=''>{task.name}</span>
                      </div>

                      <div className='flex flex-col justify-between items-center gap-5 w-1/4'>
                        <span className='text-gray-400'>Commnets</span>
                        <span className=''>{task.comment}</span>
                      </div>

                      <div className='flex flex-col justify-between items-center gap-5'>
                        <span className='text-gray-400'>Status</span>
                        <span className=''>{task.status}</span>
                      </div>

                      <div className=' justify-end-safe m-auto'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <PiDotsThreeOutlineVerticalFill className=' hover:cursor-pointer' size={20} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Submit</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default Animation