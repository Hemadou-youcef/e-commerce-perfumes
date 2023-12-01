

// Components
import LandingNav from "@/Layouts/landing/nav/landingNav";
import LandingFooter from "./footer/footer";
import { Link, usePage } from "@inertiajs/react";
import { Toaster } from "@/shadcn/ui/toaster"
import { useState } from "react";

const LandingMainLayout = ({ children, ...props }) => {
    const pageProps = usePage().props
    const [navbarOpen, setNavbarOpen] = useState(false);
    // console.log(pageProps)
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="navElements bg-forth sticky top-0 border-b-2 border-gray-900 z-10 shadow-md">
                    <LandingNav props={pageProps} showNavbar={navbarOpen} setNavbarOpen={setNavbarOpen} />
                </div>
                {/* SECTIONS */}
                <div className="w-full  border-b border-b-gray-500 bg-third">
                    <div className="container hidden md:flex items-center justify-start gap-8 h-10">
                        <Link
                            href="/products"
                            className="text-sm font-medium transition-colors hover:text-gray-400"
                        >
                            PRODUITS
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
                            className="text-sm font-medium transition-colors hover:text-gray-400"
                        >
                            CONTACT
                        </Link>
                        <Link
                            href="/about-us"
                            className="text-sm font-medium transition-colors hover:text-gray-400"
                        >
                            À PROPOS
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