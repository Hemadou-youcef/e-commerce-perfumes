
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

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai"
import { Textarea } from "@/shadcn/ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useTranslation } from "react-i18next"

interface formData {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    gender: "male" | "female";
    username: string;
    password: string;
    confirm_password: string;
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
        confirm_password: '',
    });

    const { t, i18n } = useTranslation();

    const isAllRulesVerified = () => {
        const rules = [
            data.first_name.length > 2,
            data.last_name.length > 2,
            data.phone.length == 10,
            data.address.length > 3,
            data.gender == "male" || data.gender == "female",
            data.username.length > 5,
            data.password.length > 5,
            data.confirm_password?.length > 5,
            data.password == data.confirm_password,
        ];
        return rules.every((rule) => rule);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };


    return (
        <>
            <Head title={t('register_page.title')} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="grid md:grid-cols-2" dir={i18n.dir()}>
                <div className="hidden md:block w-full h-screen bg-second">

                </div>
                <div className="w-full h-screen overflow-y-auto ltr:font-sans rtl:font-arabic">
                    <Link href="/" className="flex flex-row items-center gap-2 p-5 group">
                        {i18n.language === "fr" ? <AiOutlineArrowLeft className="text-base text-gray-800 group-hover:text-second " /> : <AiOutlineArrowRight className="text-base text-gray-800 group-hover:text-second " />}

                        <p className="text-forth group-hover:text-second ">
                            {t('layout.navbar.home')}
                        </p>
                    </Link>
                    <div className="py-0 my-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] md:w-[400px] lg:w-[500px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('register_page.title')}
                            </h1>

                        </div>
                        <form onSubmit={submit} className="w-full">
                            <div className="grid gap-4 p-5 pb-0 text-xs">
                                <div className="grid gap-2 grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name" className="text-xs md:text-sm">
                                            {t('register_page.first_name')}
                                        </Label>
                                        <Input id="first_name"  type="first_name" placeholder={t('register_page.first_name')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                            onChange={(e) => setData('first_name', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name" className="text-xs md:text-sm">
                                            {t('register_page.last_name')}
                                        </Label>
                                        <Input id="last_name"  type="last_name" placeholder={t('register_page.last_name')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                            onChange={(e) => setData('last_name', e.target.value)}
                                        />
                                    </div>
                                    {errors.first_name && <p className="text-xs text-red-500">{errors.first_name}</p>}
                                    {errors.last_name && <p className="text-xs text-red-500">{errors.last_name}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className="text-xs md:text-sm">
                                        {t('register_page.phone')}
                                    </Label>
                                    <Input id="phone" type="phone" placeholder={t('register_page.phone')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-xs md:text-sm">
                                        {t('register_page.address')}
                                    </Label>
                                    <Textarea id="address" placeholder={t('register_page.address')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                </div>
                                <RadioGroup dir={i18n.dir()} defaultValue={t('register_page.male')} className="flex gap-5" onValueChange={(v: 'male' | 'female') => setData('gender', v)}>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="male" id="male" />
                                        <Label htmlFor="male" className="cursor-pointer text-xs md:text-sm">
                                            {t('register_page.male')}
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="female" id="female" />
                                        <Label htmlFor="female" className="cursor-pointer text-xs md:text-sm">
                                            {t('register_page.female')}
                                        </Label>
                                    </div>
                                </RadioGroup>
                                {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                                <div className="grid gap-2">
                                    <Label htmlFor="user_name" className="text-xs md:text-sm">
                                        {t('register_page.user_name')}
                                    </Label>
                                    <Input id="user_name" placeholder={t('register_page.user_name')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                    {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-xs md:text-sm">
                                        {t('register_page.password')}
                                    </Label>
                                    <Input id="password" type="password" placeholder={t('register_page.password')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                    {data.password.length != 0 && (data.password.length > 7 ? <p className="text-xs text-green-500">Mot de passe valide</p> : <p className="text-xs text-red-500">Mot de passe il faudrait supérieur à 7 caractères</p>)}
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="confirm_password" className="text-xs md:text-sm">
                                        {t('register_page.confirm_password')}
                                    </Label>
                                    <Input id="confirm_password" type="password" placeholder={t('register_page.confirm_password')} className="text-xs md:text-sm w-full h-9 focus-visible:ring-transparent"
                                        onChange={(e) => setData('confirm_password', e.target.value)}
                                    />
                                    {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password}</p>}
                                    {(data.password.length > 7 && data.confirm_password?.length > 0 && data.confirm_password != data.password) && <p className="text-xs text-red-500">Mot de passe non identique</p>}
                                </div>


                                <Button className="w-full bg-forth er:bg-prime-dark active:bg-second" onClick={() => post('/register')} disabled={!isAllRulesVerified() || processing}>
                                    {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <p className="text-white">{t('register_page.register')}</p>}
                                </Button>
                            </div>
                        </form>
                        <div className="relative -mt-5">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    {t('register_page.already_account')}
                                    {/* Vous avez déjà un compte ? */}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/login" className="w-full px-10">
                                <Button className="w-full bg-forth hover:bg-prime-dark active:bg-second">
                                    {t('register_page.login')}
                                    {/* Se connecter */}
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
