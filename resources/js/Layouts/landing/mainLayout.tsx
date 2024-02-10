

// Components
import LandingNav from "@/Layouts/landing/nav/landingNav";
import LandingFooter from "./footer/footer";
import { Link, router, usePage } from "@inertiajs/react";
import { Toaster } from "@/shadcn/ui/toaster"
import { useState } from "react";
import { createContext } from "react";

import { useLaravelReactI18n } from 'laravel-react-i18n';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingContext = createContext({ handleVisit: (url: string, method?: string) => { } });

const LandingMainLayout = ({ children, ...props }) => {
    const pageProps = usePage().props
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    

    // const { t, currentLocale } = useLaravelReactI18n();
    const { t, currentLocale,isLocale } = useLaravelReactI18n();
    const languageDir = currentLocale() === "ar" ? "rtl" : "ltr";
    // console.log(pageProps)

    const handleVisit = (url: string, method: string = "get") => {
        setLoadingState(true);
        router[method](url, {}, {
            onFinish: () => {
                setLoadingState(false)
                setNavbarOpen(false);
            }
        })
    }

    return (
        <>
            {loadingState && (
                <div className="fixed top-0 left-0 w-full h-[calc(100dvh)] bg-third flex items-center justify-center z-10">
                    <AiOutlineLoading3Quarters className="w-10 h-10 text-second animate-spin" />
                </div>
            )}
            <div dir={languageDir} className="flex flex-col min-h-[calc(100dvh)] font-sans rtl:font-arabic">
                {/* NAVBAR */}
                <div className="navElements bg-forth sticky top-0 border-b-2 border-gray-900 z-10 shadow-md">
                    <LandingNav
                        props={pageProps}
                        showNavbar={navbarOpen}
                        setNavbarOpen={setNavbarOpen}
                        handleVisit={handleVisit}
                    />
                </div>
                {/* SECTIONS */}
                <div className="w-full border-b border-b-gray-500 bg-third font-sans rtl:font-arabic">
                    <div className="container hidden md:flex items-center justify-start gap-8 h-10">
                        <div
                            onClick={() => handleVisit("/")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.home')}
                        </div>
                        <div
                            onClick={() => handleVisit("/products")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.products')}
                        </div>
                        <div
                            onClick={() => handleVisit("/products/perfumes")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.perfumes')}
                        </div>
                        <div
                            onClick={() => handleVisit("/products/aromatic_oils")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.aromatic_oils')}
                        </div>
                        <div
                            onClick={() => handleVisit("/products/accessories")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.accessories')}
                        </div>
                        <div
                            onClick={() => handleVisit("/contact")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.contact')}
                        </div>
                        <div
                            onClick={() => handleVisit("/about")}
                            className="text-base font-medium transition-colors hover:text-gray-400 cursor-pointer"
                        >
                            {t('custom.layout.navbar.about')}
                        </div>
                    </div>
                </div>
                {/* <div className="h-auto"></div> */}
                <LoadingContext.Provider value={{ handleVisit }}>
                    <div className="flex-grow">
                        {/* CHILDREN WITH PROPS */}
                        {children}
                    </div>
                </LoadingContext.Provider>
                {/* FOOTER */}
                <LandingFooter handleVisit={handleVisit} />
            </div>
            <Toaster />
        </>
    );
}

export default LandingMainLayout;