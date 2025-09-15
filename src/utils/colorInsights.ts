import { ColorData, ColorDistribution } from '@/types/colorAnalysis';

interface ColorInsight {
  type: 'positive' | 'improvement' | 'action' | 'performance';
  message: string;
  confidence: number;
}

interface ColorAnalysisInsights {
  workingWell: ColorInsight[];
  improvements: ColorInsight[];
  specificActions: {
    colorGrading: string[];
    visualElements: string[];
    lightingChanges: string[];
  };
  performanceMetrics: {
    watchTime: string;
    clickThrough: string;
    emotionalResponse: string;
    brandRecall: string;
    overallScore: number;
  };
}

// Color psychology mappings
const colorPsychology: Record<string, { emotion: string; engagement: number; trust: number; energy: number }> = {
  "Red": { emotion: "excitement", engagement: 85, trust: 45, energy: 95 },
  "Blue": { emotion: "trust", engagement: 70, trust: 90, energy: 40 },
  "Green": { emotion: "calm", engagement: 75, trust: 80, energy: 60 },
  "Yellow": { emotion: "happiness", engagement: 80, trust: 55, energy: 85 },
  "Orange": { emotion: "enthusiasm", engagement: 85, trust: 65, energy: 90 },
  "Purple": { emotion: "luxury", engagement: 70, trust: 75, energy: 60 },
  "Pink": { emotion: "playfulness", engagement: 75, trust: 60, energy: 70 },
  "Black": { emotion: "sophistication", engagement: 60, trust: 70, energy: 30 },
  "White": { emotion: "cleanliness", engagement: 55, trust: 85, energy: 40 },
  "Gray": { emotion: "neutrality", engagement: 50, trust: 70, energy: 35 },
  "Brown": { emotion: "earthiness", engagement: 55, trust: 75, energy: 45 },
  "Cyan": { emotion: "freshness", engagement: 65, trust: 70, energy: 55 },
  "Magenta": { emotion: "creativity", engagement: 80, trust: 50, energy: 85 }
};

// Calculate color complexity score
function calculateColorComplexity(distribution: ColorDistribution[]): number {
  const totalColors = distribution.length;
  const entropy = distribution.reduce((acc, color) => {
    const p = color.percentage / 100;
    return acc - (p * Math.log2(p || 0.001));
  }, 0);
  
  return Math.min(entropy / Math.log2(totalColors || 1), 1) * 100;
}

// Calculate color harmony score
function calculateColorHarmony(distribution: ColorDistribution[]): number {
  const dominantPercentage = distribution[0]?.percentage || 0;
  const secondaryPercentage = distribution[1]?.percentage || 0;
  
  // Good harmony: one dominant color (40-60%) with supporting colors
  if (dominantPercentage >= 40 && dominantPercentage <= 60) return 85;
  if (dominantPercentage >= 30 && dominantPercentage <= 70) return 70;
  if (dominantPercentage >= 20 && dominantPercentage <= 80) return 55;
  return 40;
}

