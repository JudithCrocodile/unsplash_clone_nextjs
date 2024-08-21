import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router'
import AuthorInfo from '../components/authorInfo'
import OperationLine from '../components/operationLine'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoList from '../components/photoList'
import useSWR from 'swr';
import { TypePhoto } from '@/types'

const fetcher = (url: string) => fetch(`api${url}`).then((res => res.json()))
const inter = Inter({ subsets: ["latin"] });

type Props = {
  photoId: string;
};

export default function Photo({ photoId }: Props) {
  const [photosData, setPhotosData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getPhotoData()
  }, []);

  const getPhotoData = (): void => {
    setLoading(true)
    fetcher(`/photo/get-photo/${photoId}`).then(res => {
      if (res.status === 200) {
        setPhotosData(res.data)
        setLoading(false)
      }
    })
  }



  const router = useRouter()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    router.push(`/`, undefined, { shallow: true })
  };

  useEffect(() => {
    setOpen(true)
    // Your code here
  }, []);


  const itemDetail: TypePhoto = photosData

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: {
                xs: "100%",
                md: "90vw",
                maxWidth: "unset",

              },
              minWidth: {
                xs: "unset",
                md: "500px",
                maxWidth: "unset",
                margin: 0,
              },
            },
          },
        }}
      >

        <DialogContent>
          {
            photosData?.path ?
              <div className="detail">
                <AuthorInfo authorAavatar={itemDetail.authorAavatar} author={itemDetail.author} inDetailPage={true}></AuthorInfo>

                <div className={'my-4'}>
                  <OperationLine></OperationLine>
                </div>

                <div className="detail__photo max-w-xl w-full mx-auto">
                  <Image alt={itemDetail.title} src={itemDetail.path} width="100" height="100" style={{ width: '100%' }}></Image>

                </div>

                <div className="detail__info info text-slate-400 my-6 flex flex-col gap-4">
                  <div className="info__location">
                    <span><LocationOnIcon></LocationOnIcon></span>
                    {itemDetail.location}
                  </div>
                  <div className="info__create-date">
                    <span><CalendarTodayIcon></CalendarTodayIcon></span>
                    {itemDetail.createTime}
                  </div>

                </div>
                <div className="detail__tabs">

                </div>
                <div className="detail__other-photos">
                  <h3>Related images</h3>
                  <PhotoList></PhotoList>
                </div>

              </div>
              : <div>Loading...</div>
          }

        </DialogContent>


      </Dialog>






    </main>
  );
}
