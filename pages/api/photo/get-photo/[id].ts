import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import Photo from '../../models/Photo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const client = await connectToDatabase();
  // const photoCollections = client.db('unsplash').collection('photos')

  await connectToDatabase()

  const id = Number(req.query.id)
  if(!isNaN(id)) {
    const photo = await Photo.findOne({id});
    if(photo) {
      res.status(200).send({status: 200, data: photo})
    } else {
      res.status(404).send('photo not found')
    }
    
  } else {
    res.status(404).send('id error')
  }
}

