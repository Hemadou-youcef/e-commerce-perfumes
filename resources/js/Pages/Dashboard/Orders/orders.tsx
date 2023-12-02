
import React, { useState, useEffect } from "react";
import { OrdersInfo, columns } from "@/components/columns/orders"
import { DataTable } from "@/components/tables/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { StopwatchIcon } from "@radix-ui/react-icons";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";


const Orders = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState<OrdersInfo[]>(props?.orders?.data)
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState(props?.filters?.q || "");
    const [searchLoading, setSearchLoading] = useState(false);

    const handleSearch = () => {
        setSearchLoading(true);
        router.get(route("orders"), {
            q: search,
        }, {
            preserveScroll: true,
            onFinish: () => setSearchLoading(false),
        });
    }

    return (
        <div className="">
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <Link href="/admin/orders">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
                <Link href="/admin/orders/create">
                    <Button className="flex items-center p-0 px-5 h-9 md:h-10 md:rounded-md">
                        <IoMdAdd className="h-5 w-5" />
                        <span className="ml-2 hidden md:block">Ajouter une Commande</span>
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Input
                            placeholder="Filter Produits..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(key) => {
                                if (key.key === "Enter") {
                                    handleSearch()
                                }
                            }}
                            className="max-w-sm text-gray-900  focus-visible:ring-transparent"
                            autoFocus
                        />
                        <Button
                            className="flex items-center space-x-2 rounded-md w-28 focus-visible:ring-transparent"
                            onClick={handleSearch}
                            disabled={searchLoading}
                        >
                            {searchLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : "Search"}
                        </Button>
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2 rounded-md" onClick={() => setShowFilters(!showFilters)}>
                        Filter
                    </Button>

                </div>
                <Accordion type="single" value={showFilters ? "filter" : undefined}>
                    <AccordionItem value="filter">
                        <AccordionContent>
                            <div className="flex items-center justify-between">


                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="max-w-full overflow-x-auto pb-2">
                    <DataTable columns={columns} data={data} baseUrl="/admin/orders/" />
                </div>
                <Pagination meta={props?.orders} />
            </div>

        </div>
    );
}

Orders.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Orders;