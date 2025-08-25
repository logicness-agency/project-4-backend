import { Router, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// GET comments for a movie
router.get("/movies/:movieId/comments", async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieId);
  const comments = await prisma.comment.findMany({ where: { movieId } });
  res.json(comments);
});

// POST add comment
router.post("/movies/:movieId/comments", async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieId);
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: "text required" });

  try {
    const comment = await prisma.comment.create({
      data: { text: text.trim(), movieId },
    });
    res.status(201).json(comment);
  } catch {
    res.status(404).json({ error: "movie not found" });
  }
});

// DELETE comment
router.delete("/comments/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

export default router;
