export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  technologies: string[];
  features: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  clientIndustry: string;
  summary: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  imageUrl?: string;
  category?: string;
}

export interface ContactLead {
  id?: number;
  fullName: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
  serviceRequired: string;
  budgetRange?: string;
  projectDetails: string;
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED';
  createdAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DbStatus {
  connected: boolean;
  database: string;
  host: string;
  error?: string;
}
