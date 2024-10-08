require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const {email, password } = JSON.parse(req.body);

    // password validation
    const user = await User.findOne({email});

    if(user && bcrypt.compareSync(password, user.password)) {
      const user = await User.findOne({email});
      if(user) {
        const payload = {
            userId: user._id,
        }
        const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET)
        res.status(200).send({status: 200, message: '登入成功', token, userInfo: user})
      } else {
        res.status(404).send({status: 404, message: 'user not found'})
      }
      
    } else {
      res.status(404).send({status: 404, message: 'email error'})
    }
  }