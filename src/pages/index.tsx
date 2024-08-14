import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        router.push('/home');
    }, [router]);

    return null; // Ou você pode retornar algum componente de loading, se desejar.
}
