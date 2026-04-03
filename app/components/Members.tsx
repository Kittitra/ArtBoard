import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

type Props = {}

const Members = (props: Props) => {

    const user = useCurrentUser();

  return (
    <div className='flex flex-col w-full h-fit rounded-t-2xl bg-[#f2f2f2] border-[#dadada] border'>
        <div className='flex flex-row  justify-between items-center p-2 px-10'>
            <span>Name</span>
            <span>Email</span>
            <span>Join</span>
            <span>Role</span>
        </div>
        <hr />
        <div className='flex flex-row  justify-between items-center w-full h-fit py-5 px-10'>
            <span>{user?.name}</span>
            <span>{user?.email}</span>
            <span>{user?.createdAt?.split(' ').map((part, i) => (
                <span key={i}>{part}</span>
            ))}</span>
            <span>Owner</span>
        </div>
    </div>
  )
}

export default Members