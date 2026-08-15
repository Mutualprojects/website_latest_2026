// lib/members.ts

import axios from "axios";

// Base URL for Strapi API (adjust if proxy changes)
const BASE_URL = typeof window !== "undefined" ? "/strapi/api/members" : "http://183.82.117.36:2334/api/members";

/**
 * Create a new team member.
 *
 * @param payload The member data following Strapi schema.
 * @param token Optional auth token; if omitted, no Authorization header is sent.
 */
export async function createMember(
  payload: Record<string, any>,
  token?: string
): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.post(BASE_URL, { data: payload }, { headers });
  if (res.status >= 400) {
    throw new Error("Failed to create member");
  }
  return res.data;
}
