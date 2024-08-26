import Image from "next/image";
import AvatarComponent from "@/components/avatar";
import {TypeUser} from "@/types"

export default function AuthorInfo( {authorAavatar,author, inDetailPage }: {authorAavatar: string,author: TypeUser, inDetailPage: boolean } ) {
    const category = 0;

    return (
        <div className={"item__author flex text-left items-center"}>
        <span>
          {authorAavatar && <AvatarComponent avatarPath={author.avatarPath}></AvatarComponent>}
          {/* {props.authorAavatar && <Image className={'item__avatar rounded-full mx-auto object-cover'} width='30' height='30'  style={{ height: '30px'}} src={props.authorAavatar} alt="avatar"></Image>} */}
        </span>
        <span className={`ml-2 ${inDetailPage && 'text-black'}`}>{author.userName}</span>
      </div>
    )
  }