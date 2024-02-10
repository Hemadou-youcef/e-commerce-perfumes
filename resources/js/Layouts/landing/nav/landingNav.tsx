
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
import { MdLanguage, MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { IoMenu, IoPersonAddOutline } from "react-icons/io5";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaLuggageCart } from "react-icons/fa";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { Separator } from "@/shadcn/ui/separator";


const LandingNav = ({ props, showNavbar, setNavbarOpen, handleVisit }) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const { t, i18n } = useTranslation()
    // console.log(props?.auth?.user)

    const isLogged = () => {
        return props?.auth?.user !== null
    }
    const isClient = () => {
        return props?.auth?.user?.role == 0 || props?.auth?.user?.role == 1
    }
    const isEmployee = () => {
        return props?.auth?.user?.role == 2 || props?.auth?.user?.role == 3 || props?.auth?.user?.role == 4
    }

    const handleChangeLanguage = (value) => {
        if (value) {
            setNavbarOpen(false);
            setTimeout(() => {
                handleVisit(window.location.pathname, "get");
                i18n.changeLanguage(value);
                localStorage?.setItem("language", value);
            }, 100);
        }
    }

    const handleSearch = (search: string) => {
        setSearchLoading(true);
        router.get("/products?q=" + search, {}, {
            preserveScroll: false,
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
            >
            </div>
            <div className={`flex md:hidden fixed w-full h-screen bg-forth z-10 flex-col shadow-md ${showNavbar ? "top-0" : "top-full"} transition-all duration-500`}>

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
                        placeholder={t('layout.navbar.search') + "..."}
                        className="h-10 border-0 focus-visible:ring-transparent bg-white ltr:font-sans rtl:font-arabic"
                    />
                    {searchLoading ? <AiOutlineLoading3Quarters className="w-6 h-6 text-forth animate-spin" /> : <IoMdSearch className="w-6 h-6 text-forth" />}
                </div>


                <div className="flex flex-col items-center text-white text-lg font-medium uppercase gap-3 mx-5 ltr:font-sans rtl:font-arabic">
                    <div onClick={() => handleVisit("/products")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.products')}
                            {/* Produits */}
                        </p>
                    </div>
                    <div onClick={() => handleVisit("/products/perfumes")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.perfumes')}
                            {/* Parfums */}
                        </p>
                    </div>
                    <div onClick={() => handleVisit("/products/aromatic_oils")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.aromatic_oils')}
                            {/* Huiles */}
                        </p>
                    </div>
                    <div onClick={() => handleVisit("/products/accessories")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.accessories')}
                            {/* Accessoires */}
                        </p>
                    </div>
                    <div onClick={() => handleVisit("/contact-us")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.contact')}
                            {/* Contact */}
                        </p>
                    </div>
                    <div onClick={() => handleVisit("/about")} className="cursor-pointer">
                        <p>
                            {t('layout.navbar.about')}
                            {/* A propos */}
                        </p>
                    </div>
                    <Separator className="my-2" />
                    {i18n.language === "fr" ? <div onClick={() => handleChangeLanguage("ar")} className="cursor-pointer">
                        <p>
                            {t('language.ar')}
                            {/* عربية */}
                        </p>
                    </div> : <div onClick={() => handleChangeLanguage("fr")} className="cursor-pointer">
                        <p>
                            {t('language.fr')}
                            {/* فرنسية */}
                        </p>
                    </div>}
                </div>
            </div>
            <div className="block md:hidden">

                <div dir='ltr' className="fixed bottom-0 left-0 w-full h-14 bg-white z-10 flex items-center justify-around p-2 border-t shadow-md"
                >
                    {(!isLogged() || isEmployee()) && <div onClick={() => handleVisit("/")} className="cursor-pointer">
                        <AiOutlineHome className="w-6 h-full text-primary" />
                    </div>}
                    <div onClick={() => handleVisit("/products")} className="cursor-pointer">
                        <TbPerfume className="w-6 h-full text-primary" />
                    </div>
                    {isClient() && <div onClick={() => handleVisit("/cart")} className="cursor-pointer">
                        <HiOutlineShoppingBag className="w-6 h-6 text-primary" />
                    </div>}
                    {isClient() && <div onClick={() => handleVisit("/orders")} className="cursor-pointer">
                        <LiaLuggageCartSolid className="w-7 h-7 text-primary" />
                    </div>}
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
                    {isClient() && <div onClick={() => handleVisit("/bookmarks")} className="cursor-pointer">
                        <TbBookmark className="w-6 h-6 text-primary" />
                    </div>}
                    {isClient() && <div onClick={() => handleVisit("/profile")} className="cursor-pointer">
                        <CgProfile className="w-5 h-5 text-primary" />
                    </div>}
                    {isEmployee() && <div onClick={() => handleVisit("/dashboard")} className="cursor-pointer">
                        <MdOutlineDashboard className="w-6 h-6 text-primary" />
                    </div>}
                    {isLogged() && <div onClick={() => handleVisit("/logout", "post")} className="cursor-pointer">
                        <BiLogOut className="w-6 h-6 text-primary" />
                    </div>}
                    {!isLogged() && <div onClick={() => handleVisit("/register")} className="cursor-pointer">
                        <BsPersonAdd className="w-6 h-6 text-primary" />
                    </div>}
                    {!isLogged() && <div onClick={() => handleVisit("/login")} className="cursor-pointer">
                        <BiLogIn className="w-6 h-6 text-primary" />
                    </div>}
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
                    <div className="flex items-center gap-3 bg-white rounded-full h-10 px-3 py-0 overflow-hidden">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(search)
                                }
                            }}
                            placeholder={t('layout.navbar.search') + "..."}
                            className="h-10 border-0 focus-visible:ring-transparent bg-white"
                        />
                        {searchLoading ? <AiOutlineLoading3Quarters className="p-1 w-8 h-8 text-forth animate-spin" /> : <IoMdSearch className="w-8 h-8 text-forth" />}
                    </div>
                    {/* LANGUAGE */}
                    <div className="flex flex-col items-center group gap-1 cursor-pointer text-third" onClick={() => handleChangeLanguage(i18n.language === "fr" ? "ar" : "fr")}>
                        <MdLanguage className="w-5 h-5 text-white group-hover:text-gray-400" />
                        {i18n.language === "fr" ? (
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                Arabe
                            </p>
                        ) : (
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                فرنسية
                            </p>
                        )}
                    </div>

                    {/* IF LOGGED IN */}
                    {props?.auth?.user !== null && <div className="flex items-center gap-3 text-third">
                        {[2, 3, 4].includes(props?.auth?.user?.role) ? (
                            <div
                                onClick={() => handleVisit("/dashboard")}
                                className="flex flex-col items-center group gap-1 cursor-pointer"
                            >
                                <MdOutlineDashboard className="w-5 h-5 text-white group-hover:text-gray-400" />
                                <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                    {t('layout.navbar.dashboard')}
                                    {/* Tableau de bord */}
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5 ">
                                <div
                                    onClick={() => handleVisit("/cart")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <HiOutlineShoppingBag className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.cart')}
                                        {/* panier */}
                                    </p>
                                </div>
                                <div
                                    onClick={() => handleVisit("/orders")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <FaLuggageCart className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.orders')}
                                        {/* mes commandes */}
                                    </p>
                                </div>
                                <div
                                    onClick={() => handleVisit("/bookmarks")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <TbBookmark className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.bookmarks')}
                                        {/* signet */}
                                    </p>
                                </div>
                                <div
                                    onClick={() => handleVisit("/profile")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <CgProfile className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('layout.navbar.profile')}
                                        {/* mon compte */}
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* LOG OUT */}
                        <div
                            onClick={() => handleVisit("/logout", "post")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.logout')}
                                {/* Déconnexion */}
                            </p>
                        </div>

                    </div>}


                    {/* IF NOT LOGGED IN */}
                    {props?.auth?.user === null && <div className="flex items-center gap-3 text-third">
                        <div
                            onClick={() => handleVisit("/register")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <IoPersonAddOutline className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.register')}
                                {/* S'inscrire */}
                            </p>
                        </div>
                        <div
                            onClick={() => handleVisit("/login")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('layout.navbar.login')}
                                {/* Se connecter */}
                            </p>
                        </div>

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