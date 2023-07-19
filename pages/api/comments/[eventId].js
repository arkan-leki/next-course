// newsletters api routes
export default function handler(req, res) {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        // Process a POST request
        const { name, email, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'All fields are required' });
            return;
        }

        const newComment = {
            "id": new Date().toISOString(),
            name,
            email,
            text,
        }

        console.log('====================================');
        console.log(newComment);
        console.log('====================================');

        res.status(201).json({ message: 'Comment added', comment: newComment });

    }

    if (req.method === 'GET') {
        // Process a POST request
        const comments = [
            {
                "id": 1,
                'name': "John Doe",
                'email': "XXXXXXXXXXXX",
                'text': "This is a comment",
            },
            {
                "id": 2,
                'name': "John Doe",
                'email': "XXXXXXXXXXXX",
                'text': "This is a comment",
            },
        ]

        res.status(201).json({ comments: comments });

    }

}
