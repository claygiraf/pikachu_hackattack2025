"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface AlertConfigState {
  cpuUsageThreshold: number;
  failedLoginAttempts: number;
  dataExfiltrationVolume: number;
  anomalySeverityAlert: string;
  enableRealTimeScan: boolean;
}

const initialConfig: AlertConfigState = {
  cpuUsageThreshold: 85,
  failedLoginAttempts: 5,
  dataExfiltrationVolume: 100, // MB
  anomalySeverityAlert: "high",
  enableRealTimeScan: true,
};

export default function AlertConfigPage() {
  const [config, setConfig] = useState<AlertConfigState>(initialConfig);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setConfig((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setConfig((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend.
    console.log("Saving alert configurations:", config);
    toast({
      title: "Configuration Saved",
      description: "Alert thresholds and settings have been updated.",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Alert Configuration</CardTitle>
            <CardDescription>
              Define thresholds and settings for triggering security alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="cpuUsageThreshold">CPU Usage Threshold (%)</Label>
                <Input
                  id="cpuUsageThreshold"
                  name="cpuUsageThreshold"
                  type="number"
                  value={config.cpuUsageThreshold}
                  onChange={handleInputChange}
                  className="text-sm"
                  min="0" max="100"
                />
                <p className="text-xs text-muted-foreground">Alert when CPU usage exceeds this percentage.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="failedLoginAttempts">Failed Login Attempts Threshold</Label>
                <Input
                  id="failedLoginAttempts"
                  name="failedLoginAttempts"
                  type="number"
                  value={config.failedLoginAttempts}
                  onChange={handleInputChange}
                  className="text-sm"
                  min="1"
                />
                <p className="text-xs text-muted-foreground">Alert after this many consecutive failed login attempts.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataExfiltrationVolume">Data Exfiltration Volume (MB)</Label>
                <Input
                  id="dataExfiltrationVolume"
                  name="dataExfiltrationVolume"
                  type="number"
                  value={config.dataExfiltrationVolume}
                  onChange={handleInputChange}
                  className="text-sm"
                  min="1"
                />
                <p className="text-xs text-muted-foreground">Alert if outbound data transfer exceeds this volume in a short period.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="anomalySeverityAlert">Minimum Anomaly Severity for Alert</Label>
                <Select
                  name="anomalySeverityAlert"
                  value={config.anomalySeverityAlert}
                  onValueChange={(value) => handleSelectChange("anomalySeverityAlert", value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Trigger alerts for anomalies of this severity or higher.</p>
              </div>
            </div>
            
            <div className="space-y-4 border-t pt-6">
               <h3 className="text-lg font-semibold font-headline">General Settings</h3>
                <div className="flex items-center space-x-2">
                    <Switch 
                        id="enableRealTimeScan" 
                        name="enableRealTimeScan"
                        checked={config.enableRealTimeScan} 
                        onCheckedChange={(checked) => handleSwitchChange("enableRealTimeScan", checked)}
                    />
                    <Label htmlFor="enableRealTimeScan">Enable Real-time Threat Scanning</Label>
                </div>
                <p className="text-xs text-muted-foreground">Continuously scan for threats based on configured rules and AI models.</p>
            </div>

          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges} size="lg">
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
