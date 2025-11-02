import { useState } from "react";
import { Sparkles, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StepByStepForm from "@/components/StepByStepForm";
import PredictionResult from "@/components/PredictionResult";

export interface PredictionData {
  predicted_demand: number;
}

const Model = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInventory, setCurrentInventory] = useState<number>(0);

  const handlePrediction = (data: PredictionData, inventory: number) => {
    setPrediction(data);
    setCurrentInventory(inventory);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Forecasting</span>
          </div>
        </div>

        {/* Main Layout: Form First, Results Below */}
        <div className="space-y-6">
          {/* Form */}
          <div className="animate-scale-in">
            <StepByStepForm 
              onPrediction={handlePrediction} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Results Card - Appears Below Form */}
          {prediction && (
            <div className="animate-slide-up">
              <PredictionResult prediction={prediction} currentInventory={currentInventory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
