import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '@/lib/db'
import Busboy from 'busboy'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log(req.body)
    // const client = await connectToDatabase();
    // const photoCollections = client.db('unsplash').collection('photos')
    if(req.method === 'POST') {
        const busboy = Busboy({headers: req.headers})
        
        busboy.on('file', (fieldname, file, filename) => {
            console.log('filename',filename)
            const saveTo = `./public/uploads/${ Date.now() + '-' + filename.filename}`;
            file.pipe(fs.createWriteStream(saveTo))
        })

        busboy.on('fetch', () => {
            res.status(200).json({message: 'File uploaded successfully'})
        })

        req.pipe(busboy)
          
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }



}