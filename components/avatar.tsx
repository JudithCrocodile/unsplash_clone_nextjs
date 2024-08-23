import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

export default function AvatarComponent({size= '24px'}: {size: string}) {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const avatarPath = userInfo.avatarPath || '/img_default-avatar.jpg'

    console.log('userInfo', userInfo)

    return (
        <div className="avatar">
            <Avatar alt={'userName'} src={avatarPath} sx={{ width: size, height: size }} />
        </div>
    )
  }