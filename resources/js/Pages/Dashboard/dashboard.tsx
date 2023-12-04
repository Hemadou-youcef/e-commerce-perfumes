

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shadcn/ui/tabs"

import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout"
import { useEffect, useState } from "react"
import { GiSellCard } from "react-icons/gi"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Button } from "@/shadcn/ui/button"
import Analyser from "@/components/dashboard/analytics/analyser"
import { router } from "@inertiajs/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CiDeliveryTruck } from "react-icons/ci"
import { CheckCircledIcon } from "@radix-ui/react-icons"

const DashboardPage = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState(props?.data)
    const [date, setDate] = useState<any>(null)
    const [loadingData, setLoadingData] = useState<boolean>(false)

    useEffect(() => {
        setData(props?.data)
    }, [props?.data])

    const formatDate = (date: string) => {
        const d = new Date(date);
        // MAKE IT LIKE THIS 01-01-2021
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, "-");
    }

    const roleName = () => {
        switch (props?.auth?.user?.role) {
            case 2:
                return "employee"
            case 3:
                return "admin"
            case 4:
                return "admin"
            default:
                return "client"
        }
    }
    const getData = () => {
        setLoadingData(true)
        router.get(route('dashboard'), {
            startDate: date?.from,
            endDate: date?.to
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['data'],
            onSuccess: (page: any) => {
                console.log(page.props.data)
            },
            onFinish: () => {
                setLoadingData(false)
            }
        })
    }

    return (
        <>
            {/* <div className="hidden flex-col md:flex"> */}
            {/* <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <TeamSwitcher />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserNav />
                </div>
            </div>
            </div> */}
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center flex-col md:flex-row justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Tableau de bord
                    </h2>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker setDateRange={setDate} />
                        <Button onClick={getData} className="w-24 flex items-center justify-center">
                            {loadingData ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <p className="text-white">Filtrer</p>}
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    {/* <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" >
                            Analytics
                        </TabsTrigger>
                    </TabsList> */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                            {roleName() == "admin" && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        les bénéfices
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : <div className="text-2xl font-bold">{data?.profit} DA</div>}
                                </CardContent>
                            </Card>}
                            {roleName() == "admin" && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Les ventes</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : <div className="text-2xl font-bold">{data?.sales} DA</div>}
                                </CardContent>
                            </Card>}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Nomber total des commandes
                                    </CardTitle>
                                    <GiSellCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : (<>
                                        <div className="text-2xl font-bold">{data?.ordersCount?.total}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {data?.ordersCount?.pending} en attente
                                        </p>
                                    </>)}
                                </CardContent>
                            </Card>
                            {roleName() == "employee" && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Commande livrée
                                    </CardTitle>
                                    <CiDeliveryTruck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : (<>
                                        <div className="text-2xl font-bold">{data?.ordersCount?.delivered}</div>
                                    </>)}
                                </CardContent>
                            </Card>
                            }
                            {roleName() == "employee" && <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Commande confirmées
                                    </CardTitle>
                                    <CheckCircledIcon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : (<>
                                        <div className="text-2xl font-bold">{data?.ordersCount?.confirmed}</div>
                                    </>)}
                                </CardContent>
                            </Card>
                            }
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Subscriptions
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    {loadingData ? <AiOutlineLoading3Quarters className="h-4 w-4 mt-2 animate-spin" /> : (
                                        <>
                                            <div className="text-2xl font-bold">+2350</div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="hidden md:block col-span-4">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Dernières commandes</CardTitle>
                                    <CardDescription>

                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales orders={data?.orders} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div >
        </>
    )
}
DashboardPage.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default DashboardPage;


