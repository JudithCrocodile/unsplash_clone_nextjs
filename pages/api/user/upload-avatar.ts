import { NextApiRequest, NextApiResponse } from "next";
import Busboy from 'busboy'
import fs from 'fs'
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';
import Grid from 'gridfs-stream'
import mongoose from 'mongoose'

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const conn = mongoose.connection;

    if (conn.readyState !== 1) {
        return res.status(500).json({ error: 'Database connection not established' });
    }

    // Ensure `conn.db` is defined
    const db = conn.db;
    if (!db) {
        return res.status(500).json({ error: 'Database object is not available' });
    }

    let gfs, gridfsBucket;

    try {
        gridfsBucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    } catch (error) {
        console.error('Error setting up GridFS:', error);
        return res.status(500).json({ error: 'Failed to set up GridFS' });
    }

    let avatar: {
        filePath: string,
        fileId: any
    } = {
        filePath: '',
        fileId: ''
    }

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    // verify token
    const user = await getUserByToken(token);
    if (!user) return res.status(401).json({ error: 'Invalid token' })

    if (req.method === 'POST') {
        const busboy = Busboy({ headers: req.headers })

        busboy.on('file', (fieldname, file, filename) => {
            // const filePath = `/uploads/avatars/${ new Date() + '-' + filename.filename}`
            // const saveTo = `./public${filePath}`;
            // // photos.push({file, filePath: filePath})
            // avatar = {...file, filePath: filePath}
            // file.pipe(fs.createWriteStream(saveTo))

            const filePath = new Date().toISOString() + '-' + filename.filename

            const writestream = gridfsBucket.openUploadStream(filePath)

            avatar = { fileId: writestream.id, filePath }

            file.pipe(writestream)
        })


        busboy.on('finish', async () => {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    {
                        'fileId': avatar.fileId
                    },
                )

                if (!updatedUser) {
                    res.status(404).json({ error: 'User not found' })
                }

                res.status(200).json({ status: 200, data: avatar.fileId })
            } catch (error) {
                console.error(error)
                res.status(500).json({ error: 'Failed to upload photos' })
            }
        })

        busboy.on('fetch', () => {
            res.status(200).json({ message: 'File uploaded successfully' })
        })

        req.pipe(busboy)

    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }



}