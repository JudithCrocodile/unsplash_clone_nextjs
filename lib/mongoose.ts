import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI;

if(!MONGODB_URI) {
throw new Error('Please define the MONGODB_URI enviroment variable inside.env')
}

let cached = global.mongoose;

if(!cached) {
cached = global.mongoose = {conn: null, promise: null}
}

async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = (await mongoose.connect(MONGODB_URI, opts)).isObjectIdOrHexString((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default connectToDatabase;