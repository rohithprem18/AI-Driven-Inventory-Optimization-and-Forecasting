import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2, ArrowRight, ArrowLeft, Sparkles, Info, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";
import ImageSelector from "./ImageSelector";
import type { PredictionData } from "@/pages/Model";

// Import all category images
import groceries from "@/assets/category-groceries.jpg";
import electronics from "@/assets/category-electronics.jpg";
import clothing from "@/assets/category-clothing.jpg";
import furniture from "@/assets/category-furniture.jpg";

// Import region images
import north from "@/assets/region-north.jpg";
import south from "@/assets/region-south.jpg";
import east from "@/assets/region-east.jpg";
import west from "@/assets/region-west.jpg";

// Import weather images
import sunny from "@/assets/weather-sunny.jpg";
import rainy from "@/assets/weather-rainy.jpg";
import cloudy from "@/assets/weather-cloudy.jpg";
import snowy from "@/assets/weather-snowy.jpg";

// Import season images
import summer from "@/assets/season-summer.jpg";
import winter from "@/assets/season-winter.jpg";
import spring from "@/assets/season-spring.jpg";
import autumn from "@/assets/season-autumn.jpg";

interface StepByStepFormProps {
  onPrediction: (data: PredictionData, inventory: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const categories = [
  { value: "Groceries", image: groceries, label: "Groceries" },
  { value: "Electronics", image: electronics, label: "Electronics" },
  { value: "Clothing", image: clothing, label: "Clothing" },
  { value: "Furniture", image: furniture, label: "Furniture" },
];

const regions = [
  { value: "North", image: north, label: "North" },
  { value: "South", image: south, label: "South" },
  { value: "East", image: east, label: "East" },
  { value: "West", image: west, label: "West" },
];

const weather = [
  { value: "Sunny", image: sunny, label: "Sunny" },
  { value: "Rainy", image: rainy, label: "Rainy" },
  { value: "Cloudy", image: cloudy, label: "Cloudy" },
  { value: "Snowy", image: snowy, label: "Snowy" },
];

const seasons = [
  { value: "Summer", image: summer, label: "Summer" },
  { value: "Winter", image: winter, label: "Winter" },
  { value: "Spring", image: spring, label: "Spring" },
  { value: "Autumn", image: autumn, label: "Autumn" },
];

const TOTAL_STEPS = 6;

const StepByStepForm = ({ onPrediction, isLoading, setIsLoading }: StepByStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    Category: "",
    Region: "",
    Inventory: 250,
    Sales: 130,
    Orders: 60,
    Price: 35.0,
    Discount: 15,
    Weather: "",
    Promotion: 0,
    Competitor_Price: 30.0,
    Seasonality: "",
  });

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const regionHints: Record<string, string> = {
    North: "North region has higher winter demand",
    South: "South region experiences consistent demand year-round",
    East: "East region shows strong seasonal patterns",
    West: "West region has peak demand during summer months",
  };

  const calculateStockHealth = () => {
    const { Inventory, Sales, Orders } = formData;
    const totalDemand = Sales + Orders;
    if (totalDemand === 0) return { health: 100, status: "Excellent", color: "bg-green-500" };
    
    const ratio = (Inventory / totalDemand) * 100;
    if (ratio >= 150) return { health: 100, status: "Excellent", color: "bg-green-500" };
    if (ratio >= 100) return { health: 75, status: "Good", color: "bg-blue-500" };
    if (ratio >= 50) return { health: 50, status: "Fair", color: "bg-yellow-500" };
    return { health: 25, status: "Low", color: "bg-red-500" };
  };

  const calculatePriceGap = () => {
    const gap = formData.Price - formData.Competitor_Price;
    return gap;
  };

