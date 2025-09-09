import { RegisterFormData } from "./validation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(userData: RegisterFormData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

export async function authFetch(url: string, options: RequestInit = {}) {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken');
  }

  const headers = new Headers(options.headers);
  
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
}