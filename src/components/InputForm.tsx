import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Target, MapPin, DollarSign, Loader2, Layers } from "lucide-react";
import { generateMockSEMData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface InputFormProps {
  onSubmit: (data: any) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandUrl: "",
    competitorUrl: "",
    locations: "",
    budgetShopping: 1000,
    budgetSearch: 2000,
    budgetPmax: 1500,
    themeCategories: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const locations = formData.locations.split(',').map(s => s.trim()).filter(Boolean);
      
      const mockData = generateMockSEMData({
        brand_url: formData.brandUrl,
        competitor_url: formData.competitorUrl,
        locations,
        budget_shopping: formData.budgetShopping,
        budget_search: formData.budgetSearch,
        budget_pmax: formData.budgetPmax,
        theme_categories: formData.themeCategories,
      });

      toast({
        title: "Analysis Complete",
        description: `Generated ${mockData.keyword_ideas.length} keyword ideas and campaign recommendations`,
      });

      onSubmit(mockData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeToggle = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      themeCategories: checked 
        ? [...prev.themeCategories, category]
        : prev.themeCategories.filter(c => c !== category)
    }));
  };

  const totalBudget = formData.budgetShopping + formData.budgetSearch + formData.budgetPmax;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Business Analysis Setup
        </CardTitle>
        <CardDescription>
          Provide your business details to generate comprehensive SEM recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Website Analysis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Website Analysis</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandUrl">Brand Website URL *</Label>
                <Input
                  id="brandUrl"
                  type="url"
                  placeholder="https://yourbrand.com"
                  value={formData.brandUrl}
                  onChange={(e) => handleInputChange('brandUrl', e.target.value)}
                  required
                  className="transition-smooth"
                />
                <p className="text-xs text-muted-foreground">We'll analyze your site to extract relevant keywords</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="competitorUrl">Competitor Website URL</Label>
                <Input
                  id="competitorUrl"
                  type="url"
                  placeholder="https://competitor.com"
                  value={formData.competitorUrl}
                  onChange={(e) => handleInputChange('competitorUrl', e.target.value)}
                  className="transition-smooth"
                />
                <p className="text-xs text-muted-foreground">Optional: Analyze competitor keywords</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Geographic Targeting */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Geographic Targeting</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locations">Target Locations *</Label>
              <Input
                id="locations"
                placeholder="Mumbai, Delhi, Bangalore"
                value={formData.locations}
                onChange={(e) => handleInputChange('locations', e.target.value)}
                required
                className="transition-smooth"
              />
              <p className="text-xs text-muted-foreground">Comma-separated list of cities or countries</p>
            </div>
          </div>

          <Separator />

          {/* Budget Allocation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Monthly Budget Allocation</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budgetShopping">Shopping Campaigns</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="budgetShopping"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.budgetShopping}
                    onChange={(e) => handleInputChange('budgetShopping', parseInt(e.target.value) || 0)}
                    className="pl-10 transition-smooth"
                  />
                </div>
                <Badge variant="outline" className="bg-shopping-campaign/10 text-shopping-campaign border-shopping-campaign/20">
                  Shopping
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgetSearch">Search Campaigns</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="budgetSearch"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.budgetSearch}
                    onChange={(e) => handleInputChange('budgetSearch', parseInt(e.target.value) || 0)}
                    className="pl-10 transition-smooth"
                  />
                </div>
                <Badge variant="outline" className="bg-search-campaign/10 text-search-campaign border-search-campaign/20">
                  Search
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budgetPmax">Performance Max</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="budgetPmax"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.budgetPmax}
                    onChange={(e) => handleInputChange('budgetPmax', parseInt(e.target.value) || 0)}
                    className="pl-10 transition-smooth"
                  />
                </div>
                <Badge variant="outline" className="bg-pmax-campaign/10 text-pmax-campaign border-pmax-campaign/20">
                  PMax
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="font-medium text-foreground">Total Monthly Budget:</span>
              <span className="text-2xl font-bold text-primary">${totalBudget.toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          {/* PMax Theme Categories */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Performance Max Theme Categories</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Select theme categories to guide your Performance Max asset groups. Leave empty to include all categories.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  id: 'Product Category',
                  title: 'Product Category Themes',
                  description: 'e.g., "Vegan Protein Powder", "Whey Supplements"',
                  color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                },
                {
                  id: 'Use-case Based',
                  title: 'Use-case Based Themes',
                  description: 'e.g., "Post-Workout Recovery", "Weight Management"',
                  color: 'bg-green-500/10 text-green-600 border-green-500/20'
                },
                {
                  id: 'Demographic',
                  title: 'Demographic Themes',
                  description: 'e.g., "For Busy Professionals", "Women\'s Fitness"',
                  color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                },
                {
                  id: 'Seasonal/Event-Based',
                  title: 'Seasonal/Event-Based Themes',
                  description: 'e.g., "Back to School", "Summer Body Prep"',
                  color: 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                }
              ].map((category) => (
                <div key={category.id} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                  <Checkbox
                    id={category.id}
                    checked={formData.themeCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleThemeToggle(category.id, checked as boolean)}
                  />
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.title}
                    </label>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                    <Badge variant="outline" className={`text-xs ${category.color}`}>
                      {category.id}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit" 
            disabled={isLoading || !formData.brandUrl || !formData.locations}
            className="w-full bg-gradient-primary hover:bg-primary-hover transition-smooth"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate SEM Plan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}