// newsletters api routes
import { connectDatabase, insertDocument } from '@/helper/db';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const userEmail = req.body.email;

    if (!userEmail || userEmail.length === 0 || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Email is required' });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
      console.log('====================================');
      console.log(client);
      console.log('====================================');
    } catch (err) {
      res.status(500).json({ message: 'Error connecting to database' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Error saving to database' });
      return;
    }


    res.status(201).json({ message: 'Sign up successful' })
  }
}
