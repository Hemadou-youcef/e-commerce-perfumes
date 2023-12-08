import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import { Separator } from "@/shadcn/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet"
import { Button } from "@/shadcn/ui/button"
import { Input } from "@/shadcn/ui/input"

// React
import { useLayoutEffect, useState } from "react";

// Stylesheet
import sheetDialog from '@/styles/dialog.module.css'

// Icons
import { FaCheck } from "react-icons/fa";
import { router } from "@inertiajs/react";

// Types
type product = {
    id: string,
    name: string,
    description: string,
    description_ar: string,
    status: string,
    unit: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
}

const SelectProductSheet = ({ openSheet, setOpenSheet, selectedProducts, setSelectedProduct }: any) => {

    const [checkBoxSelectedProduct, setCheckBoxSelectedProduct] = useState<product>()
    const [products, setProducts] = useState<any>([])
    const [search, setSearch] = useState<string>("")
    const [delayedSearch, setDelayedSearch] = useState<string | undefined>("" || undefined);
    const [searchLoading, setSearchLoading] = useState<boolean>(false)

    useLayoutEffect(() => {
        const getData = setTimeout(() => {
            setDelayedSearch(search);
            searchProduct(search)
        }, 500);
        return () => clearTimeout(getData);
    }, [search]);

    const searchProduct = (query: string | undefined) => {
        setSearchLoading(true)
        router.get(route(route().current() || ""), { q: query }, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page: any) => {
                setProducts(page.props.products)
                setSearchLoading(false)
            },
            onError: () => {
                setSearchLoading(false)
            }
        })
    }

    return (
        <>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetContent className={`w-full md:w-[768px] sm:max-w-none p-0 ${sheetDialog.dialogSheet}`}>
                    <SheetHeader className="h-screen relative">
                        <SheetTitle className="px-5 pt-3">

                            {/* <Separator className="mt-2"/> */}
                            <div className="mt-7 md:mt-0 flex flex-col md:flex-row justify-between items-center gap-2 p-0">
                                <h2 className="md:text-2xl text-gray-900 font-bold tracking-tight">
                                    Choisir un produit
                                </h2>
                                <div className="w-full md:w-auto flex flex-row justify-between items-center gap-2">
                                    <Input
                                        id="search"
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Rechercher un produit"
                                        className="md:w-96 h-12 rounded-3xl border-2 focus-visible:ring-transparent"
                                    />
                                    <Button
                                        variant="outline"
                                        className="h-11 w-11 p-3 rounded-full border-2 border-gray-600 gap-2"
                                        onClick={() => {
                                            setOpenSheet(false)
                                            setSelectedProduct(checkBoxSelectedProduct)
                                            router.get(route(route().current() || ""),{},{preserveState: true, preserveScroll: true})
                                        }}
                                    >
                                        {/* <span className="text-lg text-gray-600">
                                            Choisir
                                        </span> */}
                                        <FaCheck className="text-lg text-gray-600" />
                                    </Button>
                                </div>

                            </div>

                        </SheetTitle>
                        <div className="overflow-y-auto border p-2" style={{ scrollbarGutter: 'stable' }}>
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                        <TableHead className="w-16">ID</TableHead>
                                        <TableHead className="w-9/12">Produit</TableHead>
                                        <TableHead>Quantité</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {searchLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                Chargement...
                                            </TableCell>
                                        </TableRow>
                                    ) : (products || []).map((product: any, index: number) => (
                                        <TableRow
                                            key={index}
                                            className={`hover:bg-gray-50 cursor-pointer ${checkBoxSelectedProduct?.id === product.id ? "bg-gray-100" : ""}`}
                                            onClick={() => setCheckBoxSelectedProduct(product)}
                                        >
                                            <TableCell className="h-12 ">
                                                <div className="w-6 h-6 flex p-1 flex-row justify-center items-center border-2 border-gray-400 rounded-sm gap-2">
                                                    {checkBoxSelectedProduct?.id === product.id ? <FaCheck className="text-lg text-gray-600" /> : <FaCheck className="text-lg text-gray-600 invisible" />}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-bold text-xs">{product.name}</TableCell>
                                            <TableCell className="font-bold text-xs">{product.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                    {!searchLoading && (products).length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                {search.length > 0 ? "Aucun produit trouvé" : "Rechercher un produit"}
                                            </TableCell>
                                        </TableRow>
                                    )}


                                </TableBody>

                            </Table>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </>
    );
}

export default SelectProductSheet;