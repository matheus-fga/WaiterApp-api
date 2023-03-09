import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string
  role: string
  iat: number
  exp: number
}

export default function authMiddleware(roles: string[] | string = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    authentication,
    (req: Request,  res: Response, next: NextFunction) => {
      const role = req.userRole;

      if (roles.length && !roles.includes(role)) {
        return res.sendStatus(403);
      }

      return next();
    }
  ];
}

function authentication (req: Request,  res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, String(process.env.SECRET_KEY));

    const { id, role } = data as TokenPayload;

    req.userId = id;
    req.userRole = role;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}

