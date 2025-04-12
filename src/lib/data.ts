
import { Project, ProjectStatus } from './types';

export const TECH_STACK_OPTIONS = [
  "React", "Next.js", "Vue", "Angular", "Svelte",
  "JavaScript", "TypeScript", "Node.js", "Express", "Nest.js",
  "Python", "Django", "Flask", "Ruby", "Rails",
  "PHP", "Laravel", "Go", "Rust", "Java", "Spring",
  "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase",
  "GraphQL", "REST", "Tailwind CSS", "Styled Components", "Material UI",
  "Vercel", "Netlify", "AWS", "GCP", "Azure", "Docker", "Kubernetes",
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  "planning": "Planning",
  "active": "Active",
  "on-hold": "On Hold",
  "completed": "Completed",
  "archived": "Archived"
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  "planning": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "active": "bg-green-500/10 text-green-500 border-green-500/20",
  "on-hold": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "completed": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "archived": "bg-slate-500/10 text-slate-500 border-slate-500/20"
};

// Generate mock data
export const generateMockProjects = (): Project[] => {
  return [
    {
      id: "1",
      name: "Personal Portfolio Website",
      description: "A modern portfolio site showcasing my projects and skills built with React and Tailwind CSS.",
      status: "completed",
      githubUrl: "https://github.com/username/portfolio",
      deploymentUrl: "https://portfolio.dev",
      startDate: new Date("2023-01-15"),
      endDate: new Date("2023-02-20"),
      techStack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
      tasks: [
        {
          id: "task1",
          title: "Design homepage layout",
          status: "completed",
          createdAt: new Date("2023-01-15"),
          updatedAt: new Date("2023-01-18")
        },
        {
          id: "task2",
          title: "Implement dark/light mode toggle",
          status: "completed",
          createdAt: new Date("2023-01-20"),
          updatedAt: new Date("2023-01-22")
        },
        {
          id: "task3",
          title: "Add project showcase section",
          status: "completed",
          createdAt: new Date("2023-01-25"),
          updatedAt: new Date("2023-02-01")
        }
      ],
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-02-20")
    },
    {
      id: "2",
      name: "E-commerce Dashboard",
      description: "Admin dashboard for an e-commerce platform with sales analytics and inventory management.",
      status: "active",
      githubUrl: "https://github.com/username/ecommerce-dashboard",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
      tasks: [
        {
          id: "task4",
          title: "Create authentication system",
          status: "completed",
          createdAt: new Date("2023-03-01"),
          updatedAt: new Date("2023-03-10")
        },
        {
          id: "task5",
          title: "Build sales analytics dashboard",
          status: "in-progress",
          createdAt: new Date("2023-03-12"),
          updatedAt: new Date("2023-03-12"),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 5))
        },
        {
          id: "task6",
          title: "Implement inventory management",
          status: "todo",
          createdAt: new Date("2023-03-15"),
          updatedAt: new Date("2023-03-15"),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
        }
      ],
      startDate: new Date("2023-03-01"),
      createdAt: new Date("2023-03-01"),
      updatedAt: new Date("2023-03-15")
    },
    {
      id: "3",
      name: "Task Management App",
      description: "Minimalist task management application with drag-and-drop interface and team collaboration features.",
      status: "planning",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
      tasks: [
        {
          id: "task7",
          title: "Define app requirements",
          status: "completed",
          createdAt: new Date("2023-04-01"),
          updatedAt: new Date("2023-04-05")
        },
        {
          id: "task8",
          title: "Create wireframes and mockups",
          status: "in-progress",
          createdAt: new Date("2023-04-06"),
          updatedAt: new Date("2023-04-06"),
          dueDate: new Date(new Date().setDate(new Date().getDate() - 2))
        },
        {
          id: "task9",
          title: "Set up project repository",
          status: "todo",
          createdAt: new Date("2023-04-10"),
          updatedAt: new Date("2023-04-10"),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        }
      ],
      startDate: new Date("2023-04-01"),
      createdAt: new Date("2023-04-01"),
      updatedAt: new Date("2023-04-10")
    },
    {
      id: "4",
      name: "Mobile Fitness App",
      description: "Cross-platform fitness application with workout tracking and nutrition planning features.",
      status: "on-hold",
      githubUrl: "https://github.com/username/fitness-app",
      techStack: ["React Native", "TypeScript", "Firebase"],
      tasks: [
        {
          id: "task10",
          title: "Research competitor apps",
          status: "completed",
          createdAt: new Date("2023-02-10"),
          updatedAt: new Date("2023-02-15")
        },
        {
          id: "task11",
          title: "Design app architecture",
          status: "completed",
          createdAt: new Date("2023-02-16"),
          updatedAt: new Date("2023-02-25")
        },
        {
          id: "task12",
          title: "Implement user authentication",
          status: "in-progress",
          createdAt: new Date("2023-02-26"),
          updatedAt: new Date("2023-03-01")
        }
      ],
      startDate: new Date("2023-02-10"),
      createdAt: new Date("2023-02-10"),
      updatedAt: new Date("2023-03-01")
    },
    {
      id: "5",
      name: "Blog Platform",
      description: "A modern, markdown-based blog platform with custom themes and analytics.",
      status: "active",
      githubUrl: "https://github.com/username/blog-platform",
      deploymentUrl: "https://blog-platform.dev",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
      tasks: [
        {
          id: "task13",
          title: "Implement markdown editor",
          status: "completed",
          createdAt: new Date("2023-03-20"),
          updatedAt: new Date("2023-03-25")
        },
        {
          id: "task14",
          title: "Build theme customization",
          status: "in-progress",
          createdAt: new Date("2023-03-26"),
          updatedAt: new Date("2023-03-26"),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 3))
        },
        {
          id: "task15",
          title: "Add analytics dashboard",
          status: "todo",
          createdAt: new Date("2023-03-30"),
          updatedAt: new Date("2023-03-30"),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 10))
        }
      ],
      startDate: new Date("2023-03-20"),
      createdAt: new Date("2023-03-20"),
      updatedAt: new Date("2023-03-30")
    }
  ];
};

export const mockProjects = generateMockProjects();

// Helper function to get projects by status
export const getProjectsByStatus = (status?: ProjectStatus) => {
  if (!status) return mockProjects;
  return mockProjects.filter(project => project.status === status);
};

// Helper function to get project by ID
export const getProjectById = (id: string) => {
  return mockProjects.find(project => project.id === id);
};
