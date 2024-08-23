import Layout from '@/components/layout'
import UserLayout from '@/components/userLayout'
import type { ReactElement } from 'react'
import PhotoList from '@/components/photoList'
import { useSelector } from 'react-redux';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

export default function MakeSomethingAwesome() {

    return(
        <div className='flex flex-col items-center py-20'>
            <AutoAwesomeMosaicIcon fontSize="large" className="cursor-pointer md:w-12 md:h-12"></AutoAwesomeMosaicIcon>
            <p className='mt-2 text-slate-500'>Make something awesome</p>
        </div>
    )
}
