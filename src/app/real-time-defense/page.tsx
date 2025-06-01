"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestResponse, type SuggestResponseInput, type SuggestResponseOutput } from "@/ai/flows/suggest-response";
import { Loader2, ShieldAlert, ListChecks, Users, FileText } from "lucide-react";

const initialAnomaly: SuggestResponseInput = {
  threatDescription: "Unusual outbound traffic detected from server SRV-DB-01 to an unknown IP address (X.X.X.X). Potential data exfiltration.",
  affectedSystems: "SRV-DB-01 (10.0.1.56), Firewall FW-MAIN-01",
  dataSensitivity: "High (Contains PII and financial records)",
  regulatoryCompliance: "PCI-DSS, CCPA",
};

export default function RealTimeDefensePage() {
  const [anomalyDetails, setAnomalyDetails] = useState<SuggestResponseInput>(initialAnomaly);
  const [responseStrategy, setResponseStrategy] = useState<SuggestResponseOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnomalyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuggestResponse = async () => {
    setIsLoading(true);
    setResponseStrategy(null);

    try {
      const result = await suggestResponse(anomalyDetails);
      setResponseStrategy(result);
      toast({
        title: "Response Strategy Generated",
        description: "AI has suggested a remediation plan.",
      });
    } catch (error) {
      console.error("Error suggesting response:", error);
      toast({
        title: "Strategy Generation Failed",
        description: "Could not generate a response strategy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">AI-Powered Detection & Response</CardTitle>
            <CardDescription>
              Review detected anomalies and use AI to generate a comprehensive response strategy. This example pre-fills an anomaly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 font-headline">Detected Anomaly Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="threatDescription">Threat Description</Label>
                  <Textarea
                    id="threatDescription"
                    name="threatDescription"
                    value={anomalyDetails.threatDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affectedSystems">Affected Systems</Label>
                  <Input
                    id="affectedSystems"
                    name="affectedSystems"
                    value={anomalyDetails.affectedSystems}
                    onChange={handleInputChange}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataSensitivity">Data Sensitivity</Label>
                  <Input
                    id="dataSensitivity"
                    name="dataSensitivity"
                    value={anomalyDetails.dataSensitivity}
                    onChange={handleInputChange}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regulatoryCompliance">Regulatory Compliance</Label>
                  <Input
                    id="regulatoryCompliance"
                    name="regulatoryCompliance"
                    value={anomalyDetails.regulatoryCompliance}
                    onChange={handleInputChange}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSuggestResponse} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Strategy...
                </>
              ) : (
                "Suggest Response Strategy"
              )}
            </Button>
          </CardFooter>
        </Card>

        {responseStrategy && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold font-headline">Suggested Response Strategy</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><ShieldAlert className="w-6 h-6 text-primary" />Suggested Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{responseStrategy.suggestedStrategy}</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><ListChecks className="w-6 h-6 text-primary" />Estimated Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{responseStrategy.estimatedImpact}</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><Users className="w-6 h-6 text-primary" />Resource Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{responseStrategy.resourceRequirements}</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><FileText className="w-6 h-6 text-primary" />Communication Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{responseStrategy.communicationPlan}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
