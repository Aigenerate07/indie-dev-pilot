
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from "@/lib/data";
import { ProjectStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface StatusFilterProps {
  currentStatus: ProjectStatus | "all";
  onStatusChange: (status: ProjectStatus | "all") => void;
}

export function StatusFilter({ currentStatus, onStatusChange }: StatusFilterProps) {
  const statuses = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={currentStatus === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("all")}
        className="text-xs h-8"
      >
        All Projects
      </Button>
      
      {statuses.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(status)}
          className={`text-xs h-8 ${currentStatus !== status ? PROJECT_STATUS_COLORS[status].replace('bg-', 'hover:bg-').replace('/10', '/5') : ''}`}
        >
          {PROJECT_STATUS_LABELS[status]}
        </Button>
      ))}
    </div>
  );
}
