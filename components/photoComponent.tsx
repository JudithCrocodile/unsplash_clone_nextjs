
import { TypePhoto } from '@/types'

export default function PhotoComponent( { photo, className, fileId }: { photo?: TypePhoto, className?: string, fileId?: string } ) {
// export default function AuthorInfo( { id, label, variant, defaultValue, slotProps, value, on }: { id: string, label: string, variant: string, defaultValue: string, slotProps: any } ) {

const imageUrl = `/api/photo/${photo?.fileId || fileId}`

    return (
        <img src={imageUrl} alt='photo' className={className} />
    )
  }