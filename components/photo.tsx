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

const inter = Inter({ subsets: ["latin"] });

export default function Photo() {
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


  const itemDetail = 
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Gurugram, Haryana, India',
      createTime: '2024-07-01',
      
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
              },  // Set your width here
              // '@media (max-width: 780px)': {
              //   width: '100%',
              //   minWidth: "unset", 
              // }
            },
          },
        }}
      >

        <DialogContent>
        <div className="detail">
          <AuthorInfo authorAavatar={itemDetail.authorAavatar} author={itemDetail.author} inDetailPage={true}></AuthorInfo>
          
          <div className={'my-4'}>
            <OperationLine></OperationLine>
          </div>
          
          <div className="detail__photo max-w-xl w-full mx-auto">
            <Image alt={itemDetail.title} src={itemDetail.img} width="100" height="100" style={{width: '100%'}}></Image>

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
        </DialogContent>


      </Dialog>






    </main>
  );
}
