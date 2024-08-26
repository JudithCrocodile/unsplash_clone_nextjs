import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'

export default function AvatarComponent({ size = '24px', avatarPath }: { size?: string, avatarPath?: string }) {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const path = avatarPath || userInfo.avatarPath || '/img_default-avatar.jpg'

    return (
        <div className="avatar">
            <Avatar alt={'userName'} src={path} sx={{ width: size, height: size }} />
        </div>
    )
}