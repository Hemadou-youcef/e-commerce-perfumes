
import { Link } from "@inertiajs/react"
import { Button } from "@/shadcn/ui/button"

// Components
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"



const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className=" flex-col md:flex">
                <div className="border-b  h-16 ">
                    <div className="flex h-16 items-center px-4">
                        {/* RETURN TO WEBSITE */}
                        <Link href="/">
                            <Button className="flex items-center justify-items-center text-sm transition-colors  gap-2 font-bold">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <p>Return to Website</p>
                            </Button>

                        </Link>
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto" style={{ height: "calc(100vh - 4rem)" }}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default DashboardMainLayout;