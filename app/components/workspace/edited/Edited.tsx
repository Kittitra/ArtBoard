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
import SideBarWorkFlow from '@/app/components/SideBarVideo';
import VideoUploader from '../../drag/VideoUploader';
import { User } from '@/app/generated/prisma';
import { createNewVideo } from '@/action/video';
import Link from 'next/link';

interface Props {
    data: EditedProps[]
    moviePath: string
    projectId: string
    user: User

}

interface EditedProps {
    id: string
    title: string
    content: any
    description: string
    ownerId: string
    stateId: string
    createAt: string
    status: string
}

const Edited = ({ data, moviePath, projectId, user}: Props) => {

  const [step, setStep] = useState<"idle" | "form" | "upload">("idle")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [titleError, setTitleError] = useState("")

  const handleOpenForm = () => {
    setVideoTitle("")
    setVideoDescription("")
    setTitleError("")
    setStep("form")
  }

  const handleSubmitForm = () => {
    if (!videoTitle.trim()) {
      setTitleError("please enter video title")
      return
    }

    const isDuplicate = data.some((item) => item.title === videoTitle)

    if (isDuplicate) {
      setTitleError("title already in used")
      return
    }

    // setStep("upload")

    handleReady() // เรียก handleReady() ทันทีหลังจากตรวจสอบความถูกต้องของ title
  }

  const handleReady = async () => {

    const result = await createNewVideo(
      {
        title: videoTitle,
        userId: user.id,
        categoryId: moviePath,
        status: "in-progress",
        description: videoDescription,
      },
      "edited",
    )

    if (result?.error) {
      setTitleError(result.error)
      setStep("form") // กลับไปแก้ title แทนที่จะปิด
      return
    }

    setStep("idle")
  }
// console.log(data)
//   console.log("user:", user)
// console.log("moviePath:", moviePath)

  return (
    <div className='flex flex-col w-full h-full p-10 pt-26 overflow-auto'>
      <div className='w-full flex justify-end'>
        <Button className='btn-custom' onClick={handleOpenForm}>
          Add Edited
        </Button>
      </div>

      {/* Step 1: Form กรอก Title */}
      {step === "form" && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5 w-96">
            <h3 className="font-semibold text-gray-700">New Animation</h3>

            <div className="flex flex-col gap-2">
              <Label htmlFor="video-title">Tile</Label>
              <Input
                id="video-title"
                placeholder="title of the video"
                value={videoTitle}
                onChange={(e) => {
                  setVideoTitle(e.target.value)
                  setTitleError("")
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitForm()}
              />

              <Label htmlFor="video-description">Description</Label>
              <Input
                id="video-description"
                placeholder="description of the video"
                value={videoDescription}
                onChange={(e) => {
                  setVideoDescription(e.target.value)
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitForm()}
              />

              {titleError && (
                <span className="text-red-500 text-xs">{titleError}</span>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setStep("idle")}>
                Cancel
              </Button>
              <Button onClick={handleSubmitForm}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Upload วิดีโอ */}
      {/* {step === "upload" && (
        <VideoUploader
          onReady={handleReady}
          onClose={() => setStep("form")} // กด Cancel กลับไปหน้า form
        />
      )} */}

        {data.map((item, inx) => (
                  <div className='flex flex-col gap-5 text-sm w-full h-fit ' key={inx}>
                    <div className='flex flex-col gap-5 w-full h-fit mt-10'>
                      <div className='flex flex-row gap-10 w-full h-fit justify-start items-center bg-white p-5'>
                        {/* <Image src={task.image} alt='user' width={300} height={250}
                        className='w-1/5' /> */}
                        
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
                          <span className=''>{item.createAt}</span>
                        </div>

                        <div className='flex flex-col justify-between items-center gap-5'>
                          <span className='text-gray-400'>Send by</span>
                          {/* <span className=''>{item.sendBy}</span> */}
                        </div>

                        <div className='flex flex-col justify-between items-center gap-5'>
                          <span className='text-gray-400'>Title</span>
                          <span className=''>{item.title}</span>
                        </div>

                        {/* <div className='flex flex-col justify-between items-center gap-5 w-1/4'>
                          <span className='text-gray-400'>Commnets</span>
                          <span className=''>{item.comment}</span>
                        </div> */}

                        <div className='flex flex-col justify-between items-center gap-5'>
                          <span className='text-gray-400'>Status</span>
                          <span className=''>{item.status}</span>
                        </div>

                        <div className=' justify-end-safe m-auto'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <PiDotsThreeOutlineVerticalFill className=' hover:cursor-pointer' size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                  <Link href={`http://localhost:3000/auth/project/${projectId}/edited/${moviePath}/${item.id}`} >
                                    <DropdownMenuItem>
                                        View
                                    </DropdownMenuItem>
                                  </Link>
                                <DropdownMenuItem>Submit</DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
      </div>
  )
}

export default Edited