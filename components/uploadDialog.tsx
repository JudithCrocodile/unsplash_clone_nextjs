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
import PlaceIcon from '@mui/icons-material/Place';
import { useRouter } from 'next/router'
import {logout} from '@/store/auth'
import {useDispatch} from 'react-redux'
import {removeUserInfo} from '@/store/user'
import type { RootState } from '@/store'

const inter = Inter({ subsets: ["latin"] });

interface props {
    open: boolean,
    handleClose: Function
}

export default function UploadDialog({ open, handleClose }: props) {
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();

    const onClose = () => {
        handleClose();
        setSelectedFile([])
        setSelectedFileDetail([])
        setUploadStep(0)
    }

    type fileDetailType = {
        photoUrl: string | ArrayBuffer | null | undefined,
        tabs: string[],
        location: string,
        originalFile: string | File | Blob | undefined,
        description: string,
        newTagInputValue: string
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

            if (newSelectedFile.length > maxImageLength) {
                newSelectedFile.splice(maxImageLength)
            }

            setSelectedFile(newSelectedFile)

            for (let i: number = 0; i < newSelectedFile.length; i++) {
                if (!selectedFileDetail[i]) {
                    const reader = new FileReader();

                    reader.onload = function (file) {
                        setSelectedFileDetail((oldArray: fileDetailType[]): fileDetailType[] => [...oldArray, { photoUrl: file?.target?.result, tabs: [], location: '', originalFile: e.target.files ? e?.target?.files[i] : undefined, description: '', newTagInputValue: '' }])
                    }
                    reader.readAsDataURL(newSelectedFile[i])
                }

            }

            setUploadStep(1)
        }
    };

    const removePhoto = (photoIndex: number) => {
        const newPhotoValues = [...selectedFileDetail]
        newPhotoValues.splice(photoIndex, 1)

        setSelectedFileDetail(newPhotoValues)

        const newSelectedFile = [...selectedFile]
        newSelectedFile.splice(photoIndex, 1)

        setSelectedFile(newSelectedFile)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFileDetail) {
            setMessage('Please select a file first.');
            setIsShowSnackbar(true)
            return;
        }

        const formData = new FormData();
        for (let i: number = 0; i < selectedFileDetail.length; i++) {
            const file = selectedFileDetail[i].originalFile
            if(file){
                formData.append(`image_${i}`, file);
                formData.append(`photoDetails_${i}`, JSON.stringify({
                    tabs: selectedFileDetail[i].tabs,
                    location: selectedFileDetail[i].location,
                    description: selectedFileDetail[i].description,
                }));                
            }

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
                onClose();
                setMessage('Upload successfully')
                setIsShowSnackbar(true)
                window.location.href = '/';
            }else if(res.status === 401) {
                dispatch(logout())
                dispatch(removeUserInfo())
                onClose();
                router.push(`/login`)
                setMessage('Please login');
                setIsShowSnackbar(true)
            } else {
                setMessage('Failed to upload file');
                setIsShowSnackbar(true)
            }
        } catch (error) {
            setMessage('Error uploading file');
            setIsShowSnackbar(true)
        }
    };

    useEffect(()=>{
setTimeout(()=>{
    setIsShowSnackbar(false)
}, 2000)
    }, [message])


    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

    const handleLocationInputChange = (photoIndex: number, newValue: string) => {
        const newPhotoValues = [...selectedFileDetail]
        newPhotoValues[photoIndex].location = newValue

        setSelectedFileDetail(newPhotoValues)
    }

    const handleTabInputChange = (newValue: string, photoIndex: number) => {
        const newPhotoValues = [...selectedFileDetail]
        newPhotoValues[photoIndex].newTagInputValue = newValue

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
            newPhotoValues[photoIndex].tabs.push(newPhotoValues[photoIndex].newTagInputValue)
            newPhotoValues[photoIndex].newTagInputValue = ''

            setSelectedFileDetail(newPhotoValues)
        }
    }

    const UploadInput = () => {
        return <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="image" multiple accept="image/png, image/jpeg, image/jpg" />
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
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                className='flex flex-col items-center mt-auto cursor-pointer'
                                                sx={{
                                                    boxShadow: 'unset',
                                                    ':hover': {
                                                        backgroundColor: 'unset',
                                                    boxShadow: 'unset',
                                                    }
                                                }}
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
                                            sx={{ boxShadow: 'unset' }}
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            className='flex flex-col items-center mt-auto cursor-pointer'
                                        >
                                            <AddCircleIcon color="info" sx={{ 'width': '60px', height: '60px' }}></AddCircleIcon>
                                            <p className='pt-4 text-gray-500'>Add up to {maxImageLength - selectedFileDetail.length} more images</p>
                                            <UploadInput></UploadInput>

                                        </Button>

                                    </div>
                                    <div className={`flex-1 flex gap-4 flex-wrap`}>
                                        {selectedFileDetail.map((detail, photoIndex) =>
                                            <div className={`photo `} key={photoIndex} style={{ width: '300px' }}>
                                                <div>
                                                    <div className="photo__img-container cursor-pointer relative">
                                                        <img src={detail.photoUrl as string} alt="prev-image" width="100%" className={'photo__img flex-1'} />
                                                        <div className="photo__img-detail-container absolute top-0 right-0 w-full h-full text-white">
                                                            <div className="photo__remove-btn-container top-2 right-2 absolute w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                                                                <CloseIcon color="primary" className="cursor-pointer" fontSize="medium" sx={{ "width": '17px', '&:hover': 'text.primary' }} onClick={() => removePhoto(photoIndex)}></CloseIcon>
                                                            </div>
                                                            <div className="photo_location-container absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1 text-xs">
                                                                <PlaceIcon className="top-0 right-0 mt-[-0.5rem]"></PlaceIcon>
                                                                <Input className="text-white ml-2" placeholder="Add location" sx={{
                                                                    "width": '100px', '&:after': { borderBottom: 'unset' }, '&:before': { borderBottom: 'unset !important' }, 
                                                                    input: {
                                                                        '&::placeholder': {color: 'white'},
                                                                        color: 'white'
                                                                    }
                                                                    
                                                                }} value={detail.location} onChange={(e) => handleLocationInputChange(photoIndex, e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={`photo__container border border-gray-300 py-1 px-4`}>

                                                        {detail.tabs.map((tab, tabIndex) =>
                                                            <span key={tabIndex} className="whitespace-nowrap mx-1">
                                                                <span>{tab}</span>
                                                                <CloseIcon className="cursor-pointer ml-2 mt-[-0.2rem]" fontSize="medium" sx={{ "width": '17px', 'color': 'text.secondary', '&:hover': 'text.primary' }} onClick={() => removeTab(photoIndex, tabIndex)}></CloseIcon>
                                                            </span>)}
                                                        <span className="px-2">


                                                            <Input placeholder="Add a tag" sx={{ "width": '100px', '&:after': { borderBottom: 'unset' }, '&:before': { borderBottom: 'unset !important' } }} value={detail.newTagInputValue} onKeyDown={((e) => { keyDownTab(photoIndex, e.key) })} onChange={(e) => handleTabInputChange(e.target.value, photoIndex)} />
                                                        </span>
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
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />

        </main>
    );
}
