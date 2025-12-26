import React from 'react'
import { IoIosGitBranch, IoIosSearch } from 'react-icons/io'
import { MdNotificationsNone } from 'react-icons/md';

type Props = {}

const Menu = (props: Props) => {
  const iconsSize = 25;
  return (
    <div className='flex flex-col justify-start items-center w-fit h-full bg-[#F2F2F2] border-[#dadada] border-l p-2 
    overflow-y-auto gap-6'>
        <span className='tool-icons'>
          <IoIosSearch size={iconsSize} />
          <span className='text-ligth'>
            Search
          </span>
        </span>
       
        <span className='tool-icons'>
          <IoIosGitBranch size={iconsSize} />
          <span className='text-ligth'>
            Version
          </span>
        </span>
    </div>
  )
}

export default Menu