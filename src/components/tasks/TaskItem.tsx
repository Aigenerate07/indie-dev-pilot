import { useState } from "react";
import { Task } from "@/lib/types";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  const [checked, setChecked] = useState(task.is_completed);
  
  const handleCheckboxChange = () => {
    setChecked(!checked);
    onStatusChange(task.id, !checked);
  };
  
  return (
    <div className={`group flex items-start gap-3 p-3 border border-border/40 rounded-md mb-2 transition-all 
      ${checked ? "bg-secondary/20" : "bg-secondary/10 hover:bg-secondary/20"}`}>
      <Checkbox 
        id={`task-${task.id}`}
        checked={checked}
        onCheckedChange={handleCheckboxChange}
        className="mt-0.5"
      />
      
      <div className="flex-1 min-w-0">
        <label 
          htmlFor={`task-${task.id}`}
          className={`block font-medium cursor-pointer ${checked ? "line-through text-muted-foreground" : ""}`}
        >
          {task.title}
        </label>
        
        {task.description && (
          <p className={`text-sm mt-1 ${checked ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
            {task.description}
          </p>
        )}
        
        {task.due_date && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Due {format(new Date(task.due_date), 'MMM d, yyyy')}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(task.id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}
