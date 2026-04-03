'use client';

import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

interface Props {
    items: { title: string }[]
    onSelect: (title: string) => void  // ✅ เพิ่ม callback
}

const SideBarWorkFlow = ({ items, onSelect }: Props) => {
    const [click, setClick] = useState(items[0].title);

    const handleClick = (title: string) => {
        setClick(title)
        onSelect(title)  // ✅ ส่งกลับ parent
    }

    return (
        <div className='flex flex-col w-50 h-full gap-5 bg-custom !p-5 !pt-20 shadow-2xl'>
            {items.map((item, inx) => (
                <div key={inx}
                onClick={() => handleClick(item.title)}
                className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium hover:cursor-pointer ${click === item.title ? "bg-gray-400 text-black" : "bg-white"}`}>
                
                {/* เพิ่ม flex-1 min-w-0 เพื่อให้ truncate ทำงาน */}
                <span className="px-3 truncate flex-1 min-w-0">{item.title}</span>
                <PiDotsThreeOutlineVerticalFill className='text-xl text-black flex-shrink-0' />
            </div>
            ))}
        </div>
    )
}

export default SideBarWorkFlow