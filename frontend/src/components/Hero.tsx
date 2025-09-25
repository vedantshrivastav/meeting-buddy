import { Button } from "@/components/ui/button";
import { Play, Bot, Mail } from "lucide-react";
import heroImage from "@/assets/hero-meetbot.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
                <Bot className="w-4 h-4 mr-2 text-accent" />
                AI-Powered Meeting Assistant
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Never Miss a
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Meeting Detail</span>
                Again
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our AI bot joins your Google Meet calls, records everything, and sends you intelligent summaries via email. 
                Focus on the conversation while we handle the notes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-brand transition-all duration-300 text-lg px-8 py-4"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Auto Email Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="MeetBot AI Assistant Interface" 
                className="w-full h-auto rounded-2xl shadow-brand"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;