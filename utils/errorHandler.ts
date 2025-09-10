
export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const handleApiError = (error: any) => {

  if (error instanceof AuthError) {
    if (error.code === 'ATH_0001' && typeof window !== 'undefined') {

      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return; 
    }
  }

  if (error instanceof Error) {
    console.error('API Error:', error.message);
  } else {
    console.error('Unknown API Error:', error);
  }

  throw error;
};

export const throwApiError = async (response: Response) => {
  let errorData: any = {};

  try {
    errorData = await response.json();
  } catch {
    errorData = {};
  }

  const message = errorData.message || 'Erro na requisição';
  const code = errorData.code;

  if (code === 'ATH_0001') {
    throw new AuthError(message, code);
  }

  throw new Error(message);
};
