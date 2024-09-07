import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState, ReactNode } from 'react'
import { Input } from '@mui/material';

export default function Search({round='rounded-full'}: {round?: string}) {
   const router = useRouter()
const [searchInputValue, setSearchInputValue] = useState<string>('')

const keyDownSearchInput = (key: string) => {
    if (key === 'Enter') {
        router.push(`/s/photos/${searchInputValue}`)
    }
}
const handleSearchInputChange = (newValue: string) => {
    setSearchInputValue(newValue)
}


    return (
        <div className={'filter-container w-full'}>
        <div className={`filter flex gap-3 bg-gray-100 px-4 py-2 ${round}`}>
            <div className={'filter__prefix text-[#767676]'}>
                <SearchIcon sx={{marginTop: '4px'}}></SearchIcon>
            </div>
            <Input className='w-full' value={searchInputValue} onChange={(e) => handleSearchInputChange(e.target.value)} onKeyDown={((e) => { keyDownSearchInput(e.key) })} placeholder="Search photos and illustrations" disableUnderline={true} ></Input>

        </div>

    </div>
    )
  }