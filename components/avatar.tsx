import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'

export default function AvatarComponent({ size = '24px', avatarPath, type='user' }: { size?: string, avatarPath?: string, type: string }) {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const path = type === 'author' ? avatarPath : userInfo.avatarPath;

    return (
        <div className="avatar">
            <Avatar alt={'userName'} src={path || '/img_default-avatar.jpg'} sx={{ width: size, height: size }} />
        </div>
    )
}