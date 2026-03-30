"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsRouter = void 0;
const express_1 = require("express");
const mockData_js_1 = require("../data/mockData.js");
const platforms = ["youtube", "reddit", "twitter", "instagram"];
exports.brandsRouter = (0, express_1.Router)();
exports.brandsRouter.get("/", (_req, res) => {
    res.json(mockData_js_1.brands);
});
exports.brandsRouter.post("/", (req, res) => {
    const body = req.body;
    const newBrand = {
        id: `b${Date.now()}`,
        name: body.name,
        logoUrl: body.logoUrl,
        description: body.description ?? "",
        socialLinks: {
            youtube: body.socialLinks?.youtube ?? "",
            reddit: body.socialLinks?.reddit ?? "",
            twitter: body.socialLinks?.twitter ?? "",
            instagram: body.socialLinks?.instagram ?? "",
        },
    };
    mockData_js_1.brands.push(newBrand);
    res.status(201).json(newBrand);
});
exports.brandsRouter.put("/:brandId", (req, res) => {
    const { brandId } = req.params;
    const idx = mockData_js_1.brands.findIndex((b) => b.id === brandId);
    if (idx === -1)
        return res.status(404).json({ message: "Brand not found" });
    const existing = mockData_js_1.brands[idx];
    const body = req.body;
    mockData_js_1.brands[idx] = {
        ...existing,
        ...body,
        socialLinks: {
            ...existing.socialLinks,
            ...body.socialLinks,
        },
    };
    return res.json(mockData_js_1.brands[idx]);
});
exports.brandsRouter.delete("/:brandId", (req, res) => {
    const { brandId } = req.params;
    const idx = mockData_js_1.brands.findIndex((b) => b.id === brandId);
    if (idx === -1)
        return res.status(404).json({ message: "Brand not found" });
    const [removed] = mockData_js_1.brands.splice(idx, 1);
    return res.json({ removed, success: true, supportedPlatforms: platforms });
});
