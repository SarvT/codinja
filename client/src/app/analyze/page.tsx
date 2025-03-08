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

// Define types
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

// Mock analysis result
const mockAnalysisResult: AnalysisResult = {
  id: 6,
  language: "python",
  analysis_result: {
    best_practices: [
      {
        id: "BP001",
        description:
          "Consider adding a docstring to the function to explain its purpose, arguments, and return value. This improves readability and maintainability.",
        severity: "low",
      },
      {
        id: "BP002",
        description:
          "For better readability, especially in larger projects, consider adding type hints for the arguments and return value (e.g., `def add(a: int, b: int) -> int: ...`).",
        severity: "low",
      },
    ],
    security_issues: [],
    optimization_suggestions: [
      {
        id: "OPT001",
        description:
          "For such a simple function, the current implementation is already highly optimized. No further optimization is generally needed.",
        severity: "none",
      },
    ],
  },
  created_at: "2025-03-07T13:42:54.158392Z",
};

// Sample code
const sampleCode = `def add(a, b):
    return a + b
`;

export default function AnalyzePage() {
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>(sampleCode);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const url = "http://127.0.0.1:8000/api/submissions/";

  const handleAnalyzeCall = async () => {
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

    setResult(response.json) ;
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setResult(mockAnalysisResult);
      setIsAnalyzing(false);
    }, 1500);
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
                  <Select
                    value={language}
                    onValueChange={(value: string) => setLanguage(value)}
                  >
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
                    <TabsTrigger value="best-practices">
                      Best Practices
                    </TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="optimization">Optimization</TabsTrigger>
                  </TabsList>

                  <TabsContent value="best-practices">
                    {result.analysis_result.best_practices.map((item) => (
                      <Alert key={item.id}>
                        <Badge className={getSeverityColor(item.severity)}>
                          {getSeverityIcon(item.severity)}
                          <span className="capitalize">{item.severity}</span>
                        </Badge>
                        <div>
                          <AlertTitle>{item.id}</AlertTitle>
                          <AlertDescription>
                            {item.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-10 border border-dashed rounded-lg">
              <Code className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3>No Analysis Results Yet</h3>
              <p>Enter your code and click "Analyze Code" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
