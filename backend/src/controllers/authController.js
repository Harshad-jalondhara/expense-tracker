import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema } from "../validation/authValidation.js";

export const register = async(req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        
        const  {name, email, password} = req.body

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const login = async(req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}