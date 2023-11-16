import React, { useState, useEffect } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ClientsInfo, columns } from "@/components/columns/clients"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link } from "@inertiajs/react";

async function getData(): Promise<ClientsInfo[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            full_name: "youcef Hemadou",
            phone_number: "123456789",
            address: "Algeria",
            status: "2",
            role: 1,
        },
        {
            id: 2,
            full_name: "sami Bouloudnine",
            phone_number: "987654321",
            address: "Algeria",
            status: "0",
            role: 0,
        },
        {
            id: 3,
            full_name: "amir Labaci",
            phone_number: "123123123",
            address: "Algeria",
            status: "1",
            role: 1,
        },
        {
            id: 4,
            full_name: "oussama Zahi",
            phone_number: "456456456",
            address: "Algeria",
            status: "3",
            role: 1,
        },
        {
            id: 5,
            full_name: "brahim oumlili",
            phone_number: "456456456",
            address: "Algeria",
            status: "3",
            role: 0,
        },
        // Add more entries as needed
    ]

}


// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Clients = () => {
    const [data, setData] = useState<ClientsInfo[] | null>(null);
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
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <h2 className="text-2xl text-gray-900 font-bold tracking-tight">Les Clients</h2>
            </div>
            {data === null ? (
                <LoadingComponent />
            ) : data.length > 0 ? (
                <div className="flex flex-col gap-2 mx-10 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 text-white">
                            <Input
                                placeholder="Filter Clients..."
                                className="max-w-sm"
                            />
                            <Button variant="outline" className="flex items-center space-x-2 border-2 border-dashed border-gray-600 text-gray-600" onClick={() => setShowFilters(!showFilters)}>
                                GUEST
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2 border-2 border-dashed border-green-600 text-green-600" onClick={() => setShowFilters(!showFilters)}>
                                CLIENT
                            </Button>
                        </div>
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
                    <DataTable columns={columns} data={data} baseUrl="/admin/clients/" />
                </div>
            ) : (
                <div className="container py-2">No data available.</div>
            )}
        </>
    );
}


Clients.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Clients;