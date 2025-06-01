"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThreatLog {
  id: string;
  date: string;
  threatDescription: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Resolved" | "Investigating" | "Open";
  resolutionNotes?: string;
  affectedSystems?: string;
}

const initialLogs: ThreatLog[] = [
  { id: "TL001", date: "2024-07-15", threatDescription: "Phishing attempt detected from spoofed email.", severity: "Medium", status: "Resolved", resolutionNotes: "Blocked sender domain, educated user.", affectedSystems: "user@example.com" },
  { id: "TL002", date: "2024-07-10", threatDescription: "Malware found on endpoint WKSTN-042.", severity: "High", status: "Resolved", resolutionNotes: "Malware quarantined and removed. System scanned and cleared.", affectedSystems: "WKSTN-042" },
  { id: "TL003", date: "2024-07-05", threatDescription: "Unusual login activity on SRV-APP-03.", severity: "Critical", status: "Investigating", resolutionNotes: "", affectedSystems: "SRV-APP-03" },
  { id: "TL004", date: "2024-06-28", threatDescription: "Minor port scan detected from external IP.", severity: "Low", status: "Resolved", resolutionNotes: "IP added to blocklist. No impact observed.", affectedSystems: "Firewall FW-EDGE-01" },
];

export default function ThreatLogsPage() {
  const [logs, setLogs] = useState<ThreatLog[]>(initialLogs);
  const [editingLog, setEditingLog] = useState<ThreatLog | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLog, setNewLog] = useState<Partial<ThreatLog>>({});

  const { toast } = useToast();

  const handleEditLog = (log: ThreatLog) => {
    setEditingLog({ ...log });
  };

  const handleSaveLog = () => {
    if (editingLog) {
      setLogs(logs.map(log => log.id === editingLog.id ? editingLog : log));
      toast({ title: "Log Updated", description: `Log ${editingLog.id} has been saved.` });
      setEditingLog(null);
    }
  };
  
  const handleAddNewLog = () => {
    if (!newLog.threatDescription || !newLog.severity || !newLog.status) {
        toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
        return;
    }
    const logToAdd: ThreatLog = {
        id: `TL${String(logs.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        threatDescription: newLog.threatDescription || "N/A",
        severity: newLog.severity || "Low",
        status: newLog.status || "Open",
        resolutionNotes: newLog.resolutionNotes || "",
        affectedSystems: newLog.affectedSystems || ""
    };
    setLogs([logToAdd, ...logs]);
    toast({ title: "Log Added", description: `New log ${logToAdd.id} created.` });
    setNewLog({});
    setIsAddModalOpen(false);
  };


  const getSeverityBadgeVariant = (severity: ThreatLog["severity"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "destructive";
      case "Medium": return "default"; // Using primary as "warning"
      case "Low": return "secondary";
      default: return "outline";
    }
  };
  
  const getStatusBadgeVariant = (status: ThreatLog["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Resolved": return "secondary"; // Greenish in default theme
      case "Investigating": return "default"; // Yellowish/Orange default
      case "Open": return "destructive";
      default: return "outline";
    }
  };


  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-headline">Historical Threat Logs</CardTitle>
              <CardDescription>
                Review and manage records of past security incidents and their resolutions.
              </CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" onClick={() => setNewLog({})}>
                        <PlusCircle className="w-5 h-5 mr-2" /> Add New Log
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline">Add New Threat Log</DialogTitle>
                        <DialogDescription>Enter details for the new security incident.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-threatDescription" className="text-right">Description</Label>
                            <Textarea id="new-threatDescription" value={newLog.threatDescription || ""} onChange={(e) => setNewLog({...newLog, threatDescription: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-severity" className="text-right">Severity</Label>
                             <select id="new-severity" value={newLog.severity || ""} onChange={(e) => setNewLog({...newLog, severity: e.target.value as ThreatLog["severity"]})} className="col-span-3 p-2 border rounded-md text-sm">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-status" className="text-right">Status</Label>
                             <select id="new-status" value={newLog.status || ""} onChange={(e) => setNewLog({...newLog, status: e.target.value as ThreatLog["status"]})} className="col-span-3 p-2 border rounded-md text-sm">
                                <option value="Open">Open</option>
                                <option value="Investigating">Investigating</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-affectedSystems" className="text-right">Affected Systems</Label>
                            <Input id="new-affectedSystems" value={newLog.affectedSystems || ""} onChange={(e) => setNewLog({...newLog, affectedSystems: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-resolutionNotes" className="text-right">Notes</Label>
                            <Textarea id="new-resolutionNotes" value={newLog.resolutionNotes || ""} onChange={(e) => setNewLog({...newLog, resolutionNotes: e.target.value})} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleAddNewLog}>Add Log</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="min-w-[250px]">Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Affected Systems</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.threatDescription}</TableCell>
                    <TableCell><Badge variant={getSeverityBadgeVariant(log.severity)}>{log.severity}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge></TableCell>
                    <TableCell>{log.affectedSystems || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditLog(log)}>
                        <Pencil className="w-4 h-4" />
                        <span className="sr-only">Edit Log</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>A list of recorded security incidents.</TableCaption>
            </Table>
          </CardContent>
        </Card>

        {editingLog && (
          <Dialog open={!!editingLog} onOpenChange={(isOpen) => !isOpen && setEditingLog(null)}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Edit Threat Log: {editingLog.id}</DialogTitle>
                <DialogDescription>Update details for this security incident.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={editingLog.threatDescription} onChange={(e) => setEditingLog({...editingLog, threatDescription: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="severity" className="text-right">Severity</Label>
                   <select id="severity" value={editingLog.severity} onChange={(e) => setEditingLog({...editingLog, severity: e.target.value as ThreatLog["severity"]})} className="col-span-3 p-2 border rounded-md text-sm">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                   <select id="status" value={editingLog.status} onChange={(e) => setEditingLog({...editingLog, status: e.target.value as ThreatLog["status"]})} className="col-span-3 p-2 border rounded-md text-sm">
                        <option value="Open">Open</option>
                        <option value="Investigating">Investigating</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="affectedSystems" className="text-right">Affected Systems</Label>
                  <Input id="affectedSystems" value={editingLog.affectedSystems || ""} onChange={(e) => setEditingLog({...editingLog, affectedSystems: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="resolutionNotes" className="text-right">Resolution Notes</Label>
                  <Textarea id="resolutionNotes" value={editingLog.resolutionNotes || ""} onChange={(e) => setEditingLog({...editingLog, resolutionNotes: e.target.value})} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingLog(null)}>Cancel</Button>
                <Button onClick={handleSaveLog}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
}
