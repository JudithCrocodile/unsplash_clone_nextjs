import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import PhotoComponent from '@/components/photoComponent'

export default function AvatarComponent({ size = '24px', fileId, type='user' }: { size?: string, fileId?: string, type?: string }) {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const id = type === 'author' ? fileId : userInfo.fileId;

    return (
        <div className="avatar" style={{ width: size, height: size }}>
            {id ? <PhotoComponent fileId={id} className='rounded-full' />
            : <Image alt="avatar" src="/img_default-avatar.jpg" className='rounded-full' width="100" height="100" />}
            {/* <Avatar alt={'userName'} src={path || '/img_default-avatar.jpg'} sx={{ width: size, height: size }} /> */}
        </div>
    )
}