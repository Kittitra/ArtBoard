"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react';
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'

type Props = {}

const Navbar = (props: Props) => {
    const user = useCurrentUser();

    const SignOut = () => {
        signOut();
    }
  return (
    <nav className='w-full bg-white h-fit px-5 py-2 text-black'>
        <div className='w-full flex justify-between items-center'>
            <span>
                Home
            </span>
            <div className='flex flex-row gap-5'>
                <MdNotificationsNone size={27} className='text-gray-600' />

                <DropdownMenu>
                <DropdownMenuTrigger>
                    <IoSettingsOutline size={27} className='text-gray-600' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-5'>
                    <DropdownMenuLabel className='flex flex-row justify-between gap-20'>
                        <div className='flex flex-col gap-7'>
                            <div className='flex flex-col'>
                                <span className='text-xl'>{user?.name}</span>
                                <span className='text-gray-400'>{user?.email}</span>
                            </div>
                            <div className='text-md flex flex-row gap-5'>
                                <span  >
                                    <Dialog>
                                        <DialogTrigger className='hover:cursor-pointer'>Setting</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </span>
                                <span className='hover:cursor-pointer' 
                                onClick={SignOut}>Signout</span>
                            </div>
                        </div>
                         <Avatar className='w-25 h-25'>
                            <AvatarImage src={user?.image || ""} />
                                <AvatarFallback className='bg-white'>
                                    <FaUser className='text-black' />
                                </AvatarFallback>
                        </Avatar>
                    </DropdownMenuLabel>
                    
                </DropdownMenuContent>
                </DropdownMenu>
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar