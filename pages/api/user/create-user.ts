require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import connectToDatabase from "@/lib/mongoose";
import User from '../models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const {email, password, userName, firstName, lastName} = JSON.parse(req.body);

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            email,
            password: hashedPassword,
            userName, 
            firstName, 
            lastName,
            created_at: new Date(),
            updated_at: new Date(),
            fileId: undefined,
        })
        await newUser.save();
        res.status(200).send({status: 200, message: 'User registered successfully'});
    } catch (error) {
        console.log('error', error)
        res.status(500).send({status: 500, message: 'User registered failed'});
    }

  }