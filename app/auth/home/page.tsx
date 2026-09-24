"use client";

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/app/components/Navbar'
import { Button } from '@/components/ui/button';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { OrganizationSchema } from "@/schemas";
import { createOrganization, getOrganizationByUserId } from "@/action/organization";
import { Organization } from "@/app/generated/prisma";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AlertBasic } from "@/app/components/Aleart";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlPeople } from "react-icons/sl";
import { Prisma } from "@/app/generated/prisma";
import { HiOutlineDotsVertical } from "react-icons/hi";

type OrganizationWithMembers =
  Prisma.OrganizationGetPayload<{
    include: {
      members: true;
    };
  }>;
const Home = () => {
   
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [orgName, setOrgName] = useState("");
  const [org, setOrg] = useState<OrganizationWithMembers[]>([])
  const [aleart, setAleart] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const user = useCurrentUser();

  const handleCreateOrganization = () => {
    setError("");
    setSuccess("");

    if (!user?.id) return;
    if(!orgName.trim() || orgName === "") {
      setError("please fill the organization name");
      handleAleart()
      return;
    }

    startTransition(() => {
        createOrganization({
            name: orgName,
            ownerId: user?.id
        })
        .then((data) => {
            const newOrg = data?.org;
            
            if (newOrg) {
                setOrg((prev) => [...prev, newOrg]); // ✅ เพิ่มทันที
            }
            setError(data?.error);
            setSuccess(data?.success);
            handleAleart();
        }).catch((error) => {
            setError("Failed to create project. Please try again.");
            handleAleart();
        }).finally(() => {
            setOrgName("");
        })
    });
  }

  useEffect(() => {
      if (!user?.id) return; // 👈 รอ user มาก่อน

      getOrganizationByUserId(user.id)
      .then((data) => {
        if(!data) return
          setOrg(data);
          // console.log("project: ", data); // 👈 log ตรงนี้
      }).finally(() => {
          console.log(org)
          setLoading(false);
      });
  }, [user?.id]); // 👈 สำคัญมาก

  const handleAleart = () => {
      setAleart(true);

      setTimeout(() => {
          setAleart(false);
      }, 3000);
  };

  console.log("org: ", org)


  return (
    <div className="relative w-full flex flex-col h-screen overflow-x-hidden ">
      <Navbar />
      <div className='mt-10'>
        <div className='w-full flex flex-row justify-between items-center p-10'>
           <h1 className=' text-3xl '>Organization</h1>
           <Dialog>
            <DialogTrigger>
              <Button className='bg-white text-black border-2 hover:text-white cursor-pointer ' >
                Create organization
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new organization</DialogTitle>
                <DialogDescription className="flex flex-col gap-5">
                  <Input placeholder="your organization name" onChange={(e) => {
                    setOrgName(e.target.value)
                  }} />
                  <Button onClick={handleCreateOrganization} >Create new</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
            
        </div>

        <div className="flex flex-row gap-5 w-full h-full mx-10">
          {org?.map((item) => (
            <Card className="flex-col w-md h-fit rounded-md transition delay-150 duration-150 ease-in-out hover:shadow-lg" key={item.id} >
              <CardHeader className="flex flex-col">
                <CardTitle className="w-full flex flex-row justify-between">
                  <span className="cursor-pointer">
                    {item.name}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiOutlineDotsVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive ">Delete</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-row gap-3">
                  <SlPeople />
                  <span>{item.members.length}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
       <div
          className={`absolute bottom-4 -right-10
          transition-all duration-300 ease-out
          ${aleart
          ? "opacity-100 -translate-x-15 scale-100"
          : "opacity-0 translate-x-10 scale-95 pointer-events-none"
          }`}
      >
          <AlertBasic message={success || error} />
      </div>
    </div>
  )
}

export default Home