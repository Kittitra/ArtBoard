
import React from 'react'
import { RxCheckCircled } from "react-icons/rx";

interface formSuccess {
    message?: string
}

const FormSuccess = ({
    message,

}:formSuccess) => {
    if(!message) return null;
  return (
    <div className=' bg-emerald-200 text-emerald-500 p-3 flex rounded-md items-center gap-x-2 text-sm'>
        <RxCheckCircled size={25} />
        {message}
    </div>
  )
}

export default FormSuccess
