import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import OperationBtn from '../components/operationBtn'
import Button from '@mui/material/Button';

const inter = Inter({ subsets: ["latin"] });

interface props {
    open: boolean,
    handleClose: Function
}

// function submit() {

// }

export default function UploadDialog({ open, handleClose }: props) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [prevImage, setPrevImage] = useState<string>('');

    // 0: upload, 1: serImageDetail
    const [uploadStep, setUploadStep] = useState<number>(0);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            console.log(e.target.files[0])

            const reader = new FileReader();

            reader.onload = function (e) {
                setPrevImage(e.target.result)
            }

            reader.readAsDataURL(e.target.files[0])

            setUploadStep(1)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log('formData.get("image");', formData.get("image"))

        try {
            const res = await fetch('/api/photo/upload', {
                method: 'POST',
                body: formData,
            });

            console.log('res', res)

            if (res.ok) {
                const result = await res.json();
                setMessage(`File uploaded successfully: ${result.file.filename}`);
            } else {
                setMessage('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file');
        }
    };

    return (
        <main
            className={``}
        >

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



                <DialogContent sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>

                    <div className="flex flex-col h-full">
                        {
                            uploadStep === 0 ?
                                <div className={`upload-dialog__body flex-1 px-4 pb-4`}>
                                    <div className="p-4 border-2 rounded-sm border-dashed flex flex-col h-full">
                                        <div className='flex flex-col items-center mt-auto cursor-pointer'>

                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                className='flex flex-col items-center mt-auto cursor-pointer'
                                            >
                                                <Image width="130" height="96" alt="upload-img" src="/empty-illustration-1x.avif"></Image>
                                                <div >Drag and drop up to 10 photos or <span >browse</span> to choose a file</div>
                                                <div>JPEG only • Max 50 MB</div>
                                                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="image" />
                                            </Button>
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
                                :
                                // set image detail
                                <div className={`upload-dialog__body flex-1 px-4 pb-4`}>
                                    <img src={prevImage} alt="prev-image" width="200" />
                                </div>
                        }

                        <div className={`upload-dialog__footer border-t rounded-sm border-solid flex justify-end py-2 px-4`}>
                            <OperationBtn line className="mr-2" onClick={handleClose}>Cancel</OperationBtn>
                            <OperationBtn line onClick={handleSubmit}>Submit to Unsplash</OperationBtn>

                        </div>
                    </div>


                </DialogContent>


            </Dialog>






        </main>
    );
}
