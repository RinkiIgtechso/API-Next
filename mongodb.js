import  { MongoClient } from 'mongodb';

const uri = process.env.DATA;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
}

let client;
let clientPromise;

if(!process.env.DATA){
    throw new Error('Add Mongo URL to .env.local');
}
