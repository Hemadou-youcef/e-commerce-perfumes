
import React, { useState, useEffect } from "react";
import { OrdersInfo, columns } from "@/components/columns/orders"
import { DataTable } from "@/components/tables/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { addDays, format } from "date-fns"

import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shadcn/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { LuReceipt } from "react-icons/lu";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { DatePicker } from "@/components/dashboard/date-picker";
import { MdFilterAlt } from "react-icons/md";


const Orders = ({ ...props }) => {
    const [data, setData] = useState<OrdersInfo[]>(props?.orders?.data)
    const [showFilters, setShowFilters] = useState(false);
    const [status, setStatus] = useState(props?.filters?.status || "all");
    const [search, setSearch] = useState(props?.filters?.q || "");
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [receiptDateRange, setReceiptDateRange] = useState(() => {
        const today = new Date();
        return {
            from: today,
            to: today,
        }
    })

    const formatDate = (date) => {
        // to this form : "yyyy-MM-dd"
        
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    const handleFilter = () => {
        setLoading(true);
        router.get(route("orders"), {
            q: search,
            status: status,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page: any) => {
                setData(page.props?.orders?.data || []);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    }

    const handleReceipt = () => {
        const popUpFeatures = 'width=' + screen.width + ',height=' + screen.height + ",menubar=no,toolbar=no,location=no,scrollbars=yes,status=no";
        let dateRange = {}
        if (receiptDateRange.from === receiptDateRange.to) {
            dateRange = {
                date: format(receiptDateRange.from, "yyyy-MM-dd"),
            }
        } else {
            dateRange = {
                startDate: format(receiptDateRange.from, "yyyy-MM-dd"),
                endDate: format(receiptDateRange.to, "yyyy-MM-dd"),
            }
        }
        const printWindow = window.open(route('print_orders') + "?" + new URLSearchParams(dateRange), 'Print Order', popUpFeatures);
    }
    return (
        <div className="">
            <Head>
                <title>Les Commandes</title>
                <meta name="description" content="Découvrez notre liste de commandes" />
            </Head>
            <div className="flex flex-col md:flex-row justify-between items-center px-5 py-2 gap-2 md:h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <Link href="/dashboard/orders">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
                <div className="flex items-center space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                {/* CREATE RECEIPT */}
                                <LuReceipt className="h-5 w-5" />
                                <span className="ml-2 hidden sm:block">Reçu</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    Créer un reçu
                                </DialogTitle>
                                <DialogDescription>
                                    Créer un reçu pour les commandes entre deux dates
                                </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="singledate">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="singledate">
                                        Date
                                    </TabsTrigger>
                                    <TabsTrigger value="multirange">
                                        Période
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="singledate">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Date
                                            </CardTitle>
                                            <CardDescription>
                                                Créer un reçu pour les commandes en une date
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                {/* SINGEL DATE */}
                                                {/* <Input
                                                    type="date"
                                                    value={format(receiptDateRange.from, "yyyy-MM-dd") || ""}
                                                    onChange={(e) => {
                                                        setReceiptDateRange({
                                                            ...receiptDateRange,
                                                            from: new Date(e.target.value),
                                                            to: new Date(e.target.value),
                                                        })
                                                    }}
                                                    className="max-w-sm text-gray-900  focus-visible:ring-transparent"
                                                    autoFocus
                                                /> */}
                                                <DatePicker
                                                    date={receiptDateRange.from}
                                                    setDate={(Date) => {
                                                        setReceiptDateRange({
                                                            ...receiptDateRange,
                                                            from: Date,
                                                            to: Date,
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="multirange">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Période
                                            </CardTitle>
                                            <CardDescription>
                                                Créer un reçu pour les commandes entre deux dates
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <CalendarDateRangePicker
                                                    setDateRange={setReceiptDateRange}
                                                    dateRange={receiptDateRange}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Annuler
                                    </Button>
                                </DialogClose>
                                <Button type="button" onClick={handleReceipt}>
                                    Créer
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Link href="/dashboard/orders/create">
                        <Button className="flex items-center p-0 px-5 h-9 md:h-10 md:rounded-md">
                            <IoMdAdd className="h-5 w-5" />
                            <span className="ml-2 hidden sm:block">Ajouter une Commande</span>
                        </Button>
                    </Link>
                </div>

            </div>

            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-white">
                        <Input
                            placeholder="Filter Commandes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(key) => {
                                if (key.key === "Enter") {
                                    handleFilter()
                                }
                            }}
                            className="max-w-sm text-gray-900  focus-visible:ring-transparent"
                            autoFocus
                        />
                        <Button
                            className="flex items-center rounded-md  focus-visible:ring-transparent"
                            onClick={handleFilter}
                            disabled={searchLoading}
                        >
                            {searchLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <>
                                <span className="ml-2 hidden md:block">Search</span>
                                <AiOutlineSearch className="md:hidden h-5 w-5" />
                            </>}
                        </Button>
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2 rounded-md" onClick={() => setShowFilters(!showFilters)}>
                        <MdFilterAlt className="h-5 w-5" />
                        <span className="ml-2 hidden md:block">Filter</span>
                    </Button>
                </div>
                <Accordion type="single" value={showFilters ? "filter" : undefined}>
                    <AccordionItem value="filter" className="border-0">
                        <AccordionContent >
                            <div className="p-2 pt-3 border rounded-md flex flex-col gap-5 bg-gray-800">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-sm font-medium  text-gray-50">Status</h1>
                                    <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                                        <Button variant="outline"
                                            className={`flex h-8 items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-gray-50 hover:text-gray-900 ${status === "all" ? "bg-gray-50 text-gray-900" : ""}`}
                                            onClick={() => setStatus(undefined)}
                                        >
                                            TOUS
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-gray-600 hover:text-gray-50 ${status === "pending" ? "bg-gray-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("pending")}
                                        >
                                            EN ATTENTE
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-green-600 hover:text-gray-50 ${status === "verified" ? "bg-green-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("verified")}
                                        >
                                            VERIFIÉ
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-green-600 hover:text-gray-50 ${status === "confirmed" ? "bg-green-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("confirmed")}
                                        >
                                            CONFIRMÉ
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-blue-600 hover:text-gray-50 ${status === "delivered" ? "bg-blue-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("delivered")}
                                        >
                                            LIVRÉ
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-red-600 hover:text-gray-50 ${status === "cancelled" ? "bg-red-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("cancelled")}
                                        >
                                            ANNULÉ
                                        </Button>

                                    </div>

                                </div>
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2 rounded-md  focus-visible:ring-transparent"
                                    onClick={handleFilter}
                                    disabled={searchLoading}
                                >
                                    {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : "Appliquer les filtres"}

                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="max-w-full overflow-x-auto pb-2">
                    <DataTable columns={columns} data={data} baseUrl="/dashboard/orders/" />
                </div>
                <Pagination meta={props?.orders} />
            </div>

        </div>
    );
}

Orders.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Orders;
