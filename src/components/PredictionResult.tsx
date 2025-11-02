import { TrendingUp, Package, AlertCircle } from "lucide-react";
import type { PredictionData } from "@/pages/Index";

interface PredictionResultProps {
  prediction: PredictionData;
}

const PredictionResult = ({ prediction }: PredictionResultProps) => {
  const demand = Math.round(prediction.predicted_demand);
  const formattedDemand = demand.toLocaleString();

  // Determine demand level
  const getDemandLevel = (value: number) => {
    if (value > 10000) return { level: "High", color: "text-green-500", bg: "bg-green-500/10" };
    if (value > 5000) return { level: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { level: "Low", color: "text-blue-500", bg: "bg-blue-500/10" };
  };

  const demandInfo = getDemandLevel(demand);

  return (
    <div className="glass-card rounded-2xl p-8 shadow-lg animate-scale-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse-glow">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Demand Forecast</h2>
          <p className="text-sm text-muted-foreground">AI-generated prediction</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main prediction value */}
        <div className="text-center py-8 px-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="text-5xl font-bold gradient-text mb-2">
            {formattedDemand}
          </div>
          <p className="text-sm text-muted-foreground">Units Predicted</p>
        </div>

        {/* Demand level indicator */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-3">
            <Package className={`w-5 h-5 ${demandInfo.color}`} />
            <div>
              <p className="font-semibold">Demand Level</p>
              <p className="text-sm text-muted-foreground">Based on historical data</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-lg font-semibold ${demandInfo.bg} ${demandInfo.color}`}>
            {demandInfo.level}
          </span>
        </div>

        {/* Insights */}
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-accent mb-1">Recommendation</p>
              <p className="text-sm text-muted-foreground">
                {demand > 10000
                  ? "High demand expected. Consider increasing inventory levels and preparing for peak capacity."
                  : demand > 5000
                  ? "Moderate demand forecasted. Maintain current inventory with buffer stock."
                  : "Lower demand predicted. Optimize inventory to reduce holding costs."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
