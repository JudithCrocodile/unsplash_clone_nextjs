require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import connectToDatabase from "@/lib/mongoose";
import User from '../models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 405,
            code: 'METHOD_NOT_ALLOWED',
            message: 'Method not allowed',
            data: null,
        });
    }

    await connectToDatabase()

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const {email, password, userName, firstName, lastName} = body;

    if (!email || !password || !userName || !firstName || !lastName) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: 'email, password, userName, firstName, lastName are required',
            data: null,
        });
    }

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
        return res.status(200).json({
            status: 200,
            code: 'USER_CREATED',
            message: 'User registered successfully',
            data: { userId: newUser._id },
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'User registered failed',
            data: null,
        });
    }

  }