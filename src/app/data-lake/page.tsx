"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { summarizeThreatData, type SummarizeThreatDataInput, type SummarizeThreatDataOutput } from "@/ai/flows/summarize-threat-data";
import { Loader2, AlertTriangle, Info, ShieldCheck } from "lucide-react";

export default function DataLakePage() {
  const [threatDataInput, setThreatDataInput] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<SummarizeThreatDataOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAnalyzeData = async () => {
    if (!threatDataInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide threat data to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const input: SummarizeThreatDataInput = { threatData: threatDataInput };
      const result = await summarizeThreatData(input);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Threat data has been summarized and assessed.",
      });
    } catch (error) {
      console.error("Error analyzing threat data:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze threat data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelIcon = (riskLevel?: string) => {
    switch (riskLevel?.toLowerCase()) {
      case "critical":
      case "high":
        return <AlertTriangle className="w-6 h-6 text-destructive" />;
      case "medium":
        return <Info className="w-6 h-6 text-yellow-500" />;
      case "low":
        return <ShieldCheck className="w-6 h-6 text-green-500" />;
      default:
        return <Info className="w-6 h-6 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Threat Intelligence Aggregation</CardTitle>
            <CardDescription>
              Input heterogeneous cybersecurity data from various sources. The AI will summarize the data, assess the risk level, and provide recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your aggregated threat data here (e.g., logs, anomaly reports, security alerts)..."
              value={threatDataInput}
              onChange={(e) => setThreatDataInput(e.target.value)}
              rows={15}
              className="text-sm"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyzeData} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Threat Data"
              )}
            </Button>
          </CardFooter>
        </Card>

        {analysisResult && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline">Summary</CardTitle>
                  {getRiskLevelIcon(analysisResult.riskLevel)}
                </div>
                 <CardDescription>Concise overview of the provided data.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{analysisResult.summary}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="font-headline">Risk Level</CardTitle>
                    {getRiskLevelIcon(analysisResult.riskLevel)}
                  </div>
                <CardDescription>Assessed threat level.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${
                  analysisResult.riskLevel?.toLowerCase() === 'high' || analysisResult.riskLevel?.toLowerCase() === 'critical' ? 'text-destructive'
                  : analysisResult.riskLevel?.toLowerCase() === 'medium' ? 'text-yellow-600'
                  : 'text-green-600'
                }`}>
                  {analysisResult.riskLevel || "Not Determined"}
                </p>
              </CardContent>
            </Card>
            
            {analysisResult.recommendations && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline">Recommendations</CardTitle>
                  <CardDescription>Suggested actions to mitigate identified threats.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{analysisResult.recommendations}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
