import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request { user?: { id: number; role: string }; }
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string }; next(); }
  catch { return res.status(401).json({ message: 'Token inválido' }); }
};
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Acesso negado' });
  next();
};
