import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import Photo from '../../models/Photo'
import getUserByToken from '../../util/getUserByToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await connectToDatabase();
  // const photoCollections = client.db('unsplash').collection('photos')

  await connectToDatabase()

  const id = req.query.id
  let user = {}

  const token = req.headers.authorization?.split(' ')[1];

  console.log('token', token)
  if (token) {
    user = await getUserByToken(token);
  }
  console.log('user', user)

  if(id) {
    mongoose.set('debug', true);
    // const photo = await Photo.findById(id)
    //   .populate('photo_tags')
    //   .exec();

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
          as: 'tags'
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

    console.log('photo', photo)

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

