"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const mockData_js_1 = require("../data/mockData.js");
const asArray = (value) => {
    if (!value)
        return [];
    if (Array.isArray(value))
        return value.filter(Boolean);
    return String(value)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
};
const averageDistribution = (records) => {
    const totals = {};
    if (!records.length)
        return totals;
    for (const rec of records) {
        for (const [key, value] of Object.entries(rec)) {
            totals[key] = (totals[key] ?? 0) + value;
        }
    }
    for (const key of Object.keys(totals)) {
        totals[key] = Number((totals[key] / records.length).toFixed(1));
    }
    return totals;
};
exports.dashboardRouter = (0, express_1.Router)();
exports.dashboardRouter.get("/overview", (req, res) => {
    const selectedBrandIds = asArray(req.query.brandIds);
    const filtered = selectedBrandIds.length ? mockData_js_1.posts.filter((p) => selectedBrandIds.includes(p.brandId)) : mockData_js_1.posts;
    const totals = filtered.reduce((acc, post) => {
        acc.mentions += 1;
        acc.reach += post.metrics.reach;
        acc.views += post.metrics.views;
        acc.likes += post.metrics.likes;
        acc.comments += post.metrics.comments;
        acc.shares += post.metrics.shares;
        acc.saves += post.metrics.saves;
        acc.watchTime += post.metrics.watchTimeMinutes;
        acc.engagement += post.metrics.likes + post.metrics.comments + post.metrics.shares;
        acc.sentimentPos += post.sentiment.positive;
        acc.sentimentNeu += post.sentiment.neutral;
        acc.sentimentNeg += post.sentiment.negative;
        return acc;
    }, {
        mentions: 0,
        reach: 0,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        watchTime: 0,
        engagement: 0,
        sentimentPos: 0,
        sentimentNeu: 0,
        sentimentNeg: 0,
    });
    const sentimentScore = filtered.length ? Number((totals.sentimentPos / filtered.length).toFixed(1)) : 0;
    const subscribers = Math.floor(totals.views * 0.13);
    const subscribersGained = Math.floor(subscribers * 0.08);
    const subscribersLost = Math.floor(subscribers * 0.012);
    const platformTotals = filtered.reduce((acc, post) => {
        acc[post.platform] = (acc[post.platform] ?? 0) + post.metrics.views;
        return acc;
    }, {});
    const platformDistribution = Object.entries(platformTotals).map(([platform, views]) => ({
        platform,
        label: mockData_js_1.platformLabel[platform],
        percentage: totals.views ? Number(((views / totals.views) * 100).toFixed(1)) : 0,
    }));
    res.json({
        selectedBrandIds,
        stats: {
            totalMentions: totals.mentions,
            totalReach: totals.reach,
            totalEngagement: totals.engagement,
            postsCount: filtered.length,
            subscribersFollowers: subscribers,
            watchTimeMinutes: totals.watchTime,
            sentimentScore,
            viewMore: {
                commentsCount: totals.comments,
                sharesCount: totals.shares,
                savesCount: totals.saves,
                subscribersGained,
                subscribersLost,
            },
        },
        platformDistribution,
    });
});
exports.dashboardRouter.get("/demographics", (req, res) => {
    const selectedBrandIds = asArray(req.query.brandIds);
    const filtered = selectedBrandIds.length ? mockData_js_1.posts.filter((p) => selectedBrandIds.includes(p.brandId)) : mockData_js_1.posts;
    const demographics = {
        device: averageDistribution(filtered.map((p) => p.demographics.device)),
        gender: averageDistribution(filtered.map((p) => p.demographics.gender)),
        age: averageDistribution(filtered.map((p) => p.demographics.age)),
        country: averageDistribution(filtered.map((p) => p.demographics.country)),
        os: averageDistribution(filtered.map((p) => p.demographics.os)),
    };
    res.json(demographics);
});
exports.dashboardRouter.get("/sentiment", (req, res) => {
    const selectedBrandIds = asArray(req.query.brandIds);
    const filtered = selectedBrandIds.length ? mockData_js_1.posts.filter((p) => selectedBrandIds.includes(p.brandId)) : mockData_js_1.posts;
    const byPlatform = filtered.reduce((acc, post) => {
        if (!acc[post.platform]) {
            acc[post.platform] = { positive: 0, neutral: 0, negative: 0, count: 0 };
        }
        acc[post.platform].positive += post.sentiment.positive;
        acc[post.platform].neutral += post.sentiment.neutral;
        acc[post.platform].negative += post.sentiment.negative;
        acc[post.platform].count += 1;
        return acc;
    }, {});
    const platformSentiment = Object.entries(byPlatform).map(([platform, totals]) => ({
        platform,
        label: mockData_js_1.platformLabel[platform],
        positive: Number((totals.positive / totals.count).toFixed(1)),
        neutral: Number((totals.neutral / totals.count).toFixed(1)),
        negative: Number((totals.negative / totals.count).toFixed(1)),
    }));
    const average = filtered.reduce((acc, p) => {
        acc.positive += p.sentiment.positive;
        acc.neutral += p.sentiment.neutral;
        acc.negative += p.sentiment.negative;
        return acc;
    }, { positive: 0, neutral: 0, negative: 0 });
    const count = filtered.length || 1;
    const overall = {
        positive: Number((average.positive / count).toFixed(1)),
        neutral: Number((average.neutral / count).toFixed(1)),
        negative: Number((average.negative / count).toFixed(1)),
    };
    const trend = [
        { day: "Mon", score: overall.positive - 4 },
        { day: "Tue", score: overall.positive - 2 },
        { day: "Wed", score: overall.positive - 1 },
        { day: "Thu", score: overall.positive + 1 },
        { day: "Fri", score: overall.positive + 2 },
        { day: "Sat", score: overall.positive + 1 },
        { day: "Sun", score: overall.positive + 3 },
    ];
    res.json({ overall, trend, platformSentiment });
});
exports.dashboardRouter.get("/top-content", (req, res) => {
    const selectedBrandIds = asArray(req.query.brandIds);
    const filtered = selectedBrandIds.length ? mockData_js_1.posts.filter((p) => selectedBrandIds.includes(p.brandId)) : mockData_js_1.posts;
    const sorted = [...filtered].sort((a, b) => b.metrics.likes + b.metrics.comments + b.metrics.shares - (a.metrics.likes + a.metrics.comments + a.metrics.shares));
    const data = sorted.slice(0, 8).map((post) => ({
        id: post.id,
        title: post.title,
        thumbnailUrl: post.thumbnailUrl,
        platform: post.platform,
        brandName: mockData_js_1.brands.find((b) => b.id === post.brandId)?.name ?? "Unknown",
        views: post.metrics.views,
        engagement: post.metrics.likes + post.metrics.comments + post.metrics.shares,
    }));
    res.json(data);
});
exports.dashboardRouter.get("/mentions", (req, res) => {
    const selectedBrandIds = asArray(req.query.brandIds);
    const filtered = selectedBrandIds.length ? mockData_js_1.posts.filter((p) => selectedBrandIds.includes(p.brandId)) : mockData_js_1.posts;
    const mentions = filtered
        .slice()
        .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
        .map((p) => ({
        id: p.id,
        text: p.mentionText,
        brandName: mockData_js_1.brands.find((b) => b.id === p.brandId)?.name ?? "Unknown",
        platform: mockData_js_1.platformLabel[p.platform],
        sentiment: p.sentiment.positive >= 70 ? "positive" : p.sentiment.negative >= 14 ? "negative" : "neutral",
        publishedAt: p.publishedAt,
    }));
    res.json(mentions);
});
