import { Router, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// GET all movies
router.get("/", async (_req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    include: { comments: true },
  });
  res.json(movies);
});

// GET single movie
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { comments: true },
  });
  if (!movie) return res.status(404).json({ error: "not found" });
  res.json(movie);
});

// POST create movie
router.post("/", async (req: Request, res: Response) => {
  const { title, year, genre } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: "title required" });

  const movie = await prisma.movie.create({
    data: { title: title.trim(), year, genre },
  });
  res.status(201).json(movie);
});

// PUT update movie
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, year, genre } = req.body;
  try {
    const movie = await prisma.movie.update({
      where: { id },
      data: { title: title.trim(), year, genre },
    });
    res.json(movie);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

// DELETE movie
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.movie.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

export default router;
