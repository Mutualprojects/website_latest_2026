import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://172.30.0.200:1334/api";

export const loginUser = async (identifier: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    });
    return res.data; // { jwt, user }
  } catch (error: any) {
    console.error("Login error:", error);
    throw error.response?.data?.error?.message || "Login failed";
  }
};

export const getUserInfo = async (jwt: string) => {
  try {
    const res = await axios.get(`${API_URL}/users/me?populate=role`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Fetch user info error:", error);
    throw error.response?.data?.error?.message || "Failed to fetch user info";
  }
};
