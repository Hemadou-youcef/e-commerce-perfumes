
import React, { useState, useEffect } from "react";
import { Payment, columns } from "@/components/columns/orders"
import { DataTable } from "@/components/tables/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { StopwatchIcon } from "@radix-ui/react-icons";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link } from "@inertiajs/react";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            client: "youcef Hemadou",
            number: "123456789",
            address: "Algeria",
            total_price: 75,
            status: "2",
        },
        {
            id: 2,
            client: "sami Bouloudnine",
            number: "987654321",
            address: "Algeria",
            status: "0",
            total_price: 100,
        },
        {
            id: 3,
            client: "amir Labaci",
            number: "123123123",
            address: "Algeria",
            status: "1",
            total_price: 50,
        },
        {
            id: 4,
            client: "oussama Zahi",
            number: "456456456",
            address: "Algeria",
            status: "3",
            total_price: 30,
        },
        // Add more entries as needed
    ]

}


// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Orders = () => {
    const [data, setData] = useState<Payment[] | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch data from your API here.
                const result = await getData();
                
                setData(result);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setData([]); // Set data to an empty array or handle the error as needed.
            }
        }

        fetchData();
    }, []);

    return (
        <div className="">
            {/* <div className="flex items-center flex-col md:flex-row justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Les Commandes</h2>
                <div className="flex items-center space-x-2">
                </div>
            </div> */}
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-2xl text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
            </div>

            {data === null ? (
                <LoadingComponent />
            ) : data.length > 0 ? (
                <div className="flex flex-col gap-2 mx-10 py-2">
                    <div className="flex items-center justify-between">
                        <Input
                            placeholder="Filter Clients..."
                            className="max-w-sm"
                        />
                        <Button variant="outline" className="flex items-center space-x-2" onClick={() => setShowFilters(!showFilters)}>
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
                    <DataTable columns={columns} data={data} baseUrl="/admin/orders/"/>
                </div>
            ) : (
                <div className="container py-2">No data available.</div>
            )}

        </div>
    );
}

Orders.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Orders;