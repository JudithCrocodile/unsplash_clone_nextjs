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
import { logout } from '@/store/auth'
import { useDispatch } from 'react-redux'
import { removeUserInfo } from '@/store/user'
import type { RootState } from '@/store'
import ImageIcon from '@mui/icons-material/Image';

const inter = Inter({ subsets: ["latin"] });

interface props {
    open: boolean,
    handleClose: Function
}

export default function UploadDialog({ open, handleClose }: props) {
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();

    const photoMaxSize = 50 * 1024 * 1024; // 50MB
    const minSizeLimitation = false;

    const onClose = () => {
        handleClose();
        setSelectedFile([])
        setSelectedFileDetail([])
        setUploadStep(0)
        setErrorPhotos([])
    }

    type fileDetailType = {
        photoUrl: string | ArrayBuffer | null | undefined,
        tabs: string[],
        location: string,
        originalFile: string | File | Blob | undefined,
        description: string,
        newTagInputValue: string
    }
    type errorPhotosType = {
        photoUrl: string | ArrayBuffer | null | undefined,
        originalFile: File | undefined,
    }

    const [selectedFile, setSelectedFile] = useState<File[] | []>([]);
    const [message, setMessage] = useState<string>('');
    const [selectedFileDetail, setSelectedFileDetail] = useState<fileDetailType[]>([]);
    const [errorPhotos, setErrorPhotos] = useState<errorPhotosType[]>([]);

    const maxImageLength = 10;

    // 0: upload, 1: serImageDetail
    const [uploadStep, setUploadStep] = useState<number>(0);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newSelectedFile = [...selectedFile, ...e.target.files]
            // setSelectedFile([...selectedFile, ...e.target.files]);

            if (newSelectedFile.length > maxImageLength) {
                newSelectedFile.splice(maxImageLength - errorPhotos.length)
            }

            setSelectedFile(newSelectedFile)

            for (let i: number = 0; i < newSelectedFile.length; i++) {

                if (!selectedFileDetail[i]) {
                    const reader = new FileReader();

                    reader.onload = function (file) {
                        if (minSizeLimitation && (newSelectedFile[i].size < photoMaxSize)) {
                            const newErrorPhotos = [...errorPhotos, { originalFile: newSelectedFile[i], photoUrl: file?.target?.result }]

                            setErrorPhotos(newErrorPhotos)
                        } else {
                            setSelectedFileDetail((oldArray: fileDetailType[]): fileDetailType[] => [...oldArray, { photoUrl: file?.target?.result, tabs: [], location: '', originalFile: e.target.files ? e?.target?.files[i] : undefined, description: '', newTagInputValue: '' }])
                        }
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
            if (file) {
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
            } else if (res.status === 401) {
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

    useEffect(() => {
        setTimeout(() => {
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

    const handleRemoveErrorPhotos = () => {
        setErrorPhotos([])
        if (selectedFileDetail.length === 0) {
            setUploadStep(0)
        }
    }

    const [files, setFiles] = React.useState([]);

//   const onDropHandler = (ev) => {
//     console.log('onDropHandler' )
//     ev.preventDefault();

//     let file = "";
//     if (ev.dataTransfer.items) {
//       // Use DataTransferItemList interface to access the file(s)
//       file =
//         [...ev.dataTransfer.items]
//           .find((item: any) => item.kind === "file")
//           .getAsFile() ;
//     } else {
//       // Use DataTransfer interface to access the file(s)
//       file = ev.dataTransfer.files[0];
//     }
//     setFiles([...files, file]);

//     console.log('ev.dataTransfer.items',ev.dataTransfer.items)
//     console.log('file',file)
//   };

//   const onDragOver = (ev) => ev.preventDefault();

    return (
        <main
            className={``}
            
        >

        {/* <div id="drop_zone" onDrop={onDropHandler} onDragOver={onDragOver} className="w-screen h-screen fixed ">
           <div> Selected files: </div>
        {files.map((file) => (
          <div key={file.name} style={{color: "green",fontWeight: "bold" }}>{file.name}</div>
        ))} 
        </div> */}

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
                                sm: "90vh",
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

                <DialogTitle sx={{
                    fontSize: '15px'
                }}>Submit to Unsplash</DialogTitle>



                <DialogContent sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>

                    <div className="flex flex-col h-full" id="drop_zone">
                    {/* <div className="flex flex-col h-full" id="drop_zone" onDrop={onDropHandler} onDragOver={onDragOver}> */}
                        {
                            uploadStep === 0 ?
                                <div className={`upload-dialog__body flex-1 px-4 pb-4`}>
                                    <div className="py-6 px-8 border-2 rounded-sm border-dashed flex flex-col h-full">
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
                                                <h3 className="md:text-3xl md:font-bold normal-case mb-4 mt-6">Upload a photo <span className="border border-black/12 shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] text-[#767676] p-[2px_8px] sm:rounded-lg sm:text-lg sm:leading-7 rounded-md text-sm">JPEG</span></h3>
                                                <div className="normal-case text-center text-lg font-normal hidden md:block">
                                                    <p >Drag and drop up to 10 photos or <br /><span className="text-[#007fff]">browse</span> to choose a file</p>
                                                    <p className="text-[#767676] text-sm mt-4">Max 50 MB</p>
                                                </div>

                                                <UploadInput></UploadInput>
                                            </Button>
                                        </div>
                                        <div className="mt-auto flex text-sm justify-between text-[#767676] gap-4 w-11/12 ml-auto mr-auto">
                                            <ul className="list-disc">
                                                <li><span className="font-bold">High quality</span> images (for photos, at least 5MP)</li>
                                                <li>Images are <span className="font-bold">clear & original</span></li>

                                            </ul>
                                            <ul className="list-disc">
                                                <li>Only upload images you <span className="font-bold">own the rights to</span></li>
                                                <li>Zero tolerance for nudity, violence or hate</li>
                                            </ul>
                                            <ul className="list-disc">
                                                <li>Respect the intellectual property of others</li>
                                                {/* <li>Read the Unsplash Terms</li> */}
                                            </ul>

                                        </div>
                                    </div>



                                </div>
                                :
                                // set image detail
                                <div className={`upload-dialog__body flex-1 px-4 pb-4`}>
                                    {errorPhotos.length && <div className="bg-[#fceeeb] rounded-[2px] flex flex-col p-4 gap-4 text-[15px]" style={{ 'width': '356px' }}>
                                        <p className="font-semibold">Unfortunately we had trouble uploading the following files:</p>
                                        <div className="flex gap-[10px]">
                                            <span className="text-[#e25c3d]"><ImageIcon sx={{ width: '16px', height: '16px' }}></ImageIcon></span>
                                            <div>
                                                <p>{errorPhotos.length} file did not meet the minimum size</p>
                                                <p className="text-[#767676] text-xs leading-[1.33]">Please upload images over 5MP</p>
                                                <div className="flex gap-1 mt-[10px]">
                                                    {errorPhotos.map((photo, photoIndex) =>
                                                        <div key={photoIndex} className="w-20 flex gap-1 flex-col">
                                                            <img src={photo.photoUrl as string} alt="" className="object-cover h-[53.33333px]" />
                                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">{photo.originalFile?.name}</div>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="font-semibold">You may re-upload them or proceed to publishing without these images.</div>
                                        <OperationBtn line onClick={handleRemoveErrorPhotos}>OK, got it</OperationBtn>

                                    </div>}
                                    <div style={{ 'width': '356px' }} className='text-center cursor-pointer py-6 px-4 border-dashed border-2 border-gray-300 mt-4'>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            className='flex flex-col items-center mt-auto cursor-pointer'
                                            sx={{
                                                padding: 0,
                                                boxShadow: 'unset',
                                                ':hover': {
                                                    backgroundColor: 'unset',
                                                    boxShadow: 'unset',
                                                }
                                            }}
                                        >
                                            <AddCircleIcon color="info" sx={{ 'width': '60px', height: '60px' }}></AddCircleIcon>
                                            <p className='pt-2 text-gray-500 font-normal'>Add up to {maxImageLength - selectedFileDetail.length - errorPhotos.length} more images</p>
                                            <UploadInput></UploadInput>

                                        </Button>

                                    </div>
                                    <div className={`flex-1 flex gap-8 flex-wrap`}>
                                        {selectedFileDetail.map((detail, photoIndex) =>
                                            <div className={`photo `} key={photoIndex} style={{ width: '356px' }}>
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
                                                                        '&::placeholder': { color: 'white' },
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
                            {
                                uploadStep === 0 ?
                                    <OperationBtn line onClick={handleSubmit} disabled={uploadStep === 0}>Submit to Unsplash</OperationBtn>
                                    :
                                    <OperationBtn line onClick={handleSubmit} disabled={selectedFileDetail.length === 0}>Submit {selectedFileDetail.length}</OperationBtn>
                            }



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
