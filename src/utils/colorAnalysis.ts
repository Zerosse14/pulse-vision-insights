
import { ColorData, ColorDistribution } from '@/types/colorAnalysis';

// Color mapping for classification
const COLOR_MAP: Record<string, [number, number, number]> = {
  "Red": [255, 0, 0],
  "Green": [0, 255, 0],
  "Blue": [0, 0, 255],
  "Yellow": [255, 255, 0],
  "Cyan": [0, 255, 255],
  "Magenta": [255, 0, 255],
  "White": [255, 255, 255],
  "Black": [0, 0, 0],
  "Gray": [128, 128, 128],
  "Orange": [255, 165, 0],
  "Brown": [165, 42, 42],
  "Pink": [255, 192, 203],
};

// Function to calculate Euclidean distance between colors
const colorDistance = (color1: [number, number, number], color2: [number, number, number]): number => {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
};

// Function to classify a color to the closest named color
const classifyColor = (r: number, g: number, b: number): string => {
  let minDistance = Infinity;
  let closestColor = "Gray";

  Object.entries(COLOR_MAP).forEach(([name, [r2, g2, b2]]) => {
    const distance = colorDistance([r, g, b], [r2, g2, b2]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = name;
    }
  });

  return closestColor;
};

// Extract frames from video for processing
const extractVideoFrames = async (
  video: HTMLVideoElement, 
  frameCount: number = 24
): Promise<ImageData[]> => {
  return new Promise((resolve) => {
    const frames: ImageData[] = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error("Could not create canvas context");

    // Set up canvas dimensions based on the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Calculate frames to extract
    const duration = video.duration;
    const interval = duration / frameCount;
    let currentFrame = 0;
    
    // Extract frames at regular intervals
    const extractFrame = () => {
      if (currentFrame >= frameCount) {
        resolve(frames);
        return;
      }
      
      video.currentTime = currentFrame * interval;
      currentFrame++;
      
      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        frames.push(imageData);
        extractFrame();
      };
    };
    
    extractFrame();
  });
};

// Analyze colors in the extracted frames
const analyzeFrames = (frames: ImageData[]): ColorData => {
  const colorCounter: Record<string, number> = {};
  let totalPixels = 0;
  const timeline: { frame: number; color: string }[] = [];
  
  // Process each frame
  frames.forEach((frame, frameIndex) => {
    const { data, width, height } = frame;
    const frameColors: Record<string, number> = {};
    
    // Sample pixels (downsample for performance)
    const sampleRate = 10;
    
    for (let i = 0; i < data.length; i += 4 * sampleRate) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const color = classifyColor(r, g, b);
      colorCounter[color] = (colorCounter[color] || 0) + 1;
      frameColors[color] = (frameColors[color] || 0) + 1;
      totalPixels++;
    }
    
    // Find dominant color in this frame
    let dominantColor = "Gray";
    let maxCount = 0;
    
    Object.entries(frameColors).forEach(([color, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantColor = color;
      }
    });
    
    timeline.push({
      frame: frameIndex,
      color: dominantColor
    });
  });
  
  // Create color distribution data
  const distribution: ColorDistribution[] = Object.entries(colorCounter)
    .map(([color, count]) => ({
      color,
      count,
      percentage: (count / totalPixels) * 100
    }))
    .sort((a, b) => b.percentage - a.percentage);
  
  // Get dominant color
  const dominant = distribution[0] || { color: "Gray", count: 0, percentage: 0 };
  
  // Determine mood based on dominant colors
  const determineMood = (colors: ColorDistribution[]): string => {
    const top3 = colors.slice(0, 3);
    
    const hasColor = (colorName: string) => 
      top3.some(c => c.color === colorName);
    
    if (hasColor("Red") || hasColor("Orange")) {
      return "Energetic and passionate";
    } else if (hasColor("Blue") || hasColor("Cyan")) {
      return "Calm and trustworthy";
    } else if (hasColor("Green")) {
      return "Natural and balanced";
    } else if (hasColor("Yellow")) {
      return "Cheerful and optimistic";
    } else if (hasColor("Purple") || hasColor("Magenta")) {
      return "Creative and luxurious";
    } else if (hasColor("Pink")) {
      return "Gentle and romantic";
    } else if (hasColor("Black") || hasColor("Gray")) {
      return "Sophisticated and serious";
    } else if (hasColor("White")) {
      return "Pure and minimalistic";
    } else {
      return "Balanced and harmonious";
    }
  };
  
  return {
    distribution,
    dominant,
    mood: determineMood(distribution),
    timeline
  };
};

// ML Models for color analysis
export const colorAnalysisModels = {
  basic: "Basic Color Detection",
  advanced: "CNN Color Classifier",
  emotion: "Emotion-based Color Analysis"
};

export const analyzeVideoColors = async (videoFile: File, model: string = "basic"): Promise<ColorData> => {
  return new Promise((resolve, reject) => {
    try {
      const videoUrl = URL.createObjectURL(videoFile);
      const video = document.createElement('video');
      
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.muted = true;
      
      video.onloadedmetadata = async () => {
        try {
          // Need to play video briefly to ensure it's loaded properly
          await video.play();
          video.pause();
          
          // Extract frames from the video
          const frames = await extractVideoFrames(video, 24);
          
          // Process the frames to get color data
          const colorData = analyzeFrames(frames);
          
          // Clean up
          URL.revokeObjectURL(videoUrl);
          
          resolve(colorData);
        } catch (error) {
          reject(error);
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(videoUrl);
        reject(new Error("Failed to load video file"));
      };
      
    } catch (error) {
      reject(error);
    }
  });
};
