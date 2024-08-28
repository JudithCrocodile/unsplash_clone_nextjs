import Image from "next/image";
import AvatarComponent from "@/components/avatar";
import {TypeUser} from "@/types"
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link'

export default function AuthorInfo( {authorAavatar,author, inDetailPage, loading }: {authorAavatar: string,author: TypeUser, inDetailPage: boolean, loading: boolean } ) {
    const category = 0;

    return (
        <div className={"item__author flex text-left items-center cursor-pointer"}>
        {!loading ? <Link  href={`@${author?.userName}`}>
          <span>
            <AvatarComponent avatarPath={author?.avatarPath} type="author"></AvatarComponent>
          </span>
        
        </Link>
        : <Skeleton variant="circular" width="24px" height="24px" />}
        {!loading ? <span className={`ml-2 ${inDetailPage && 'text-black'}`}>{author?.userName}</span>
        : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
      </div>
    )
  }