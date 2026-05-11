import { User } from '@/types';

export const ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  MEMBER_READ: 'member:read',
  MEMBER_CREATE: 'member:create',
  MEMBER_UPDATE: 'member:update',
  MEMBER_DELETE: 'member:delete',
  MEMBER_REORDER: 'member:reorder',
} as const;

const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.HR]: [
    PERMISSIONS.MEMBER_READ,
    PERMISSIONS.MEMBER_CREATE,
    PERMISSIONS.MEMBER_UPDATE,
    PERMISSIONS.MEMBER_REORDER,
  ],
  [ROLES.VIEWER]: [PERMISSIONS.MEMBER_READ],
};

export const decodeToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub || payload.id || 'unknown',
      email: payload.email || '',
      role: payload.role || 'viewer',
      permissions: payload.permissions || [],
    };
  } catch {
    return null;
  }
};

export const hasPermission = (permission: string, user: User | null): boolean => {
  if (!user) return false;
  if (user.role === ROLES.ADMIN) return true;
  return user.permissions.includes(permission) || 
         ROLE_PERMISSIONS[user.role]?.includes(permission) || 
         false;
};
