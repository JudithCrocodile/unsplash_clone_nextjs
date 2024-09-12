
import { TypePhoto } from '@/types'
import Image from "next/image";

export default function PhotoComponent( { photo, className, fileId }: { photo?: TypePhoto, className?: string, fileId?: string } ) {
// export default function AuthorInfo( { id, label, variant, defaultValue, slotProps, value, on }: { id: string, label: string, variant: string, defaultValue: string, slotProps: any } ) {

const imageUrl = `https://unsplash-clone-nextjs.vercel.app/api/photo/${photo?.fileId || fileId}`

    return (
        <Image src={imageUrl} alt='photo' className={className} width="100" height="100" style={{width: '100%', height: '100%'}} />
    )
  }