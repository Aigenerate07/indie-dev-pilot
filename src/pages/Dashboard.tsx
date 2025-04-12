import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectList } from "@/components/projects/ProjectList";
import { StatusFilter } from "@/components/projects/StatusFilter";
import { ProjectStatus } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getProjectsByStatus } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjectsByStatus(statusFilter);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [statusFilter, toast]);
    
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects Dashboard</h1>
        <Link to="/new-project">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>
      
      <StatusFilter 
        currentStatus={statusFilter}
        onStatusChange={setStatusFilter}
      />
      
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </MainLayout>
  );
}
