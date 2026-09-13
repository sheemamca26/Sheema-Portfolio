export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  tag: string;
  status?: string;
  purpose: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  learningFocus: string[];
  plannedTechStack?: string[];
  features: string[];
  skillsDemonstrated: string;
  githubUrl?: string;
  liveUrl?: string;
  datasetInfo?: {
    dataset: string;
    target: string;
    inputFeatures: string[];
    model: string;
    config: string;
    dataSplit: string;
  };
}

export interface SkillProgress {
  name: string;
  percentage: number;
  category: string;
  color?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface BeyondWorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  impact: string;
  iconName: string;
  certificateDetails?: {
    courseName: string;
    institute: string;
    certificationType: string;
    period: string;
    studentName: string;
    address: string;
    isoCertification: string;
  };
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}
