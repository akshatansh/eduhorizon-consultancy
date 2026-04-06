export interface SuccessStory {
  name: string;
  batch: string;
  college: string;
  placed: string;
  package: string;
  image: string;
  quote: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  image: string;
}

export interface BlogPostAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  author: BlogPostAuthor;
  date: string;
  readTime: string;
  /**
   * Legacy markdown content (seed data).
   */
  content?: string;
  /**
   * CMS HTML content (from admin editor).
   */
  contentHtml?: string;
  published?: boolean;
}