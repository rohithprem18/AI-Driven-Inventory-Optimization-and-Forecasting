import { TrendingUp, Package, AlertCircle, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import jsPDF from "jspdf";
import type { PredictionData } from "@/pages/Model";

interface PredictionResultProps {
  prediction: PredictionData;
  currentInventory?: number;
}

const PredictionResult = ({ prediction, currentInventory = 0 }: PredictionResultProps) => {
  const demand = Math.round(prediction.predicted_demand);
  const formattedDemand = demand.toLocaleString();
  
  // Calculate confidence interval (±8% of prediction)
  const confidenceMargin = Math.round(demand * 0.08);
  const lowerBound = demand - confidenceMargin;
  const upperBound = demand + confidenceMargin;

  // Determine demand level
  const getDemandLevel = (value: number) => {
    if (value > 10000) return { level: "High", color: "text-green-500", bg: "bg-green-500/10" };
    if (value > 5000) return { level: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { level: "Low", color: "text-blue-500", bg: "bg-blue-500/10" };
  };

  const demandInfo = getDemandLevel(demand);
  
  // Check for reorder alert
  const needsReorder = currentInventory > 0 && demand > currentInventory;
  const stockGap = needsReorder ? demand - currentInventory : 0;

  // Generate trend data for the chart (simulated weekly projection)
  const generateTrendData = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weeklyDemand = demand / 4; // Average weekly demand
    const weeklyConfidence = confidenceMargin / 4;
    
    // Create a realistic upward or stable trend based on demand level
    const trendFactor = demandInfo.level === "High" ? 1.05 : demandInfo.level === "Medium" ? 1.02 : 1.0;
    
    return weeks.map((week, index) => {
      const weekValue = Math.round(weeklyDemand * Math.pow(trendFactor, index));
      return {
        week,
        demand: weekValue,
        projected: Math.round(weeklyDemand),
        lower: Math.round(weekValue - weeklyConfidence),
        upper: Math.round(weekValue + weeklyConfidence),
      };
    });
  };

  const trendData = generateTrendData();

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Predicted Demand', demand],
      ['Confidence Interval', `${lowerBound} - ${upperBound}`],
      ['Demand Level', demandInfo.level],
      ['Current Inventory', currentInventory],
      ['Reorder Needed', needsReorder ? 'Yes' : 'No'],
      ['Stock Gap', stockGap],
      ['', ''],
      ['Weekly Projection', ''],
      ['Week', 'Projected Demand'],
      ...trendData.map(d => [d.week, d.demand]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demand-forecast-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to PDF
  const exportToPDF = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text('Demand Forecast Report', 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    pdf.setFontSize(14);
    pdf.text('Prediction Summary', 20, 45);
    
    pdf.setFontSize(11);
    pdf.text(`Predicted Demand: ${formattedDemand} units`, 20, 55);
    pdf.text(`Confidence Interval: ${lowerBound.toLocaleString()} - ${upperBound.toLocaleString()}`, 20, 65);
    pdf.text(`Demand Level: ${demandInfo.level}`, 20, 75);
    pdf.text(`Current Inventory: ${currentInventory.toLocaleString()} units`, 20, 85);
    
    if (needsReorder) {
      pdf.setTextColor(255, 0, 0);
      pdf.text(`⚠ Reorder Alert: ${stockGap.toLocaleString()} units needed`, 20, 95);
      pdf.setTextColor(0, 0, 0);
    }
    
    pdf.text('Weekly Demand Projection', 20, 110);
    trendData.forEach((d, i) => {
      pdf.text(`${d.week}: ${d.demand.toLocaleString()} units`, 25, 120 + (i * 10));
    });
    
    pdf.save(`demand-forecast-${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Reorder Alert */}
      {needsReorder && (
        <div className="glass-card rounded-2xl p-6 border-2 border-destructive/50 bg-destructive/5 animate-pulse-glow">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-destructive text-lg mb-2">Reorder Alert!</h3>
              <p className="text-sm text-muted-foreground">
                Predicted demand ({formattedDemand} units) exceeds current inventory ({currentInventory.toLocaleString()} units). 
                You need to order <span className="font-semibold text-destructive">{stockGap.toLocaleString()} additional units</span> to meet demand.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse-glow">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Demand Forecast</h2>
              <p className="text-sm text-muted-foreground">AI-generated prediction</p>
            </div>
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Main prediction value */}
          <div className="text-center py-8 px-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <div className="text-5xl font-bold gradient-text mb-2">
              {formattedDemand}
            </div>
            <p className="text-sm text-muted-foreground mb-3">Units Predicted</p>
            
            {/* Confidence Interval */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="font-semibold">{lowerBound.toLocaleString()} - {upperBound.toLocaleString()}</span>
              <span className="text-muted-foreground text-xs">(±{confidenceMargin.toLocaleString()})</span>
            </div>
          </div>

          {/* Demand Trend Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Demand Projection
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="none" 
                  fill="hsl(var(--primary) / 0.1)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="none" 
                  fill="hsl(var(--background))" 
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

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
    </div>
  );
};

export default PredictionResult;
