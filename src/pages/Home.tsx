import { Link } from 'react-router-dom';
import { CORE_TOOLS, ADVANCED_TOOLS } from '../lib/tools-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import * as Icons from 'lucide-react';
import { Button, buttonVariants } from '../components/ui/button';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm rounded-full">
            100% Free AI Tools for Creators
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Supercharge Your Content with <span className="text-primary">CreatorAI</span>
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#core-tools" className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}>
              Explore Tools
            </Link>
            <Link to="#advanced-tools" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8" })}>
              Advanced Features
            </Link>
          </div>
        </div>
      </section>

      {/* Core Tools Section */}
      <section id="core-tools" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core AI Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to write scripts, generate hooks, and optimize your content for maximum reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_TOOLS.map((tool) => {
            const Icon = (Icons as any)[tool.icon] || Icons.Wand2;
            return (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Advanced Tools Section */}
      <section id="advanced-tools" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take your channel to the next level with deep analysis and A/B testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ADVANCED_TOOLS.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Icons.Wand2;
              return (
                <Link key={tool.id} to={`/advanced/${tool.id}`} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{tool.title}</CardTitle>
                          <Badge variant="default" className="mt-1">Pro Feature (Free)</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
