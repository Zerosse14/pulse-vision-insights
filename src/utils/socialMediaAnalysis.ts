interface PostMetrics {
  likes: string;
  shares: string;
  comments: string;
}

interface AnalyzedPost {
  url: string;
  content: string;
  metrics: PostMetrics;
  timestamp: string;
  platform: string;
}

export class SocialMediaAnalyzer {
  static async analyzePost(url: string): Promise<AnalyzedPost | null> {
    try {
      // For now, we'll use a mock analysis since direct API calls from frontend have CORS issues
      // In a real implementation, this would go through a backend service
      
      const extractMetrics = (content: string): PostMetrics => {
        // Extract engagement numbers from typical social media post patterns
        const likes = content.match(/(\d+(?:,\d+)?)\s*likes?/i)?.[1] || 
                     content.match(/(\d+(?:K|M)?)\s*❤️/)?.[1] || 
                     Math.floor(Math.random() * 1000).toString();
        
        const shares = content.match(/(\d+(?:,\d+)?)\s*(?:shares?|retweets?)/i)?.[1] || 
                      content.match(/(\d+(?:K|M)?)\s*🔄/)?.[1] || 
                      Math.floor(Math.random() * 100).toString();
        
        const comments = content.match(/(\d+(?:,\d+)?)\s*(?:comments?|replies?)/i)?.[1] || 
                        content.match(/(\d+(?:K|M)?)\s*💬/)?.[1] || 
                        Math.floor(Math.random() * 50).toString();
        
        return { likes, shares, comments };
      };

      // Determine platform from URL
      let platform = 'Other';
      if (url.includes('twitter.com') || url.includes('x.com')) {
        platform = 'Twitter';
      } else if (url.includes('instagram.com')) {
        platform = 'Instagram';
      } else if (url.includes('tiktok.com')) {
        platform = 'TikTok';
      } else if (url.includes('linkedin.com')) {
        platform = 'LinkedIn';
      }

      // Mock content extraction (in real app, this would come from the fetched content)
      const mockContent = this.generateMockContent(platform);
      const metrics = extractMetrics(mockContent);

      return {
        url,
        content: mockContent,
        metrics,
        timestamp: new Date().toISOString(),
        platform
      };
    } catch (error) {
      console.error('Error analyzing post:', error);
      return null;
    }
  }

  private static generateMockContent(platform: string): string {
    const contents = {
      Twitter: [
        "Just discovered this amazing AI tool for content analysis! Game changer for creators 🚀 #AI #ContentCreation",
        "Thread: 5 ways to improve your social media engagement using data analytics 📊",
        "Breaking: New study shows video content gets 3x more engagement than static posts"
      ],
      Instagram: [
        "Behind the scenes of our latest project ✨ Swipe to see the process! #BTS #ContentCreation #Creative",
        "Color psychology in branding: How the right palette can boost engagement by 40% 🎨",
        "Quick tip Tuesday: The best time to post for maximum reach 📈 Save this post!"
      ],
      TikTok: [
        "POV: You finally understand color theory and your content engagement skyrockets 📈 #ColorTheory #ContentTips",
        "Replying to @user The secret to viral content is... consistency and understanding your audience! 🎯",
        "Day in the life of a content analyst: spreadsheets, coffee, and endless A/B testing ☕"
      ],
      LinkedIn: [
        "After analyzing 10,000+ social media posts, here are the 3 patterns that drive the most engagement:",
        "Thoughts on the latest social media algorithm changes? How are you adapting your content strategy?",
        "Just published a new case study on video content performance across platforms. Link in comments 👇"
      ],
      Other: [
        "Interesting insights about social media engagement and content optimization strategies.",
        "Data-driven approach to understanding what makes content resonate with audiences.",
        "Analysis of trending topics and their impact on social media performance metrics."
      ]
    };

    const platformContents = contents[platform as keyof typeof contents] || contents.Other;
    return platformContents[Math.floor(Math.random() * platformContents.length)];
  }

  static formatNumber(num: string): string {
    const number = parseInt(num.replace(/,/g, ''));
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  }
}