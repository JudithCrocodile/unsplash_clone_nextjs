import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState, ReactNode } from 'react'
import { Input } from '@mui/material';

export default function Search( ) {
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
        <div className={'filter-container flex-1'}>
        <div className={'filter flex gap-4 bg-gray-100 px-4 py-2 rounded-full'}>
            <div className={'filter__prefix'}>
                <SearchIcon></SearchIcon>
            </div>
            <Input value={searchInputValue} onChange={(e) => handleSearchInputChange(e.target.value)} onKeyDown={((e) => { keyDownSearchInput(e.key) })} placeholder="Search photos and illustrations" disableUnderline={true} ></Input>

        </div>

    </div>
    )
  }