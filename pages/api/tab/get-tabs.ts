import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongoose";
import Tab from '../models/Tab'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectToDatabase()

  try {
    const tabs = await Tab.find();
    res.status(200).send({status: 200, data: tabs})
  } catch (error){
    res.status(500).json({status: 500, message: 'Error fetching photos', error})
  }
}

