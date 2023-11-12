
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

interface formData {
    user_name: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm<formData>({
        user_name: '',
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

            <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Se connecter
                    </h1>

                </div>
                <form onSubmit={submit}>
                    <Card className="shadow-md">
                        <CardContent className="grid gap-4 p-5 ">

                            <div className="grid gap-2">
                                <Label htmlFor="user_name">User name</Label>
                                <Input id="user_name" type="user_name" placeholder="User name" className="w-full h-9 focus-visible:ring-transparent" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" className="w-full h-9 focus-visible:ring-transparent" />
                            </div>
                            <div className="block mt-2">
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        name="remember"
                                        id="remember"
                                        className="w-4"
                                        checked={data.remember}
                                        onCheckedChange={(value : boolean) => setData('remember', value)}
                                    />
                                    <Label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer select-none">Remember me</Label>
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-yellow-500 hover:bg-prime-dark active:bg-prime" onClick={() => post('/login')}>
                                Login
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    )
}

Login.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />
export default Login;