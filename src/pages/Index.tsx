import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { KeywordResults } from "@/components/KeywordResults";
import { CampaignResults } from "@/components/CampaignResults";
import { BudgetAllocation } from "@/components/BudgetAllocation";
import { Card } from "@/components/ui/card";
import { Target, BarChart3, Search, ShoppingCart } from "lucide-react";

interface SEMData {
  brand: string;
  competitor?: string;
  locations: string[];
  budget_allocations: {
    cap: number;
    bud: number;
    pmax: number;
  };
  total_budget: number;
  total_keywords: number;
  total_volume: number;
  avg_cpc: number;
  themes: string[];
  searchAdGroups: any;
  pmaxThemes: any;
  shoppingCPC: any[];
}

const Index = () => {
  const [semData, setSemData] = useState<SEMData | null>(null);
  const [currentStep, setCurrentStep] = useState<'input' | 'keywords' | 'campaigns'>('input');

  const handleFormSubmit = (data: SEMData) => {
    setSemData(data);
    setCurrentStep('keywords');
  };

  const handleProceedToCampaigns = () => {
    setCurrentStep('campaigns');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SEM Planning Tool</h1>
              <p className="text-sm text-muted-foreground">Professional keyword research and campaign planning</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${currentStep === 'input' ? 'text-primary' : semData ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'input' ? 'bg-primary text-primary-foreground' : 
                semData ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className="font-medium">Setup & Analysis</span>
            </div>
            <div className={`w-8 h-0.5 ${semData ? 'bg-success' : 'bg-muted'}`}></div>
            <div className={`flex items-center gap-2 ${currentStep === 'keywords' ? 'text-primary' : currentStep === 'campaigns' ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'keywords' ? 'bg-primary text-primary-foreground' : 
                currentStep === 'campaigns' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className="font-medium">Keyword Research</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep === 'campaigns' ? 'bg-success' : 'bg-muted'}`}></div>
            <div className={`flex items-center gap-2 ${currentStep === 'campaigns' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'campaigns' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <span className="font-medium">Campaign Structure</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentStep === 'input' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Let's Plan Your SEM Strategy</h2>
              <p className="text-lg text-muted-foreground">Enter your business details to generate comprehensive keyword research and campaign recommendations</p>
            </div>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card 
                className="p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors duration-200 border-2 hover:border-search-campaign/30"
                onClick={() => semData ? setCurrentStep('keywords') : null}
              >
                <Search className="w-12 h-12 text-search-campaign mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Keyword Research</h3>
                <p className="text-sm text-muted-foreground">AI-powered keyword discovery with search volume and competition data</p>
                {semData && <p className="text-xs text-search-campaign mt-2 font-medium">Click to view →</p>}
              </Card>
              <Card 
                className="p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors duration-200 border-2 hover:border-pmax-campaign/30"
                onClick={() => semData ? setCurrentStep('campaigns') : null}
              >
                <BarChart3 className="w-12 h-12 text-pmax-campaign mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Campaign Structure</h3>
                <p className="text-sm text-muted-foreground">Optimized ad groups and Performance Max themes</p>
                {semData && <p className="text-xs text-pmax-campaign mt-2 font-medium">Click to view →</p>}
              </Card>
              <Card 
                className="p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors duration-200 border-2 hover:border-shopping-campaign/30"
                onClick={() => semData ? setCurrentStep('campaigns') : null}
              >
                <ShoppingCart className="w-12 h-12 text-shopping-campaign mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Bid Recommendations</h3>
                <p className="text-sm text-muted-foreground">Data-driven CPC suggestions for Shopping campaigns</p>
                {semData && <p className="text-xs text-shopping-campaign mt-2 font-medium">Click to view →</p>}
              </Card>
            </div>

            <InputForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {currentStep === 'keywords' && semData && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Keyword Research Results</h2>
                <p className="text-muted-foreground">Review and analyze discovered keywords before building campaigns</p>
              </div>
              <BudgetAllocation budgets={semData.budget_allocations} />
            </div>
            <KeywordResults 
              themes={semData.themes}
              searchAdGroups={semData.searchAdGroups}
              totalKeywords={semData.total_keywords}
              totalVolume={semData.total_volume}
              avgCpc={semData.avg_cpc}
              onProceed={handleProceedToCampaigns}
            />
          </div>
        )}

        {currentStep === 'campaigns' && semData && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Campaign Recommendations</h2>
                <p className="text-muted-foreground">Optimized campaign structure and bid recommendations</p>
              </div>
              <BudgetAllocation budgets={semData.budget_allocations} />
            </div>
            <CampaignResults 
              searchAdGroups={semData.searchAdGroups}
              pmaxThemes={semData.pmaxThemes}
              shoppingCPC={semData.shoppingCPC}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;