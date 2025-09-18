// Mock data generation for SEM planning tool
// In production, this would be replaced with actual API calls to Google Ads and OpenAI

interface SEMInputs {
  brand_url: string;
  competitor_url?: string;
  locations: string[];
  budget_shopping: number;
  budget_search: number;
  budget_pmax: number;
  theme_categories?: string[];
}

const MOCK_SEED_KEYWORDS = [
  "organic protein powder",
  "whey protein supplement", 
  "plant based protein",
  "post workout nutrition",
  "fitness supplements",
  "protein shake mix",
  "muscle building protein",
  "vegan protein powder",
  "premium protein blend",
  "sports nutrition"
];

const MOCK_KEYWORD_IDEAS = [
  {
    text: "organic whey protein powder",
    avg_monthly_searches: 8900,
    top_of_page_bid_low: 1.2,
    top_of_page_bid_high: 2.8,
    competition: "High",
    intent: "Commercial",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "best protein powder for weight loss",
    avg_monthly_searches: 12000,
    top_of_page_bid_low: 1.5,
    top_of_page_bid_high: 3.2,
    competition: "High", 
    intent: "Commercial",
    match_type_suggestion: ["Phrase", "Broad"],
    seed_match_score: 1
  },
  {
    text: "vegan protein powder reviews",
    avg_monthly_searches: 3400,
    top_of_page_bid_low: 0.8,
    top_of_page_bid_high: 2.1,
    competition: "Medium",
    intent: "Informational",
    match_type_suggestion: ["Phrase", "Broad"], 
    seed_match_score: 1
  },
  {
    text: "plant based protein powder",
    avg_monthly_searches: 6700,
    top_of_page_bid_low: 1.1,
    top_of_page_bid_high: 2.5,
    competition: "Medium",
    intent: "Commercial",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "protein powder price comparison",
    avg_monthly_searches: 2100,
    top_of_page_bid_low: 0.6,
    top_of_page_bid_high: 1.8,
    competition: "Low",
    intent: "Commercial",
    match_type_suggestion: ["Phrase", "Broad"],
    seed_match_score: 0
  },
  {
    text: "buy protein powder online",
    avg_monthly_searches: 15600,
    top_of_page_bid_low: 1.8,
    top_of_page_bid_high: 4.2,
    competition: "High",
    intent: "Transactional", 
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "protein powder for women",
    avg_monthly_searches: 9300,
    top_of_page_bid_low: 1.3,
    top_of_page_bid_high: 2.9,
    competition: "High",
    intent: "Commercial",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "casein protein powder",
    avg_monthly_searches: 4200,
    top_of_page_bid_low: 1.0,
    top_of_page_bid_high: 2.4,
    competition: "Medium",
    intent: "Commercial", 
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "protein powder recipes",
    avg_monthly_searches: 7800,
    top_of_page_bid_low: 0.4,
    top_of_page_bid_high: 1.2,
    competition: "Low",
    intent: "Informational",
    match_type_suggestion: ["Phrase", "Broad"],
    seed_match_score: 1
  },
  {
    text: "protein powder side effects",
    avg_monthly_searches: 2800,
    top_of_page_bid_low: 0.3,
    top_of_page_bid_high: 0.9,
    competition: "Low",
    intent: "Informational",
    match_type_suggestion: ["Broad"],
    seed_match_score: 1
  },
  {
    text: "grass fed whey protein",
    avg_monthly_searches: 5100,
    top_of_page_bid_low: 1.4,
    top_of_page_bid_high: 3.1,
    competition: "Medium",
    intent: "Commercial",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "protein powder subscription",
    avg_monthly_searches: 1900,
    top_of_page_bid_low: 2.1,
    top_of_page_bid_high: 4.8,
    competition: "High",
    intent: "Transactional",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  },
  {
    text: "chocolate protein powder",
    avg_monthly_searches: 8600,
    top_of_page_bid_low: 1.0,
    top_of_page_bid_high: 2.3,
    competition: "Medium",
    intent: "Commercial",
    match_type_suggestion: ["Phrase", "Broad"],
    seed_match_score: 1
  },
  {
    text: "protein powder without artificial sweeteners",
    avg_monthly_searches: 3700,
    top_of_page_bid_low: 1.2,
    top_of_page_bid_high: 2.7,
    competition: "Medium",
    intent: "Commercial",
    match_type_suggestion: ["Phrase", "Broad"],
    seed_match_score: 1
  },
  {
    text: "bulk protein powder",
    avg_monthly_searches: 4800,
    top_of_page_bid_low: 1.1,
    top_of_page_bid_high: 2.6,
    competition: "Medium",
    intent: "Commercial",
    match_type_suggestion: ["Exact", "Phrase"],
    seed_match_score: 1
  }
];

function groupKeywordsIntoAdGroups(keywords: any[]) {
  const adGroups: { [key: string]: any[] } = {
    'Brand & Product Terms': [],
    'Category Terms': [],
    'Competitor Comparison': [],
    'Informational Queries': [],
    'Location-based Queries': []
  };

  keywords.forEach(keyword => {
    const text = keyword.text.toLowerCase();
    
    if (text.includes('buy') || text.includes('subscription') || text.includes('online')) {
      adGroups['Brand & Product Terms'].push(keyword);
    } else if (text.includes('reviews') || text.includes('comparison') || text.includes('side effects') || text.includes('recipes')) {
      adGroups['Informational Queries'].push(keyword);
    } else if (text.includes('vs') || text.includes('compare')) {
      adGroups['Competitor Comparison'].push(keyword);
    } else if (keywords.some(k => k.locations?.some((loc: string) => text.includes(loc.toLowerCase())))) {
      adGroups['Location-based Queries'].push(keyword);
    } else {
      adGroups['Category Terms'].push(keyword);
    }
  });

  return adGroups;
}

