
import { TypePhoto } from '@/types'
import Image from "next/image";
import { CldImage } from 'next-cloudinary';

export default function PhotoComponent({ photo, className, fileId }: { photo?: TypePhoto, className?: string, fileId?: string }) {
    // export default function AuthorInfo( { id, label, variant, defaultValue, slotProps, value, on }: { id: string, label: string, variant: string, defaultValue: string, slotProps: any } ) {

    // const imageUrl = process.env.NEXT_PUBLIC_DOMAIN + `/api/photo/${photo?.fileId || fileId}`

    const fileIdValue = photo?.fileId || fileId;
    const hasRemoteUrl = photo?.path && (photo.path.startsWith('http://') || photo.path.startsWith('https://'));
    const imageUrl = hasRemoteUrl ? photo?.path || '' : (fileIdValue ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/photo/${fileIdValue}` : '');
    return (
        (hasRemoteUrl && photo?.path)
            ? <CldImage alt={photo?.description || 'photo'} src={photo.path} width="100" height="100" style={{ width: '100%', height: '100%' }}></CldImage>
            : <Image src={imageUrl} alt='photo' className={className} width="100" height="100" style={{ width: '100%', height: '100%' }} />

    )
}