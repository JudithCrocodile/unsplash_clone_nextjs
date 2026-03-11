require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";

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
    const {email, password } = body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        code: 'INVALID_INPUT',
        message: 'Email and password are required',
        data: null,
      });
    }

    // password validation
    const user = await User.findOne({email});

    if(user && bcrypt.compareSync(password, user.password)) {
      const user = await User.findOne({email});
      if(user) {
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
        return res.status(404).json({
          status: 404,
          code: 'USER_NOT_FOUND',
          message: 'user not found',
          data: null,
        })
      }
      
    } else {
      return res.status(401).json({
        status: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'email or password error',
        data: null,
      })
    }
  }