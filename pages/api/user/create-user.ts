require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import connectToDatabase from "@/lib/mongoose";
import User from '../models/User'
import { getTrimmedString, isValidEmail, isValidPassword, isValidUsername, parseRequestBody, PASSWORD_MIN_LENGTH } from "@/lib/api/validators";

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

    const body = parseRequestBody(req.body);
    const email = getTrimmedString(body.email);
    const password = typeof body.password === 'string' ? body.password : '';
    const userName = getTrimmedString(body.userName);
    const firstName = getTrimmedString(body.firstName);
    const lastName = getTrimmedString(body.lastName);

    if (!email || !password || !userName || !firstName || !lastName) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: 'email, password, userName, firstName, lastName are required',
            data: null,
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: 'Invalid email format',
            data: null,
        });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
            data: null,
        });
    }

    if (!isValidUsername(userName)) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: 'Username must contain letters and can only include letters, numbers, underscores',
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