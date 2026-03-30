"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModel = void 0;
const mongoose_1 = require("mongoose");
const SocialLinksSchema = new mongoose_1.Schema({
    youtube: { type: String, default: "" },
    reddit: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
}, { _id: false });
const BrandSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    description: { type: String, default: "" },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
}, { timestamps: true });
exports.BrandModel = (0, mongoose_1.model)("Brand", BrandSchema);
