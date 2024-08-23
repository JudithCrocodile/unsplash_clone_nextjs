import Image from "next/image";
import AvatarComponent from "@/components/avatar";

export default function AuthorInfo( props ) {
    const category = 0;

    return (
        <div className={"item__author flex text-left items-center"}>
        <span>
          {props.authorAavatar && <AvatarComponent avatarPath={props.author.avatarPath} userName={props.author.userName}></AvatarComponent>}
          {/* {props.authorAavatar && <Image className={'item__avatar rounded-full mx-auto object-cover'} width='30' height='30'  style={{ height: '30px'}} src={props.authorAavatar} alt="avatar"></Image>} */}
        </span>
        <span className={`ml-2 ${props.inDetailPage && 'text-black'}`}>{props.author.userName}</span>
      </div>
    )
  }