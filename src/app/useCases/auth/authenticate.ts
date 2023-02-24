import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from '../../models/User';

export async function authenticate(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha incorreta'});
    }

    const token = jwt.sign({ id: user._id }, String(process.env.SECRET_KEY), { expiresIn: '1d' });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
