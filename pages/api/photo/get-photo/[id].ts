import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase();
  const photoCollections = client.db('unsplash').collection('photos')

  const id = Number(req.query.id)
  if(!isNaN(id)) {
    const photo = await photoCollections.findOne({id});
    if(photo) {
      res.status(200).send(photo)
    } else {
      res.status(404).send('photo not found')
    }
    
  } else {
    res.status(404).send('id error')
  }
}

