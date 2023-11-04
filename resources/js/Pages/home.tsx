import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button'
import LandingMainLayout from '@/Layouts/landing/mainLayout';
import { Search } from '@/components/dashboard/search';

export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    console.log(Props)
    const handleTest = () => {
        router.post('/test', {
            name: 'test'
        }, {
            onSuccess: () => {
                console.log('success');
            }
        })
    }
    return (
        <>
            <Head title="Perfurms Online" />
            <LandingMainLayout>
                
            </LandingMainLayout>
        </>
    );
}
