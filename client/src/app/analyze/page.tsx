"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Code, AlertTriangle, ShieldAlert, Zap, Loader2 } from "lucide-react";

interface AnalysisResult {
  id: number;
  language: string;
  analysis_result: {
    best_practices: { id: string; description: string; severity: string }[];
    security_issues: { id: string; description: string; severity: string }[];
    optimization_suggestions: {
      id: string;
      description: string;
      severity: string;
    }[];
  };
  created_at: string;
}

const sampleCode = `def add(a, b):
    return a + b
`;

export default function AnalyzePage() {
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>(sampleCode);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const url = process.env.SERVER_URI || "";

  const handleAnalyzeCall = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log(data);
      
      setResult(data);
      setIsAnalyzing(false);
    } catch (error) {
      setIsAnalyzing(false);
      console.log(error);
      
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-orange-500 text-white";
      case "low":
        return "bg-yellow-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <ShieldAlert className="h-4 w-4" />;
      case "medium":
      case "low":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Code Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>
                Select a language and paste your code to analyze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Programming Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Code</label>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="font-mono h-80"
                  />
                </div>

                <Button
                  onClick={handleAnalyzeCall}
                  disabled={isAnalyzing || !code.trim()}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Analyze Code</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {result ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Analysis Results</span>
                  <Badge variant="outline" className="ml-2">
                    {result.language}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Analysis completed on{" "}
                  {new Date(result.created_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="best-practices">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger
                      value="best-practices"
                      className="flex items-center gap-1"
                    >
                      <Code className="h-4 w-4" />
                      <span>Best Practices</span>
                      <Badge variant="secondary" className="ml-1">
                        {result.analysis_result.best_practices.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="flex items-center gap-1"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      <span>Security</span>
                      <Badge variant="secondary" className="ml-1">
                        {result.analysis_result.security_issues.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                      value="optimization"
                      className="flex items-center gap-1"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Optimization</span>
                      <Badge variant="secondary" className="ml-1">
                        {result.analysis_result.optimization_suggestions.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="best-practices" className="space-y-4">
                    {result.analysis_result.best_practices.length > 0 ? (
                      result.analysis_result.best_practices.map((item) => (
                        <Alert key={item.id}>
                          <div className="flex items-start">
                            <Badge
                              className={`mr-2 ${getSeverityColor(
                                item.severity
                              )}`}
                            >
                              <div className="flex items-center gap-1">
                                {getSeverityIcon(item.severity)}
                                <span className="capitalize">
                                  {item.severity}
                                </span>
                              </div>
                            </Badge>
                            <div>
                              <AlertTitle className="text-sm font-medium">
                                {item.id}
                              </AlertTitle>
                              <AlertDescription className="text-sm mt-1">
                                {item.description}
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No best practice issues found
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="security" className="space-y-4">
                    {result.analysis_result.security_issues.length > 0 ? (
                      result.analysis_result.security_issues.map((item) => (
                        <Alert key={item.id}>
                          <div className="flex items-start">
                            <Badge
                              className={`mr-2 ${getSeverityColor(
                                item.severity
                              )}`}
                            >
                              <div className="flex items-center gap-1">
                                {getSeverityIcon(item.severity)}
                                <span className="capitalize">
                                  {item.severity}
                                </span>
                              </div>
                            </Badge>
                            <div>
                              <AlertTitle className="text-sm font-medium">
                                {item.id}
                              </AlertTitle>
                              <AlertDescription className="text-sm mt-1">
                                {item.description}
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No security issues found
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="optimization" className="space-y-4">
                    {result.analysis_result.optimization_suggestions.length >
                    0 ? (
                      result.analysis_result.optimization_suggestions.map(
                        (item) => (
                          <Alert key={item.id}>
                            <div className="flex items-start">
                              <Badge
                                className={`mr-2 ${getSeverityColor(
                                  item.severity
                                )}`}
                              >
                                <div className="flex items-center gap-1">
                                  {getSeverityIcon(item.severity)}
                                  <span className="capitalize">
                                    {item.severity || "none"}
                                  </span>
                                </div>
                              </Badge>
                              <div>
                                <AlertTitle className="text-sm font-medium ">
                                  {item.id}
                                </AlertTitle>
                                <AlertDescription className="text-sm mt-1 ">
                                  {item.description}
                                </AlertDescription>
                              </div>
                            </div>
                          </Alert>
                        )
                      )
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No optimization suggestions found
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg border border-dashed p-10">
              <div className="text-center">
                <Code className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Analysis Results Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Enter your code and click Analyze Code to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
