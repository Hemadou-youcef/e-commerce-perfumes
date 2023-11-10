

// Components
import LandingNav from "@/components/landing/landingNav";
import LandingFooter from "./footer/footer";
import { Link } from "@inertiajs/react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/shadcn/ui/navigation-menu"

const LandingMainLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="navElements bg-gray-50 sticky top-0 border-b-2 border-b-gray-500 z-10 shadow-md">
                    <LandingNav />
                </div>
                {/* SECTIONS */}
                <div className="w-full  border-b border-b-gray-500">
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
        </>
    );
}

export default LandingMainLayout;