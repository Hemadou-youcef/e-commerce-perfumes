
import { Head, Link, useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"

import { Button } from "@/shadcn/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"

import LandingMainLayout from "@/Layouts/landing/mainLayout"
import { Checkbox } from "@/shadcn/ui/checkbox"
import { AiOutlineArrowLeft } from "react-icons/ai"

interface formData {
    username: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm<formData>({
        username: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (
        <>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="grid md:grid-cols-2">
                <div className="hidden md:block w-full h-screen bg-second">

                </div>
                <div className="w-full  h-screen overflow-auto">
                    <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                        <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " />
                        <p className="text-forth group-hover:text-second ">Accueil</p>
                    </Link>
                    <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] md:w-[400px] relative">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Se connecter
                            </h1>

                        </div>
                        <form onSubmit={submit}>

                            <div className="grid gap-4 p-5 pb-0">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">User name</Label>
                                    <Input id="username" type="username" placeholder="User name" className="w-full h-9 focus-visible:ring-transparent"
                                    onChange={(e ) => setData('username', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Password" className="w-full h-9 focus-visible:ring-transparent"
                                    onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                <div className="block mt-2">
                                    <label className="flex items-center gap-2">
                                        <Checkbox
                                            name="remember"
                                            id="remember"
                                            className="w-4"
                                            checked={data.remember}
                                            onCheckedChange={(value: boolean) => setData('remember', value)}
                                        />
                                        <Label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer select-none">Remember me</Label>
                                    </label>
                                </div>
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second" onClick={() => post('/login')}>
                                    Se connecter
                                </Button>
                            </div>

                        </form>
                        <div className="relative -mt-5">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                {/* IF HE WANT TO REGISTER */}
                                <span className="bg-background px-2 text-muted-foreground">
                                    Ou s'inscrire avec
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/register" className="w-full px-10">
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second" onClick={() => post('/login')}>
                                    S'inscrire
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Login.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />
export default Login;
