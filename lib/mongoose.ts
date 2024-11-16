import mongoose from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if(!MONGODB_URI) {
throw new Error('Please define the MONGODB_URI enviroment variable inside.env')
}

const globalAny = global as any;
let cached: any = globalAny.mongoose;

if(!cached) {
cached = globalAny.mongoose = {conn: null, promise: null}
}

async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
        }

        cached.promise = (await mongoose.connect(<string>MONGODB_URI, opts)).isObjectIdOrHexString((mongoose: any) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default connectToDatabase;