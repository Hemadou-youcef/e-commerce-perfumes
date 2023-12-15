
// Hooks
import { useRef, useState } from "react";

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
import { AiOutlineHome, AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { TbBookmark, TbPerfume } from "react-icons/tb";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { IoMenu, IoPersonAddOutline } from "react-icons/io5";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { is } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { FaLuggageCart } from "react-icons/fa";
import { LiaLuggageCartSolid } from "react-icons/lia";


const LandingNav = ({ props, showNavbar, setNavbarOpen }) => {

    const searchInput = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const { t } = useTranslation()
    // console.log(props?.auth?.user)

    const isLogged = () => {
        return props?.auth?.user !== null
    }
    const isClient = () => {
        return props?.auth?.user?.role == 0 || props?.auth?.user?.role == 1
    }
    const isEmployee = () => {
        return props?.auth?.user?.role == 2 || props?.auth?.user?.role == 3
    }
    const logout = () => {
        router.post(route('logout'))
    }

    const handleSearch = (search: string) => {
        setSearchLoading(true);
        router.get("/products?q=" + search, {}, {
            preserveScroll: true,
            onFinish: () => {
                setSearchLoading(false);
                setNavbarOpen(false);
            }
        })
    }
    return (
        <>
            <div className="flex md:hidden container w-full h-12 md:h-16 justify-between items-center py-3 px-2 ltr:pr-5 rtl:pl-5 ">
                <Link href="/">
                    <div className="flex items-center justify-start">
                        <img className="h-9 md:h-12 w-auto" src="/image/logo.jpg" alt="Logo" />
                    </div>
                </Link>
                <IoMenu className="md:hidden w-6 h-6 text-white cursor-pointer" onClick={() => setNavbarOpen(!showNavbar)} />
            </div>
            {/* OVERLAY */}
            <div
                className={`fixed top-0 md:hidden left-0 w-full h-screen bg-black bg-opacity-50 z-10 ${showNavbar ? "block" : "hidden"}`}
                onClick={() => setNavbarOpen(false)}
            ></div>
            <div className={`fixed w-full h-screen bg-forth z-10 flex md:hidden flex-col shadow-md ${showNavbar ? "top-0" : "top-full"} transition-all duration-500`}>

                {/* CLOSE BUTTON */}
                <div className="flex justify-end p-5">
                    <IoMdClose className="w-11 h-11 text-white cursor-pointer" onClick={() => setNavbarOpen(!showNavbar)} />
                </div>
                <div className="flex items-center gap-3 bg-white rounded-full mb-5 mx-5 px-3 py-0 overflow-hidden">
                    <Input
                        ref={searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(search)
                            }
                        }}
                        placeholder="Recherche..."
                        className="h-10 border-0 focus-visible:ring-transparent bg-white"
                    />
                    {searchLoading ? <AiOutlineLoading3Quarters className="w-6 h-6 text-forth animate-spin" /> : <IoMdSearch className="w-6 h-6 text-forth" />}
                </div>

                <div className="flex flex-col items-center text-white text-lg font-medium uppercase gap-3 mx-5">
                    <Link href="/products/perfumes">
                        <p>Parfums</p>
                    </Link>
                    <Link href="/about-us">
                        <p>
                            {t('layout.navbar.about')}
                            {/* A propos */}
                        </p>
                    </Link>
                    <Link href="/contact-us">
                        <p>
                            {t('layout.navbar.contact')}
                            {/* Contact */}
                        </p>
                    </Link>
                </div>
            </div>
            <div className="block md:hidden">

                <div dir='ltr' className="fixed bottom-0 left-0 w-full h-14 bg-white z-10 flex items-center justify-around p-2 border-t shadow-md"
                >
                    {(!isLogged() || isEmployee()) && <Link href="/">
                        <AiOutlineHome className="w-6 h-full text-primary" />
                    </Link>}
                    <Link href="/products">
                        <TbPerfume className="w-6 h-full text-primary" />
                    </Link>
                    {isClient() && <Link href="/cart">
                        <HiOutlineShoppingBag className="w-6 h-6 text-primary" />
                    </Link>}
                    {isClient() && <Link href="/orders">
                        <LiaLuggageCartSolid className="w-7 h-7 text-primary" />
                    </Link>}
                    <Button
                        variant="outline"
                        onClick={() => {
                            setNavbarOpen(!showNavbar);
                            setTimeout(() => {
                                searchInput.current?.focus();
                            }, 500);
                        }}
                    >
                        <AiOutlineSearch className="w-6 h-6 text-primary" />
                    </Button>
                    {isClient() && <Link href="/bookmarks">
                        <TbBookmark className="w-6 h-6 text-primary" />
                    </Link>}
                    {isClient() && <Link href="/profile">
                        <CgProfile className="w-5 h-5 text-primary" />
                    </Link>}
                    {isEmployee() && <Link href="/dashboard">
                        <MdOutlineDashboard className="w-6 h-6 text-primary" />
                    </Link>}
                    {isLogged() && <Link href="/logout" method="post">
                        <BiLogOut className="w-6 h-6 text-primary" />
                    </Link>}
                    {!isLogged() && <Link href="/register">
                        <BsPersonAdd className="w-6 h-6 text-primary" />
                    </Link>}
                    {!isLogged() && <Link href="/login">
                        <BiLogIn className="w-6 h-6 text-primary" />
                    </Link>}
                </div>
            </div>
            <div className="container w-full h-16 hidden md:flex justify-between items-center py-3 pl-3 pr-2 md:px-5 ">
                {/* LOGO */}
                <Link href="/">
                    <div className="flex items-center justify-start">
                        <img className="h-12 w-auto" src="/image/logo.jpg" alt="Logo" />
                    </div>
                </Link>

                {/* LOGIN ACTIONS */}
                <div className="items-center gap-5 flex font-sans rtl:font-arabic">
                    <div className="flex items-center gap-3 bg-white rounded-full px-3 py-0 overflow-hidden">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(search)
                                }
                            }}
                            placeholder="Recherche..."
                            className="h-10 border-0 focus-visible:ring-transparent bg-white"
                        />
                        {searchLoading ? <AiOutlineLoading3Quarters className="w-8 h-8 text-forth animate-spin" /> : <IoMdSearch className="w-8 h-8 text-forth" />}
                    </div>

                    {/* IF LOGGED IN */}
                    {props?.auth?.user !== null && <div className="flex items-center gap-3 text-third">
                        {[2, 3, 4].includes(props?.auth?.user?.role) ? (
                            <Link
                                href="/dashboard"
                                className="flex flex-col items-center group gap-1"
                            >
                                <MdOutlineDashboard className="w-5 h-5 text-white group-hover:text-gray-400" />
                                <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                    {t('layout.navbar.dashboard')}
                                    {/* Tableau de bord */}
                                </p>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-5 ">
                                <Link
                                    href="/cart"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <HiOutlineShoppingBag className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.cart')}
                                        {/* panier */}
                                    </p>
                                </Link>
                                <Link
                                    href="/orders"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <FaLuggageCart className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.orders')}
                                        {/* mes commandes */}
                                    </p>
                                </Link>
                                <Link
                                    href="/bookmarks"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <TbBookmark className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.bookmarks')}
                                        {/* signet */}
                                    </p>
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex flex-col items-center group gap-1"
                                >
                                    <CgProfile className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.profile')}
                                        {/* mon compte */}
                                    </p>
                                </Link>
                            </div>
                        )}
                        {/* LOG OUT */}
                        <Link
                            href="/logout"
                            method="post"
                            className="flex flex-col items-center group gap-1"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.logout')}
                                {/* Déconnexion */}
                            </p>
                        </Link>

                    </div>}


                    {/* IF NOT LOGGED IN */}
                    {props?.auth?.user === null && <div className="flex items-center gap-3 text-third">
                        <Link
                            href="/register"
                            className="flex flex-col items-center group gap-1"
                        >
                            <IoPersonAddOutline className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.register')}
                                {/* S'inscrire */}
                            </p>
                        </Link>
                        <Link
                            href="/login"
                            className="flex flex-col items-center group gap-1"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.login')}
                                {/* Se connecter */}
                            </p>
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

            </div>
        </>
    );
}

export default LandingNav;