function generatePMaxThemes(keywords: any[], selectedCategories: string[] = []) {
  const allThemes = {
    'Product Category': [
      {
        theme: "Vegan Protein Powder",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('vegan') || 
          k.text.toLowerCase().includes('plant') ||
          k.text.toLowerCase().includes('plant based')
        )
      },
      {
        theme: "Whey Protein Supplements",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('whey') || 
          k.text.toLowerCase().includes('casein') ||
          k.text.toLowerCase().includes('isolate')
        )
      },
      {
        theme: "Organic & Natural Products",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('organic') || 
          k.text.toLowerCase().includes('natural') ||
          k.text.toLowerCase().includes('grass fed')
        )
      }
    ],
    'Use-case Based': [
      {
        theme: "Post-Workout Recovery Drinks",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('post workout') || 
          k.text.toLowerCase().includes('recovery') ||
          k.text.toLowerCase().includes('after gym')
        )
      },
      {
        theme: "Weight Management Solutions",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('weight') || 
          k.text.toLowerCase().includes('lean') ||
          k.text.toLowerCase().includes('fat loss')
        )
      },
      {
        theme: "Muscle Building Nutrition",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('muscle') || 
          k.text.toLowerCase().includes('mass') ||
          k.text.toLowerCase().includes('strength')
        )
      }
    ],
    'Demographic': [
      {
        theme: "For Busy Professionals",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('quick') || 
          k.text.toLowerCase().includes('convenient') ||
          k.text.toLowerCase().includes('on the go')
        )
      },
      {
        theme: "Women's Fitness Nutrition",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('women') || 
          k.text.toLowerCase().includes('female') ||
          k.text.toLowerCase().includes('lady')
        )
      },
      {
        theme: "Senior Health & Wellness",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('senior') || 
          k.text.toLowerCase().includes('elderly') ||
          k.text.toLowerCase().includes('age')
        )
      }
    ],
    'Seasonal/Event-Based': [
      {
        theme: "Back to School Wellness",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('student') || 
          k.text.toLowerCase().includes('school') ||
          k.text.toLowerCase().includes('college')
        )
      },
      {
        theme: "New Year Fitness Goals",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('resolution') || 
          k.text.toLowerCase().includes('new year') ||
          k.text.toLowerCase().includes('goal')
        )
      },
      {
        theme: "Summer Body Preparation",
        keywords: keywords.filter(k => 
          k.text.toLowerCase().includes('summer') || 
          k.text.toLowerCase().includes('beach') ||
          k.text.toLowerCase().includes('vacation')
        )
      }
    ]
  };

  let themes: any[] = [];
  
  // If no categories selected, include all
  const categoriesToInclude = selectedCategories.length > 0 ? selectedCategories : Object.keys(allThemes);
  
  categoriesToInclude.forEach(category => {
    if (allThemes[category as keyof typeof allThemes]) {
      themes.push(...allThemes[category as keyof typeof allThemes]);
    }
  });

  return themes.filter(theme => theme.keywords.length > 0);
}

function generateShoppingBids(keywords: any[], budgets: any) {
  const target_cpa = 45;
  const conversion_rate = 0.025;
  const target_cpc = target_cpa * conversion_rate;

  const bids = keywords.map(keyword => {
    const low = keyword.top_of_page_bid_low;
    const high = keyword.top_of_page_bid_high;
    const suggested = Math.min(Math.max(target_cpc, low), high);
    
    return {
      text: keyword.text,
      avg_monthly_searches: keyword.avg_monthly_searches,
      suggested_cpc: Math.round(suggested * 100) / 100,
      bid_range: [low, high],
      competition: keyword.competition
    };
  });

  return {
    target_cpc: Math.round(target_cpc * 100) / 100,
    bids: bids
  };
}

export function generateMockSEMData(inputs: SEMInputs) {
  // Add location-specific keywords
  const locationKeywords = inputs.locations.flatMap(location => [
    {
      text: `protein powder ${location.toLowerCase()}`,
      avg_monthly_searches: 890,
      top_of_page_bid_low: 0.8,
      top_of_page_bid_high: 2.2,
      competition: "Medium",
      intent: "Local Commercial",
      match_type_suggestion: ["Phrase", "Broad"],
      seed_match_score: 1
    },
    {
      text: `buy protein powder in ${location.toLowerCase()}`,
      avg_monthly_searches: 450,
      top_of_page_bid_low: 1.2,
      top_of_page_bid_high: 3.0,
      competition: "High",
      intent: "Local Transactional",
      match_type_suggestion: ["Exact", "Phrase"],
      seed_match_score: 1
    }
  ]);

  const allKeywords = [...MOCK_KEYWORD_IDEAS, ...locationKeywords];
  
  const searchAdGroups = groupKeywordsIntoAdGroups(allKeywords);
  const pmaxThemes = generatePMaxThemes(allKeywords, inputs.theme_categories);
  const shoppingBids = generateShoppingBids(allKeywords, inputs);

  return {
    seed_keywords: MOCK_SEED_KEYWORDS,
    keyword_ideas: allKeywords,
    search_ad_groups: searchAdGroups,
    pmax_themes: pmaxThemes,
    shopping_bids: shoppingBids,
    budgets: {
      budget_shopping: inputs.budget_shopping,
      budget_search: inputs.budget_search,
      budget_pmax: inputs.budget_pmax
    }
  };
}