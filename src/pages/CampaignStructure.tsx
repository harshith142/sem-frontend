import { BudgetAllocation } from "@/components/BudgetAllocation";
import { CampaignResults } from "@/components/CampaignResults";

interface CampaignStructureProps {
  semData: any;
}

export default function CampaignStructure({ semData }: CampaignStructureProps) {
  if (!semData) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">No data available. Please complete the previous steps first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Campaign Recommendations</h2>
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
  );
}