import { BudgetAllocation } from "@/components/BudgetAllocation";
import { KeywordResults } from "@/components/KeywordResults";

interface KeywordResearchProps {
  onNext: (step: number) => void;
  semData: any;
}

export default function KeywordResearch({ onNext, semData }: KeywordResearchProps) {
  if (!semData) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">No data available. Please complete the setup step first.</p>
      </div>
    );
  }

  const handleProceedToCampaigns = () => {
    onNext(3);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Keyword Research Results</h2>
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
  );
}