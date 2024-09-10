import dbConnect from '../../../lib/dbConnect';
import { checkUserExists } from '../auth/checkuser';
import nextjs from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      checkUserExists(req, res, async () => {
        try {
          const users = await nextjs.find({});
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      break;
    case 'POST':
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please fill all fields!' });
        }

        const userExists = await nextjs.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await nextjs.create({ name, email, password: hashedPassword });

        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
