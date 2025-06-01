
"use client";

import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Shield, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import Image from 'next/image';

const chartDataThreatsOverTime = [
  { month: "Jan", threats: 12, resolved: 8 },
  { month: "Feb", threats: 19, resolved: 12 },
  { month: "Mar", threats: 15, resolved: 10 },
  { month: "Apr", threats: 22, resolved: 18 },
  { month: "May", threats: 18, resolved: 15 },
  { month: "Jun", threats: 25, resolved: 20 },
];

const chartDataThreatTypes = [
  { name: "Malware", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Phishing", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "DDoS", value: 200, fill: "hsl(var(--chart-3))" },
  { name: "Insider Threats", value: 100, fill: "hsl(var(--chart-4))" },
];

const chartConfigThreatsOverTime = {
  threats: { label: "Detected Threats", color: "hsl(var(--chart-1))" },
  resolved: { label: "Resolved Threats", color: "hsl(var(--chart-2))" },
};

const chartConfigThreatTypes = {
  value: { label: "Count" },
  Malware: { label: "Malware", color: "hsl(var(--chart-1))" },
  Phishing: { label: "Phishing", color: "hsl(var(--chart-2))" },
  DDoS: { label: "DDoS", color: "hsl(var(--chart-3))" },
  "Insider Threats": { label: "Insider Threats", color: "hsl(var(--chart-4))" },
};


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Operational</div>
              <p className="text-xs text-muted-foreground">All systems normal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Improved by 3% this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Incidents Resolved (Month)</CardTitle>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">73</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Threat Trends Over Time</CardTitle>
              <CardDescription>Monthly detected vs. resolved threats.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigThreatsOverTime} className="h-[300px] w-full">
                <LineChart data={chartDataThreatsOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} />
                  <YAxis tickLine={false} axisLine={false} dx={-10}/>
                  <RechartsTooltip content={<ChartTooltipContent indicator="line" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="threats" stroke="var(--color-threats)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Threat Types Distribution</CardTitle>
              <CardDescription>Breakdown of threat categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer config={chartConfigThreatTypes} className="h-[300px] w-full max-w-xs">
                <PieChart>
                  <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={chartDataThreatTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {chartDataThreatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">High-risk anomaly detected: Unusual login pattern</p>
                    <p className="text-xs text-muted-foreground">System: Auth Server (192.168.1.10), User: admin@shield.ai</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </li>
              <li className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Threat resolved: Malware quarantined</p>
                    <p className="text-xs text-muted-foreground">Endpoint: WKSTN-073, Threat: Trojan.GenericKD.3249012</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Log</Button>
              </li>
               <li className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Security policy updated: New firewall rule applied</p>
                    <p className="text-xs text-muted-foreground">Policy ID: FWR-07B, Applied by: auto-defense-module</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Policy</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline">Geographic Threat Map</CardTitle>
            <CardDescription>Visualization of threat origins (Placeholder).</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
            <Image src="https://placehold.co/600x300.png" alt="Threat Map Placeholder" width={600} height={300} data-ai-hint="world map" className="opacity-50" />
            <p className="absolute text-muted-foreground">Threat Map Coming Soon</p>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}

    