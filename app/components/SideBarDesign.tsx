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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";

interface Version {
    id: string
    name: string
}

interface SubClass {
    name: string
    version: Version[]
}

interface Data {
    title: string
    subClass: SubClass[]  // ✅ array ของ SubClass
}

interface Props {
    items: { title: string }[]
    onSelect: (title: string) => void
    setVersion: (version: string) => void
    data: Data[]
}

type DialogMethod = "re_name" | "new_sub" | null;
type DialogType = "form" | "delete" | "version" | null;

const SideBarDesign = ({ items, onSelect, data, setVersion }: Props) => {
    const [click, setClick] = useState(items[0].title);
    const [openDialog, setOpenDialog] = useState<DialogType>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [dialogAddNew, setDialogAddNew] = useState(false);
    const [dialogMethod, setDialogMethod] = useState<DialogMethod>(null);
    const [selectedVersions, setSelectedVersions] = useState<Version[]>([]);  // ✅ เก็บ version ของ subClass ที่เลือก

    const handleClick = (title: string) => {
        setClick(title);
        onSelect(title);
    }

    const handleOpenRename = (title: string) => {
        setSelectedItem(title);
        setDialogMethod("re_name");
        setOpenDialog("form");
    }

    const handleOpenNewSub = (title: string) => {
        setSelectedItem(title);
        setDialogMethod("new_sub");
        setOpenDialog("form");
    }

    const handleOpenDelete = (title: string) => {
        setSelectedItem(title);
        setOpenDialog("delete");
    }

    // ✅ รับ versions ของ subClass ที่กด
    const handleOpenVersion = (subClass: SubClass) => {
        setSelectedItem(subClass.name);
        setSelectedVersions(subClass.version);
        setOpenDialog("version");
    }

    const handleClose = () => {
        setOpenDialog(null);
    }

    const handleVersion = (v: string) => {
        setVersion(v);
        handleClose();
    }

    const handleAddNewCategory = () => {
        setDialogAddNew(true);
    }

    return (
        <>
        <div className="flex flex-col h-full justify-between w-fit">
            <div className='flex flex-col w-50 h-full gap-5 bg-custom !p-5 !pt-20 shadow-2xl '>
                {items.map((item, inx) => (
                    <div key={inx}>
                        <div className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium ${click === item.title ? "bg-gray-400 text-black" : "bg-white"}`}>
                            <span
                                className="px-3 truncate flex-1 min-w-0 hover:cursor-pointer"
                                onClick={() => handleClick(item.title)}>
                                {item.title}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <PiDotsThreeOutlineVerticalFill className='text-xl text-black flex-shrink-0 hover:cursor-pointer' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={() => handleOpenRename(item.title)}>
                                            Re-name
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleOpenDelete(item.title)}>
                                            Delete
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleOpenNewSub(item.title)}>
                                            New Sub
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex flex-col pt-2">
                            {data.map((dataItem) => {
                                if (dataItem.title !== item.title) return null;
                                // ✅ loop subClass array ถูกต้อง
                                return dataItem.subClass.map((sub) => (
                                    <span key={sub.name} className="flex flex-row justify-start gap-3 items-center px-2 text-white">
                                        <GoDotFill size={10} />
                                        <span className="truncate flex-1 min-w-0">{sub.name}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <BsThreeDots className='hover:cursor-pointer flex-shrink-0' size={15} />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuLabel>{sub.name}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onSelect={() => handleOpenRename(sub.name)}>
                                                        Re-name
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleOpenDelete(sub.name)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                    {/* ✅ ส่ง sub object ทั้งก้อนเพื่อเอา version */}
                                                    <DropdownMenuItem onSelect={() => handleOpenVersion(sub)}>
                                                        Versions
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </span>
                                ));
                            })}
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

            {/* Form Dialog: Re-name / New Sub */}
            <Dialog open={openDialog === "form"} onOpenChange={(o) => !o && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMethod === "re_name" ? "Re-name" : `New sub ${selectedItem}`}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row gap-5">
                        <Input placeholder={dialogMethod === "re_name" ? "new name" : "new sub name"} />
                        <Button className="btn-custom">
                            {dialogMethod === "re_name" ? "Save" : "New"}
                        </Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>

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

            {/* Version Dialog */}
            <Dialog open={openDialog === "version"} onOpenChange={(o) => !o && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedItem} — Versions</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-col gap-3 pt-5">
                        <span className="flex flex-row w-full items-center gap-5">
                            <Input placeholder="new version name" />
                            <Button className="w-1/4 btn-custom">Add</Button>
                        </span>
                        {/* ✅ แสดง version list */}
                        {selectedVersions.length === 0 ? (
                            <span className="text-sm text-gray-400">No versions yet</span>
                        ) : (
                            selectedVersions.map((v) => (
                                <span key={v.id} className="flex flex-col gap-10">
                                    <span key={v.id} 
                                    className="flex flex-row justify-between items-center p-2 border rounded-md hover:cursor-pointer">
                                        <span className="text-sm px-5" onClick={() => handleVersion(v.id)} >
                                            {v.name}
                                        </span>
                                    </span>
                                </span>
                            ))
                        )}
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

export default SideBarDesign