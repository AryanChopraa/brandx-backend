"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const MetricsSchema = new mongoose_1.Schema({
    views: Number,
    likes: Number,
    comments: Number,
    shares: Number,
    reach: Number,
    watchTimeMinutes: Number,
}, { _id: false });
const SentimentSchema = new mongoose_1.Schema({
    positive: Number,
    neutral: Number,
    negative: Number,
}, { _id: false });
const PostSchema = new mongoose_1.Schema({
    brandId: { type: String, required: true },
    platform: { type: String, required: true },
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    publishedAt: { type: String, required: true },
    metrics: { type: MetricsSchema, required: true },
    sentiment: { type: SentimentSchema, required: true },
    mentionText: { type: String, required: true },
}, { timestamps: true });
exports.PostModel = (0, mongoose_1.model)("Post", PostSchema);
