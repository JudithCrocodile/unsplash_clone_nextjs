import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import Like from '../models/Like'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectToDatabase()

  const { photoId, userId } = JSON.parse(req.body);

  try {
    const existingLike = await Like.findOne({photoId, userId})
    if(existingLike) {
        await Like.deleteOne({photoId, userId})
        res.status(200).json({status: 200, message: 'Photo unliked successfully', data: false})
        return;
    }

    const newLike = new Like({photoId, userId, createTime: new Date().toISOString()})
    await newLike.save()
    res.status(200).json({status: 200, message: 'Photo unliked successfully', data: true})

  } catch (error){
    res.status(500).json({status: 500, message: 'Error fetching photos', error})
  }
}

