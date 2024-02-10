
import { Head, Link, router } from "@inertiajs/react"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useLaravelReactI18n } from 'laravel-react-i18n';


const InvalidToken = () => {
    const { t, currentLocale,setLocale } = useLaravelReactI18n();;
    const languageDir = currentLocale() === "ar" ? "rtl" : "ltr";


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
            <div className="grid md:grid-cols-1" dir={languageDir}>
                
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
                    <div className="mt-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] md:w-[400px] relative text-center">
                        <img src="/image/alert.png" className="w-40 h-40 mx-auto" />
                        <span className="text-4xl font-bold">{t('custom.forgot_password_page.invalid_token')}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

// Login.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />
export default InvalidToken;
