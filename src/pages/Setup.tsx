import { useMutation } from "@tanstack/react-query";
import { generateSEMPlan } from "@/lib/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Target, MapPin, DollarSign, Loader2, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SetupProps {
  onNext: (step: number) => void;
  setSemData: (data: any) => void;
}

export default function Setup({ onNext, setSemData }: SetupProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    brand_website: "",
    competitor_website: "",
    target_locations: "Mumbai, Delhi",
    themes: ["protein powder", "fitness supplements"],
    budget_allocations: {
      cap: 1000,
      bud: 2000, 
      pmax: 1500
    }
  });

  const mutation = useMutation({
    mutationFn: generateSEMPlan,
    onSuccess: (data) => {
      setSemData(data);
      toast({
        title: "Analysis Complete",
        description: "Successfully generated SEM plan and recommendations",
      });
      onNext(2);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate SEM plan. Please try again.",
        variant: "destructive",
      });
    }
  });

  const totalBudget = form.budget_allocations.cap + form.budget_allocations.bud + form.budget_allocations.pmax;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Business Analysis Setup</h2>
        <p className="text-lg text-muted-foreground">Enter your business details to generate comprehensive SEM recommendations</p>
      </div>

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
          <div className="space-y-6">
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
                    value={form.brand_website}
                    onChange={(e) => setForm({ ...form, brand_website: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="competitorUrl">Competitor Website URL</Label>
                  <Input
                    id="competitorUrl"
                    type="url"
                    placeholder="https://competitor.com"
                    value={form.competitor_website}
                    onChange={(e) => setForm({ ...form, competitor_website: e.target.value })}
                  />
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
                  value={form.target_locations}
                  onChange={(e) => setForm({ 
                    ...form, 
                    target_locations: e.target.value
                  })}
                  required
                />
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
                  <Label htmlFor="budgetCap">Shopping Campaigns (CAP)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="budgetCap"
                      type="number"
                      min="0"
                      step="100"
                      value={form.budget_allocations.cap}
                      onChange={(e) => setForm({ 
                        ...form, 
                        budget_allocations: { 
                          ...form.budget_allocations, 
                          cap: parseInt(e.target.value) || 0 
                        }
                      })}
                      className="pl-10"
                    />
                  </div>
                  <Badge variant="outline" className="bg-shopping-campaign/10 text-shopping-campaign border-shopping-campaign/20">
                    Shopping
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budgetBud">Search Campaigns (BUD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="budgetBud"
                      type="number"
                      min="0"
                      step="100"
                      value={form.budget_allocations.bud}
                      onChange={(e) => setForm({ 
                        ...form, 
                        budget_allocations: { 
                          ...form.budget_allocations, 
                          bud: parseInt(e.target.value) || 0 
                        }
                      })}
                      className="pl-10"
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
                      value={form.budget_allocations.pmax}
                      onChange={(e) => setForm({ 
                        ...form, 
                        budget_allocations: { 
                          ...form.budget_allocations, 
                          pmax: parseInt(e.target.value) || 0 
                        }
                      })}
                      className="pl-10"
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

            {/* Themes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Themes</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="themes">Theme Keywords *</Label>
                <textarea
                  id="themes"
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                  placeholder="Enter themes separated by commas:&#10;protein powder, fitness supplements, whey protein, muscle building, workout nutrition"
                  value={form.themes.join(", ")}
                  onChange={(e) => setForm({ 
                    ...form, 
                    themes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple themes with commas. Current themes: {form.themes.length}
                </p>
              </div>
            </div>

            <Button
              onClick={() => mutation.mutate(form)}
              disabled={mutation.isPending || !form.brand_website}
              className="w-full bg-gradient-primary hover:bg-primary-hover"
              size="lg"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating SEM Plan...
                </>
              ) : (
                "Generate SEM Plan"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}