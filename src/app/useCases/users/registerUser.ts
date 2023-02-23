import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'E-mail já cadastrado'});
    }

    const user = await User.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
