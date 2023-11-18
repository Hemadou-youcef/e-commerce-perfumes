
// Hooks
import { useState } from "react";

// Components 
import { Link, router } from "@inertiajs/react"
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"


// Icons
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { TbBookmark, TbPerfume } from "react-icons/tb";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";


const LandingNav = ({ props }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    console.log(props?.auth?.user)
    const logout = () => {
        router.post(route('logout'))
    }
    return (
        <>
            <div className="container w-full h-20 flex justify-between items-center py-3 pl-3 pr-2 md:px-5 ">
                {/* LOGO */}
                <Link href="/">
                    <div className="flex items-center justify-start">
                        <img className="h-16 w-auto" src="/image/logo.jpg" alt="Logo" />
                    </div>
                </Link>


                {/* LOGIN ACTIONS */}
                <div className="hidden md:flex items-center gap-5">
                    <div className="flex items-center gap-3 bg-white rounded-full px-3 py-0 overflow-hidden">
                        <Input
                            placeholder="Recherche..."
                            className="h-12 border-0 focus-visible:ring-transparent bg-white"
                        />
                        <IoMdSearch className="w-8 h-8 text-forth" />
                    </div>

                    {/* IF LOGGED IN */}
                    {props?.auth?.user !== null && <div className="flex items-center gap-3 text-third">
                        {[2, 3, 4].includes(props?.auth?.user?.role) ? (
                            <Link
                                href="/admin"
                                className="flex flex-col items-center group gap-1"
                            >
                                <MdOutlineDashboard className="w-7 h-7 text-white group-hover:text-gray-400" />
                                <p className="text-xs font-bold group-hover:text-gray-400 uppercase">Tableau de bord</p>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-5 ">
                                <Link
                                    href="/cart"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <HiOutlineShoppingBag className="w-7 h-7 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">panier</p>
                                </Link>
                                <Link
                                    href="/bookmarks"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <TbBookmark className="w-7 h-7 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">signet</p>
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <CgProfile className="w-7 h-7 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">mon compte</p>
                                </Link>
                            </div>
                        )}
                        {/* LOG OUT */}
                        <Link
                            href="/logout"
                            method="post"
                            className="flex flex-col items-center group gap-1"
                        >
                            <MdOutlineLogout className="w-7 h-7 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">Déconnecter</p>
                        </Link>

                    </div>}


                    {/* IF NOT LOGGED IN */}
                    {props?.auth?.user === null && <div className="flex items-center gap-3 text-third">
                        <Link
                            href="/login"
                            className="flex flex-col items-center group gap-1"
                        >
                            <MdOutlineLogout className="w-7 h-7 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">Se connecter</p>
                        </Link>

                        <Link
                            href="/register"
                            className="flex flex-col items-center group gap-1"
                        >
                            <IoPersonAddOutline className="w-7 h-7 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">S'inscrire</p>
                        </Link>
                        {/* <Link
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
                        </Link> */}

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