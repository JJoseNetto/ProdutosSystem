"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export const useRequireAuth = (redirectUrl = '/') => {
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsLoading(false);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsLoading(false);
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isLoading && !token) {
      router.push(redirectUrl);
    }
  }, [token, isLoading, router, redirectUrl]);

  return { token: !!token, isLoading };
};