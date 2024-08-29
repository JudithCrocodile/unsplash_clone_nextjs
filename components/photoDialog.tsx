import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router'
import AuthorInfo from './authorInfo'
import OperationLine from './operationLine'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoList from './photoList'
import { TypePhoto } from '@/types'
import dynamic from 'next/dynamic';
import TagList from '@/components/tagList'
import Tag from '@/components/tag'
import PhotoComponent from '@/components/photoComponent'
import Skeleton from '@mui/material/Skeleton';

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

  const CreatedTimeHtml = ()=>{
    if(typeof window !== "undefined") {
      // import DayJS from 'react-dayjs';
      // const DayJS = require('react-dayjs')
      const DayJS = dynamic(() => import('react-dayjs'), { ssr: false });
      return <span>Published on <DayJS format="MMMM d, YYYY">{ itemDetail.createTime }</DayJS></span>
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

        <DialogContent>
          {
              <div className="detail">

                <div className="flex justify-between">
                  <AuthorInfo loding={loading} authorAavatar={itemDetail.authorAavatar} author={itemDetail.author} inDetailPage={true}></AuthorInfo>

                  <div className={'my-4'}>
                    <OperationLine></OperationLine>
                  </div>                  
                </div>


                <div className="detail__photo max-w-xl w-full mx-auto">
                  {!loading ?
                    <PhotoComponent photo={itemDetail} />

                    // <Image alt={itemDetail.title} src={itemDetail.path} width="100" height="100" style={{ width: '100%' }}></Image>
                  : <Skeleton variant="rectangular" width={'100%'} height={500} />}

                </div>

                <div className="detail_description my-8">
                  <p>{itemDetail.description}</p>
                </div>

                <div className="detail__info info text-gray-400 my-6 flex flex-col gap-4">
                  {itemDetail.location && <div className="info__location gap-2">
                    <span><LocationOnIcon></LocationOnIcon></span>
                    {itemDetail.location}
                  </div>}
                  {(typeof window !== "undefined") && <div className="info__create-date flex items-center gap-2">
                    <span><CalendarTodayIcon></CalendarTodayIcon></span>
                    <CreatedTimeHtml></CreatedTimeHtml>
                  </div>}

                </div>
                <TagList>
                  {
                    photosData?.photo_tags ? photosData.photo_tags.map(t=><Tag key={t.name} name={t.name} ></Tag>)
                    : <Skeleton variant="rectangular" width={100} height={30} />
                  }
                </TagList>

                <div className="detail__other-photos">

                   <h3 className={'mb-6 text-2xl mt-[72px]'}>Related images</h3>
                   <div style={{marginTop: '-3.5rem'}}>
                    <PhotoList fullWidth showCategoryBar={false} showTitle={false} propTabId={photosData?.photo_tags?.map(t=>t._id)}></PhotoList>
                

                    </div>
                   </div>

              </div>
          }

        </DialogContent>


      </Dialog>






    </main>
  );
}
