import Link from "next/link"
import { ArrowRight, Code, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Codinja</span>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="font-medium hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="font-medium hover:text-primary">
                  Analyze
                </Link>
              </li>
              <li>
                <Link href="#" className="font-medium hover:text-primary">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="font-medium hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Analyze Your Code for Better Quality</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Get instant feedback on best practices, security issues, and optimization opportunities for your code.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/analyze">
                  Try it now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">What We Analyze</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
                <p className="text-muted-foreground">
                  Identify code that does not follow industry best practices and get suggestions for improvement.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Issues</h3>
                <p className="text-muted-foreground">
                  Detect potential security vulnerabilities in your code before they become problems.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Optimization</h3>
                <p className="text-muted-foreground">
                  Find opportunities to make your code faster, more efficient, and more maintainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Supported Languages</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our analyzer supports a wide range of programming languages to help you improve code quality across your
              entire stack.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Python", "JavaScript", "TypeScript", "Java", "C#", "Go", "Ruby", "PHP", "Rust"].map((lang) => (
                <div key={lang} className="px-4 py-2 bg-muted rounded-full">
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to improve your code?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Start analyzing your code today and see the difference in quality and performance.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/analyze">Analyze your code now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code className="h-5 w-5 text-primary" />
              <span className="font-bold">Codinja</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Codinja. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

