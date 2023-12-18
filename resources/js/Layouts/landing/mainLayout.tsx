

// Components
import LandingNav from "@/Layouts/landing/nav/landingNav";
import LandingFooter from "./footer/footer";
import { Link, usePage } from "@inertiajs/react";
import { Toaster } from "@/shadcn/ui/toaster"
import { useState } from "react";

import { useTranslation } from "react-i18next";

const LandingMainLayout = ({ children, ...props }) => {
    const pageProps = usePage().props
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { t, i18n } = useTranslation()
    // console.log(pageProps)
    return (
        <>
            <div dir={i18n.dir()} className="flex flex-col min-h-[calc(100dvh)] font-sans rtl:font-arabic">
                {/* NAVBAR */}
                <div className="navElements bg-forth sticky top-0 border-b-2 border-gray-900 z-10 shadow-md">
                    <LandingNav props={pageProps} showNavbar={navbarOpen} setNavbarOpen={setNavbarOpen} />
                </div>
                {/* SECTIONS */}
                <div className="w-full border-b border-b-gray-500 bg-third font-sans rtl:font-arabic">
                    <div className="container hidden md:flex items-center justify-start gap-8 h-10">
                        <Link
                            href="/"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.home')}
                        </Link>
                        <Link
                            href="/products"
                            className="text-base font-medium transition-colors hover:text-gray-400 rtl:font-arabic"
                        >
                            {t('layout.navbar.products')}
                        </Link>
                        <Link
                            href="/products/perfumes"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.perfumes')}
                        </Link>
                        <Link
                            href="/products/aromatic_oils"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.aromatic_oils')}
                        </Link>
                        <Link
                            href="/products/accessories"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.accessories')}
                        </Link>

                        {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="rounded-none bg-transparent ">
                                Catégorie
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="rounded-none bg-gray-50">
                                    <div className="flex flex-co w-96 ">
                                        <Link href="/products" className="text-xs font-medium transition-colors hover:text-gray-400">
                                            All
                                        </Link>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> */}
                        <Link
                            href="/contact"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.contact')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-base font-medium transition-colors hover:text-gray-400"
                        >
                            {t('layout.navbar.about')}
                        </Link>
                    </div>
                </div>
                {/* <div className="h-auto"></div> */}
                <div className="flex-grow">
                    {children}
                </div>
                <LandingFooter />
            </div>
            <Toaster />
        </>
    );
}

export default LandingMainLayout;