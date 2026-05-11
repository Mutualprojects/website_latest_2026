export interface Member {
  id: string;
  name: string;
  designation: string;
  bio: string;
  linkedin: string;
  photo: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'hr' | 'viewer';
  permissions: string[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export type SyncEvent = 
  | { type: 'member.created'; data: Member }
  | { type: 'member.updated'; data: Partial<Member> & { id: string } }
  | { type: 'member.deleted'; data: { id: string } }
  | { type: 'member.reordered'; data: { id: string; order: number }[] };
