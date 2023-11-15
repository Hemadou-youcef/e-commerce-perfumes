import React, { useState, useEffect } from "react";
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { ProductsInfo, columns } from "@/components/columns/products"
import { DataTable } from "@/components/tables/data-table"
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import { Link } from "@inertiajs/react";
import Pagination from "@/components/tables/pagination";

// Icons
import { IoMdAdd } from "react-icons/io";



// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

const Products = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState<ProductsInfo[] | null>(props?.products?.data)
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <div className="flex flex-row justify-between items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-2xl text-gray-900 font-bold tracking-tight">Les Produits</h2>
                </Link>
                <Link href="/admin/products/create">
                    <Button className="flex items-center p-0 px-5 h-10  rounded-md">
                       <IoMdAdd className="h-5 w-5" />
                        <span className="ml-2">Ajouter un produit</span>
                    </Button>
                </Link>
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
                                ARCHIVED
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2 border-2 border-dashed border-green-600 text-green-600" onClick={() => setShowFilters(!showFilters)}>
                                PINNED
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
                    <DataTable columns={columns} data={data} baseUrl="/admin/products/" />
                    <Pagination meta={props?.products} />
                </div>
            ) : (
                <div className="container py-2">No data available.</div>
            )}
        </>
    );
}


Products.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Products;