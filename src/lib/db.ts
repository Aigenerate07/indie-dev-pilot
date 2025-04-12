import { supabase } from './supabase';
import { Project, Task, ProjectStatus } from './types';

// Project operations
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

export const getProjectsByStatus = async (status: ProjectStatus | 'all') => {
  if (status === 'all') return getProjects();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

export const getProjectById = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Project;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  // Ensure tech_stack is always an array
  const projectData = {
    ...project,
    tech_stack: project.tech_stack || [],
    description: project.description || null,
    start_date: project.start_date || null,
    end_date: project.end_date || null,
  };

  console.log('Creating project with data:', projectData);

  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();
  
  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to create project: ${error.message}`);
  }
  
  return data as Project;
};

export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Project;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Task operations
export const getTasksByProjectId = async (projectId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Task[];
};

export const getTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Task;
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();
  
  if (error) throw error;
  return data as Task;
};

export const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Task;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}; 