import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-primary/5">
      <div className="container mx-auto px-6">
        <Card className="relative overflow-hidden bg-gradient-card border-border shadow-brand">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          
          <CardContent className="relative p-12 lg:p-16 text-center">
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-brand">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Ready to Transform Your Meetings?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of teams who never miss important meeting details. 
                  Start your free trial today - no credit card required.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-brand transition-all duration-300 text-lg px-8 py-4 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-4"
                >
                  Schedule Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;