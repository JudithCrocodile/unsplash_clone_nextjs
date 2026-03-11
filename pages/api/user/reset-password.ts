require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import bcrypt from 'bcrypt';
import { getTrimmedString, isValidPassword, parseRequestBody, PASSWORD_MIN_LENGTH } from "@/lib/api/validators";
import { checkRateLimit, getClientIp } from "@/lib/api/security";

const RESET_PASSWORD_RATE_LIMIT_MAX = 5;
const RESET_PASSWORD_RATE_LIMIT_WINDOW_MS = 60 * 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 405,
            code: 'METHOD_NOT_ALLOWED',
            message: 'Method not allowed',
            data: null,
        });
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit({
        key: `reset-password:${ip}`,
        limit: RESET_PASSWORD_RATE_LIMIT_MAX,
        windowMs: RESET_PASSWORD_RATE_LIMIT_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
        return res.status(429).json({
            status: 429,
            code: 'TOO_MANY_REQUESTS',
            message: `Too many reset attempts. Please retry in ${rateLimit.retryAfterSeconds} seconds`,
            data: null,
        });
    }

    await connectToDatabase()

    const body = parseRequestBody(req.body);
    const password = typeof body.password === 'string' ? body.password : '';
    const resetTokenHash = getTrimmedString(body.resetTokenHash);

    if (!password || !resetTokenHash) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_INPUT',
            message: 'Password and reset token hash are required',
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

    // password validation
    const user = await User.findOne({ reset_token_hash: resetTokenHash });

    if (!user) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_RESET_TOKEN',
            message: 'Invalid or expired reset token',
            data: null,
        })
    }

    if (!user.reset_token_expires_at || user.reset_token_expires_at < new Date()) {
        return res.status(400).json({
            status: 400,
            code: 'INVALID_RESET_TOKEN',
            message: 'Invalid or expired reset token',
            data: null,
        });
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
        return res.status(404).json({
            status: 404,
            code: 'USER_NOT_FOUND',
            message: 'user not found',
            data: null,
        })
    }

    return res.status(200).json({
        status: 200,
        code: 'PASSWORD_RESET_SUCCESS',
        message: 'Password reset successfully',
        data: updatedUser,
    })
}