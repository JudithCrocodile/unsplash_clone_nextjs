import { NextApiRequest, NextApiResponse } from "next";
import Busboy from 'busboy'
import fs from 'fs'
import mongoose from 'mongoose'
import Photo from '../models/Photo'
import User from '../models/User'
import Tab from '../models/Tab'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()
    
    const photos = [];
    const photoDetails = []

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'No token provided'});

    // verify token
    const user = await getUserByToken(token);
    if(!user) return res.status(401).json({error: 'Invalid token'})

    if(req.method === 'POST') {
        const busboy = Busboy({headers: req.headers})
        
        busboy.on('file', (fieldname, file, filename) => {
            const filePath = `/uploads/${ new Date() + '-' + filename.filename}`
            const saveTo = `./public${filePath}`;
            photos.push({file, filePath: filePath})
            file.pipe(fs.createWriteStream(saveTo))
        })

        // photo detail
        busboy.on('field', (fieldname, value) => {
            const [key, index] = fieldname.split('_');
            photoDetails[index] = JSON.parse(value)
        })

        busboy.on('finish', async ()=>{
            try {
                for (let i = 0; i < photos.length; i++) {
                    const {tabs, location, description} = photoDetails[i]
                    const tabIds = [];

                    // find or create tab, find tab id
                    for(let tabName of tabs) {
                        if(tabName){
                            let tabDoc = await Tab.findOne({name: tabName})
                            if(!tabDoc) {
                                tabDoc = new Tab({name: tabName})
                                await tabDoc.save();
                            }

                            tabIds.push(tabDoc._id)                            
                        }

                    }

                    // save photo data
                    const newPhoto = new Photo({
                        path: photos[i].filePath, // filePath
                        location,
                        description,
                        photo_tags: tabIds,
                        author: user._id,
                        createTime: new Date(),
                    })

                    await newPhoto.save();
                }

                res.status(200).json({status:200, message: 'Upload successful'})
            } catch (error) {
                console.error(error)
                res.status(500).json({error: 'Failed to upload photos'})
            }
        })

        busboy.on('fetch', () => {
            res.status(200).json({message: 'File uploaded successfully'})
        })

        req.pipe(busboy)
          
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }



}