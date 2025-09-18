import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  TrendingUp,
  Target,
  ArrowRight,
  DollarSign,
} from "lucide-react";

interface KeywordResultsProps {
  themes: string[];
  searchAdGroups: Record<string, any[]>;
  totalKeywords: number;
  totalVolume: number;
  avgCpc: number;
  onProceed: () => void;
}

export function KeywordResults({
  themes,
  searchAdGroups,
  totalKeywords,
  totalVolume,
  avgCpc,
  onProceed,
}: KeywordResultsProps) {
  const [minVolume, setMinVolume] = useState(500);
  const [selectedCompetition, setSelectedCompetition] =
    useState<string>("all");

  // Get all keywords from search ad groups
  const allKeywords: any[] = Object.values(searchAdGroups || {}).flat();

  // Debug log: check one keyword object
  useEffect(() => {
    if (allKeywords.length > 0) {
      console.log("Sample keyword object:", allKeywords[0]);
    }
  }, [allKeywords]);

  const filteredKeywords = allKeywords.filter((keyword: any) => {
    const volume =
      keyword.search_volume ||
      keyword.avg_monthly_searches ||
      keyword.monthly_searches ||
      0;
    const volumeFilter = volume >= minVolume;
    const competitionFilter =
      selectedCompetition === "all" ||
      keyword.competition?.toLowerCase() === selectedCompetition;
    return volumeFilter && competitionFilter;
  });

  const getCompetitionColor = (competition: string) => {
    switch (competition?.toLowerCase()) {
      case "low":
        return "bg-success/10 text-success border-success/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const displayTotalVolume =
    totalVolume ||
    filteredKeywords.reduce(
      (sum: number, kw: any) =>
        sum +
        (kw.search_volume ||
          kw.avg_monthly_searches ||
          kw.monthly_searches ||
          0),
      0
    );
  const displayAvgCPC = avgCpc || 1.5;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <div className="text-sm font-medium text-muted-foreground">
                Seed Keywords
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {themes.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              <div className="text-sm font-medium text-muted-foreground">
                Total Keywords
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {totalKeywords || filteredKeywords.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <div className="text-sm font-medium text-muted-foreground">
                Total Volume
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {displayTotalVolume.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-warning" />
              <div className="text-sm font-medium text-muted-foreground">
                Avg CPC
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              ${displayAvgCPC.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Themes
          </CardTitle>
          <CardDescription>
            Theme categories from your analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {theme}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Keyword Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minVolume">
                Minimum Monthly Search Volume
              </Label>
              <Input
                id="minVolume"
                type="number"
                min="0"
                step="100"
                value={minVolume}
                onChange={(e) =>
                  setMinVolume(parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition">Competition Level</Label>
              <select
                id="competition"
                value={selectedCompetition}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCompetition(e.target.value)
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Keyword Ideas ({filteredKeywords.length})
            </div>
            <Button
              onClick={onProceed}
              className="bg-gradient-primary hover:bg-primary-hover"
            >
              Build Campaigns
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
          <CardDescription>
            Detailed keyword analysis with search volume and competition data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-table-header">
                <TableRow>
                  <TableHead className="font-semibold">Keyword</TableHead>
                  <TableHead className="font-semibold text-right">
                    Monthly Searches
                  </TableHead>
                  <TableHead className="font-semibold">
                    Competition
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    CPC Range
                  </TableHead>
                  <TableHead className="font-semibold">Match Types</TableHead>
                  <TableHead className="font-semibold">Intent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.map((keyword, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-table-row-hover transition-smooth"
                  >
                    {/* ✅ FIX: Show proper keyword text */}
                    <TableCell className="font-medium text-foreground">
                      {keyword.keyword_text ||
                        keyword.name ||
                        keyword.keyword ||
                        keyword.text ||
                        "Unknown"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3 text-success" />
                        {(
                          keyword.search_volume ||
                          keyword.avg_monthly_searches ||
                          keyword.monthly_searches ||
                          0
                        ).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getCompetitionColor(
                          keyword.competition || "Medium"
                        )}
                      >
                        {keyword.competition || "Medium"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        {keyword.cpc_range || "$0.50 - $2.00"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs">
                          Broad
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Phrase
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        Commercial
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
