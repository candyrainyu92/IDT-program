export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  deliverables: string[];
  impact: string;
  tags: string[];
}

export interface Competency {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}
