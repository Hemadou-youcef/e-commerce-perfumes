
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
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaLuggageCart } from "react-icons/fa";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { Separator } from "@/shadcn/ui/separator";


const LandingNav = ({ props, showNavbar, setNavbarOpen, handleVisit }) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const { t, currentLocale, setLocale } = useLaravelReactI18n();
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
                setLocale(value);
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
                    <IoMdClose className="w-7 h-7 text-white cursor-pointer" onClick={() => setNavbarOpen(!showNavbar)} />
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
                        placeholder={t('custom.layout.navbar.search') + "..."}
                        className="h-10 border-0 focus-visible:ring-transparent bg-white ltr:font-sans rtl:font-arabic"
                    />
                    {searchLoading ? <AiOutlineLoading3Quarters className="w-6 h-6 text-forth animate-spin" /> : <IoMdSearch className="w-6 h-6 text-forth" />}
                </div>


                <div className="flex flex-col items-center text-white text-lg font-medium uppercase gap-3 mx-5 ltr:font-sans rtl:font-arabic">
                    <div onClick={() => handleVisit("/products")} className="cursor-pointer">
                        <Link href="/products" disabled>
                            <p>
                                {t('custom.layout.navbar.products')}
                                {/* Produits */}
                            </p>
                        </Link>
                    </div>
                    <div onClick={() => handleVisit("/products/perfumes")} className="cursor-pointer">
                        <Link href="/products/perfumes" disabled>
                            <p>
                                {t('custom.layout.navbar.perfumes')}
                                {/* Parfums */}
                            </p>
                        </Link>
                    </div>
                    <div onClick={() => handleVisit("/products/aromatic_oils")} className="cursor-pointer">
                        <Link href="/products/aromatic_oils" disabled>
                            <p>
                                {t('custom.layout.navbar.aromatic_oils')}
                                {/* Huiles */}
                            </p>
                        </Link>
                    </div>
                    <div onClick={() => handleVisit("/products/accessories")} className="cursor-pointer">
                        <Link href="/products/accessories" disabled>
                            <p>
                                {t('custom.layout.navbar.accessories')}
                                {/* Accessoires */}
                            </p>
                        </Link>
                    </div>
                    <div onClick={() => handleVisit("/contact-us")} className="cursor-pointer">
                        <Link href="/contact-us" disabled>
                            <p>
                                {t('custom.layout.navbar.contact')}
                                {/* Contact */}
                            </p>
                        </Link>
                    </div>
                    <div onClick={() => handleVisit("/about")} className="cursor-pointer">
                        <Link href="/about" disabled>
                            <p>
                                {t('custom.layout.navbar.about')}
                                {/* A propos */}
                            </p>
                        </Link>
                    </div>
                    <Separator className="my-2" />
                    {currentLocale() === "fr" ? <div onClick={() => handleChangeLanguage("ar")} className="cursor-pointer">
                        <p>
                            {t('custom.language.ar')}
                            {/* عربية */}
                        </p>
                    </div> : <div onClick={() => handleChangeLanguage("fr")} className="cursor-pointer">
                        <p>
                            {t('custom.language.fr')}
                            {/* فرنسية */}
                        </p>
                    </div>}
                </div>
            </div>
            <div className="block md:hidden">

                <div dir='ltr' className="fixed bottom-0 left-0 w-full h-14 bg-white z-10 flex items-center justify-around p-2 border-t shadow-md"
                >
                    {(!isLogged() || isEmployee()) && <div onClick={() => handleVisit("/")} className="cursor-pointer">
                        <Link href="/" disabled>
                            <AiOutlineHome className="w-6 h-full text-primary" />
                        </Link>
                    </div>}
                    <div onClick={() => handleVisit("/products")} className="cursor-pointer">
                        <Link href="/products" disabled>
                            <TbPerfume className="w-6 h-full text-primary" />
                        </Link>
                    </div>
                    {isClient() && <div onClick={() => handleVisit("/cart")} className="cursor-pointer">
                        <Link href="/cart" disabled>
                            <HiOutlineShoppingBag className="w-6 h-6 text-primary" />
                        </Link>
                    </div>}
                    {isClient() && <div onClick={() => handleVisit("/orders")} className="cursor-pointer">
                        <Link href="/orders" disabled>
                            <LiaLuggageCartSolid className="w-7 h-7 text-primary" />
                        </Link>
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
                        <Link href="/bookmarks" disabled>
                            <TbBookmark className="w-6 h-6 text-primary" />
                        </Link>
                    </div>}
                    {isClient() && <div onClick={() => handleVisit("/profile")} className="cursor-pointer">
                        <Link href="/profile" disabled>
                            <CgProfile className="w-5 h-5 text-primary" />
                        </Link>
                    </div>}
                    {isEmployee() && <div onClick={() => handleVisit("/dashboard")} className="cursor-pointer">
                        <Link href="/dashboard" disabled>
                            <MdOutlineDashboard className="w-6 h-6 text-primary" />
                        </Link>
                    </div>}
                    {isLogged() && <div onClick={() => handleVisit("/logout", "post")} className="cursor-pointer">
                        <Link href="/logout" disabled>
                            <BiLogOut className="w-6 h-6 text-primary" />
                        </Link>
                    </div>}
                    {!isLogged() && <div onClick={() => handleVisit("/register")} className="cursor-pointer">
                        <Link href="/register" disabled>
                            <BsPersonAdd className="w-6 h-6 text-primary" />
                        </Link>
                    </div>}
                    {!isLogged() && <div onClick={() => handleVisit("/login")} className="cursor-pointer">
                        <Link href="/login" disabled>
                            <BiLogIn className="w-6 h-6 text-primary" />
                        </Link>
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
                            placeholder={t('custom.layout.navbar.search') + "..."}
                            className="h-10 border-0 focus-visible:ring-transparent bg-white"
                        />
                        {searchLoading ? <AiOutlineLoading3Quarters className="p-1 w-8 h-8 text-forth animate-spin" /> : <IoMdSearch className="w-8 h-8 text-forth" />}
                    </div>
                    {/* LANGUAGE */}
                    <div className="flex flex-col items-center group gap-1 cursor-pointer text-third" onClick={() => handleChangeLanguage(currentLocale() === "fr" ? "ar" : "fr")}>
                        <MdLanguage className="w-5 h-5 text-white group-hover:text-gray-400" />
                        {currentLocale() === "fr" ? (
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
                            <Link
                                href="/dashboard"
                                onClick={() => handleVisit("/dashboard")}
                                className="flex flex-col items-center group gap-1 cursor-pointer"
                            >
                                <MdOutlineDashboard className="w-5 h-5 text-white group-hover:text-gray-400" />
                                <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                    {t('custom.layout.navbar.dashboard')}
                                    {/* Tableau de bord */}
                                </p>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-5 ">
                                <Link
                                    href="/cart"
                                    onClick={() => handleVisit("/cart")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <HiOutlineShoppingBag className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('custom.layout.navbar.cart')}
                                        {/* panier */}
                                    </p>
                                </Link>
                                <Link
                                    href="/orders"
                                    onClick={() => handleVisit("/orders")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <FaLuggageCart className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('custom.layout.navbar.orders')}
                                        {/* mes commandes */}
                                    </p>
                                </Link>
                                <Link
                                    href="/bookmarks"
                                    onClick={() => handleVisit("/bookmarks")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <TbBookmark className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('custom.layout.navbar.bookmarks')}
                                        {/* signet */}
                                    </p>
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => handleVisit("/profile")}
                                    className="flex flex-col items-center group gap-1 cursor-pointer"
                                >
                                    <CgProfile className="w-5 h-5 text-white group-hover:text-gray-400" />
                                    <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                        {t('custom.layout.navbar.profile')}
                                        {/* mon compte */}
                                    </p>
                                </Link>
                            </div>
                        )}
                        {/* LOG OUT */}
                        <Link
                            href="/logout"
                            onClick={() => handleVisit("/logout", "post")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('custom.layout.navbar.logout')}
                                {/* Déconnexion */}
                            </p>
                        </Link>

                    </div>}


                    {/* IF NOT LOGGED IN */}
                    {props?.auth?.user === null && <div className="flex items-center gap-3 text-third">
                        <Link
                            href="/register"
                            onClick={() => handleVisit("/register")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <IoPersonAddOutline className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('custom.layout.navbar.register')}
                                {/* S'inscrire */}
                            </p>
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => handleVisit("/login")}
                            className="flex flex-col items-center group gap-1 cursor-pointer"
                        >
                            <MdOutlineLogout className="w-5 h-5 text-white group-hover:text-gray-400" />
                            <p className="text-xs font-bold group-hover:text-gray-400 uppercase">
                                {t('custom.layout.navbar.login')}
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