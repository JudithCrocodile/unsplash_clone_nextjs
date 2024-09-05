import { NextApiRequest, NextApiResponse } from "next";
import '../models/User';
import Photo from '../models/Photo'
import Tab from '../models/Tab'
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import getUserByToken from '../util/getUserByToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()
  const body = JSON.parse(req.body)
  const page = parseInt(body.page) || 1
  const pageSize = parseInt(body.ppageSizeage) || 10;
  const tabId = body.tabId;
  const category = body.category;
  const onlyShowLiked = body.onlyShowLiked;
  let userName = body.userName || '';
  let user: {
    _id: string
  } = {_id: ''}

  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    user = await getUserByToken(token);
  }

  if(userName.startsWith('@')){
    userName = userName.substring(1);
  }  

  try {
    const filter: {
      photo_tags: string | string[] | {$all?: any[]} | any
    } = {photo_tags: ''};
    if(tabId){
      if(typeof tabId === 'string'){
        filter.photo_tags = new mongoose.Types.ObjectId(tabId)
      } else { // array
        filter.photo_tags = {$all: tabId.map((id: string)=>new mongoose.Types.ObjectId(id))}
      }
      
    }

      const photos = await Photo.aggregate([
        {
          $lookup: {
            from: 'tabs',
            localField: 'photo_tags',
            foreignField: '_id',
            as: 'tags'
          }
        },
        ...(category ? [{
          $match: {'tags.name': category}
        }] : []),
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
          }
        },
        ...(userName ? [{
          $match: {'author.userName': userName}
        }] : []),
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
        ...(onlyShowLiked ? [{
          $match: {
            liked: true
          }
        }] : []),
        {
          $facet: {
            photos: [
              {$sort:{createTime: -1}},
              {$skip:(page-1) * pageSize},
              {$limit:pageSize},
            ],
            totalCount: [
              {$count: 'count'}
            ]
          }
        }
      ])

      const photosWithAuthor = await Photo.populate(photos[0].photos, {path: 'author'})

      const totalPhotos: number = photos[0].totalCount[0]?.count || 0;
      const totalPages: number = Math.ceil(totalPhotos / pageSize);

      res.json({
        status: 200,
        data: {
          photos: photosWithAuthor,
          currentPage: page,
          totalPhotos,
          totalPages,
          isLast: totalPages <= page
        }
      })
  } catch (error){
    console.log(error)
    res.status(500).json({status: 500, message: 'Error fetching photos', error})
  }
}

