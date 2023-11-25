import { Separator } from "@/shadcn/ui/separator";
import { Link } from "@inertiajs/react";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"

const LandingFooter = () => {
    return (
        <>
            {/* FOOTER FOR PERFUME LANDING PAGE */}
            <footer className="bg-forth text-white mb-14 md:mb-0">
                <div className="container mx-auto flex flex-wrap items-end justify-between my-5">
                    <Link href="/">
                        <div className="flex items-center justify-between">
                            <img className="h-20 w-auto" src="/image/logo.jpg" alt="Workflow" />

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

                        <div className="flex flex-col md:flex-row items-center gap-6 text-gray-100">
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
                        <Select >
                            <SelectTrigger className="w-32 h-7 text-forth">
                                <SelectValue placeholder="عربية" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="arabic">عربية</SelectItem>
                                <SelectItem value="french">فرنسية</SelectItem>
                            </SelectContent>
                        </Select>
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