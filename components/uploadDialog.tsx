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
import OperationBtn from '../components/operationBtn'

const inter = Inter({ subsets: ["latin"] });

export default function UploadDialog({ open, handleClose }) {



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
            className={``}
        >
            uploadDialog: {open}

            <Dialog
                className={`upload-dialog`}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: {
                                xs: "100%",
                                sm: "90vw",
                                maxWidth: "unset",

                            },
                            height: {
                                xs: "100%",
                                sm: "70vh",
                                maxWidth: "unset",

                            },
                            minWidth: {
                                xs: "unset",
                                sm: "500px",
                                maxWidth: "unset",
                                margin: 0,
                            },
                        },
                    },
                }}
            >

                <DialogTitle>Submit to Unsplash</DialogTitle>

                <DialogContent sx={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>

                    <div className="flex flex-col h-full">
                        <div className={`upload-dialog__body flex-1 px-4 pb-4`}>
                            <div className="p-4 border-2 rounded-sm border-dashed flex flex-col h-full">
                                <div className='flex flex-col items-center mt-auto cursor-pointer'>
                                    <Image width="130" height="96" alt="upload-img" src="/empty-illustration-1x.avif"></Image>
                                    <div >Drag and drop up to 10 photos or <span >browse</span> to choose a file</div>
                                    <div>JPEG only • Max 50 MB</div>
                                </div>
                                <div className="mt-auto flex text-xs justify-between">
                                    <ul>
                                        <li>High quality images (for photos, at least 5MP)</li>
                                        <li>Images are clear & original</li>

                                    </ul>
                                    <ul>
                                        <li>Only upload images you own the rights to</li>
                                        <li>Zero tolerance for nudity, violence or hate</li>
                                    </ul>
                                    <ul>
                                        <li>Respect the intellectual property of others</li>
                                        {/* <li>Read the Unsplash Terms</li> */}
                                    </ul>

                                </div>                            
                            </div>



                        </div>
                        <div className={`upload-dialog__footer border-t rounded-sm border-solid flex justify-end py-2 px-4`}>
                            <OperationBtn line className="mr-2" onClick={handleClose}>Cancel</OperationBtn>
                            <OperationBtn line>Submit to Unsplash</OperationBtn>

                        </div>                        
                    </div>


                </DialogContent>


            </Dialog>






        </main>
    );
}
