
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        uri
    );
    return client;
  }



  
