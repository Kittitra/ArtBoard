'use client';

import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";

interface Data {
    title: string
    subClass: {
        name: string[]
    }

}

interface Props {
    items: { title: string }[]
    onSelect: (title: string) => void  // ✅ เพิ่ม callback
    data: Data[]
}

const SideBardStoryBoard = ({ items, onSelect, data }: Props) => {
    const [click, setClick] = useState(items[0].title);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [dialogAddNew, setDialogAddNew] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [dialogMethod, setDialogMethod] = useState("");


    const handleClick = (title: string) => {
        setClick(title);
        onSelect(title);
    }

    const handleOpenDialog = (title: string, method: string) => {
        if(method === "re_name"){
            setDialogMethod("re_name")
        }else {
            setDialogMethod("new_sub")
        }
        setSelectedItem(title);
        setDialogOpen(true);
    }

    const handleDelete = (title: string) => {

        setSelectedItem(title);
        setDialogDelete(true);
    }

    const handleAddNewCategory = () => {
        setDialogAddNew(true);
    }

    return (
        <>
            <div className="flex flex-col h-full justify-between w-fit">
                <div className='flex flex-col w-50 h-full gap-5 bg-custom !p-5 !pt-20 shadow-2xl'>
                    {items.map((item, inx) => (
                        <div key={inx}>
                            <div 
                                className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium  ${click === item.title ? "bg-gray-400 text-black" : "bg-white"}`}>
                                
                                {/* เพิ่ม flex-1 min-w-0 เพื่อให้ truncate ทำงาน */}
                                <span className="px-3 truncate flex-1 w-fit min-w-0 hover:cursor-pointer"
                                onClick={() => handleClick(item.title)}>{item.title}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <PiDotsThreeOutlineVerticalFill className='text-xl text-black flex-shrink-0 hover:cursor-pointer' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={() => handleOpenDialog(item.title, "re_name")}>
                                            Re-name
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(item.title)}>
                                            Delete
                                        </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
                <div 
                onClick={() => handleAddNewCategory()}
                className="flex flex-col justify-center items-center w-full h-17 bg-[#7B7B7B] border-2 border-dashed text-white text-lg hover:cursor-pointer">
                    <span className="text-2xl">+</span>
                    <span className="-mt-2">Add new</span>
                </div>
            </div>

             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMethod === "re_name" && <span>Re-name</span>}
                            {dialogMethod === "new_sub" && <span>New sub {selectedItem}</span>}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row gap-5">
                        <Input placeholder={dialogMethod === "re_name" ? "new name" : "new sub name"} />
                        <Button className="btn-custom">New</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogDelete} onOpenChange={setDialogDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                           Are you sure to Delete "{selectedItem}" ?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row justify-between pt-5">
                        <Button className="btn-custom" onClick={() => setDialogDelete(false)}>Cancel</Button>
                        <Button className="bg-red-700 text-white hover:bg-red-900">Delete</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogAddNew} onOpenChange={setDialogAddNew}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add new Category
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row gap-5">
                        <Input placeholder={"Category name"} />
                        <Button className="btn-custom">New</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
        
    )
}

export default SideBardStoryBoard