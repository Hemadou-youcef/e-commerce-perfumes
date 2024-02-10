
import { Head, Link, router, useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"

import { Button } from "@/shadcn/ui/button"
import { Toaster } from "@/shadcn/ui/toaster"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai"

import { useTranslation } from "react-i18next"
import { useToast } from "@/shadcn/ui/use-toast";

interface formData {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

const ResetPassword = ({ token, email }) => {
    const { data, setData, post, processing, errors, reset } = useForm<formData>({
        email: email,
        token: token,
        password: '',
        password_confirmation: '',
    });

    const { toast } = useToast()
    const { t, i18n } = useTranslation();
    const languageDir = i18n.language === "ar" ? "rtl" : "ltr";

    const isAllRulesVerified = () => {
        const rules = [
            data.password.length > 5,
            data.password_confirmation?.length > 5,
            data.password == data.password_confirmation,
        ];
        return rules.every((rule) => rule);
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onSuccess: () => {
                toast({
                    title: t("forgot_password_page.password_reset_success"),
                    description: t("forgot_password_page.password_reset_success_description"),
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t("global.error"),
                    description: t("global.error_description"),
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
            i18n.changeLanguage(value);
            localStorage?.setItem("language", value);
        }
    }

    return (
        <>
            <Head title={t('forgot_password_page.title')} />
            <div className="grid md:grid-cols-2" dir={languageDir}>
                <div className="relative hidden md:flex w-full h-screen bg-forth text-third flex-col justify-center items-center gap-5 ltr:font-sans rtl:font-arabic">
                    <img src="/image/logo.jpg" className="rumah_icon_animation w-96" />
                </div>
                <div className="w-full  h-screen overflow-auto ltr:font-sans rtl:font-arabic">
                    <div className="flex justify-between items-center gap-2">
                        <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                            {i18n.language === "fr" ? <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " /> : <AiOutlineArrowRight className="text-base text-gray-800 group-hover:text-second " />}
                            <p className="text-forth group-hover:text-second ">
                                {t('layout.navbar.home')}
                            </p>
                        </Link>
                        {/* Change language without select*/}
                        <div className="flex justify-center gap-2 px-5">
                            {i18n.language === "ar" ? (
                                <button onClick={() => handleLanguageChange("fr")} className="text-xs text-gray-600 font-bold hover:text-second">
                                    {t('language.fr')}
                                </button>
                            ) : (
                                <button onClick={() => handleLanguageChange("ar")} className="text-xs text-gray-600 font-bold hover:text-second">
                                    {t('language.ar')}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] md:w-[400px] relative">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('forgot_password_page.title')}
                            </h1>

                        </div>
                        <form onSubmit={submit}>
                            {errors.email && <div className="border-2 border-red-500 rounded-md bg-red-600 p-2 text-center ">
                                <p className="text-xs text-gray-50">{errors.email}</p>
                            </div>
                            }

                            <div className="grid gap-4 p-5 pb-0">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        {t('forgot_password_page.password')}
                                    </Label>
                                    <Input id="password" type="password" placeholder={t('login_page.password')} className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {data.password.length != 0 && (data.password.length > 7 ? <p className="text-xs text-green-500">Mot de passe valide</p> : <p className="text-xs text-red-500">Mot de passe il faudrait supérieur à 7 caractères</p>)}
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        {t('forgot_password_page.confirm_password')}
                                    </Label>
                                    <Input id="password_confirmation" type="password" placeholder={t('forgot_password_page.confirm_password')} className="w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {(data.password.length > 7 && data.password_confirmation?.length > 0 && data.password_confirmation != data.password) && <p className="text-xs text-red-500">Mot de passe non identique</p>}
                                    {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
                                </div>

                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second">
                                    {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <p className="text-white">{t('forgot_password_page.reset_password')}</p>}
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
export default ResetPassword;
