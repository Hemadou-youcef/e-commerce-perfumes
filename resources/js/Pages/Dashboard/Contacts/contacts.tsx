import React, { useState, useEffect, useDeferredValue } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ContactsInfo, columns } from "@/components/columns/contacts"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Contacts = ({ ...props }) => {
    const [data, setData] = useState<ContactsInfo[]>(props?.contacts?.data);
    const [search, setSearch] = useState(props?.filters?.q || "");
    const [searchLoading, setSearchLoading] = useState(false);

    const handleSearch = () => {
        setSearchLoading(true);
        router.get(route("contacts"), {
            q: search,
        }, {
            preserveScroll: true,
            onFinish: () => setSearchLoading(false),
        });
    }


    return (
        <>
            <Head>
                <title>Les Contacts</title>
                <meta name="description" content="Découvrez notre liste de contacts" />
            </Head>
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Contacts</h2>
            </div>
            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Input
                            placeholder="Filter Messages..."
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

                </div>
                <div className="max-w-full overflow-x-auto pb-2">
                    <DataTable columns={columns} data={data} baseUrl="/dashboard/contacts/" />
                </div>
                <Pagination meta={props?.contacts} />
            </div>
        </>
    );
}


Contacts.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Contacts;