// src/server.ts
import express from "express";
import cors from "cors";
import moviesRouter from "./routes/movies";
import commentsRouter from "./routes/comments";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the MovieTracker API", endpoints: ["/health", "/movies"] });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/movies", moviesRouter);
app.use("/", commentsRouter); // hat Pfade /movies/:movieId/comments und /comments/:id

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
