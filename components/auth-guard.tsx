'use client'

import { useIsAuthenticated } from '@/store/authStore'
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react'

type Props = {
    mustRedirect?: boolean;
}

function AuthGuard({ children, mustRedirect = false }: PropsWithChildren & Props) {
    const isAuthed = useIsAuthenticated();
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated && mustRedirect && !isAuthed) {
            router.push('/');
        }
    }, [hydrated, isAuthed, mustRedirect, router]);

    if (!hydrated) {
        return null;
    }

    if (!isAuthed) {
        return null;
    }

    return <>{children}</>;
}

export default AuthGuard;
