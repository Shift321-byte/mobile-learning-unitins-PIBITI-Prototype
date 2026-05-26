import { Request, Response } from 'express';
import { pool } from '../config/database';
import { uploadToS3 } from '../config/s3';
import multer from 'multer';
export const upload = multer({ storage: multer.memoryStorage() });
export const getSummaries = async (req: Request, res: Response) => {
  const r = await pool.query('SELECT * FROM summaries WHERE subcategory_id=$1 ORDER BY title', [req.params.subcategoryId]);
  res.json(r.rows);
};
export const getSummaryById = async (req: Request, res: Response) => {
  const r = await pool.query('SELECT * FROM summaries WHERE id=$1', [req.params.id]);
  if (!r.rows[0]) return res.status(404).json({ message: 'Não encontrado' });
  res.json(r.rows[0]);
};
export const createSummary = async (req: Request, res: Response) => {
  const { subcategory_id, title, content } = req.body;
  let image_url: string | null = null;
  const file = (req as any).file;
  if (file) image_url = await uploadToS3(file.buffer, `summaries/${Date.now()}-${file.originalname}`, file.mimetype);
  const r = await pool.query(
    'INSERT INTO summaries (subcategory_id,title,content,image_url) VALUES ($1,$2,$3,$4) RETURNING *',
    [subcategory_id, title, content, image_url]
  );
  res.status(201).json(r.rows[0]);
};
export const updateSummary = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const r = await pool.query('UPDATE summaries SET title=$1,content=$2,updated_at=NOW() WHERE id=$3 RETURNING *', [title, content, req.params.id]);
  res.json(r.rows[0]);
};
export const deleteSummary = async (req: Request, res: Response) => {
  await pool.query('DELETE FROM summaries WHERE id=$1', [req.params.id]);
  res.status(204).send();
};
