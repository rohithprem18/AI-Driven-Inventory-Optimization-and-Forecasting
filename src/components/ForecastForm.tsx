import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowRight } from "lucide-react";
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

interface ForecastFormProps {
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

const ForecastForm = ({ onPrediction, isLoading, setIsLoading }: ForecastFormProps) => {
  const [formData, setFormData] = useState({
    Category: "Groceries",
    Region: "North",
    Inventory: 250,
    Sales: 130,
    Orders: 60,
    Price: 35.0,
    Discount: 15,
    Weather: "Sunny",
    Promotion: 1,
    Competitor_Price: 30.0,
    Seasonality: "Summer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 shadow-lg">
      <div className="space-y-8">
        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Product Category</Label>
          <ImageSelector
            options={categories}
            value={formData.Category}
            onChange={(value) => setFormData({ ...formData, Category: value })}
          />
        </div>

        {/* Region Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Region</Label>
          <ImageSelector
            options={regions}
            value={formData.Region}
            onChange={(value) => setFormData({ ...formData, Region: value })}
          />
        </div>

        {/* Numeric Inputs - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              id="inventory"
              type="number"
              value={formData.Inventory}
              onChange={(e) => setFormData({ ...formData, Inventory: parseInt(e.target.value) })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sales">Sales</Label>
            <Input
              id="sales"
              type="number"
              value={formData.Sales}
              onChange={(e) => setFormData({ ...formData, Sales: parseInt(e.target.value) })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orders">Orders</Label>
            <Input
              id="orders"
              type="number"
              value={formData.Orders}
              onChange={(e) => setFormData({ ...formData, Orders: parseInt(e.target.value) })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.Price}
              onChange={(e) => setFormData({ ...formData, Price: parseFloat(e.target.value) })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              value={formData.Discount}
              onChange={(e) => setFormData({ ...formData, Discount: parseInt(e.target.value) })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="competitor-price">Competitor Price ($)</Label>
            <Input
              id="competitor-price"
              type="number"
              step="0.01"
              value={formData.Competitor_Price}
              onChange={(e) => setFormData({ ...formData, Competitor_Price: parseFloat(e.target.value) })}
              className="bg-background/50"
            />
          </div>
        </div>

        {/* Weather Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Weather Conditions</Label>
          <ImageSelector
            options={weather}
            value={formData.Weather}
            onChange={(value) => setFormData({ ...formData, Weather: value })}
          />
        </div>

        {/* Promotion Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <div className="space-y-0.5">
            <Label htmlFor="promotion" className="text-base font-semibold">Active Promotion</Label>
            <p className="text-sm text-muted-foreground">Is there an ongoing promotion?</p>
          </div>
          <Switch
            id="promotion"
            checked={formData.Promotion === 1}
            onCheckedChange={(checked) => setFormData({ ...formData, Promotion: checked ? 1 : 0 })}
          />
        </div>

        {/* Seasonality Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Season</Label>
          <ImageSelector
            options={seasons}
            value={formData.Seasonality}
            onChange={(value) => setFormData({ ...formData, Seasonality: value })}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Prediction...
            </>
          ) : (
            <>
              Generate Forecast
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForecastForm;
