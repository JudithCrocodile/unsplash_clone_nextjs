require('dotenv').config();
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

        res.status(200).send({status: 200, message: 'logout succefully'})
      

  }