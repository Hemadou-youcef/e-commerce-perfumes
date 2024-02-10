import { Separator } from "@/shadcn/ui/separator";
import { Link, router } from "@inertiajs/react";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { useTranslation } from "react-i18next";

const LandingFooter = ({ handleVisit }) => {
    const { t, i18n } = useTranslation()
    const languageDir = i18n.language === "ar" ? "rtl" : "ltr";
    

    const handleLanguageChange = (value) => {
        if (value) {
            handleVisit(window.location.pathname, "get");
            i18n.changeLanguage(value);
            localStorage?.setItem("language", value);
        }
    }
    return (
        <>
            {/* FOOTER FOR PERFUME LANDING PAGE */}
            <footer className="bg-forth text-white mb-14 md:mb-0">
                <div className="container mx-auto flex flex-wrap items-end justify-between my-5">
                    <Link href="/">
                        <div className="flex items-center justify-between">
                            <img className="h-10 md:h-20 w-auto" src="/image/logo.jpg" alt="Workflow" />

                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <a
                            href="https://www.facebook.com/PariS.VIP20/"
                            target="_blank"
                        >
                            <FiFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/rumahparfum65"
                            target="_blank"
                        >
                            <BsInstagram className="w-5 h-5" />
                        </a>
                    </div>
                    <Separator className="w-full my-2" />
                    <div className="flex flex-col md:flex-row items-center md:justify-between w-full font-bold mb-2 gap-5">

                        <div className="flex flex-col md:flex-row items-center gap-6 text-gray-100 font-sans rtl:font-arabic">
                            <Link
                                href="/products"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.products')}
                            </Link>
                            <Link
                                href="/products/perfumes"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.perfumes')}
                            </Link>
                            <Link
                                href="/products/aromatic_oils"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.aromatic_oils')}
                            </Link>
                            <Link
                                href="/products/accessories"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.accessories')}
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.contact')}
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-bold transition-colors hover:text-gray-400"
                            >
                                {t('layout.navbar.about')}
                            </Link>
                        </div>
                        <Select dir={languageDir} onValueChange={handleLanguageChange} value={i18n.language}>
                            <SelectTrigger className="w-32 h-7 text-forth font-sans rtl:font-arabic">
                                <SelectValue placeholder={t('language.' + i18n.language)} />
                            </SelectTrigger>
                            <SelectContent className="font-sans rtl:font-arabic">
                                <SelectItem value="ar">
                                    {t('language.ar')}
                                </SelectItem>
                                <SelectItem value="fr">
                                    {t('language.fr')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {i18n.language === "fr" ? (
                    <div className="text-xs md:text-base border-t border-gray-700 mt-8 p-2 text-center">
                        &copy; {new Date().getFullYear()} RUMAH PARFUM. All rights reserved.
                    </div>
                ) : (
                    <div className="text-xs md:text-base border-t border-gray-700 mt-8 p-2 text-center font-arabic">
                        &copy; {new Date().getFullYear()} RUMAH PARFUM. جميع الحقوق محفوظة.
                    </div>
                )}
            </footer>
        </>
    );
}

export default LandingFooter;