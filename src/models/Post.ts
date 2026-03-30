import { Schema, model } from "mongoose";

const MetricsSchema = new Schema(
  {
    views: Number,
    likes: Number,
    comments: Number,
    shares: Number,
    reach: Number,
    watchTimeMinutes: Number,
  },
  { _id: false },
);

const SentimentSchema = new Schema(
  {
    positive: Number,
    neutral: Number,
    negative: Number,
  },
  { _id: false },
);

const PostSchema = new Schema(
  {
    brandId: { type: String, required: true },
    platform: { type: String, required: true },
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    publishedAt: { type: String, required: true },
    metrics: { type: MetricsSchema, required: true },
    sentiment: { type: SentimentSchema, required: true },
    mentionText: { type: String, required: true },
  },
  { timestamps: true },
);

export const PostModel = model("Post", PostSchema);
