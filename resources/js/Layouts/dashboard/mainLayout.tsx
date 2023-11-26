
import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/shadcn/ui/button"

// Components
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav-v2"
import { useState } from "react"

// Icons


const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
    const pageProps = usePage().props
    const [showNav, setShowNav] = useState(true);
    return (
        <>
            <div className="flex h-screen">
                <MainNav auth={pageProps?.auth} showNav={showNav} setNav={(value) => setShowNav(value)} />
                <div className={`overflow-y-auto bg-gray-50 pb-5  min-h- w-full z-0 ${showNav ? "ml-[50px] md:ml-[270px]" : "ml-[50px]"} transition-all duration-300`}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default DashboardMainLayout;