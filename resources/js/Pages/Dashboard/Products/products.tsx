import React, { useState, useEffect } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ProductsInfo, columns } from "@/components/columns/products"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";

// Icons
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Products = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState<ProductsInfo[]>(props?.products?.data)
    const [showFilters, setShowFilters] = useState(false);
    const [status, setStatus] = useState(props?.filters?.status || "all");
    const [search, setSearch] = useState(props?.filters?.search || "");
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSearch = () => {
        setSearchLoading(true);
        setLoading(true);
        router.get(route("products"), {
            search: search,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page : any) => {
                setData(page.props?.products?.data || []);
            },
            onFinish: () => {
                setSearchLoading(false);
                setLoading(false);
            }
        });
    }

    const handleFilter = () => {
        setLoading(true);
        router.get(route("products"), {
            search: search,
            status: status,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page : any) => {
                setData(page.props?.products?.data || []);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center px-5 py-2 gap-2 h-14 w-full sticky top-0 bg-gray-50 shadow-sm z-10">
                <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Produits</h2>
                <Link href="/dashboard/products/create">
                    <Button className="flex items-center p-0 px-5 h-9 md:h-10 md:rounded-md">
                        <IoMdAdd className="h-5 w-5" />
                        <span className="ml-2 hidden md:block">Ajouter un produit</span>
                    </Button>
                </Link>
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
                    <AccordionItem value="filter" className="border-0">
                        <AccordionContent >
                            <div className="p-2 pt-3 border rounded-md flex flex-col gap-5 bg-gray-800">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-sm font-medium  text-gray-50">Status</h1>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <Button variant="outline"
                                            className={`flex h-8 items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-gray-50 hover:text-gray-900 ${status === "all" ? "bg-gray-50 text-gray-900" : ""}`}
                                            onClick={() => setStatus("all")}
                                        >
                                            TOUS
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-green-600 hover:text-gray-50 ${status === "published" ? "bg-green-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("published")}
                                        >
                                            PUBLIÉ
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-blue-600 hover:text-gray-50 ${status === "pinned" ? "bg-blue-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("pinned")}
                                        >
                                            ÉPINGLEÉ
                                        </Button>
                                        <Button variant="outline"
                                            className={`flex h-8  items-center space-x-2 rounded-md bg-transparent border border-dashed text-gray-50 hover:bg-gray-600 hover:text-gray-50 ${status === "archived" ? "bg-gray-600 text-gray-50" : ""}`}
                                            onClick={() => setStatus("archived")}
                                        >
                                            ARCHIVÉ
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
                    {loading ? null : <DataTable columns={columns} data={data} baseUrl="/dashboard/products/" />}
                </div>
                <Pagination meta={props?.products} />
            </div>
        </>
    );
}


Products.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Products;