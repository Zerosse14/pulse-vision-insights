
import { FileVideo, Palette, Lightbulb, Gauge } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const features = [
    {
      icon: Palette,
      title: "Color Analysis",
      description: "Advanced AI algorithms analyze video color patterns to optimize visual impact.",
    },
    {
      icon: FileVideo,
      title: "Transcript Intelligence",
      description: "Extract valuable insights from video transcripts using cutting-edge LLMs.",
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions",
      description: "Get AI-powered recommendations to enhance your video content.",
    },
    {
      icon: Gauge,
      title: "Trend Analysis",
      description: "Stay ahead with real-time content trend analysis and predictions.",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for
            <span className="gradient-text"> Video Excellence</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
