import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { TaskList } from "@/components/tasks/TaskList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, ExternalLink, Github, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS, TECH_STACK_OPTIONS } from "@/lib/data";
import { Project, ProjectStatus, Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getProjectById, updateProject, getTasksByProjectId, createTask, updateTask, deleteTask } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch project and tasks data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const projectData = await getProjectById(id);
        setProject(projectData);
        
        const tasksData = await getTasksByProjectId(id);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching project data:", error);
        toast({
          title: "Error",
          description: "Failed to load project data. Please try again.",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate, toast]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading project data...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!project) return null;
  
  // Update project field
  const handleFieldUpdate = async (field: keyof Project, value: any) => {
    try {
      setIsSubmitting(true);
      const updatedProject = await updateProject(project.id, { [field]: value });
      setProject(updatedProject);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update task status
  const handleTaskStatusChange = async (taskId: string, isCompleted: boolean) => {
    try {
      setIsSubmitting(true);
      const updatedTask = await updateTask(taskId, { is_completed: isCompleted });
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === taskId ? updatedTask : task)
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Add new task
  const handleAddTask = async () => {
    try {
      setIsSubmitting(true);
      const newTask = await createTask({
        project_id: project.id,
        title: "New Task",
        description: "",
        is_completed: false,
        due_date: null
      });
      setTasks(prevTasks => [newTask, ...prevTasks]);
      toast({
        title: "Success",
        description: "Task added successfully",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsSubmitting(true);
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Add tech stack item
  const handleAddTechStack = async (tech: string) => {
    if (project.tech_stack.includes(tech)) return;
    
    try {
      setIsSubmitting(true);
      const updatedTechStack = [...project.tech_stack, tech];
      const updatedProject = await updateProject(project.id, { tech_stack: updatedTechStack });
      setProject(updatedProject);
    } catch (error) {
      console.error("Error updating tech stack:", error);
      toast({
        title: "Error",
        description: "Failed to update tech stack. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Remove tech stack item
  const handleRemoveTechStack = async (tech: string) => {
    try {
      setIsSubmitting(true);
      const updatedTechStack = project.tech_stack.filter(item => item !== tech);
      const updatedProject = await updateProject(project.id, { tech_stack: updatedTechStack });
      setProject(updatedProject);
    } catch (error) {
      console.error("Error updating tech stack:", error);
      toast({
        title: "Error",
        description: "Failed to update tech stack. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 pl-2 pr-4 -ml-3"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      value={project.name}
                      onChange={(e) => handleFieldUpdate("name", e.target.value)}
                      className="text-2xl font-bold border-none p-0 focus-visible:ring-0"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      value={project.description || ""}
                      onChange={(e) => handleFieldUpdate("description", e.target.value)}
                      placeholder="Add a description"
                      className="border-none p-0 focus-visible:ring-0 resize-none"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        PROJECT_STATUS_COLORS[project.status]
                      )}
                      onClick={() => {
                        const statuses = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];
                        const currentIndex = statuses.indexOf(project.status);
                        const nextIndex = (currentIndex + 1) % statuses.length;
                        handleFieldUpdate("status", statuses[nextIndex]);
                      }}
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                    
                    {project.start_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Started: {format(new Date(project.start_date), "MMM d, yyyy")}
                      </div>
                    )}
                    
                    {project.end_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Completed: {format(new Date(project.end_date), "MMM d, yyyy")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Tasks</h3>
                <TaskList 
                  tasks={tasks}
                  onStatusChange={handleTaskStatusChange}
                  onDelete={handleDeleteTask}
                />
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={handleAddTask}
                  disabled={isSubmitting}
                >
                  Add Task
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <Badge 
                      key={tech}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTechStack(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <select
                    className="w-full rounded-md border border-border h-9 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    onChange={(e) => handleAddTechStack(e.target.value)}
                    value=""
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>Add technology</option>
                    {TECH_STACK_OPTIONS.filter(tech => !project.tech_stack.includes(tech)).map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Links</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </Button>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
