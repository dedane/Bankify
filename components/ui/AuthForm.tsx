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
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '../../lib/actions/user.actions'
import PlaidLink from './PlaidLink'




const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const formSchema = authformSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>) =>{
    setIsLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //SIGN UP WITH Appwrite & create plaid token
    try{
      
    if(type === 'sign-up'){
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dob!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password
        }
         const newUser = await signUp(userData);
        setUser(newUser);
      }
    if(type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if(response) router.push('/') 
      }
      
    
    }
    catch(error){
      console.log(error)
    }
    
    finally{
      setIsLoading(false)
    }
    
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
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user ? 'Link Account': type === 'sign-in' ?   'Sign In': 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                        { type === 'sign-in' ? 'Please enter your details' : 'Link your account to be started'   }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
        <div className='flex flex-col gap-4'>
          <PlaidLink  user={user} variant='primary'/>
        </div>): (<><Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type === 'sign-up' && (
          <>
          <div className=' flex gap-4'>
            <CustomInput control ={form.control} name='firstName' label='FirstName' placeholder='Enter your FirstName'/>
            <CustomInput control ={form.control} name='lastName' label='LastName' placeholder='Enter your LastName'/>
          </div>
          <CustomInput control ={form.control} name='address1' label='Address' placeholder='Enter your Address'/>
          <CustomInput control ={form.control} name='city' label='City' placeholder='Enter your City'/>
          <div className=' flex gap-4'>
            <CustomInput control ={form.control} name='state' label='State' placeholder='Example Kiambu'/>
            <CustomInput control ={form.control} name='postalCode' label='PostalCode' placeholder='Example 91022'/>
          </div>
          <div className=' flex gap-4'>
            <CustomInput control ={form.control} name='dob' label='Date-Of-Birth' placeholder='yyyy-mm-dd'/>
            <CustomInput control ={form.control} name='ssn' label='ssn' placeholder='ex: 1234'/>
          </div>
          </>
        )}

        <CustomInput control ={form.control} name='email' label='Email' placeholder='Enter your Email'/>
        <CustomInput control ={form.control} name='password' label='Password' placeholder='Enter your Password'/>
        <div className='flex flex-col gap-4'>
                    <Button type="submit" className='form-btn'>{isLoading ? 
                                            (
                                                  <><Loader2 size={20} 
                                                  className='animate-spin' />
                                                  &nbsp; loading... </>) : type === 'sign-in' ?  'Sign In': 'Sign Up' }</Button>
        </div>
      </form>
    </Form>
    
    <footer className='flex justify-center gap-1'>
      <p className='text-14 font-normal text-gray-600'>{type === 'sign-in' ?  'Dont Have an account?' : 'Already have an account?'}</p>
      <Link href={type === 'sign-in' ? '/sign-up': '/sign-in' } className='form-link'>
      {type === 'sign-in'?   'Sign Up' : 'Sign In'}</Link>
      </footer></> )}
    </section>
  )
}

export default AuthForm