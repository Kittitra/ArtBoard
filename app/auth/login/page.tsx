"use client";

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { register } from "@/action/register";
import FormError from "@/app/components/FormError";
import { login } from "@/action/login";
import { redirect, useRouter } from "next/navigation";

type Props = {}

const page = (props: Props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

     const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error);
        //   setSuccess(data?.success);
          if (data?.success) {
            setSuccess("Login successful!");
            router.push("/auth/home"); // redirect manual
          }
        })
        .catch((_error) => {
          setError("Failed to login. Please try again.");
        });
    });
  }

  return (
    <div className='flex flex-row w-full h-screen'>
        <div className='flex flex-col w-2/3 px-75 py-32 overflow-y-auto'>
            <Card className="w-full border-none shadow-none gap-10">
                <CardHeader>
                    <CardTitle className='text-4xl'>Get Started</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-10'>

                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5" >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                    <Input className="w-[30rem] h-[3rem]"
                                    {...field}
                                    disabled={isPending}
                                    type="email"
                                    placeholder="james@gmail.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem className="pb-5">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                    <Input className="w-[30rem] h-[3rem]"
                                    {...field}
                                    disabled={isPending}
                                    type="password"
                                    placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormError message={error} />
                            <Button className="w-full bg-[#581730] text-xl p-5 hover:bg-[#76153C]"
                                disabled={isPending}
                                type="submit" >Login</Button>
                        </form>
                    </Form> 
                    
                </CardContent>
                <CardFooter className="flex flex-col gap-2 w-full ">
                    <div className="flex items-center w-full my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                </CardFooter>
                <CardFooter className='flex flex-col gap-10'>
                    <form action={async () => {
                            // "use server"
                            await signIn("google", {
                                redirect: true,
                                callbackUrl: "/auth/home"
                            })
                        }}>
                        <Button variant="outline" className="w-full text-xl p-5">
                            <FcGoogle scale={50} /> Continue with Google 
                        </Button>
                    </form>

                    <p className='text-md'>
                        Didn't have an account? <a href="/auth/register" className="text-blue-500 underline">Signup</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
        <div className='relative w-2/3'> {/* เปลี่ยนเป็น relative และ w-1/3 */}
            <Image 
                src='/images/Elsa-nightGrow.jpeg' 
                alt='img' 
                fill 
                className="object-cover object-top"
                // priority
                // quality={95}
                unoptimized
            />
        </div>
    </div>
  )
}

export default page