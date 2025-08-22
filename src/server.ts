import express from "express";
import cors from "cors";
import moviesRouter from "./routes/movies";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => res.json({ message: "Hello from Express + TS!" }));

app.use("/movies", moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
