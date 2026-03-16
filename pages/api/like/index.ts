import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import Like from '../models/Like'
import { getTrimmedString, isValidEmail, isValidPassword, parseRequestBody, PASSWORD_MIN_LENGTH } from "@/lib/api/validators";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectToDatabase()

  const body = parseRequestBody(req.body);
  const photoId = getTrimmedString(body.photoId);
  const userId = getTrimmedString(body.userId);

  try {
    const existingLike = await Like.findOne({photoId, userId})
    if(existingLike) {
        await Like.deleteOne({photoId, userId})
        res.status(200).json({status: 200, message: 'Photo unliked successfully', data: false})
        return;
    }

    const newLike = new Like({photoId, userId})
    await newLike.save()
    res.status(200).json({status: 200, message: 'Photo liked successfully', data: true})

  } catch (error){
    res.status(500).json({status: 500, message: 'Error fetching photos', error})
  }
}

