require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";
import { getTrimmedString, isValidEmail, isValidPassword, parseRequestBody, PASSWORD_MIN_LENGTH } from "@/lib/api/validators";
import { checkRateLimit, getClientIp } from "@/lib/api/security";

const LOGIN_RATE_LIMIT_MAX = 5;
const LOGIN_RATE_LIMIT_WINDOW_MS = 60 * 1000;

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
      key: `login:${ip}`,
      limit: LOGIN_RATE_LIMIT_MAX,
      windowMs: LOGIN_RATE_LIMIT_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return res.status(429).json({
        status: 429,
        code: 'TOO_MANY_REQUESTS',
        message: `Too many login attempts. Please retry in ${rateLimit.retryAfterSeconds} seconds`,
        data: null,
      });
    }

    await connectToDatabase()

    const body = parseRequestBody(req.body);
    const email = getTrimmedString(body.email);
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        code: 'INVALID_INPUT',
        message: 'Email and password are required',
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

    // password validation
    const user = await User.findOne({email});

    if(user && bcrypt.compareSync(password, user.password)) {
        const payload = {
            userId: user._id,
        }
        const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET)
        return res.status(200).json({
          status: 200,
          code: 'LOGIN_SUCCESS',
          message: '登入成功',
          data: { token, userInfo: user },
          token,
          userInfo: user,
        })
      
    } else {
      return res.status(401).json({
        status: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials',
        data: null,
      })
    }
  }