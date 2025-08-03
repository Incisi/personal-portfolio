export interface Course {
  id: string;
  title: string;
  institution: string;
  completionDate: string;
  certificateUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  summary: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}