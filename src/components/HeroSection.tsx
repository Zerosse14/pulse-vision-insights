
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="hero-gradient" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">SocialPulse</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-6">
          Smart Video Analysis & Transcript Intelligence
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Unlock the power of AI-driven video analysis. Get color insights, transcript analysis, 
          and trending recommendations all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
