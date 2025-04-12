
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { mockProjects } from "@/lib/data";
import { Task } from "@/lib/types";
import { PROJECT_STATUS_COLORS } from "@/lib/data";

// Collect all tasks with due dates from projects
const getAllTasksWithDueDates = () => {
  const tasks: (Task & { projectId: string, projectName: string, projectStatus: string })[] = [];
  
  mockProjects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.dueDate) {
        tasks.push({
          ...task,
          projectId: project.id,
          projectName: project.name,
          projectStatus: project.status
        });
      }
    });
  });
  
  return tasks;
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const tasks = getAllTasksWithDueDates();
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day names (starting from Sunday)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => task.dueDate && isSameDay(task.dueDate, day));
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date())}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map(day => (
            <div 
              key={day} 
              className="text-center text-sm font-medium text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map(day => {
            const tasksForDay = getTasksForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div 
                key={day.toString()}
                className={`min-h-[100px] p-1 border rounded-md ${
                  isCurrentMonth 
                    ? isToday(day)
                      ? "bg-primary/5 border-primary/20" 
                      : "bg-secondary/20 border-border/40" 
                    : "bg-muted/10 border-border/20 text-muted-foreground"
                }`}
              >
                <div className="flex justify-between items-center mb-1 p-1">
                  <span className={`text-sm font-medium ${isToday(day) ? "text-primary" : ""}`}>
                    {format(day, "d")}
                  </span>
                  {tasksForDay.length > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {tasksForDay.length}
                    </span>
                  )}
                </div>
                
                <div className="overflow-y-auto max-h-24">
                  {tasksForDay.map(task => (
                    <div 
                      key={task.id}
                      className={`text-xs p-1 mb-1 rounded truncate ${
                        PROJECT_STATUS_COLORS[task.projectStatus as keyof typeof PROJECT_STATUS_COLORS]
                      }`}
                      title={`${task.title} - ${task.projectName}`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </MainLayout>
  );
}
