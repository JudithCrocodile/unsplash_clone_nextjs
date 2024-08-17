import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase();
  const photoCollections = client.db('unsplash').collection('photos')

  const photo = await photoCollections.find({}).toArray();
  res.status(200).send({status: 200, data: photo})
}

