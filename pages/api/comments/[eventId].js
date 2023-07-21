import { connectDatabase, getAllDocuments, insertDocument } from "@/helper/db";

// newsletters api routes
export default async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({ message: 'Error connecting to database' });
        return;
    }

    if (req.method === 'POST') {
        // Process a POST request
        const { name, email, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'All fields are required' });
            return;
        }

        const newComment = {
            name,
            email,
            text,
            eventId
        }

        try {
            await insertDocument(client, 'comments', newComment);
        } catch (err) {
            res.status(500).json({ message: 'Error saving to database' });
        }

        res.status(201).json({ message: 'Comment added', comment: newComment });

    }

    if (req.method === 'GET') {
        try {
            const comments  = await getAllDocuments(client, 'comments', { eventId: eventId }, { _id: -1 });
            res.status(200).json({ comments });
        }catch (err) {
            res.status(500).json({ message: 'Getting comments failed' });
        }

    }
    client.close();

}
