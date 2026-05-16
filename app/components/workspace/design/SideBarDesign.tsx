'use client';

import { useState, useTransition } from "react";
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
import { createDesignCategory } from "@/action/design";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import { AlertBasic } from "../../Aleart";
import { Version } from "@/lib/type";



interface SubClass {
    id: string
    name: string
    versions: Version[]
}

interface DesignCategory {
    id: string
    name: string
    ownerId: string
    projectId: string
    designs?: SubClass[]  // ✅ เพิ่ม subclass array ใน DesignCategory
}

// interface Props {
//     items: { title: string }[]
//     onSelect: (title: string) => void
//     setVersion: (version: string) => void
//     data: DesignCategory[]
// }

interface Props {
    handleCreateNewCategory: () => void
    setNewCategoryName: (name: string) => void
    setNewSubClassName: (name: string) => void
    data: DesignCategory[]
    onSelect: (title: string) => void
    setVersion: (version: Version[]) => void
    handleCreateNewSubClass: (categoryId: string | null) => void
    loading: boolean
    handleCreateNewVersion: (subCategoryId: string) => void
    setNewVersionName: (name: string) => void
}

type DialogMethod = "re_name" | "new_sub" | null;
type DialogType = "form" | "delete" | "version" | null;

const SideBarDesign = ({
    handleCreateNewCategory,
    setNewCategoryName,
    setNewSubClassName,
    onSelect,
    setVersion,
    data,
    handleCreateNewSubClass,
    loading,
    handleCreateNewVersion,
    setNewVersionName,
    
}: Props) => {
    const [click, setClick] = useState(data[0]?.id || ""); // ✅ ตั้งค่าเริ่มต้นเป็น id ของ design category แรก
    const [openDialog, setOpenDialog] = useState<DialogType>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [dialogAddNew, setDialogAddNew] = useState(false);
    const [dialogMethod, setDialogMethod] = useState<DialogMethod>(null);
    const [selectedVersions, setSelectedVersions] = useState<Version[]>([]);  // ✅ เก็บ version ของ subClass ที่เลือก

    const handleClick = (id: string) => {
        setClick(id);
        onSelect(id);
    }

    const handleOpenRename = (id: string) => {
        setSelectedItem(id);
        setDialogMethod("re_name");
        setOpenDialog("form");
    }

    const handleOpenNewSub = (id: string) => {
        setSelectedItem(id);
        setDialogMethod("new_sub");
        setOpenDialog("form");
    }

    const handleOpenDelete = (id: string) => {
        setSelectedItem(id);
        setOpenDialog("delete");
    }

    // ✅ รับ versions ของ subClass ที่กด
    const handleOpenVersion = (subClass: SubClass) => {
        setSelectedItem(subClass.id);
        setSelectedVersions(subClass.versions);
        setOpenDialog("version");
    }

    const handleClose = () => {
        setOpenDialog(null);
    }

    const handleVersion = (v: Version[]) => {
        setVersion(v);
        handleClose();
        console.log("Selected version:", v);
    }

    const handleAddNewCategory = () => {
        setDialogAddNew(true);
    }

    const CategoryTitle = data.find(cate => cate.id === selectedItem)?.name || "";
    const SubCategoryTitle = data.flatMap(cate => cate.designs || []).find(sub => sub.id === selectedItem)?.name || "";

    return (
        <>
        <div className="flex flex-col h-full justify-between w-fit relative overflow-x-hidden">
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
                                <div className={`w-full h-10 px-2 flex justify-between items-center text-sm font-medium ${click === item.name ? "bg-gray-400 text-black" : "bg-white"}`}>
                                    <span
                                        className="px-3 truncate flex-1 min-w-0 hover:cursor-pointer"
                                        onClick={() => handleClick(item.id)}>
                                        {item.name}
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
                                                <DropdownMenuItem onSelect={() => handleOpenNewSub(item.id)}>
                                                    New Sub
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex flex-col pt-2 ">
                                            {data.map((dataItem) => {
                                                if (dataItem.name !== item.name) return null;
                                                // ✅ loop subClass array ถูกต้อง
                                                return dataItem.designs?.map((sub) => (
                                                    <span key={sub.id} className="flex flex-row justify-start gap-3 items-center px-2 text-white">
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
                                                                    <DropdownMenuItem onSelect={() => handleOpenRename(sub.id)}>
                                                                        Re-name
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onSelect={() => handleOpenDelete(sub.id)}>
                                                                        Delete
                                                                    </DropdownMenuItem>
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
            <Dialog open={openDialog === "form"} onOpenChange={(o) => !o && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMethod === "re_name" ? "Re-name" : `New sub ${CategoryTitle || SubCategoryTitle}`}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-row gap-5">
                        <Input placeholder={dialogMethod === "re_name" ? "new name" : "new sub name"} 
                        onChange={dialogMethod === "re_name" ? () => {} : (e) => setNewSubClassName(e.target.value)} />
                        <Button className="btn-custom" onClick={dialogMethod === "re_name" ? () => {} : () => handleCreateNewSubClass(selectedItem)}>
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
                            Are you sure to delete "{CategoryTitle || SubCategoryTitle}"?
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
                        <DialogTitle>{SubCategoryTitle} — Versions</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full flex flex-col gap-3 pt-5">
                        <span className="flex flex-row w-full items-center gap-5">
                            <Input placeholder="new version name" onChange={(e) => setNewVersionName(e.target.value)} />
                            <Button className="w-1/4 btn-custom" onClick={() => handleCreateNewVersion(selectedItem || "")}>Add</Button>
                        </span>
                        {/* ✅ แสดง version list */}
                        {selectedVersions.length === 0 ? (
                            <span className="text-sm text-gray-400">No versions yet</span>
                        ) : (
                            selectedVersions.map((v) => (
                                <span key={v.id} className="flex flex-col gap-10">
                                    <span key={v.id} 
                                    className="flex flex-row justify-between items-center p-2 border rounded-md hover:cursor-pointer">
                                        <span className="text-sm px-5" onClick={() => handleVersion([v])} >
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
                        <Input placeholder={"Category name"} onChange={(e) => setNewCategoryName(e.target.value)} />
                        <Button className="btn-custom" onClick={() => handleCreateNewCategory()}>New</Button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            
        </>
    )
}

export default SideBarDesign