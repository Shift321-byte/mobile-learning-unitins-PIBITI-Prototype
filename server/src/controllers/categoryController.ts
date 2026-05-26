import { Request, Response } from 'express';
import { pool } from '../config/database';
export const getCategories = async (_req: Request, res: Response) => {
  const r = await pool.query('SELECT * FROM categories ORDER BY name');
  res.json(r.rows);
};
export const createCategory = async (req: Request, res: Response) => {
  const { name, description, icon_url } = req.body;
  const r = await pool.query('INSERT INTO categories (name,description,icon_url) VALUES ($1,$2,$3) RETURNING *', [name, description, icon_url]);
  res.status(201).json(r.rows[0]);
};
export const deleteCategory = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM categories WHERE id=$1', [req.params.id]);
  res.status(204).send();
};
