import { NextApiRequest, NextApiResponse } from "next";
import Busboy from 'busboy'
import fs from 'fs'
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    let avatar: {
        filePath: string,
        file: any
    } = {
        filePath: '', 
        file: null
    }

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'No token provided'});

    // verify token
    const user = await getUserByToken(token);
    if(!user) return res.status(401).json({error: 'Invalid token'})

    if(req.method === 'POST') {
        const busboy = Busboy({headers: req.headers})
        
        busboy.on('file', (fieldname, file, filename) => {
            const filePath = `/uploads/avatars/${ new Date() + '-' + filename.filename}`
            const saveTo = `./public${filePath}`;
            // photos.push({file, filePath: filePath})
            avatar = {...file, filePath: filePath}
            file.pipe(fs.createWriteStream(saveTo))
        })


        busboy.on('finish', async ()=>{
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    {'avatarPath': avatar.filePath},
                )

                if(!updatedUser) {
                    res.status(404).json({error: 'User not found'})
                }

                res.status(200).json({status:200, data: avatar.filePath})
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