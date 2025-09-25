import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Video, Mail } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Invite MeetBot",
    description: "Simply add our AI bot to your Google Meet call like any other participant. One click setup.",
    step: "01"
  },
  {
    icon: Video,
    title: "Auto-Record & Analyze",
    description: "MeetBot joins silently, records the entire meeting, and uses AI to identify key points and decisions.",
    step: "02"
  },
  {
    icon: Mail,
    title: "Receive Smart Summary",
    description: "Get a comprehensive email summary with action items, key decisions, and participant insights within minutes.",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your meeting experience. No complex setup, no learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-gradient-card border-border hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-8">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-brand">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden md:block relative mt-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-8" viewBox="0 0 800 32" fill="none">
              <path 
                d="M200 16 L600 16" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeDasharray="8 8"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;