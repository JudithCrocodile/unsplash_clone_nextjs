import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import OperationBtn from '../components/operationBtn'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useSelector } from 'react-redux';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogActions from '@mui/material/DialogActions';

const inter = Inter({ subsets: ["latin"] });

interface props {
    open: boolean,
    handleClose: Function
}

export default function UploadDialog({ open, handleClose }: props) {
    const token = useSelector((state: RootState) => state.auth.token)

    const onClose = () => {
        handleClose();
        setSelectedFile([])
        setSelectedFileDetail([])
        setUploadStep(0)
    }

    type fileDetailType = {
        photoUrl: string,
        tabs: string[],
        location: string,
        originalFile: File,
        description: string
    }

    const [selectedFile, setSelectedFile] = useState<File[] | []>([]);
    const [message, setMessage] = useState<string>('');
    const [selectedFileDetail, setSelectedFileDetail] = useState<fileDetailType[]>([]);
    const maxImageLength = 10;

    // 0: upload, 1: serImageDetail
    const [uploadStep, setUploadStep] = useState<number>(0);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newSelectedFile = [...selectedFile, ...e.target.files]
            // setSelectedFile([...selectedFile, ...e.target.files]);

            if(newSelectedFile.length > maxImageLength){
                newSelectedFile.splice(maxImageLength)
            }

            setSelectedFile(newSelectedFile)

            for (let i: number = 0; i < newSelectedFile.length; i++) {
                if(!selectedFileDetail[i]){
                    const reader = new FileReader();

                    reader.onload = function (file) {
                        setSelectedFileDetail((oldArray: string[]): string[] => [...oldArray, { photoUrl: file.target.result, tabs: [''], location: '', originalFile: e.target.files[i], description: '' }])
                    }
                    reader.readAsDataURL(newSelectedFile[i])
                }

            }

            setUploadStep(1)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFileDetail) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        for (let i: number = 0; i < selectedFileDetail.length; i++) {
            formData.append(`image_${i}`, selectedFileDetail[i].originalFile);
            formData.append(`photoDetails_${i}`, JSON.stringify({
                tabs: selectedFileDetail[i].tabs,
                location: selectedFileDetail[i].location,
                description: selectedFileDetail[i].description,
            }));
        }

        try {
            const res = await fetch('/api/photo/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (res.status === 200) {
                const result = await res.json();
                // setMessage(`File uploaded successfully: ${result.file.filename}`);
                onClose();
                setIsShowSnackbar(true)
            } else {
                setMessage('Failed to upload file');
            }
        } catch (error) {
            setMessage('Error uploading file');
        }
    };


    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

    const handleTabInputChange = (photoIndex: number, tabIndex: number, newValue: string) => {
        const newPhotoValues = [...selectedFileDetail]
        newPhotoValues[photoIndex].tabs[tabIndex] = newValue

        setSelectedFileDetail(newPhotoValues)
    }

    const handleDescriptionInputChange = (photoIndex: number, newValue: string) => {
        const newPhotoValues = [...selectedFileDetail]
        newPhotoValues[photoIndex].description = newValue

        setSelectedFileDetail(newPhotoValues)
    }

    const removeTab = (photoIndex: number, tabIndex: number) => {
        const newPhotoValues = [...selectedFileDetail]
        if (newPhotoValues[photoIndex].tabs.length === 1) {
            newPhotoValues[photoIndex].tabs[0] = ''

        } else {
            newPhotoValues[photoIndex].tabs.splice(tabIndex, 1)
        }

        setSelectedFileDetail(newPhotoValues)
    }

    // keydown on Enter and create a new tab
    const keyDownTab = (photoIndex: number, key: string) => {
        if (key === 'Enter') {
            const newPhotoValues = [...selectedFileDetail]
            newPhotoValues[photoIndex].tabs.push('')
            setSelectedFileDetail(newPhotoValues)
        }
    }

    const UploadInput = () => {
        return <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="image" multiple />
    }

    return (
        <main
            className={``}
        >

            <Dialog
                className={`upload-dialog`}
                open={open}
                onClose={onClose}
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
                                                sx={{boxShadow: 'unset'}}
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                className='flex flex-col items-center mt-auto cursor-pointer'
                                            >
                                                <Image width="130" height="96" alt="upload-img" src="/empty-illustration-1x.avif"></Image>
                                                <div >Drag and drop up to 10 photos or <span >browse</span> to choose a file</div>
                                                <div>JPEG only • Max 50 MB</div>
                                                {/* <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="image" multiple /> */}
                                                <UploadInput></UploadInput>
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
                                    <div style={{ 'width': '300px' }} className='text-center cursor-pointer py-8'>
                                        <Button
                                            sx={{boxShadow: 'unset'}}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            className='flex flex-col items-center mt-auto cursor-pointer'
                                        >
                                            <AddCircleIcon color="info" sx={{ 'width': '60px', height: '60px' }}></AddCircleIcon>
                                            <p className='pt-4 text-gray-500'>Add up to {maxImageLength - selectedFile.length} more images</p>
                                            <UploadInput></UploadInput>

                                        </Button>

                                    </div>
                                    <div className={`flex-1 flex gap-4 flex-wrap`}>
                                        {selectedFileDetail.map((detail, photoIndex) =>
                                            <div className={`photo `} key={photoIndex} style={{ width: '300px' }}>
                                                <div>
                                                    <img src={detail.photoUrl} alt="prev-image" width="100%" className={'photo__img flex-1'} />
                                                    <div className={`photo__container border border-gray-300 py-1 px-4`}>

                                                        {detail.tabs.map((tab, tabIndex) =>
                                                            <span key={tabIndex} className="whitespace-nowrap">
                                                                <Input sx={{ "width": '100px', '&:after': { borderBottom: 'unset' }, '&:before': { borderBottom: 'unset !important' } }} value={tab} onKeyDown={((e) => { keyDownTab(photoIndex, e.key) })} onChange={(e) => handleTabInputChange(photoIndex, tabIndex, e.target.value)} />
                                                                <CloseIcon className="cursor-pointer" fontSize="medium" sx={{ "width": '17px', 'color': 'text.secondary', '&:hover': 'text.primary' }} onClick={() => removeTab(photoIndex, tabIndex)}></CloseIcon>
                                                            </span>)}
                                                    </div>
                                                </div>

                                                <div className={`photo__description py-1 px-4`}>
                                                    <Input multiline placeholder="Add a description (optional)" sx={{ "width": '100%', '&:after': { borderBottom: 'unset' }, '&:before': { borderBottom: 'unset !important' } }} value={detail.description} onChange={(e) => handleDescriptionInputChange(photoIndex, e.target.value)} />
                                                </div>
                                            </div>

                                        )}
                                    </div>

                                </div>
                        }


                    </div>


                </DialogContent>

                <DialogActions>
                    <div className='w-full'>
                        <div className={`upload-dialog__footer border-t rounded-sm border-solid flex justify-end py-2 px-4 gap-4`}>
                            <OperationBtn line onClick={onClose}>Cancel</OperationBtn>
                            <OperationBtn line onClick={handleSubmit}>Submit to Unsplash</OperationBtn>

                        </div>                        
                    </div>

                </DialogActions>


            </Dialog>

            <Snackbar
                open={isShowSnackbar}
                autoHideDuration={6000}
                message="Upload successfully"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />

        </main>
    );
}
