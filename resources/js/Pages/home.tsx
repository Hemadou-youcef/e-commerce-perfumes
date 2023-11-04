import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button'

export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    
    console.log(Props)
    const handleClick = () => {
        // SEND POST REQUEST TO LARAVEL
        
    }
    return (
        <>
            <Head title="Perfurms" />
            <Button onClick={handleClick}>Button</Button>
        </>
    );
}
