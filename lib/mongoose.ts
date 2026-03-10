import mongoose from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if(!MONGODB_URI) {
throw new Error('Please define the MONGODB_URI enviroment variable inside.env')
}

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// 把快取掛在全域的 globalThis 上，這樣在開發模式下就不會因為熱重載而丟失快取，導致多次連線到資料庫
const globalAny = global as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache = globalAny.mongoose ?? (globalAny.mongoose = { conn: null, promise: null });

async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!, {
            bufferCommands: false,
        })
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default connectToDatabase;