import { FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

import {Form, Control, FieldPath} from 'react-hook-form'
import { authformSchema } from '../lib/utils'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
})

interface CustomInput {
  control: Control<z.infer<typeof authformSchema>>,
  name: FieldPath<z.infer<typeof authformSchema>>,
  label: string,
  placeholder: string


}

const CustomInput = ({ control, name, label, placeholder}: CustomInput) => {
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
          <Input placeholder={placeholder} className='input-class' type={ name === 'password ' ? 'password': 'text'} {...field} />
        </FormControl>
        
        <FormMessage className='form-message mt-2'/>
      
      </div>
    )}
  />
  )
}

export default CustomInput