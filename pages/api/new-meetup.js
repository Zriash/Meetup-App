import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const mongoURL = process.env.DB_URL;
    const data = req.body; // const { title, image, address, description } = data;

    const client = await MongoClient.connect(mongoURL); // storing connection to database (mongo atlas) on const client
    const db = client.db(); // storing the db

    const meetupsCollection = db.collection('meetups'); // storing the collection of choice on const meetupsCollection

    const result = await meetupsCollection.insertOne(data); // pushing data from the req.body into the database

    if (!result) {
      console.log('error');
    }

    client.close();

    res.status(201).json({ message: 'meetup has been successfully created' });
  }
}

export default handler;
