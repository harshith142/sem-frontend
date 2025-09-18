import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, PieChart } from "lucide-react";

interface BudgetAllocationProps {
  budgets: {
    cap: number;
    bud: number;
    pmax: number;
  };
}

export function BudgetAllocation({ budgets }: BudgetAllocationProps) {
  const total = budgets.cap + budgets.bud + budgets.pmax;

  const shoppingPercentage = (budgets.cap / total) * 100;
  const searchPercentage = (budgets.bud / total) * 100;
  const pmaxPercentage = (budgets.pmax / total) * 100;

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <PieChart className="w-4 h-4 text-primary" />
          Budget Allocation
        </CardTitle>
        <CardDescription className="text-sm">Monthly campaign budgets</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Budget */}
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground">Total Monthly Budget</div>
          <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
            <DollarSign className="w-4 h-4" />
            {total.toLocaleString()}
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="space-y-3">
          {/* Shopping */}
          <BudgetRow
            label="Shopping"
            amount={budgets.cap}
            percentage={shoppingPercentage}
            colorClass="bg-shopping-campaign"
          />

          {/* Search */}
          <BudgetRow
            label="Search"
            amount={budgets.bud}
            percentage={searchPercentage}
            colorClass="bg-search-campaign"
          />

          {/* Performance Max */}
          <BudgetRow
            label="Performance Max"
            amount={budgets.pmax}
            percentage={pmaxPercentage}
            colorClass="bg-pmax-campaign"
          />
        </div>

        {/* Budget Recommendations */}
        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground mb-2">Recommended Split</div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs bg-search-campaign/10 text-search-campaign border-search-campaign/20">
              Search: 40-50%
            </Badge>
            <Badge variant="outline" className="text-xs bg-shopping-campaign/10 text-shopping-campaign border-shopping-campaign/20">
              Shopping: 30-40%
            </Badge>
            <Badge variant="outline" className="text-xs bg-pmax-campaign/10 text-pmax-campaign border-pmax-campaign/20">
              PMax: 20-30%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* Subcomponent for rows */
interface BudgetRowProps {
  label: string;
  amount: number;
  percentage: number;
  colorClass: string;
}

function BudgetRow({ label, amount, percentage, colorClass }: BudgetRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-right">
          <div className="font-semibold">${amount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</div>
        </div>
      </div>

      {/* Progress bar using CSS variable */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`${colorClass} h-2 rounded-full transition-all`}
          style={{ ["--progress" as any]: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
