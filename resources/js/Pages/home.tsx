import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button'
import LandingMainLayout from '@/Layouts/landing/mainLayout';

export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    
    return (
        <>
            <Head title="Perfurms Online" />
            <LandingMainLayout>
                <p>Hello</p>
            </LandingMainLayout>
        </>
    );
}
