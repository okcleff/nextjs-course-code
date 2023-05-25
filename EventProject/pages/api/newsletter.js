import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await MongoClient.connect(
        `mongodb+srv://okcleff:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.q2xw64j.mongodb.net/events?retryWrites=true&w=majority`,
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db('events');

    try {
      const result = await db
        .collection('newsletter')
        .insertOne({ email: userEmail });
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing email failed!' });
      return;
    }

    client.close();

    res.status(201).json({
      message: 'Successfully signed up!',
      email: userEmail,
    });
  }
}
