import Image from "next/image";
import OperationBtn from '../components/operationBtn'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import React, { useState, useEffect } from 'react'

const fetcher = (url: string, params: object) => fetch(`/api${url}`, params).then((res => res.json()))

export default function LikeBtn({photoId, liked=false}: {photoId: string, liked: boolean}) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  useEffect(()=>{
    setIsLiked(liked)
  }, [liked])

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation()
    fetcher('/like', {
      method: 'POST',
      body: JSON.stringify({
        photoId,
        userId: userInfo._id
      })
    }).then(res => {
      if (res.status === 200) {
        setIsLiked(res.data)


      } else {
        setMessage('an error occured, please try again later')
        setIsShowSnackbar(true)

        setTimeout(()=>{
          setIsShowSnackbar(false)
        }, 2000)

      }
    })
  }

  return (
    <div className={""}>
      <OperationBtn activeLike={isLiked} line className={"item__favorite-btn "} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>handleBtnClick(e)}>
        <FavoriteIcon />
      </OperationBtn>

      <Snackbar
                open={isShowSnackbar}
                autoHideDuration={6000}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
    </div>
  )
}