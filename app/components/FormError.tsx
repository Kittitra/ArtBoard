import React from 'react'
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface formError {
    message?: string
}

const FormError = ({
    message,

}:formError) => {
    if(!message) return null;
  return (
    <div className=' bg-destructive/15 text-destructive p-3 flex rounded-md items-center gap-x-2 text-sm'>
        <HiOutlineExclamationTriangle size={25} />
        {message}
    </div>
  )
}

export default FormError