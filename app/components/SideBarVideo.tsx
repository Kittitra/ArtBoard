'use client';

import { useEffect, useState, useTransition } from "react";
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface VideoCategory {
    id:string
    name: string
    projectId: string | null
}

interface Props {
    handleCreateNewVideoCategory: () => void
    setNewCategoryName: (name: string) => void
    data: VideoCategory[]
    onSelect: (title: string) => void
    loading: boolean
}

type DialogMethod = "re_name" | "new_sub" | null;
type DialogType = "form" | "delete" | "version" | null;

const SideBarVideo = ({
    setNewCategoryName,
    onSelect,
    data,
    handleCreateNewVideoCategory,
    loading,
    
}: Props) => {
    const [click, setClick] = useState(data[0]?.id || ""); // ✅ ตั้งค่าเริ่มต้นเป็น id ของ design category แรก
    const [openDialog, setOpenDialog] = useState<DialogType>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [dialogAddNew, setDialogAddNew] = useState(false);
    const [dialogMethod, setDialogMethod] = useState<DialogMethod>(null);

    const path = usePathname();

    const projectPath = path.split("/")[3];
    const categoryPath = path.split("/")[5];

    const handleClick = (id: string) => {
        setClick(id);
        onSelect(id);
    }

    const handleOpenRename = (id: string) => {
        setSelectedItem(id);
        // setDialogMethod("re_name");
        setOpenDialog("form");
    }

    // const handleOpenNewSub = (id: string) => {
    //     setSelectedItem(id);
    //     setDialogMethod("new_sub");
    //     setOpenDialog("form");
    // }

    const handleOpenDelete = (id: string) => {
        setSelectedItem(id);
        setOpenDialog("delete");
    }

    const handleClose = () => {
        setOpenDialog(null);
    }

    const handleAddNewCategory = () => {
        setDialogAddNew(true);
    }

    console.log("data: ", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
    return (
        <>
        <div className="flex flex-col h-full justify-between w-fit relative overflow-x-hidden min-w-fit">
            <div className='flex flex-col w-50 h-full gap-5 bg-custom !p-5 !pt-20 shadow-2xl '>
                {loading ? 
                    <div className="w-full max-w-sm rounded-md p-4">
                        <div className="flex flex-col animate-pulse space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                :
                    <>
                        {data.map((item, inx) => (
                            <div key={inx}>
                                <div className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium ${categoryPath === item.id ? "bg-gray-400 text-black" : "bg-white"}`}>
                                    <span
                                        className="px-3 truncate flex-1 min-w-0 hover:cursor-pointer"
                                        onClick={() => handleClick(item.id)}>
                                            <Link href={`http://localhost:3000/auth/project/${projectPath}/animation/${item.id}`} className="w-full h-full flex items-center">
                                                {item.name}
                                            </Link>
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <PiDotsThreeOutlineVerticalFill className='text-xl text-black flex-shrink-0 hover:cursor-pointer' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => handleOpenRename(item.id)}>
                                                    Re-name
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleOpenDelete(item.id)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))} 
                    </>
                }
            </div>

            <div 
            onClick={() => handleAddNewCategory()}
            className="flex flex-col justify-center items-center w-full h-17 bg-[#7B7B7B] border-2 border-dashed text-white text-lg hover:cursor-pointer">
                <span className="text-2xl">+</span>
                <span className="-mt-2">Add new</span>
            </div>


        </div>

        {/* Form Dialog: Re-name / New Sub */}
                {/* <Dialog open={openDialog === "form"} onOpenChange={(o) => !o && handleClose()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {dialogMethod === "re_name" ? "Re-name" : `New sub ${selectedItem}`}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="w-full flex flex-row gap-5">
                            <Input placeholder={dialogMethod === "re_name" ? "new name" : "new sub name"} 
                            onChange={dialogMethod === "re_name" ? () => {} : (e) => setNewCategoryName(e.target.value)} />
                            <Button className="btn-custom" onClick={dialogMethod === "re_name" ? () => {} : () => handleCreateNewSubClass(selectedItem)}>
                                {dialogMethod === "re_name" ? "Save" : "New"}
                            </Button>
                        </DialogDescription>
                    </DialogContent>
                </Dialog> */}

            {/* Delete Dialog */}
            <Dialog open={openDialog === "delete"} onOpenChange={(o) => !o && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure to delete "{selectedItem}"?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row justify-between pt-5">
                        <Button className="btn-custom" onClick={handleClose}>Cancel</Button>
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
                        <Input placeholder={"Category name"} onChange={(e) => setNewCategoryName(e.target.value)} />
                        <Button className="btn-custom" onClick={() => handleCreateNewVideoCategory()}>New</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            
        </>
    )
}

export default SideBarVideo