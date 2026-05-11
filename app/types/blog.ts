// types/blog.ts
export interface ContentBlock {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  expert: string | null;
  content: ContentBlock[] | null;
  Published: string | null;
  Enumeration: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  likes: number;
  time: string | null;
  Category: string | null;
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