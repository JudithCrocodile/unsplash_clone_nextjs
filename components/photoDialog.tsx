import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router'
import AuthorInfo from './authorInfo'
import LikeBtn from '@/components/likeBtn'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoList from './photoList'
import { TypePhoto, TypeUser } from '@/types'
import dynamic from 'next/dynamic';
import TagList from '@/components/tagList'
import Tag from '@/components/tag'
import PhotoComponent from '@/components/photoComponent'
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import Link from 'next/link'

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))
const inter = Inter({ subsets: ["latin"] });

type Props = {
  photoId: string;
};

export default function Photo({ photoId }: Props) {
  const token = useSelector((state: RootState) => state.auth.token)

  const [photosData, setPhotosData] = useState<TypePhoto>({
    _id: '',
    path: '',
    title: '',
    descriptio: '',
    author: {
      _id: '',
      userName: '',
      email: '',
      password: '',
      created_at: '',
      updated_at: '',
      firstName: '',
      lastName: '',
      fileId: '',
    },
    authorAavatar: '',
    location: '',
    createTime: '',
    photo_tags: [],
    fileId: '',
    liked: false,
    description: '',
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getPhotoData()
  }, []);

  const getPhotoData = (): void => {
    setLoading(true)
    fetcher(`/photo/get-photo/${photoId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
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

  const CreatedTimeHtml = () => {
    if (typeof window !== "undefined") {
      // import DayJS from 'react-dayjs';
      // const DayJS = require('react-dayjs')
      const DayJS = dynamic(() => import('react-dayjs'), { ssr: false });
      return <span>Published on <DayJS format="MMMM d, YYYY">{photosData.createTime}</DayJS></span>
    }
    return <span></span>


  }

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

        <DialogContent sx={{ padding: '0' }}>
          {
            <div className="detail">
              <div className="p-3">
                <div className="flex justify-between flex-col md:flex-row">
                  <AuthorInfo loading={loading} author={photosData.author} inDetailPage={true}></AuthorInfo>

                  <div className={'mt-4'}>
                    <LikeBtn photoId={photosData._id} liked={photosData.liked}></LikeBtn>
                  </div>
                </div>
              </div>

              <div className="detail__photo max-w-xl w-full mx-auto">
                {!loading ?
                  <PhotoComponent photo={photosData} />
                  : <Skeleton variant="rectangular" width={'100%'} height={500} />}

              </div>

              <div className="p-3">
                <div className="detail_description my-8 whitespace-pre">
                  <p>{photosData.description}</p>
                </div>

                <div className="detail__info info text-gray-400 my-6 flex flex-col gap-4">
                  {photosData.location && <div className="info__location gap-2 text-sm">
                    <span><LocationOnIcon sx={{width: '12px', height: '12px', marginTop: '-2px'}}></LocationOnIcon></span>
                    {photosData.location}
                  </div>}
                  {(typeof window !== "undefined") && <div className="info__create-date flex items-center gap-2 text-sm">
                    <span><CalendarTodayIcon  sx={{width: '12px', height: '12px', marginTop: '-2px'}}></CalendarTodayIcon></span>
                    <CreatedTimeHtml ></CreatedTimeHtml>
                  </div>}

                </div>
                <TagList>
                  {
                    photosData?.photo_tags ? photosData.photo_tags.map(t => <Link key={t.name} href={`/s/photos/${t.name}`}><Tag name={t.name} ></Tag></Link>)
                      : <Skeleton variant="rectangular" width={100} height={30} />
                  }
                </TagList>

                <div className="detail__other-photos">

                  <h3 className={'mb-6 text-2xl mt-[72px]'}>Related images</h3>
                  <div style={{ marginTop: '-3.5rem' }}>
                    <PhotoList inDetailPage showCategoryBar={false} showTitle={false} propTabId={photosData?.photo_tags?.map(t => t._id)}></PhotoList>


                  </div>
                </div>
              </div>



            </div>
          }

        </DialogContent>


      </Dialog>






    </main>
  );
}
