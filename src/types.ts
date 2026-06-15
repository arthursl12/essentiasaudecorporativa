export enum ServiceFormat {
  AVULSO = 'avulso',
  PERIODICO = 'periodico',
}

export interface ServiceDetails {
  title: string;
  pilar: string;
  description: string;
  idealFor: string[];
  duration: string;
  pilarNum: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorLocation: string;
}

export interface LeadFormInput {
  name: string;
  company: string;
  role: string;
  numCollaborators: string;
  whatsapp: string;
  email: string;
}

export interface LeadSubmission extends LeadFormInput {
  id: string;
  timestamp: string;
}
