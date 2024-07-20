import { FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

import {Form, Control} from 'react-hook-form'
import { authformSchema } from '../lib/utils'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
})

interface CustomInput {
  form: Control<z.infer<typeof authformSchema>>,
  name: string,
  label: string,
  placeholder: string


}

const CustomInput = (   {control, name, label, placeholder}: CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
        <div className='form-item'>
      
        <FormLabel className='form-label'>{label}</FormLabel>
        <div className='flex w-full flex-col'>

        </div>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        
        <FormMessage className='form-message mt-2'/>
      
      </div>
    )}
  />
  )
}

export default CustomInput