import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        console.log('Using existing database connection');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Creating new database connection');
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            console.log('Database connected successfully');
            return mongoose;
        }).catch((error) => {
            console.error('Database connection error:', error);
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
