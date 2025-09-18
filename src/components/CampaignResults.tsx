import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  ShoppingCart, 
  Target, 
  TrendingUp,
  Download,
  Copy,
  DollarSign,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CampaignResultsProps {
  searchAdGroups: any;
  pmaxThemes: any;
  shoppingCPC: any[];
}

export function CampaignResults({ searchAdGroups, pmaxThemes, shoppingCPC }: CampaignResultsProps) {
  const { toast } = useToast();

  const handleCopyKeywords = (keywords: any[]) => {
    const keywordList = keywords.map(k => k.text).join('\n');
    navigator.clipboard.writeText(keywordList);
    toast({
      title: "Copied to clipboard",
      description: `${keywords.length} keywords copied successfully`,
    });
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition?.toLowerCase()) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Ad Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-search-campaign" />
            Search Campaign Ad Groups
          </CardTitle>
          <CardDescription>
            Organized keyword groups with match type recommendations for Search campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(searchAdGroups).map(([groupName, keywords]: [string, any]) => (
              <div key={groupName} className="border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-search-campaign" />
                      {groupName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{keywords.length} keywords</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyKeywords(keywords)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Badge variant="outline" className="bg-search-campaign/10 text-search-campaign border-search-campaign/20">
                      Search Campaign
                    </Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-table-header">
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>Match Types</TableHead>
                        <TableHead className="text-right">CPC Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keywords.slice(0, 5).map((keyword: any, index: number) => (
                        <TableRow key={index} className="hover:bg-table-row-hover">
                          <TableCell className="font-medium">{keyword.text}</TableCell>
                          <TableCell className="text-right">
                            {keyword.avg_monthly_searches?.toLocaleString() || '0'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getCompetitionColor(keyword.competition)}>
                              {keyword.competition || 'Medium'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {keyword.match_type_suggestion?.map((type: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            ${keyword.top_of_page_bid_low?.toFixed(2) || '0.50'} - 
                            ${keyword.top_of_page_bid_high?.toFixed(2) || '2.00'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {keywords.length > 5 && (
                  <div className="mt-3 text-center">
                    <Button variant="ghost" size="sm">
                      View all {keywords.length} keywords
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Max Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-pmax-campaign" />
            Performance Max Themes
          </CardTitle>
          <CardDescription>
            Recommended asset groups and themes for Performance Max campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(pmaxThemes).map(([themeName, theme]: [string, any]) => (
              <div key={themeName} className="border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{themeName}</h3>
                  <Badge variant="outline" className="bg-pmax-campaign/10 text-pmax-campaign border-pmax-campaign/20">
                    PMax Theme
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-3 h-3" />
                    {theme.keywords?.length || 0} related keywords
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {theme.keywords?.slice(0, 8).map((keyword: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {theme.keywords?.length > 8 && (
                      <Badge variant="outline" className="text-xs">
                        +{theme.keywords.length - 8} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground">Total Monthly Volume</div>
                    <div className="font-semibold text-foreground">
                      {theme.total_volume?.toLocaleString() || '0'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shopping Bid Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-shopping-campaign" />
            Shopping Campaign Bid Recommendations
          </CardTitle>
          <CardDescription>
            Data-driven CPC suggestions for Shopping campaigns based on target CPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Total Products</div>
                <div className="text-2xl font-bold text-foreground">
                  {shoppingCPC.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg CPC</div>
                <div className="text-2xl font-bold text-shopping-campaign">
                  ${shoppingCPC.length > 0 ? (shoppingCPC.reduce((sum: number, item: any) => sum + (item.suggested_cpc || 0), 0) / shoppingCPC.length).toFixed(2) : '0.00'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
                <div className="text-2xl font-bold text-foreground">
                  {shoppingCPC.reduce((sum: number, item: any) => sum + (item.search_volume || 0), 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-table-header">
                <TableRow>
                  <TableHead>Product Keyword</TableHead>
                  <TableHead className="text-right">Monthly Searches</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead className="text-right">Market CPC Range</TableHead>
                  <TableHead className="text-right">Suggested CPC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shoppingCPC.slice(0, 10).map((item: any, index: number) => (
                  <TableRow key={index} className="hover:bg-table-row-hover">
                    <TableCell className="font-medium">{item.keyword}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3 text-success" />
                        {(item.search_volume || 0).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCompetitionColor(item.competition || 'Medium')}>
                        {item.competition || 'Medium'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      ${(item.suggested_cpc || 0.5).toFixed(2)} - ${((item.suggested_cpc || 0.5) * 1.5).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold text-shopping-campaign flex items-center justify-end gap-1">
                        <DollarSign className="w-3 h-3" />
                        {(item.suggested_cpc || 0).toFixed(2)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Campaign Data</CardTitle>
          <CardDescription>Download your campaign structure and keyword recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export to CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Google Ads Editor
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Campaign Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}