require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const { password, resetTokenHash } = JSON.parse(req.body);

    if (!password || !resetTokenHash) {
        return res.status(400).json({ status: 400, message: 'Password and reset token hash are required' });
    }

    // password validation
    const user = await User.findOne({ reset_token_hash: resetTokenHash });

    if (!user) {
        return res.status(404).send({ status: 404, message: 'user not found' })
    }

    if (!user.reset_token_expires_at || user.reset_token_expires_at < new Date()) {
        return res.status(400).json({ status: 400, message: 'Reset token has expired' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
            updated_at: new Date(),
            reset_token_hash: '',
            reset_token_expires_at: null,
        },
        { new: true }
    )

    if (!updatedUser) {
        res.status(404).json({ error: 'User not found' })
    }
    res.status(200).send({ status: 200, data: updatedUser })
}