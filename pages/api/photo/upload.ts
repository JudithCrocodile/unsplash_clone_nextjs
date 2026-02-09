import { NextApiRequest, NextApiResponse } from "next";
import Photo from '../models/Photo'
import Tab from '../models/Tab'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectToDatabase()

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    // verify token
    const { user, error } = await getUserByToken(token);
    if (!user) {
        if (error === 'expired') {
            return res.status(401).json({ error: 'Token expired' });
        }

        if (error === 'invalid') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(404).json({ error: 'user not found' });
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
            const photos = Array.isArray(body.photos) ? body.photos : [];

            if (photos.length === 0) {
                return res.status(400).json({ error: 'No photos provided' });
            }

            for (const photo of photos) {
                const { url, publicId, tabs = [], location = '', description = '' } = photo || {};

                if (!url) {
                    return res.status(400).json({ error: 'Photo URL is required' });
                }

                const tabIds = [];

                // find or create tab, find tab id
                for (const tabName of tabs) {
                    if (tabName) {
                        let tabDoc = await Tab.findOne({ name: tabName })
                        if (!tabDoc) {
                            tabDoc = new Tab({ name: tabName })
                            await tabDoc.save();
                        }

                        tabIds.push(tabDoc._id)
                    }

                }

                // save photo data
                const newPhoto = new Photo({
                    // fileId: photos[i].fileId.toString(), // fileId
                    path: url, // filePath
                    cloudinary_public_id: publicId,
                    location,
                    description,
                    photo_tags: tabIds,
                    author: user._id,
                    createTime: new Date(),
                })

                await newPhoto.save();
            }

            return res.status(200).json({ status: 200, message: 'Upload successful' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }

    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }



}