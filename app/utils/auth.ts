// utils/auth.ts

// If you want to be strict, you can define allowed role types/names here
// export type RoleType = "superadmin" | "admin" | "user" | string;
export type RoleType = string;
export type RoleName = string;

const TOKEN_KEY = "token";
const ROLE_TYPE_KEY = "roleType";
const ROLE_NAME_KEY = "roleName";

/**
 * Save auth info to localStorage (client-side only).
 */
export const setAuth = (jwt: string, roleType: RoleType, roleName: RoleName): void => {
  if (typeof window === "undefined") return; // avoid SSR issues

  localStorage.setItem(TOKEN_KEY, jwt);
  localStorage.setItem(ROLE_TYPE_KEY, roleType);
  localStorage.setItem(ROLE_NAME_KEY, roleName);
};

/**
 * Get JWT token from localStorage.
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get role type from localStorage.
 */
export const getRoleType = (): RoleType | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_TYPE_KEY);
};

/**
 * Get role name from localStorage.
 */
export const getRoleName = (): RoleName | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_NAME_KEY);
};

/**
 * Clear all auth-related data.
 */
export const clearAuth = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_TYPE_KEY);
  localStorage.removeItem(ROLE_NAME_KEY);
};
