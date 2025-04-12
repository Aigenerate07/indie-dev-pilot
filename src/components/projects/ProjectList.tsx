
import { Project, ProjectStatus } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  status?: ProjectStatus;
}

export function ProjectList({ projects, status }: ProjectListProps) {
  const filteredProjects = status 
    ? projects.filter(project => project.status === status)
    : projects;
    
  if (filteredProjects.length === 0) {
    return (
      <div className="py-12 text-center bg-secondary/20 rounded-lg border border-border/30">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
