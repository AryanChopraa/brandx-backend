export type Platform = "youtube" | "reddit" | "twitter" | "instagram";

export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  socialLinks: Record<Platform, string>;
};

export type Post = {
  id: string;
  brandId: string;
  platform: Platform;
  title: string;
  thumbnailUrl: string;
  sourceUrl: string;
  publishedAt: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    watchTimeMinutes: number;
    saves: number;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  demographics: {
    device: Record<string, number>;
    gender: Record<string, number>;
    age: Record<string, number>;
    country: Record<string, number>;
    os: Record<string, number>;
  };
  mentionText: string;
};

export let brands: Brand[] = [
  {
    id: "b1",
    name: "ZestFuel",
    logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop",
    description: "Healthy snacks for creators",
    socialLinks: { youtube: "", reddit: "", twitter: "", instagram: "" },
  },
  {
    id: "b2",
    name: "FinPilot",
    logoUrl: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=80&h=80&fit=crop",
    description: "Personal finance app",
    socialLinks: { youtube: "", reddit: "", twitter: "", instagram: "" },
  },
  {
    id: "b3",
    name: "SkinNova",
    logoUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=80&h=80&fit=crop",
    description: "D2C skincare line",
    socialLinks: { youtube: "", reddit: "", twitter: "", instagram: "" },
  },
];

const demoBase = {
  device: { Mobile: 72, Desktop: 19, Tablet: 6, TV: 3 },
  gender: { Male: 49, Female: 46, "Not Specified": 5 },
  age: { "13-17": 5, "18-24": 28, "25-34": 32, "35-44": 19, "45-54": 10, "55-64": 4, "65+": 2 },
  country: { India: 42, "United States": 24, Canada: 7, UK: 6, UAE: 5, Pakistan: 4, Germany: 3 },
  os: { Android: 47, iOS: 29, Windows: 13, macOS: 7, Linux: 4 },
};

export let posts: Post[] = [
  {
    id: "p1",
    brandId: "b1",
    platform: "youtube",
    title: "ZestFuel challenge is everywhere",
    thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-28T10:00:00Z",
    metrics: { views: 940000, likes: 62000, comments: 4300, shares: 3800, reach: 1150000, watchTimeMinutes: 890000, saves: 5200 },
    sentiment: { positive: 72, neutral: 19, negative: 9 },
    demographics: demoBase,
    mentionText: "People are reacting positively to #ZestFuelChallenge",
  },
  {
    id: "p2",
    brandId: "b1",
    platform: "instagram",
    title: "Snack stack reel goes viral",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-26T08:00:00Z",
    metrics: { views: 620000, likes: 81000, comments: 2200, shares: 5400, reach: 890000, watchTimeMinutes: 0, saves: 8200 },
    sentiment: { positive: 77, neutral: 16, negative: 7 },
    demographics: demoBase,
    mentionText: "Strong creator adoption on Instagram reels",
  },
  {
    id: "p3",
    brandId: "b2",
    platform: "reddit",
    title: "FinPilot budgeting thread",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-25T12:00:00Z",
    metrics: { views: 240000, likes: 23000, comments: 5900, shares: 1200, reach: 360000, watchTimeMinutes: 0, saves: 400 },
    sentiment: { positive: 66, neutral: 22, negative: 12 },
    demographics: demoBase,
    mentionText: "Community is debating pricing but interest is high",
  },
  {
    id: "p4",
    brandId: "b2",
    platform: "reddit",
    title: "FinPilot launch clip",
    thumbnailUrl: "https://picsum.photos/seed/finpilot-budgeting-thread/800/450",
    sourceUrl: "#",
    publishedAt: "2026-03-22T12:00:00Z",
    metrics: { views: 480000, likes: 34000, comments: 1900, shares: 8300, reach: 620000, watchTimeMinutes: 120000, saves: 0 },
    sentiment: { positive: 64, neutral: 24, negative: 12 },
    demographics: demoBase,
    mentionText: "Launch tweets drove meaningful traffic spikes",
  },
  {
    id: "p5",
    brandId: "b3",
    platform: "youtube",
    title: "SkinNova before/after story",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-24T09:30:00Z",
    metrics: { views: 710000, likes: 51000, comments: 3700, shares: 3100, reach: 870000, watchTimeMinutes: 640000, saves: 4300 },
    sentiment: { positive: 79, neutral: 14, negative: 7 },
    demographics: demoBase,
    mentionText: "Beauty audience sentiment remains very positive",
  },
  {
    id: "p6",
    brandId: "b3",
    platform: "instagram",
    title: "Skincare routine carousel",
    thumbnailUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-21T17:20:00Z",
    metrics: { views: 530000, likes: 69000, comments: 2600, shares: 2800, reach: 760000, watchTimeMinutes: 0, saves: 9200 },
    sentiment: { positive: 83, neutral: 12, negative: 5 },
    demographics: demoBase,
    mentionText: "High saves indicate strong purchase intent",
  },
  {
    id: "p7",
    brandId: "b1",
    platform: "youtube",
    title: "ZestFuel creator reaction mashup",
    thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-20T13:15:00Z",
    metrics: { views: 510000, likes: 42000, comments: 2800, shares: 2100, reach: 670000, watchTimeMinutes: 470000, saves: 3600 },
    sentiment: { positive: 75, neutral: 17, negative: 8 },
    demographics: demoBase,
    mentionText: "Creator mashup keeps momentum alive on YouTube",
  },
  {
    id: "p8",
    brandId: "b2",
    platform: "instagram",
    title: "FinPilot money hacks carousel",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
    sourceUrl: "#",
    publishedAt: "2026-03-19T11:05:00Z",
    metrics: { views: 455000, likes: 38800, comments: 2400, shares: 2600, reach: 590000, watchTimeMinutes: 0, saves: 5200 },
    sentiment: { positive: 69, neutral: 21, negative: 10 },
    demographics: demoBase,
    mentionText: "Instagram carousel drove strong saves and shares",
  },
];

export const platformLabel = {
  youtube: "YouTube",
  reddit: "Reddit",
  twitter: "Twitter/X",
  instagram: "Instagram",
};