// Generate dynamic insights based on actual color data
export function generateColorInsights(data: ColorData): ColorAnalysisInsights {
  const { distribution, dominant } = data;
  const complexity = calculateColorComplexity(distribution);
  const harmony = calculateColorHarmony(distribution);
  
  // Calculate engagement metrics based on actual colors
  const avgEngagement = distribution.reduce((acc, color) => {
    const psychology = colorPsychology[color.color];
    return acc + (psychology?.engagement || 50) * (color.percentage / 100);
  }, 0);

  const avgTrust = distribution.reduce((acc, color) => {
    const psychology = colorPsychology[color.color];
    return acc + (psychology?.trust || 50) * (color.percentage / 100);
  }, 0);

  const avgEnergy = distribution.reduce((acc, color) => {
    const psychology = colorPsychology[color.color];
    return acc + (psychology?.energy || 50) * (color.percentage / 100);
  }, 0);

  const workingWell: ColorInsight[] = [];
  const improvements: ColorInsight[] = [];

  // Dynamic analysis of what's working
  if (dominant.percentage >= 40 && dominant.percentage <= 60) {
    workingWell.push({
      type: 'positive',
      message: `Excellent color balance with ${dominant.color.toLowerCase()} at ${dominant.percentage.toFixed(1)}% - creates strong visual identity without overwhelming`,
      confidence: 90
    });
  }

  if (complexity < 30) {
    workingWell.push({
      type: 'positive',
      message: `Clean, minimal palette (${distribution.length} main colors) enhances viewer focus and reduces cognitive load`,
      confidence: 85
    });
  }

  if (avgEngagement > 75) {
    workingWell.push({
      type: 'positive',
      message: `High-engagement color scheme (${avgEngagement.toFixed(0)}% engagement score) likely to capture attention`,
      confidence: Math.round(avgEngagement)
    });
  }

  if (avgTrust > 75) {
    workingWell.push({
      type: 'positive',
      message: `Trustworthy color palette (${avgTrust.toFixed(0)}% trust score) builds credibility with viewers`,
      confidence: Math.round(avgTrust)
    });
  }

  // Dynamic analysis of improvements needed
  if (dominant.percentage > 70) {
    improvements.push({
      type: 'improvement',
      message: `${dominant.color} dominates ${dominant.percentage.toFixed(1)}% of the video - add accent colors to prevent monotony`,
      confidence: 85
    });
  }

  if (complexity > 70) {
    improvements.push({
      type: 'improvement',
      message: `High color complexity (${complexity.toFixed(0)}%) with ${distribution.length} colors may distract viewers - consider simplifying`,
      confidence: Math.round(complexity)
    });
  }

  if (avgEngagement < 60) {
    improvements.push({
      type: 'improvement',
      message: `Low engagement colors detected (${avgEngagement.toFixed(0)}% score) - add warmer, more vibrant tones`,
      confidence: 80
    });
  }

  if (!distribution.some(c => ['Red', 'Orange', 'Yellow'].includes(c.color)) && avgEnergy < 50) {
    improvements.push({
      type: 'improvement',
      message: `Missing warm accent colors - add red, orange, or yellow elements to boost energy and engagement`,
      confidence: 75
    });
  }

  if (!distribution.some(c => c.color === 'Blue') && avgTrust < 70) {
    improvements.push({
      type: 'improvement',
      message: `No blue tones detected - consider adding blue accents to increase trustworthiness and professionalism`,
      confidence: 70
    });
  }

  // Generate specific actions based on color analysis
  const specificActions = {
    colorGrading: [] as string[],
    visualElements: [] as string[],
    lightingChanges: [] as string[]
  };

  // Dynamic color grading suggestions
  if (avgEnergy < 60) {
    specificActions.colorGrading.push(`Increase saturation by ${Math.round((70 - avgEnergy) / 5)}0% to boost energy`);
    specificActions.colorGrading.push('Warm up color temperature by 200-400K');
  }

  if (dominant.percentage > 60) {
    specificActions.colorGrading.push(`Reduce ${dominant.color.toLowerCase()} dominance through selective color adjustment`);
  }

  if (harmony < 60) {
    specificActions.colorGrading.push('Apply color harmony filters to improve palette cohesion');
  }

  // Visual elements based on missing colors
  const missingWarmColors = !distribution.some(c => ['Red', 'Orange', 'Yellow'].includes(c.color));
  const missingCoolColors = !distribution.some(c => ['Blue', 'Green', 'Purple'].includes(c.color));

  if (missingWarmColors) {
    specificActions.visualElements.push('Add warm-colored text overlays or graphics');
    specificActions.visualElements.push('Include orange/red accent elements in lower thirds');
  }

  if (missingCoolColors) {
    specificActions.visualElements.push('Add blue or green branded elements');
    specificActions.visualElements.push('Include cool-toned background graphics');
  }

  // Lighting changes based on energy and mood
  if (avgEnergy < 50) {
    specificActions.lightingChanges.push('Add warm LED accent lighting (2700K-3000K)');
    specificActions.lightingChanges.push('Increase key light intensity by 20-30%');
  }

  if (avgTrust < 60) {
    specificActions.lightingChanges.push('Add blue ambient lighting in background');
    specificActions.lightingChanges.push('Use cooler ring light temperature (5600K)');
  }

  // Calculate performance metrics
  const overallScore = Math.round((avgEngagement + avgTrust + harmony) / 3);
  
  const performanceMetrics = {
    watchTime: avgEngagement > 70 ? 'Above average (+15-25%)' : avgEngagement > 50 ? 'Average' : 'Below average (-10-20%)',
    clickThrough: harmony > 70 ? 'Higher potential (+20-30%)' : harmony > 50 ? 'Moderate' : 'Lower potential (-15%)',
    emotionalResponse: avgEnergy > 70 ? 'High energy, engaging' : avgEnergy > 50 ? 'Moderate energy' : 'Low energy, calm',
    brandRecall: dominant.percentage > 50 ? `Strong (${dominant.color} dominance)` : 'Moderate (diverse palette)',
    overallScore
  };

  return {
    workingWell,
    improvements,
    specificActions,
    performanceMetrics
  };
}