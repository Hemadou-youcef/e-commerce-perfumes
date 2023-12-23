import React, { useState, useEffect, useDeferredValue } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ClientsInfo, columns } from "@/components/columns/clients"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { MdFilterAlt } from "react-icons/md";


const Clients = ({ ...props }) => {
    const [data, setData] = useState<ClientsInfo[]>(props?.clients?.data);
    const [showFilters, setShowFilters] = useState(false);
    const [status, setStatus] = useState(props?.filters?.status || undefined);
    const [search, setSearch] = useState(props?.filters?.q || "");
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setSearchLoading(true);
        router.get(route("clients"), {
            q: search,
            role: status,
        }, {
            preserveScroll: true,
            onFinish: () => setSearchLoading(false),
        });
    }

    const handleFilter = () => {
        setLoading(true);
        router.get(route("clients"), {
            q: search,
            role: status,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page: any) => {
                setData(page.props?.clients?.data || []);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    }
    return (
        <>
            <Head>
                <title>Les Clients</title>
                <meta name="description" content="Découvrez notre liste de clients" />
            </Head>
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Clients</h2>
            </div>
            <div className="flex flex-col gap-2 mx-2 md:mx-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-white">
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
                            className="flex items-center rounded-md  focus-visible:ring-transparent"
                            onClick={handleSearch}
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
                    <AccordionItem value="filter">
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
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-green-600 hover:text-gray-50 ${status === "client" ? "bg-green-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("client")}
                                        >
                                            CLIENT
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-gray-600 hover:text-gray-50 ${status === "guest" ? "bg-gray-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("guest")}
                                        >
                                            INVITÉ
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
                    <DataTable columns={columns} data={data} baseUrl="/dashboard/clients/" />
                </div>
                <Pagination meta={props?.clients} />
            </div>
        </>
    );
}


Clients.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Clients;