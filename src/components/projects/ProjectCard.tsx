import { Project, ProjectStatus } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { PROJECT_STATUS_COLORS } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { id, name, description, status, tech_stack, start_date } = project;
  
  return (
    <Link to={`/project/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/50 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            <Badge variant="outline" className={`${PROJECT_STATUS_COLORS[status as ProjectStatus]} text-xs whitespace-nowrap`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
          
          {start_date && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Calendar className="h-3.5 w-3.5" />
              <span>Started {format(new Date(start_date), 'MMM d, yyyy')}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tech_stack.slice(0, 3).map(tech => (
              <Badge key={tech} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                {tech}
              </Badge>
            ))}
            {tech_stack.length > 3 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                +{tech_stack.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
