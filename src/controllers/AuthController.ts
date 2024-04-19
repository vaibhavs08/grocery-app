import { Request, Response } from 'express';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const { JWT_SECRET = "" } = process.env;
import { AppDataSource } from '../data-source';

export class AuthController {
    static async signup(req: Request, res: Response) {
        const { email, password, role } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const existingUser = await userRepository.findOne({ where: {email} });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({ email, password: hashedPassword, role });
            await userRepository.save(newUser);

            const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ user: newUser, token });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const user = await userRepository.findOne({ where: {email} });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ user, token });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
