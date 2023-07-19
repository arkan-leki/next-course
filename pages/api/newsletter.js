// newsletters api routes
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      const userEmail = req.body.email;

      if (!userEmail || userEmail.length === 0 || !userEmail.includes('@')) {
        res.status(422).json({ message: 'Email is required' });
        return;
      }

      res.status(201).json({ message: 'Sign up successful' })
    }
  }
