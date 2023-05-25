import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await MongoClient.connect(
      `mongodb+srv://okcleff:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.q2xw64j.mongodb.net/events?retryWrites=true&w=majority`,
    );
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database.' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db('events');

    try {
      const result = await db.collection('comments').insertOne(newComment);
      newComment.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing comment failed!' });
      return;
    }

    client.close();

    res.status(201).json({
      message: 'Added comment.',
      comment: newComment,
    });
  }

  if (req.method === 'GET') {
    const db = client.db();

    let documents;

    try {
      documents = await db
        .collection('comments')
        .find({ eventId: eventId })
        .sort({ _id: -1 })
        .toArray();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Fetching comments failed!' });
      return;
    }

    res.status(200).json({ comments: documents });
  }
}
