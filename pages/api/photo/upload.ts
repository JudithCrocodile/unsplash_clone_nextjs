import { NextApiRequest, NextApiResponse } from "next";
import Photo from '../models/Photo'
import Tab from '../models/Tab'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectToDatabase()

    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 405,
            code: 'METHOD_NOT_ALLOWED',
            message: 'Method not allowed',
            data: null,
        })
    }

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 401,
            code: 'UNAUTHORIZED',
            message: 'No token provided',
            data: null,
        });
    }

    // verify token
    const { user, error } = await getUserByToken(token);
    if (!user) {
        if (error === 'expired') {
            return res.status(401).json({
                status: 401,
                code: 'TOKEN_EXPIRED',
                message: 'Token expired',
                data: null,
            });
        }

        if (error === 'invalid') {
            return res.status(401).json({
                status: 401,
                code: 'INVALID_TOKEN',
                message: 'Invalid token',
                data: null,
            });
        }
        return res.status(404).json({
            status: 404,
            code: 'USER_NOT_FOUND',
            message: 'user not found',
            data: null,
        });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const photos = Array.isArray(body.photos) ? body.photos : [];

        if (photos.length === 0) {
            return res.status(400).json({
                status: 400,
                code: 'INVALID_INPUT',
                message: 'No photos provided',
                data: null,
            });
        }

        for (const photo of photos) {
            const { url, publicId, tabs = [], location = '', description = '' } = photo || {};

            if (!url) {
                return res.status(400).json({
                    status: 400,
                    code: 'INVALID_INPUT',
                    message: 'Photo URL is required',
                    data: null,
                });
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

        return res.status(200).json({
            status: 200,
            code: 'UPLOAD_SUCCESS',
            message: 'Upload successful',
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
            data: null,
        })
    }



}