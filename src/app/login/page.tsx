"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAiLogo } from "@/components/icons/ShieldAiLogo";
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <ShieldAiLogo className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Welcome to Shield AI</CardTitle>
          <CardDescription>Enter your credentials to access your security dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@shield.ai" className="text-sm" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" className="text-sm" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/" legacyBehavior passHref>
            <Button className="w-full" asChild><a>Login</a></Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground">
            Don&apos;t have an account? <Link href="#" className="text-primary hover:underline">Contact support</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
