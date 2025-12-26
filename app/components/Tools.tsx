import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { BsCardText, BsUpload } from 'react-icons/bs'
import { CiLink } from 'react-icons/ci'
import { FaPhotoVideo, FaTrash } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { IoDocumentTextOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5'
import { LuAudioLines, LuGroup } from 'react-icons/lu'
import { MdOutlineDashboard, MdOutlineInsertComment } from 'react-icons/md'
import { RiSketching } from 'react-icons/ri'
import { RxArrowTopRight } from 'react-icons/rx'
import { TfiText } from 'react-icons/tfi'

type Props = {}

const Tools = () => {
  const iconsSize = 25;
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData(
      "application/x-konva",
      JSON.stringify({ type })
    );
  };

  return (
    <div className='flex flex-col justify-start items-center w-fit h-full bg-[#F2F2F2] border-[#dadada] border-r p-2 no-scrollbar
    overflow-y-auto gap-6'>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "board")} >
            <MdOutlineDashboard size={iconsSize}  />
            <span className='text-ligth'>
              Board
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "note")}>
            <BsCardText size={iconsSize} />
            <span className='text-ligth' >
              Note
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "link")}>
            <CiLink size={iconsSize} />
            <span className='text-ligth'>
              Link
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "line")}>
          <RxArrowTopRight size={iconsSize} />
            <span className='text-ligth'>
              Line
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "head")}>
          <TfiText size={iconsSize} />
            <span className='text-ligth'>
              Heading
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "colors")}>
          <HiOutlineColorSwatch size={iconsSize} />
            <span className='text-ligth'>
              Colors
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "document")}>
          <IoDocumentTextOutline size={iconsSize} />
            <span className='text-ligth'>
              Document
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "sketch")}>
          <RiSketching size={iconsSize} />
            <span className='text-ligth'>
              Sketch
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "video")}>
          <FaPhotoVideo size={iconsSize} />
            <span className='text-ligth'>
              Video
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "comment")}>
          <MdOutlineInsertComment  size={iconsSize} />
            <span className='text-ligth'>
              Comment
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "audio")}>
          <LuAudioLines size={iconsSize} />
            <span className='text-ligth'>
              Audio
            </span>
        </span>
        <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "group")}>
          <LuGroup size={iconsSize} />
            <span className='text-ligth'>
              Group
            </span>
        </span>
        
        <div className="w-full border-b-2 border-gray-400"></div>
            <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "draw")}>
              <GoPencil size={iconsSize} />
                <span className='text-ligth'>
                  Draw
                </span>
            </span>
            <span className='tool-icons' draggable onDragStart={(e) => onDragStart(e, "upload")}>
              <BsUpload size={iconsSize} />
                <span className='text-ligth'>
                  Upload
                </span>
            </span>
          <span className='tool-icons mb-5'>
            <FaTrash size={iconsSize} />
              <span className='text-ligth'>
                Trash
              </span>
          </span>
    </div>
  )
}

export default Tools