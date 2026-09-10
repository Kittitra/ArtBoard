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
import { Storyboard } from "@/app/generated/prisma/edge";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
    // onSelect: (title: string) => void  // ✅ เพิ่ม callback
    storyboards: Storyboard[]
    handleCreateNewStoryboard: (storyboardName: string) => void
    boardPath?: string
    projectPath?: string
    pathType?: string
}

const SideBardStoryBoard = ({ storyboards, handleCreateNewStoryboard, boardPath, projectPath, pathType }: Props) => {
    const [click, setClick] = useState(storyboards[0]?.title);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [dialogAddNew, setDialogAddNew] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [dialogMethod, setDialogMethod] = useState("");
    const [storyboardName, setStoryboardName] = useState("");



    const handleClick = (title: string) => {
        setClick(title);
        // onSelect(title);

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

    const createStoryboard = () => {
        handleCreateNewStoryboard(storyboardName);
        setDialogAddNew(false);
    }

    return (
        <>
            <div className="flex flex-col h-full justify-between w-fit">
                <div className='flex flex-col w-50 h-full gap-5 bg-custom !p-5 shadow-2xl'>
                    {storyboards.map((storyboard, inx) => (
                        <div key={inx}>
                            <div 
                                className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium  ${boardPath === storyboard.id ? "bg-gray-400 text-black" : "bg-white"}`}>
                                
                                {/* เพิ่ม flex-1 min-w-0 เพื่อให้ truncate ทำงาน */}
                                <span className="px-3 truncate flex-1 w-fit min-w-0 hover:cursor-pointer"
                                >
                                    <Link href={`/auth/project/${projectPath}/${pathType}/${storyboard.id}`} className="w-full h-full flex items-center">
                                        {storyboard.title}
                                    </Link>
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <PiDotsThreeOutlineVerticalFill className='text-xl text-black flex-shrink-0 hover:cursor-pointer' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                        <DropdownMenuLabel>{storyboard.title}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={() => handleOpenDialog(storyboard.title, "re_name")}>
                                            Re-name
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(storyboard.title)}>
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
                        <DialogTitle className="font-bold text-lg pb-3">
                            Add new Storyboard
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-col gap-5">
                        <Input 
                            placeholder={"Storyboard title"} 
                            value={storyboardName}
                            onChange={(e) => setStoryboardName(e.target.value)}
                        />
                        <Button className="btn-custom"  onClick={createStoryboard}>
                            New
                        </Button>

                        <Button className="btn-custom mt-5">Import PDF</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
        
    )
}

export default SideBardStoryBoard