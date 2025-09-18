import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import KeywordResearch from "./pages/KeywordResearch";
import CampaignStructure from "./pages/CampaignStructure";
import Stepper from "./components/Stepper";
import { Target } from "lucide-react";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const [step, setStep] = useState(1);  
  const [semData, setSemData] = useState<any>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
              <Stepper currentStep={step} />

              <Routes>
                <Route path="/" element={
                  <>
                    {step === 1 && <Setup onNext={setStep} setSemData={setSemData} />}
                    {step === 2 && <KeywordResearch onNext={setStep} semData={semData} />}
                    {step === 3 && <CampaignStructure semData={semData} />}
                  </>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
