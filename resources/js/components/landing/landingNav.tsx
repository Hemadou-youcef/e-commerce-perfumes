
// Hooks
import { useState } from "react";

// Components 
import { Link } from "@inertiajs/react"


const LandingNav = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center">
                    <img className="h-20 w-auto" src="/image/logo.png" alt="Workflow" />
                    <h1 className="text-2xl font-bold text-primary">Perfurms Online</h1>
                </div>
                <div className="hidden md:block">
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
                </div>
                <div className="block md:hidden mr-5">
                    {/* Make Reseponsive NavBar */}
                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        type="button"
                        className="bg-gray-50 p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* <!--
                            Heroicon name: outline/menu
                            Menu open: "hidden", Menu closed: "block"
                        --> */}
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ff3e00" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        {/* <!--
                            Heroicon name: outline/x
                            Menu open: "block", Menu closed: "hidden"
                        --> */}
                        <svg className="h-6 w-6 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ff3e00" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* <!--
                        Mobile menu, show/hide based on menu state.

                        Entering: "duration-200 ease-out"
                            From: "opacity-0 scale-95"
                            To: "opacity-100 scale-100"
                        Leaving: "duration-100 ease-in"
                            From: "opacity-100 scale-100"
                            To: "opacity-0 scale-95"
                        --> */}
                    {navbarOpen && (
                        <div className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden bg-white">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LandingNav;