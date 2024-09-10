import dbConnect from "../../../lib/dbConnect";
import nextjs from "../../../models/User";
import bcrypt from 'bcryptjs';

export default async function handler(req, res){
    await dbConnect();


    const { method } = req;
    switch(method){
        case 'POST':
            try{
                const { name, email, password } = req.body;
                if(!name || !email || !password){
                    return res.status(400).json({error:true, message:"Please fill all fields"});
                }

                const userExists = await nextjs.findOne({ email: email });
                if(userExists){
                    return res.status(400).json({error:true, message: "User already exists"});
                }
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await nextjs.create({ name, email, password: hashPassword })
                res.status(201).json(user);
            }catch(error){  
                res.status(500).json({ error: true, message: `Internal server error: ${error.message}` });
            }
            default:
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${method} not allowed`);
                break;
    }
}