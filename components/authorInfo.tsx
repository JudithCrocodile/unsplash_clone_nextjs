import Image from "next/image";

export default function AuthorInfo( props ) {
    const category = 0;
    const handleCategoryChange = ()=>{}

    return (
        <div className={"item__author flex text-left items-center"}>
        <span>
          <Image className={'item__avatar rounded-full mx-auto object-cover'} width='30' height='30'  style={{ height: '30px'}} src={props.authorAavatar} alt="avatar"></Image>
        </span>
        <span className={`ml-2 ${props.inDetailPage && 'text-black'}`}>{props.author}</span>
      </div>
    )
  }