export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'Web App & SaaS' | 'E-Commerce' | 'Mobile UI/UX' | 'AI & Automation';
  tags: string[];
  description: string;
  featured?: boolean;
  image: string;
  previewGradient?: string;
  metrics: { label: string; value: string }[];
  caseStudy: {
    client: string;
    timeline: string;
    role: string;
    problem: string;
    solution: string;
    technologies: string[];
    keyFeatures: string[];
    outcome: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

export interface Photo {
  id: string;
  title: string;
  location: string;
  category: 'Architecture' | 'Street & Urban' | 'Monochrome' | 'Minimalism' | 'Portraits';
  url: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  exif: {
    camera: string;
    lens: string;
    settings: string;
  };
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Design Process' | 'Software Engineering' | 'AI & Automation' | 'Performance';
  coverImage?: string;
  content: string[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  category?: string;
  timeline?: string;
  technologies?: string[];
  impactMetric?: { label: string; value: string };
  relatedProjectId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}
