import { Task } from "@/lib/types";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onAddTask: () => void;
}

export function TaskList({ tasks, onStatusChange, onDelete, onAddTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status (uncompleted first)
    if (a.is_completed && !b.is_completed) return 1;
    if (!a.is_completed && b.is_completed) return -1;
    
    // Then sort by due date (closest first)
    if (a.due_date && b.due_date) return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    if (a.due_date && !b.due_date) return -1;
    if (!a.due_date && b.due_date) return 1;
    
    // Finally sort by creation date (newest first)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <Button onClick={onAddTask} size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      {sortedTasks.length === 0 ? (
        <div className="py-8 text-center bg-secondary/20 rounded-lg border border-border/30">
          <p className="text-muted-foreground">No tasks yet. Add your first task to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <TaskItem 
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
