require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import getUserByToken from '../util/getUserByToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const {userInfo } = JSON.parse(req.body);

    // verify Bear token empty
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token', token)
    if (!token) return res.status(401).json({error: 'No token provided'});

        // verify token
        const user = await getUserByToken(token);
        console.log('user', user)



    if(user) {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                'firstName': userInfo.firstName,
                'lastName': userInfo.lastName,
                'email': userInfo.email,
                'userName': userInfo.userName,
            },
        )

        if(!updatedUser){
            res.status(404).json({error: 'User not found'})
        }
        res.status(200).send({status: 200, data: updatedUser})

      
    } else {
        res.status(404).send({status: 404, message: 'user not found'})
    }
  }