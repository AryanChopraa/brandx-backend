import cors from "cors";
import express from "express";
import { brandsRouter } from "./routes/brands.js";
import { dashboardRouter } from "./routes/dashboard.js";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "wldd-brand-pulse-backend" });
});

app.use("/api/brands", brandsRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
