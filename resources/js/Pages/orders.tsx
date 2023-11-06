
import React, { useState, useEffect } from "react";
import { Payment, columns } from "@/components/orders/columns"
import { DataTable } from "../components/orders/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { StopwatchIcon } from "@radix-ui/react-icons";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            client: "youcef Hemadou",
            number: "123456789",
            address: "Algeria",
            amount: 75,
            status: "pending",
            email: "john@example.com",
        },
        {
            client: "sami Bouloudnine",
            number: "987654321",
            address: "Algeria",
            amount: 50,
            status: "failed",
            email: "susan@example.com",
        },
        {
            client: "amir Labaci",
            number: "123123123",
            address: "Algeria",
            amount: 125,
            status: "pending",
            email: "jane@example.com",
        },
        {
            client: "oussama Zahi",
            number: "456456456",
            address: "Algeria",
            amount: 30,
            status: "success",
            email: "peter@example.com",
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
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center flex-col md:flex-row justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <div className="flex items-center space-x-2">
                </div>
            </div>

            {data === null ? (
                <LoadingComponent />
            ) : data.length > 0 ? (
                <div className="container flex flex-col gap-2 mx-auto py-2">
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
                    <DataTable columns={columns} data={data} />
                </div>
            ) : (
                <div className="container py-2">No data available.</div>
            )}

        </div>
    );
}

Orders.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Orders;