import dbConnect from '../../../lib/dbConnect';
import nextjs from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { id } = req.query;
        const user = await nextjs.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const { name, email } = req.body;

        if (!name || !email) {
          return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await nextjs.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const user = await nextjs.findByIdAndDelete(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
