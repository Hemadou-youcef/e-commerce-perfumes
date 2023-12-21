
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
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useTranslation } from "react-i18next"

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

    const { t, i18n } = useTranslation();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (
        <>
            <Head title={t('login_page.title')} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="grid md:grid-cols-2" dir={i18n.dir()}>
                <div className="relative hidden md:flex w-full h-screen bg-forth text-third flex-col justify-center items-center gap-5 ltr:font-sans rtl:font-arabic">
                    <img src="/image/logo.jpg" className="rumah_icon_animation w-96" />
                </div>
                <div className="w-full  h-screen overflow-auto ltr:font-sans rtl:font-arabic">
                    <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                        {i18n.language === "fr" ? <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " /> : <AiOutlineArrowRight className="text-base text-gray-800 group-hover:text-second " />}
                        <p className="text-forth group-hover:text-second ">
                            {t('layout.navbar.home')}
                        </p>
                    </Link>
                    <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] md:w-[400px] relative">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('login_page.title')}
                            </h1>

                        </div>
                        <form onSubmit={submit}>

                            <div className="grid gap-4 p-5 pb-0">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">
                                        {t('login_page.username')}
                                    </Label>
                                    <Input id="username" type="username" placeholder={t('login_page.username')} className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                    {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        {t('login_page.password')}
                                    </Label>
                                    <Input id="password" type="password" placeholder={t('login_page.password')} className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
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
                                        <Label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer select-none">
                                            {t('login_page.remember_me')}
                                        </Label>
                                    </label>
                                </div>
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second" onClick={() => post('/login')}>
                                    {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <p className="text-white">{t('login_page.login')}</p>}
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
                                    {t('login_page.or_register_with')}
                                    {/* Ou s'inscrire avec */}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/register" className="w-full px-10">
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second">
                                    {t('login_page.register')}
                                    {/* S'inscrire */}
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
