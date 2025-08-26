import { Router, Request, Response } from "express";
import prisma from "../db";

const router = Router();

// GET /movies – alle Filme (neueste zuerst) + Comment-Count
router.get("/", async (_req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    orderBy: { id: "desc" },
    include: { _count: { select: { comments: true } } },
  });
  res.json(movies);
});

// GET /movies/:id – einzelner Film inkl. Comments
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });

  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { comments: true },
  });
  if (!movie) return res.status(404).json({ error: "not found" });
  res.json(movie);
});

// POST /movies – neuen Film anlegen
router.post("/", async (req: Request, res: Response) => {
  const { title, year, genre, imageUrl } = req.body as {
    title?: string; year?: number | string; genre?: string; imageUrl?: string;
  };
  if (!title?.trim()) return res.status(400).json({ error: "title required" });

  const movie = await prisma.movie.create({
    data: {
      title: title.trim(),
      year: year === "" || year == null ? undefined : Number(year),
      genre,
      imageUrl,
    },
  });
  res.status(201).json(movie);
});

// PUT /movies/:id – komplett überschreiben
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, year, genre, imageUrl } = req.body as {
    title?: string; year?: number | string; genre?: string; imageUrl?: string;
  };
  if (!title?.trim()) return res.status(400).json({ error: "title required" });

  try {
    const movie = await prisma.movie.update({
      where: { id },
      data: {
        title: title.trim(),
        year: year === "" || year == null ? undefined : Number(year),
        genre,
        imageUrl,
      },
    });
    res.json(movie);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

// PATCH /movies/:id – teilweise ändern (inkl. imageUrl)
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });

  const { title, year, genre, imageUrl } = req.body as {
    title?: string; year?: number | string; genre?: string; imageUrl?: string;
  };

  try {
    const movie = await prisma.movie.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(year !== undefined && year !== "" ? { year: Number(year) } : {}),
        ...(genre !== undefined ? { genre } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
      },
    });
    res.json(movie);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

// DELETE /movies/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });

  try {
    await prisma.movie.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).json({ error: "not found" });
  }
});

export default router;
