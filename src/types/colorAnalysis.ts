
export interface ColorDistribution {
  color: string;
  count: number;
  percentage: number;
}

export interface ColorData {
  distribution: ColorDistribution[];
  dominant: ColorDistribution;
  mood: string;
  timeline: { frame: number; color: string }[];
}
