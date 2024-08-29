import mongoose from 'mongoose'
import connectToDatabase from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import {GridFSBucket} from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectToDatabase()

    const { fileId } = req.query;

    console.log('req.query', req.query)

    if (!fileId) {
        return res.status(400).json({ status: 400, message: 'Missing file id' })
    }

    try {
        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        })

        const objectId = new mongoose.Types.ObjectId(fileId as string);
        const downloadStream = bucket.openDownloadStream(objectId);

        downloadStream.on('error', (error) => {
            console.log('error', error)
            return res.status(404).json({ status: 404, message: 'File not found' })
        })

        downloadStream.on('data', (chunk) => {
            res.write(chunk)
        })

        downloadStream.on('end', () => {
            res.end();
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: 'Error retrieving file', error })
    }




}