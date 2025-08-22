import { Router, Request, Response } from "express";

type Movie = { id: number; title: string; year?: number; genre?: string };
const router = Router();

let nextId = 1;
const movies: Movie[] = [];

router.get("/", (_req: Request, res: Response) => res.json(movies));

router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const m = movies.find(x => x.id === id);
  if (!m) return res.status(404).json({ error: "not found" });
  res.json(m);
});

router.post("/", (req: Request, res: Response) => {
  const { title, year, genre } = req.body as Partial<Movie>;
  if (!title || !title.trim()) return res.status(400).json({ error: "title required" });
  const movie: Movie = { id: nextId++, title: title.trim(), year, genre };
  movies.unshift(movie);
  res.status(201).json(movie);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = movies.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const { title, year, genre } = req.body as Partial<Movie>;
  if (!title || !title.trim()) return res.status(400).json({ error: "title required" });
  movies[idx] = { id, title: title.trim(), year, genre };
  res.json(movies[idx]);
});

router.patch("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const m = movies.find(x => x.id === id);
  if (!m) return res.status(404).json({ error: "not found" });
  const { title, year, genre } = req.body as Partial<Movie>;
  if (title !== undefined) m.title = title.trim();
  if (year !== undefined) m.year = year;
  if (genre !== undefined) m.genre = genre;
  res.json(m);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = movies.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  movies.splice(idx, 1);
  res.status(204).send();
});

export default router;
