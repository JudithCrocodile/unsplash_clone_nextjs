require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const { userInfo } = JSON.parse(req.body);

    if(!userInfo || !userInfo.currentPassword || !userInfo.password || !userInfo.confirmPassword) {
        return res.status(400).json({status: 400, error: 'Missing required fields'});
    }

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'No token provided'});


    if(userInfo.password !== userInfo.confirmPassword) {
        // bad request
        return  res.status(400).json({status: 400, error: 'Password and confirm password do not match'});
    }

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

    if(user) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                password: hashedPassword,
                updated_at: new Date(),
            },
            { new: true }
        )

        if(!updatedUser){
            res.status(404).json({error: 'User not found'})
        }
        res.status(200).send({status: 200, data: updatedUser})

      
    } else {
        res.status(404).send({status: 404, message: 'user not found'})
    }
  }