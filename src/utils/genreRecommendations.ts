export interface GenreRecommendation {
  recommendedColors: string[];
  avoidColors: string[];
  trendingWords: string[];
  hashtagSuggestions: string[];
  colorPalette: { name: string; hex: string; usage: string }[];
  optimizationTips: string[];
  mood: string;
  targetAudience: string;
}

export const videoGenres = {
  "lifestyle": "Lifestyle",
  "beauty": "Beauty & Fashion",
  "fitness": "Fitness & Health",
  "tech": "Technology",
  "gaming": "Gaming",
  "food": "Food & Cooking",
  "travel": "Travel",
  "education": "Educational",
  "music": "Music",
  "comedy": "Comedy",
  "business": "Business",
  "art": "Art & Design"
};

export const genreRecommendations: Record<string, GenreRecommendation> = {
  lifestyle: {
    recommendedColors: ["Warm beige", "Soft pink", "Cream white", "Light gold"],
    avoidColors: ["Neon green", "Electric blue", "Hot magenta"],
    trendingWords: ["authentic", "minimal", "cozy", "aesthetic", "vibe", "mood"],
    hashtagSuggestions: ["#lifestyle", "#aesthetic", "#dailyvibe", "#mindful", "#cozy"],
    colorPalette: [
      { name: "Warm Beige", hex: "#F5E6D3", usage: "Background/base" },
      { name: "Soft Pink", hex: "#F8D7DA", usage: "Accent/highlights" },
      { name: "Sage Green", hex: "#B5C99A", usage: "Natural elements" },
      { name: "Cream", hex: "#FFF8E7", usage: "Text backgrounds" }
    ],
    optimizationTips: [
      "Use natural lighting for authentic feel",
      "Keep color palette minimal and cohesive",
      "Add plants or natural elements for trending aesthetic",
      "Use soft shadows and warm tones"
    ],
    mood: "Calm, authentic, relatable",
    targetAudience: "18-35 lifestyle enthusiasts"
  },
  beauty: {
    recommendedColors: ["Rose gold", "Nude pink", "Champagne", "Soft coral"],
    avoidColors: ["Dark brown", "Olive green", "Navy blue"],
    trendingWords: ["glow", "radiant", "flawless", "transformation", "skincare", "routine"],
    hashtagSuggestions: ["#beautyreels", "#glowup", "#skincare", "#makeup", "#transformation"],
    colorPalette: [
      { name: "Rose Gold", hex: "#E8B4B8", usage: "Luxury accents" },
      { name: "Nude Pink", hex: "#F5C2C7", usage: "Skin tones" },
      { name: "Champagne", hex: "#F7E7CE", usage: "Highlights" },
      { name: "Soft Coral", hex: "#FF9F9B", usage: "Lip colors" }
    ],
    optimizationTips: [
      "Use ring lights for even skin tone appearance",
      "Apply warm color grading for flattering look",
      "Focus on close-up shots with good lighting",
      "Use mirrors and reflective surfaces strategically"
    ],
    mood: "Glamorous, aspirational, confident",
    targetAudience: "16-40 beauty enthusiasts"
  },
  fitness: {
    recommendedColors: ["Energetic orange", "Power red", "Fresh green", "Electric blue"],
    avoidColors: ["Pastel pink", "Beige", "Light yellow"],
    trendingWords: ["energy", "strength", "transformation", "grind", "power", "beast mode"],
    hashtagSuggestions: ["#fitness", "#workout", "#gains", "#transformation", "#motivation"],
    colorPalette: [
      { name: "Energy Orange", hex: "#FF6B35", usage: "Motivation elements" },
      { name: "Power Red", hex: "#D32F2F", usage: "Intensity highlights" },
      { name: "Fresh Green", hex: "#4CAF50", usage: "Health/nutrition" },
      { name: "Electric Blue", hex: "#2196F3", usage: "Technology/tracking" }
    ],
    optimizationTips: [
      "Use high contrast colors for energy",
      "Include dynamic lighting changes",
      "Show progress with before/after color coding",
      "Use bold typography with strong colors"
    ],
    mood: "Energetic, motivational, powerful",
    targetAudience: "18-45 fitness enthusiasts"
  },
  tech: {
    recommendedColors: ["Electric blue", "Neon green", "Silver", "Deep purple"],
    avoidColors: ["Warm brown", "Soft pink", "Cream"],
    trendingWords: ["innovation", "AI", "future", "tech", "digital", "smart"],
    hashtagSuggestions: ["#tech", "#innovation", "#AI", "#future", "#digital"],
    colorPalette: [
      { name: "Electric Blue", hex: "#0066FF", usage: "Primary tech elements" },
      { name: "Neon Green", hex: "#00FF41", usage: "Success/active states" },
      { name: "Silver", hex: "#C0C0C0", usage: "Hardware/devices" },
      { name: "Deep Purple", hex: "#6A0DAD", usage: "Premium features" }
    ],
    optimizationTips: [
      "Use LED lighting for futuristic feel",
      "Include screen reflections and glows",
      "Apply blue color grading for tech aesthetic",
      "Use geometric shapes and clean lines"
    ],
    mood: "Innovative, futuristic, professional",
    targetAudience: "20-45 tech professionals"
  },
  gaming: {
    recommendedColors: ["RGB rainbow", "Neon purple", "Electric green", "Hot pink"],
    avoidColors: ["Beige", "Brown", "Muted colors"],
    trendingWords: ["epic", "gaming", "stream", "gg", "clutch", "noob"],
    hashtagSuggestions: ["#gaming", "#gamer", "#stream", "#esports", "#gameplay"],
    colorPalette: [
      { name: "Neon Purple", hex: "#BF00FF", usage: "Gaming highlights" },
      { name: "Electric Green", hex: "#39FF14", usage: "Success/wins" },
      { name: "Hot Pink", hex: "#FF1493", usage: "Energy bursts" },
      { name: "Cyber Blue", hex: "#00FFFF", usage: "UI elements" }
    ],
    optimizationTips: [
      "Use RGB lighting effects",
      "Include screen glow and reflections",
      "Apply high saturation color grading",
      "Add neon outlines and effects"
    ],
    mood: "Exciting, competitive, immersive",
    targetAudience: "13-35 gamers"
  },
  food: {
    recommendedColors: ["Appetizing orange", "Fresh green", "Golden yellow", "Rich brown"],
    avoidColors: ["Purple", "Blue", "Gray"],
    trendingWords: ["delicious", "recipe", "foodie", "tasty", "homemade", "fresh"],
    hashtagSuggestions: ["#food", "#recipe", "#cooking", "#foodie", "#delicious"],
    colorPalette: [
      { name: "Golden Yellow", hex: "#FFD700", usage: "Cheese/grains" },
      { name: "Fresh Green", hex: "#32CD32", usage: "Vegetables/herbs" },
      { name: "Rich Brown", hex: "#8B4513", usage: "Meats/bread" },
      { name: "Appetizing Orange", hex: "#FF8C00", usage: "Warmth/spices" }
    ],
    optimizationTips: [
      "Use warm color temperature lighting",
      "Enhance natural food colors",
      "Include fresh ingredients as color accents",
      "Apply golden hour color grading"
    ],
    mood: "Appetizing, warm, inviting",
    targetAudience: "25-55 food enthusiasts"
  }
};

export const getGenreRecommendation = (genre: string): GenreRecommendation => {
  return genreRecommendations[genre] || genreRecommendations.lifestyle;
};