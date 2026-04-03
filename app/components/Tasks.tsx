import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image';
import React from 'react'
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


type Props = {
  status?: string;
  date: string;
  sendBy: string;
  name: string;
  comment: string;
  aprove: boolean | null;
}

const Tasks = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 w-fit'>
        <Input className='input-custom' placeholder='Task Name' />
        <Button className='btn-custom'>Find</Button>
      </div>

      <div className='flex flex-col gap-5 w-full h-fit mt-10'>
        <div className='flex flex-row gap-20 w-full h-fit justify-start items-center bg-white'>
          <Image src="/images/Elsa-nightGrow.jpeg" alt='user' width={300} height={250}
          className='w-1/5' />
          
           <RadioGroup defaultValue="comfortable" className="w-fit flex flex-row gap-15">
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
            <span className='text-gray-300'>Date</span>
            <span className=''>2025/11/12</span>
          </div>

          <div className='flex flex-col justify-between items-center gap-5'>
            <span className='text-gray-300'>Send by</span>
            <span className=''>James</span>
          </div>

          <div className='flex flex-col justify-between items-center gap-5'>
            <span className='text-gray-300'>Name</span>
            <span className=''>Script01</span>
          </div>

          <div className='flex flex-col justify-between items-center gap-5'>
            <span className='text-gray-300'>Commnets</span>
            <span className=''>first draft</span>
          </div>

          <div className='flex flex-col justify-between items-center gap-5'>
            <span className='text-gray-300'>Status</span>
            <span className=''>Review Needed</span>
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
  )
}

export default Tasks