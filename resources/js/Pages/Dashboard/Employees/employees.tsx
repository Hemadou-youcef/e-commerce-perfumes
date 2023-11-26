import React, { useState, useEffect } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ClientsInfo, columns } from "@/components/columns/clients"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";
import { IoMdAdd } from "react-icons/io";

// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Clients = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState<ClientsInfo[]>(props?.employees?.data);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <h2 className="text-base md:text-2xl text-gray-900 font-bold tracking-tight">Les Employees</h2>
                <Link href="/admin/employees/create">
                    <Button className="flex items-center p-0 px-5 md:h-10 md:rounded-full">
                        <IoMdAdd className="h-5 w-5" />
                        <span className="ml-2 hidden md:block">Ajouter un Employee</span>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
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
                    <DataTable columns={columns} data={data} baseUrl="/admin/employees/" />
                </div>
                <Pagination meta={props?.employees} />
            </div>
        </>
    );
}


Clients.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Clients;