
import { Head, Link, router, useForm } from "@inertiajs/react"
import { FormEventHandler, useState } from "react"

import { Button } from "@/shadcn/ui/button"
import { Toaster } from "@/shadcn/ui/toaster"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai"
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useToast } from "@/shadcn/ui/use-toast"

interface formData {
    email: string;
}

const ForgetPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm<formData>({
        email: '',
    });

    const { toast } = useToast()
    const { t, currentLocale,setLocale } = useLaravelReactI18n();;
    const languageDir = currentLocale() === "ar" ? "rtl" : "ltr";

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onSuccess: () => {
                toast({
                    title: t("custom.forgot_password_page.password_reset_link_sent"),
                    description: t("custom.forgot_password_page.password_reset_link_sent_description"),
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t("custom.global.error"),
                    description: t("custom.global.error_description"),
                    duration: 5000,
                })
            },
        })
    };

    const handleVisit = (url: string, method: string = "get") => {
        router[method](url)
    }

    const handleLanguageChange = (value) => {
        if (value) {
            handleVisit(window.location.pathname, "get");
            setLocale(value);
            localStorage?.setItem("language", value);
        }
    }

    return (
        <>
            <Head title={t('custom.forgot_password_page.title')} />
            <div className="grid md:grid-cols-2" dir={languageDir}>
                <div className="relative hidden md:flex w-full h-screen bg-forth text-third flex-col justify-center items-center gap-5 ltr:font-sans rtl:font-arabic">
                    <img src="/image/logo.jpg" className="rumah_icon_animation w-96" />
                </div>
                <div className="w-full  h-screen overflow-auto ltr:font-sans rtl:font-arabic">
                    <div className="flex justify-between items-center gap-2">
                        <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                            {currentLocale() === "fr" ? <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " /> : <AiOutlineArrowRight className="text-base text-gray-800 group-hover:text-second " />}
                            <p className="text-forth group-hover:text-second ">
                                {t('custom.layout.navbar.home')}
                            </p>
                        </Link>
                        {/* Change language without select*/}
                        <div className="flex justify-center gap-2 px-5">
                            {currentLocale() === "ar" ? (
                                <button onClick={() => handleLanguageChange("fr")} className="text-xs text-gray-600 font-bold hover:text-second">
                                    {t('custom.language.fr')}
                                </button>
                            ) : (
                                <button onClick={() => handleLanguageChange("ar")} className="text-xs text-gray-600 font-bold hover:text-second">
                                    {t('custom.language.ar')}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] md:w-[400px] relative">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('custom.login_page.account_recovery')}
                            </h1>

                        </div>
                        <form onSubmit={submit}>

                            <div className="grid gap-4 p-5 pb-0">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        {t('custom.login_page.email')}
                                    </Label>
                                    <Input id="email" type="email" placeholder={t('custom.login_page.email')} className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second">
                                    {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <p className="text-white">{t('custom.login_page.send_password_reset_link')}</p>}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

// Login.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />
export default ForgetPassword;
