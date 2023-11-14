
// Hooks
import { useState } from "react";

// Components 
import { Link, router } from "@inertiajs/react"
import { Button } from "@/shadcn/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"


// Icons
import { AiOutlineHome, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { TbBookmark, TbPerfume } from "react-icons/tb";
import { Input } from "@/shadcn/ui/input";




const LandingNav = ({ props }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    console.log(props?.auth?.user)
    const logout = () => {
        router.post(route('logout'))
    }
    return (
        <>
            <div className="container w-full h-24 flex justify-between items-center py-3 pl-3 pr-2 md:px-5 ">
                {/* LOGO */}
                <Link href="/">
                    <div className="flex items-center justify-start">
                        <img className="h-7 w-auto invert" src="/image/logo.png" alt="Workflow" />
                    </div>
                </Link>


                {/* LOGIN ACTIONS */}
                <div className="hidden md:flex items-center">
                    <Input
                        placeholder="Recherche..."
                        className="w-72 outline-none mr-5 focus-visible:ring-transparent"
                    />

                    {/* IF LOGGED IN */}
                    {props?.auth?.user !== null && <div className="flex items-center gap-5 text-third">
                        <HiOutlineShoppingBag className="w-6 h-6 text-third" />
                        <TbBookmark className="w-6 h-6 text-third" />
                        <CgProfile className="w-6 h-6 text-third" />
                        {/* LOG OUT */}
                        <Button
                            variant="ghost"
                            onClick={() => logout()}
                            className="font-bold"
                        >
                            LOG OUT
                        </Button>

                    </div>}


                    {/* IF NOT LOGGED IN */}
                    {props?.auth?.user === null && <div className="flex items-center gap-2 mx-2 text-forth">
                        <Link
                            href="/login"
                            className=" bg-third px-3 py-3 text-xs rounded-sm font-bold transition-colors hover:text-gray-400"
                        >
                            LOGIN
                        </Link>
                        <Link
                            href="/register"
                            className="bg-third px-3 py-3 text-xs rounded-sm font-bold transition-colors hover:text-gray-400"
                        >
                            REGISTER
                        </Link>

                    </div>}
                    {/* <Select>
                        <SelectTrigger className="w-32 h-10">
                            <SelectValue placeholder="عربية" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="arabic">عربية</SelectItem>
                            <SelectItem value="french">فرنسية</SelectItem>
                        </SelectContent>
                    </Select> */}
                </div>
                {/* <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"

                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            About
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Products
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/admin"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            login
                        </Link>
                    </div>
                </div> */}
                <div className="block md:hidden">

                    <div className="fixed bottom-0 left-0 w-full h-14 bg-white z-10 flex items-center justify-around p-2 border-t shadow-md"
                    >
                        <Link href="/">
                            <AiOutlineHome className="w-6 h-full text-primary" />
                        </Link>
                        <Link href="/products">
                            <TbPerfume className="w-6 h-full text-primary" />
                        </Link>
                        <Button
                            variant="outline"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <AiOutlineSearch className="w-6 h-6 text-primary" />
                        </Button>
                        <Link href="/cart">
                            <HiOutlineShoppingBag className="w-6 h-6 text-primary" />
                        </Link>
                        <Link href="/login">
                            <CgProfile className="w-6 h-6 text-primary" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingNav;