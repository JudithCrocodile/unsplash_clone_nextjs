require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
const nodemailer = require("nodemailer");
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
    // host: "gmail",
    // port: 587,
    // secure: false, // Use true for port 465, false for port 587
    service: 'gmail',
    auth: {
        user: "judithjuju1604@gmail.com",
        pass: process.env.MAIL_PASS,
    },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const { email } = JSON.parse(req.body);

    if (!email) {
        return res.status(400).json({ status: 400, message: 'Email is required' });
    }

    // password validation
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({ status: 404, message: 'user not found' })
    }

    const token = crypto.randomBytes(32).toString('hex');

    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const resetUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/users/password/edit?reset_password_token=${resetTokenHash}`;

    const mailHtml = () => {
        return `<div>
            <p>Hey,</p>

            <p>You requested a link to reset your password for Unsplash. Use the link below to login and set a new password.</p>

            <p><a href="${resetUrl}" target="_blank" data-saferedirecturl="${resetUrl}">Change my password for Unsplash</a></p>

            <p>If you didn't request this, please ignore this email.</p>

            <p>Your password won't change until you access the link above and create a new one.</p>

            <p>— Unsplash Team</p>
        </div>`
    }

    (async () => {
        const info = await transporter.sendMail({
            from: '"Judith" <judithjuju1604@gmail.com>',
            to: email,
            subject: "Reset password instructions",
            html: mailHtml(), // HTML version of the message
        });

    console.log('mailHtml', mailHtml())

        console.log("Message sent:", info.messageId);
    })().catch(console.error);

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            reset_token_hash: resetTokenHash,
            reset_token_expires_at: new Date(Date.now() + 3600000), // 1 hour from now
        },
        { new: true }
    )

    if (!updatedUser) {
        res.status(404).json({ error: 'User not found' })
    }
    res.status(200).send({ status: 200, message: 'Has sent reset password instructions to your email' })
}