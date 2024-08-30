import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import Photo from '../../models/Photo'
import getUserByToken from '../../util/getUserByToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectToDatabase()

  const id: string | undefined = <string>req.query.id
  let user: {
      _id: string
    } = { _id: ''}

  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    user = await getUserByToken(token);
  }

  if(id) {
    mongoose.set('debug', true);

    const photo = await Photo.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'tabs',
          localField: 'photo_tags',
          foreignField: '_id',
          as: 'photo_tags'
        }
      },
      {
        $lookup: {
          from: 'likes',
          localField: '_id', // photoId
          foreignField: 'photoId',
          as: 'likes'
        }
      },
      ...(user ?[{
        $addFields: {
          liked: {
            $in: [new mongoose.Types.ObjectId(user._id), '$likes.userId']
          }
        }
      }] :[]),
    ])

      const photosWithAuthor = await Photo.populate(photo, {path: 'author'})

    if(photo) {
      res.status(200).send({status: 200, data: photosWithAuthor[0]})
    } else {
      res.status(404).send('photo not found')
    }
    
  } else {
    res.status(404).send('id error')
  }
}

