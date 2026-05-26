import { Request, Response } from 'express';
import { pool } from '../config/database';
export const getSubcategories = async (req: Request, res: Response) => {
  const r = await pool.query('SELECT * FROM subcategories WHERE category_id=$1 ORDER BY name', [req.params.categoryId]);
  res.json(r.rows);
};
export const createSubcategory = async (req: Request, res: Response) => {
  const { category_id, name, description } = req.body;
  const r = await pool.query('INSERT INTO subcategories (category_id,name,description) VALUES ($1,$2,$3) RETURNING *', [category_id, name, description]);
  res.status(201).json(r.rows[0]);
};
export const deleteSubcategory = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM subcategories WHERE id=$1', [req.params.id]);
  res.status(204).send();
};
