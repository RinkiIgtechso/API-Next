import dbConnect from "../../../lib/dbConnect";
import nextjs from "../../../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    await dbConnect();

    const { method } = req;
    
    switch(method) {
        case 'POST':
            try{
                const { email, password } = req.body;
              
                if(!email || !password){
                    return res.status(400).json({message: "Please fill all the details"})
                };

                const user = await nextjs.findOne({ email });
                
                if(!user){
                    return res.status(400).json({error:true, message:"Invalid credentials provided!"});
                }
                const isMatch = await bcrypt.compare(password, user.password);
                
                if(!isMatch){
                    return res.status(400).json({error:true, message:"Invalid credentials"});
                }
                const token  = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                
                res.status(200).json({ token });
            }catch(error){
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}