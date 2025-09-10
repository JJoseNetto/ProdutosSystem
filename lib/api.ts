import { useAuthStore } from "@/store/authStore";
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
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const authState = JSON.parse(stored);
        token = authState?.state?.token || null;
      }
    } catch {
      token = null;
    }
  }

  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.dispatchEvent(new Event('unauthorized'));
      }
      const error = new Error("Token de autenticação inválido ou expirado. Faça login novamente.");
      (error as any).code = "ATH_0001";
      throw error;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }

    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}