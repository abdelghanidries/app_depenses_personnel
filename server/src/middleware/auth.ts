import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: string | object; // Selon la structure de votre token JWT
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).send("Access Denied");
      return;
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string); // Ajout de `as string` pour typer JWT_SECRET
    req.user = verified;
    next();
    
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
