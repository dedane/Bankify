"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { authformSchema } from '../../lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import CustomInput from '../CustomInput'




const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState(null)
     // 1. Define your form.
  const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer flex-items-center gap-1 '>
                <Image
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='horizon-logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        Horizon
                    </h1>
            </Link>
            <div className=' flex flex-col gap-1 md:gap-3 '>
                <h1>
                    {user ? 'Link Account': type === 'sign-in' ? 'Sign In': 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to be started' : 'Please enter your details'}
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
        <div className='flex flex-col gap-4'>

        </div>): (<><Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomInput control ={form.control} name='username' label='Username' placeholder='Enter your username'/>
        <CustomInput control ={form.control} name='password' label='Password' placeholder='Enter your Password'/>
        <Button type="submit">Submit</Button>
      </form>
    </Form></> )}
    </section>
  )
}

export default AuthForm