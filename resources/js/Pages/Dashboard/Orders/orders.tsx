
import React, { useState, useEffect } from "react";
import { OrdersInfo, columns } from "@/components/columns/orders"
import { DataTable } from "@/components/tables/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { StopwatchIcon } from "@radix-ui/react-icons";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";


const Orders = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState<OrdersInfo[]>(props?.orders?.data)
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="">
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <Link href="/admin/orders">
                    <h2 className="text-base md:text-2xl text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
            </div>

            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Filter Clients..."
                        className="max-w-sm"
                    />
                    <Button variant="outline" className="flex items-center space-x-2 rounded-full" onClick={() => setShowFilters(!showFilters)}>
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