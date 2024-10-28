export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id: number;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}