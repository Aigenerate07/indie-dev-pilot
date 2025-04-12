export type TaskStatus = "todo" | "in-progress" | "completed";

export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  tech_stack: string[];
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
