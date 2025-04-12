
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Github, Layout, LayoutDashboard } from "lucide-react";

export default function Index() {
  return (
    <MainLayout>
      <section className="py-12 lg:py-24 flex flex-col items-center text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Track your projects with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">ProjectPilot</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] mx-auto mt-4 mb-8">
            A minimal project tracker for solo developers and indie hackers. Organize your projects, track tasks, and manage deadlines all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full h-12 px-8">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 w-full max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Built for developers, by developers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 rounded-xl p-6 border border-border/40 flex flex-col items-center text-center animate-slide-in">
              <div className="h-12 w-12 rounded-full bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-4">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Project Dashboard</h3>
              <p className="text-muted-foreground">Get a bird's eye view of all your projects, statuses, and progress in one place</p>
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-6 border border-border/40 flex flex-col items-center text-center animate-slide-in [animation-delay:100ms]">
              <div className="h-12 w-12 rounded-full bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Task Management</h3>
              <p className="text-muted-foreground">Create, organize, and track project tasks with simple checklists and due dates</p>
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-6 border border-border/40 flex flex-col items-center text-center animate-slide-in [animation-delay:200ms]">
              <div className="h-12 w-12 rounded-full bg-indigo-400/10 text-indigo-400 flex items-center justify-center mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Tech Stack Tracking</h3>
              <p className="text-muted-foreground">Document and tag the technologies used in each project for easy reference</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
