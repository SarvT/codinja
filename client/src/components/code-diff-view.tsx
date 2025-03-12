"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeDiffViewProps {
  originalCode: string
  improvedCode: string
  // language: string
}

export function CodeDiffView({ originalCode, improvedCode }: CodeDiffViewProps) {
  const [activeTab, setActiveTab] = useState<"original" | "improved">("improved")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeTab === "original" ? originalCode : improvedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 rounded-lg bg-muted p-1">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "original"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
            }`}
            onClick={() => setActiveTab("original")}
          >
            Original
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "improved"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
            }`}
            onClick={() => setActiveTab("improved")}
          >
            Improved
          </button>
        </div>

        <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </Button>
      </div>

      <div className="relative">
        <pre className="p-4 rounded-md bg-muted overflow-x-auto font-mono text-sm">
          {activeTab === "original" ? originalCode : improvedCode}
        </pre>
      </div>

      {activeTab === "improved" && (
        <div className="text-sm text-muted-foreground">
          <p>This improved version addresses the issues found in the analysis:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Added proper docstring explaining purpose and parameters of the funtion.</li>
            <li>Added type hints for better code readability and IDE support</li>
          </ul>
        </div>
      )}
    </div>
  )
}

