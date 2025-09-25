import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Zap,
  CheckCircle,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summarization",
    description: "Advanced natural language processing extracts key insights, decisions, and action items from your meetings.",
    highlight: true
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, GDPR compliance, and secure data handling ensure your meetings stay private.",
    highlight: false
  },
  {
    icon: Clock,
    title: "Real-Time Processing",
    description: "Get your meeting summary delivered to your inbox within 2-3 minutes after the call ends.",
    highlight: false
  },
  {
    icon: Users,
    title: "Speaker Identification",
    description: "Automatically identifies and attributes contributions to specific participants for clear accountability.",
    highlight: true
  },
  {
    icon: FileText,
    title: "Custom Templates",
    description: "Choose from multiple summary formats or create custom templates that match your workflow.",
    highlight: false
  },
  {
    icon: Zap,
    title: "One-Click Integration",
    description: "Works seamlessly with Google Meet, Google Calendar, and popular productivity tools.",
    highlight: false
  },
  {
    icon: CheckCircle,
    title: "Action Item Tracking",
    description: "Automatically extracts and formats action items with assignees and deadlines for easy follow-up.",
    highlight: true
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Supports 25+ languages with accurate transcription and summarization in your preferred language.",
    highlight: false
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to capture, analyze, and act on your meeting conversations. 
            Built for productivity, designed for privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative bg-gradient-card border-border hover:shadow-md transition-all duration-300 group ${
                feature.highlight ? 'ring-2 ring-accent/20 bg-accent/5' : ''
              }`}
            >
              <CardContent className="p-6">
                {feature.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  feature.highlight ? 'bg-accent/20' : 'bg-primary/10'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.highlight ? 'text-accent' : 'text-primary'
                  }`} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;