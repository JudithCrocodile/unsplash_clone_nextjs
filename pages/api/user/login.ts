require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/db'
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDatabase();
    const userCollections = client.db('unsplash').collection('users')
    const saltRounds = 10;

    const {email, password } = JSON.parse(req.body);

    // todo password validation
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userCollections.findOne({email});

    if(user) {
    // if(user && bcrypt.compareSync(hashedPassword, user.password)) {
      const user = await userCollections.findOne({email});
      if(user) {
        const payload = {
            user_id: user.id,
            user_email: user.email,
            user_password: user.password,
        }
        const token = jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_TOKEN)
        res.status(200).send({status: 200, message: '登入成功', token})
      } else {
        res.status(404).send('user not found')
      }
      
    } else {
      res.status(404).send('email error')
    }
  }