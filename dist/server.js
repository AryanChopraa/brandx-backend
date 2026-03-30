"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const brands_js_1 = require("./routes/brands.js");
const dashboard_js_1 = require("./routes/dashboard.js");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "wldd-brand-pulse-backend" });
});
app.use("/api/brands", brands_js_1.brandsRouter);
app.use("/api/dashboard", dashboard_js_1.dashboardRouter);
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
