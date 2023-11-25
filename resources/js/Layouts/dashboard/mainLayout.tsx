
import { Link } from "@inertiajs/react"
import { Button } from "@/shadcn/ui/button"

// Components
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav-v2"

// Icons



const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <>
            <div className="flex">
                <MainNav />
                <div className="overflow-y-auto bg-gray-50 pb-5 ml-[300px] w-full"
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default DashboardMainLayout;