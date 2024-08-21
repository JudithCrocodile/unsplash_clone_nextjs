require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import User from '../models/User'
import connectToDatabase from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const client = await connectToDatabase();
    // const userCollections = client.db('unsplash').collection('users')
    // await connectToDatabase()
    await connectToDatabase()
    const saltRounds = 10;

    const {email, password } = JSON.parse(req.body);

    // todo password validation
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.findOne({email});

    if(user) {
    // if(user && bcrypt.compareSync(hashedPassword, user.password)) {
      const user = await User.findOne({email});
      if(user) {
        const payload = {
            userId: user._id,
        }
        const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET)
        res.status(200).send({status: 200, message: '登入成功', token})
      } else {
        res.status(404).send('user not found')
      }
      
    } else {
      res.status(404).send('email error')
    }
  }