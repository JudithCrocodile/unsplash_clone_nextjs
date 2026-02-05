require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';
import bcrypt from 'bcrypt';
import Photo from "../models/Photo";
import Like from '../models/Like';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const { userInfo } = JSON.parse(req.body);

    if(!userInfo || !userInfo.currentPassword) {
        return res.status(400).json({status: 400, error: 'Missing required fields'});
    }

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'No token provided'});


    // verify token
    const { user, error } = await getUserByToken(token);

    if(!user) {
        if(error === 'expired') {
            return res.status(401).json({status: 401, error: 'Token expired'});
        }

        if(error === 'invalid') {
            return res.status(401).json({status: 401, error: 'Invalid token'});
        }
        return res.status(404).json({status: 404, error: 'user not found'});
    }

    const passwordMatch = await bcrypt.compare(userInfo.currentPassword, user.password)
    if(!passwordMatch) {
        return res.status(400).json({status: 400, error: 'Current password is incorrect'});
    }

    const session = await mongoose.startSession();

    try {

        await session.withTransaction(async () => {

            // find all photos by user
            const photos = await Photo.find({author: user._id}, {_id: 1}).session(session);
            const photoIds = photos.map(photo => photo._id)

            // delete likes associated with user's photos
            await Like.deleteMany({userId: user._id}).session(session);

            // delete likes on user's photos
            if(photoIds.length > 0) {
                await Like.deleteMany({photoId: { $in: photoIds }}).session(session);
            }

            // delete photos
            await Photo.deleteMany({author: user._id}).session(session);

            // delete user account
            await User.findByIdAndDelete(user._id).session(session);

            res.status(200).send({status: 200, data: { message: 'Account closed successfully' }}) 
        });
      
    } catch (error) {
        res.status(500).json({status: 500, error: 'Internal server error'});
    }
  }