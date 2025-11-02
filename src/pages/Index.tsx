import { useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import ForecastForm from "@/components/ForecastForm";
import PredictionResult from "@/components/PredictionResult";

export interface PredictionData {
  predicted_demand: number;
}

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = (data: PredictionData) => {
    setPrediction(data);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Forecasting</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Inventory Optimization
              <span className="block gradient-text mt-2">Made Intelligent</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Leverage advanced AI to predict inventory demand with precision. 
              Make data-driven decisions and optimize your supply chain.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up">
            {[
              { label: "Accuracy Rate", value: "95%", icon: TrendingUp },
              { label: "Processing Time", value: "<1s", icon: Sparkles },
              { label: "Data Points", value: "10+", icon: TrendingUp },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="animate-scale-in" style={{ animationDelay: "300ms" }}>
            <ForecastForm 
              onPrediction={handlePrediction} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Results */}
          {prediction && (
            <div className="mt-12 animate-slide-up">
              <PredictionResult prediction={prediction} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
