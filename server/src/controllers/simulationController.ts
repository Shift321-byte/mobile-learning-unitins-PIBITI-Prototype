import { Request, Response } from 'express';
import { pool } from '../config/database';
export const getSimulations = async (req: Request, res: Response) => {
  const r = await pool.query('SELECT * FROM simulations WHERE category_id=$1 ORDER BY RANDOM() LIMIT 10', [req.params.categoryId]);
  res.json(r.rows);
};
export const createSimulation = async (req: Request, res: Response) => {
  const { category_id, question, option_a, option_b, option_c, option_d, correct_option, explanation } = req.body;
  const r = await pool.query(
    'INSERT INTO simulations (category_id,question,option_a,option_b,option_c,option_d,correct_option,explanation) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [category_id, question, option_a, option_b, option_c, option_d, correct_option, explanation]
  );
  res.status(201).json(r.rows[0]);
};
export const deleteSimulation = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM simulations WHERE id=$1', [req.params.id]);
  res.status(204).send();
};
