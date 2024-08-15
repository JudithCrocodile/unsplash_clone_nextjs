require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDatabase();
    const userCollections = client.db('unsplash').collection('users')
  
    const {email, password, userName, firstName, lastName} = JSON.parse(req.body);

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        userCollections.insertOne({
            email,
            password: hashedPassword,
            userName, 
            firstName, 
            lastName,
        })
        res.status(200).send({status: 200, message: 'User registered successfully'});
    } catch (error) {
        console.log('error', error)
        res.status(500).send({status: 500, message: 'User registered failed'});
    }

  }