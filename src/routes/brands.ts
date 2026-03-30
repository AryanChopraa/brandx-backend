import { Router } from "express";
import { brands, type Platform } from "../data/mockData.js";

const platforms: Platform[] = ["youtube", "reddit", "twitter", "instagram"];

export const brandsRouter = Router();

brandsRouter.get("/", (_req, res) => {
  res.json(brands);
});

brandsRouter.post("/", (req, res) => {
  const body = req.body as {
    name: string;
    logoUrl: string;
    description?: string;
    socialLinks?: Partial<Record<Platform, string>>;
  };
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
  brands.push(newBrand);
  res.status(201).json(newBrand);
});

brandsRouter.put("/:brandId", (req, res) => {
  const { brandId } = req.params;
  const idx = brands.findIndex((b) => b.id === brandId);
  if (idx === -1) return res.status(404).json({ message: "Brand not found" });
  const existing = brands[idx];
  const body = req.body as {
    name?: string;
    logoUrl?: string;
    description?: string;
    socialLinks?: Partial<Record<Platform, string>>;
  };
  brands[idx] = {
    ...existing,
    ...body,
    socialLinks: {
      ...existing.socialLinks,
      ...body.socialLinks,
    },
  };
  return res.json(brands[idx]);
});

brandsRouter.delete("/:brandId", (req, res) => {
  const { brandId } = req.params;
  const idx = brands.findIndex((b) => b.id === brandId);
  if (idx === -1) return res.status(404).json({ message: "Brand not found" });
  const [removed] = brands.splice(idx, 1);
  return res.json({ removed, success: true, supportedPlatforms: platforms });
});
