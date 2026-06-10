"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = ["Events", "Income", "Review"];

export function LifeEventWizard() {
  const [step, setStep] = useState("Events");

  return (
    <Card className="premium-card rounded-lg">
      <CardHeader>
        <CardTitle className="text-[#132238]">Life events wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={step} onValueChange={setStep}>
          <TabsList className="grid w-full grid-cols-3">
            {steps.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Events" className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Add milestones such as relocation, education, home purchase, or family planning.</p>
            <Button onClick={() => setStep("Income")}>Continue</Button>
          </TabsContent>
          <TabsContent value="Income" className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Estimate current salary, target salary, and savings capacity.</p>
            <Button onClick={() => setStep("Review")}>Continue</Button>
          </TabsContent>
          <TabsContent value="Review" className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Review your plan before generating AI guidance.</p>
            <Button className="bg-[#3E6B89] hover:bg-[#315A75]">Generate Plan</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
