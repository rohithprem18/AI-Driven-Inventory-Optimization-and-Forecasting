import { ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: "Demand Forecasting",
      description: "AI-powered predictions for inventory optimization with 95% accuracy",
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Visualize demand patterns over time with interactive charts",
    },
    {
      icon: Shield,
      title: "Smart Alerts",
      description: "Get notified when predicted demand exceeds current stock levels",
    },
    {
      icon: Zap,
      title: "Instant Reports",
      description: "Export forecasts as CSV or PDF for team collaboration",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Transform Your
              <span className="block gradient-text mt-2">Inventory Management</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Leverage cutting-edge AI to forecast demand, optimize stock levels, and make data-driven decisions that drive your business forward.
            </p>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
              onClick={() => navigate('/model')}
            >
              Start Forecasting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools for intelligent inventory optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-scale-in" style={{ animationDelay: "200ms" }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-br from-primary/10 to-accent/5 animate-scale-in">
            <h2 className="text-4xl font-bold mb-4">Ready to Optimize?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start making smarter inventory decisions today
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/model')}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
