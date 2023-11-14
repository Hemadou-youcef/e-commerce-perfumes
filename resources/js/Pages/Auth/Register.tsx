
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
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group"

import { AiOutlineArrowLeft } from "react-icons/ai"
import { Textarea } from "@/shadcn/ui/textarea"

interface formData {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    gender: "male" | "female";
    username: string;
    password: string;
}

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm<formData>({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        gender: 'male',
        username: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };


    return (
        <>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="grid md:grid-cols-2">
                <div className="hidden md:block w-full h-screen bg-second">

                </div>
                <div className="w-full h-screen overflow-y-auto">
                    <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                        <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " />
                        <p className="text-forth group-hover:text-second ">Accueil</p>
                    </Link>
                    <div className="py-0 mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] md:w-[400px] lg:w-[500px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                S'inscrire
                            </h1>

                        </div>
                        <form onSubmit={submit} className="w-full">
                            <div className="grid gap-4 p-5 pb-0">
                                <div className="grid gap-2 grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name">Prénom</Label>
                                        <Input id="first_name" type="first_name" placeholder="Prénom" className="w-full h-9 focus-visible:ring-transparent"
                                            onChange={(e) => setData('first_name', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name">Nom</Label>
                                        <Input id="last_name" type="last_name" placeholder="Nom" className="w-full h-9 focus-visible:ring-transparent"
                                            onChange={(e) => setData('last_name', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errors.first_name && <div>{errors.first_name}</div>}
                                {errors.last_name && <div>{errors.last_name}</div>}
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Numéro de téléphone</Label>
                                    <Input id="phone" type="phone" placeholder="Numéro de téléphone" className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>
                                {errors.phone && <div>{errors.phone}</div>}
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea id="address" placeholder="Address" className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                </div>
                                {errors.address && <div>{errors.address}</div>}
                                <RadioGroup defaultValue="male" className="flex gap-5" onValueChange={(v)=> setData('gender', v)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" />
                                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" />
                                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                                    </div>
                                </RadioGroup>
                                {errors.gender && <div>{errors.gender}</div>}
                                <div className="grid gap-2">
                                    <Label htmlFor="user_name">User name</Label>
                                    <Input id="user_name" placeholder="User name" className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                </div>
                                {errors.username && <div>{errors.username}</div>}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Password" className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && <div>{errors.password}</div>}

                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second" onClick={() => post('/register')}>
                                    Register
                                </Button>
                            </div>
                        </form>
                        <div className="relative -mt-5">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Vous avez déjà un compte ?
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/login" className="w-full px-10">
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second" onClick={() => get('/login')}>
                                    Se connecter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

// Register.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />
export default Register;
