import { Schema, model } from "mongoose";

const SocialLinksSchema = new Schema(
  {
    youtube: { type: String, default: "" },
    reddit: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  { _id: false },
);

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    description: { type: String, default: "" },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export const BrandModel = model("Brand", BrandSchema);
