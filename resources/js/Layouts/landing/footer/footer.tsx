import { Separator } from "@/shadcn/ui/separator";
import { Link } from "@inertiajs/react";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

const LandingFooter = () => {
    return (
        <>
            {/* FOOTER FOR PERFUME LANDING PAGE */}
            <footer className="bg-gray-900 text-white mb-14 md:mb-0">
                <div className="container mx-auto flex flex-wrap justify-between my-5">
                    <Link href="/">
                        <div className="flex items-center justify-between">
                            <img className="invert h-7 w-auto" src="/image/logo.png" alt="Workflow" />

                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <FiFacebook className="w-5 h-5" />
                        <BsInstagram className="w-5 h-5" />
                    </div>
                    <Separator className="w-full my-2" />
                    <div className="flex items-center gap-6 text-gray-100">
                        <Link
                            href="/products"
                            className="text-xs font-bold transition-colors hover:text-gray-400"
                        >
                            PRODUITS
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xs font-bold transition-colors hover:text-gray-400"
                        >
                            CONTACT
                        </Link>
                        <Link
                            href="/about-us"
                            className="text-xs font-bold transition-colors hover:text-gray-400"
                        >
                            À PROPOS
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 p-2 text-center">
                    &copy; {new Date().getFullYear()} Perfume Store. All rights reserved.
                </div>
            </footer>
        </>
    );
}

export default LandingFooter;