  const getPriceGapMessage = () => {
    const gap = calculatePriceGap();
    const currency = "₹";
    if (gap > 0) return `Price is ${currency}${Math.abs(gap).toFixed(2)} higher than competitors`;
    if (gap < 0) return `Price is ${currency}${Math.abs(gap).toFixed(2)} lower than competitors`;
    return "Price matches competitor pricing";
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.Category !== "";
      case 2:
        return formData.Region !== "";
      case 3:
        return formData.Inventory > 0 && formData.Sales >= 0 && formData.Orders >= 0;
      case 4:
        return formData.Price > 0 && formData.Competitor_Price > 0;
      case 5:
        return formData.Weather !== "" && formData.Seasonality !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceedToNextStep() && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error("Please complete all required fields before proceeding");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    if (!canProceedToNextStep()) {
      toast.error("Please complete all fields before generating forecast");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://rohithprem91-inventory-forecasting.hf.space/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      onPrediction(data, formData.Inventory);
      toast.success("Prediction generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const stockHealth = calculateStockHealth();

  return (
    <div className="glass-card rounded-2xl p-8 shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] transition-all duration-300">
        {/* Step 1: Product Category */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Step 1: Choose Product Category
              </h2>
              <p className="text-muted-foreground">
                Select the category that best describes your product
              </p>
            </div>
            <ImageSelector
              options={categories}
              value={formData.Category}
              onChange={(value) => setFormData({ ...formData, Category: value })}
            />
            {formData.Category && (
              <Alert className="mt-4 animate-slide-up">
                <Info className="w-4 h-4" />
                <AlertDescription>
                  {formData.Category} category selected. This helps tailor the prediction model.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Step 2: Region */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Step 2: Select Region
              </h2>
              <p className="text-muted-foreground">
                Choose the region where your product is sold
              </p>
            </div>
            <ImageSelector
              options={regions}
              value={formData.Region}
              onChange={(value) => setFormData({ ...formData, Region: value })}
            />
            {formData.Region && (
              <Alert className="mt-4 animate-slide-up">
                <Info className="w-4 h-4" />
                <AlertDescription>
                  {regionHints[formData.Region]}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Step 3: Inventory Details */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Step 3: Inventory Details
              </h2>
              <p className="text-muted-foreground">
                Enter your current inventory metrics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inventory">Current Inventory</Label>
                <Input
                  id="inventory"
                  type="number"
                  value={formData.Inventory}
                  onChange={(e) => setFormData({ ...formData, Inventory: parseInt(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sales">Recent Sales</Label>
                <Input
                  id="sales"
                  type="number"
                  value={formData.Sales}
                  onChange={(e) => setFormData({ ...formData, Sales: parseInt(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orders">Pending Orders</Label>
                <Input
                  id="orders"
                  type="number"
                  value={formData.Orders}
                  onChange={(e) => setFormData({ ...formData, Orders: parseInt(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
            </div>
            
            {/* Stock Health Indicator */}
            <Card className="p-4 bg-secondary/50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">Stock Health</Label>
                <span className="text-sm font-medium">{stockHealth.status}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${stockHealth.color}`}
                  style={{ width: `${stockHealth.health}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on current inventory vs. demand ratio
              </p>
            </Card>
          </div>
        )}

        {/* Step 4: Pricing Details */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Step 4: Pricing Details
              </h2>
              <p className="text-muted-foreground">
                Enter pricing information for competitive analysis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Your Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.Price}
                  onChange={(e) => setFormData({ ...formData, Price: parseFloat(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.Discount}
                  onChange={(e) => setFormData({ ...formData, Discount: parseInt(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitor-price" className="flex items-center gap-2">
                  Competitor Price (₹)
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the average competitor price for comparison</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="competitor-price"
                  type="number"
                  step="0.01"
                  value={formData.Competitor_Price}
                  onChange={(e) => setFormData({ ...formData, Competitor_Price: parseFloat(e.target.value) || 0 })}
                  className="bg-background/50"
                />
              </div>
            </div>
            
            {/* Price Gap Indicator */}
            {formData.Price > 0 && formData.Competitor_Price > 0 && (
              <Alert className="mt-4 animate-slide-up">
                {calculatePriceGap() > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : calculatePriceGap() < 0 ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
                <AlertDescription>
                  {getPriceGapMessage()}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Step 5: Market Conditions */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Step 5: Market Conditions
              </h2>
              <p className="text-muted-foreground">
                Select weather conditions, seasonality, and promotion status
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Weather Conditions</Label>
                <ImageSelector
                  options={weather}
                  value={formData.Weather}
                  onChange={(value) => setFormData({ ...formData, Weather: value })}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Season</Label>
                <ImageSelector
                  options={seasons}
                  value={formData.Seasonality}
                  onChange={(value) => setFormData({ ...formData, Seasonality: value })}
                />
              </div>

              <Card className="flex items-center justify-between p-4 bg-secondary/50">
                <div className="space-y-0.5">
                  <Label htmlFor="promotion" className="text-base font-semibold">Active Promotion</Label>
                  <p className="text-sm text-muted-foreground">Is there an ongoing promotion?</p>
                </div>
                <Switch
                  id="promotion"
                  checked={formData.Promotion === 1}
                  onCheckedChange={(checked) => setFormData({ ...formData, Promotion: checked ? 1 : 0 })}
                />
              </Card>
            </div>
          </div>
        )}

        {/* Step 6: Generate Forecast */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-1">Ready to Generate Forecast!</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Review your selections below, then click the button to generate your AI-powered demand prediction.
              </p>
            </div>

            {/* Summary Card and Generate Button Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Summary Card */}
              <Card className="p-4 bg-secondary/50 text-left">
                <h3 className="font-semibold mb-3 text-sm">Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-1 font-medium">{formData.Category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Region:</span>
                    <span className="ml-1 font-medium">{formData.Region}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Inventory:</span>
                    <span className="ml-1 font-medium">{formData.Inventory}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <span className="ml-1 font-medium">₹{formData.Price}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weather:</span>
                    <span className="ml-1 font-medium">{formData.Weather}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <span className="ml-1 font-medium">{formData.Seasonality}</span>
                  </div>
                </div>
              </Card>

              {/* Generate Button Card */}
              <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 flex flex-col justify-center items-center min-h-[140px]">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !canProceedToNextStep()}
                  className="w-full h-12 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI analyzing your inputs...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Forecast
                    </>
                  )}
                </Button>

                {isLoading && (
                  <Alert className="mt-3 w-full animate-slide-up">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <AlertDescription className="text-xs">
                      Processing your data through our AI model. This usually takes less than a second...
                    </AlertDescription>
                  </Alert>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1 || isLoading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        
        {currentStep < TOTAL_STEPS ? (
          <Button
            onClick={nextStep}
            disabled={!canProceedToNextStep() || isLoading}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default StepByStepForm;

