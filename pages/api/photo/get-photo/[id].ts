import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import Photo from '../../models/Photo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await connectToDatabase();
  // const photoCollections = client.db('unsplash').collection('photos')

  await connectToDatabase()

  const id = req.query.id

  if(id) {
    mongoose.set('debug', true);
    const photo = await Photo.findById(id)
      .populate('photo_tags')
      .exec();

      const photosWithAuthor = await Photo.populate(photo, {path: 'author'})

    if(photo) {
      res.status(200).send({status: 200, data: photosWithAuthor})
    } else {
      res.status(404).send('photo not found')
    }
    
  } else {
    res.status(404).send('id error')
  }
}

