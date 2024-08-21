import { NextApiRequest, NextApiResponse } from "next";
import Photo from '../models/Photo'
import connectToDatabase from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await connectToDatabase();
  // const photoCollections = client.db('unsplash').collection('photos')
  await connectToDatabase()

  const photo = await Photo.find()
  res.status(200).send({status: 200, data: photo})
}

