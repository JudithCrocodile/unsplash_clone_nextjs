import { NextApiRequest, NextApiResponse } from "next";
// import '../models/User';
import Photo from '../models/Photo'
import Tab from '../models/Tab'
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()
  const page = parseInt(req.body.page) || 1
  const pageSize = parseInt(req.body.ppageSizeage) || 10;
  const tabId = req.body.tabId;

  try {
    const filter = {};
    if(tabId){
      if(typeof tabId === 'string'){
        filter.photo_tags = new mongoose.Types.ObjectId(tabId)
      } else { // array
        filter.photo_tags = {$all: tabId.map(id=>new mongoose.Types.ObjectId(id))}
      }
      
    }
    const photos = await Photo.find(filter)      
      .sort({createTime: -1})
      .skip((page-1) * pageSize)
      .limit(pageSize)
      .populate('author')
      .exec()

      const totalPhotos = await Photo.countDocuments(filter);
      const totalPages = Math.ceil(totalPhotos / pageSize);

      res.json({
        status: 200,
        data: {
          photos,
          currentPage: page,
          totalPhotos,
          totalPages
        }
      })
  } catch (error){
    console.log(error)
    res.status(500).json({status: 500, message: 'Error fetching photos', error})
  }
}

