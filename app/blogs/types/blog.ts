// types/blog.ts

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RichTextNode {
  type: string;
  children: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  [key: string]: any;
}

export interface TableSection {
  __component: "sections.table-section";
  id: number;
  title: string;
  header: { id: number; text: string }[];
  table_row: { id: number; cells: string[] }[];
}

export interface TextSection {
  __component: "sections.text-section";
  id: number;
  heading: string;
  content: RichTextNode[];
  image?: Image[];
}

export interface Step {
  id: number;
  step_title: string;
  description: string;
}

export interface StepSection {
  __component: "sections.steps-section";
  id: number;
  title: string;
  steps: Step[];
}

export interface ListItem {
  id: number;
  items: string;
}

export interface ListSection {
  __component: "sections.list-section";
  id: number;
  title: string;
  items: ListItem[];
  image?: Image | null;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQSection {
  __component: "sections.faq-section";
  id: number;
  title: string;
  items: FAQItem[];
}

export type BlogZone = TableSection | TextSection | StepSection | ListSection | FAQSection;
export type Section = BlogZone;

export interface Author {
  id: number;
  name: string;
  email?: string;
  avatar?: Image;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  expert: string | null;
  content: RichTextNode[] | null;
  Published: string | null;  // Date string (YYYY-MM-DD)
  Enumeration: "draft" | "published" | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: number;
  likesCount?: number;
  time: string | null;
  Category: string | null;
  featured_images: Image[] | null;
  featured_image: Image | null;
  content_images: Image[] | null;
  zone: BlogZone[];
  author?: Author | null;
  views?: number;
  tags?: Tag[];
  related?: Blog[];
}

export interface BlogsResponse {
  data: Blog[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}