import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";


// Shadcn Components
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
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group"
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";


// Icons
import { AiOutlineRight } from "react-icons/ai";
import { FaAngleDown, FaCheck, FaSave } from "react-icons/fa";

// Style
import sheetDialog from '@/styles/dialog.module.css'
import { IoClose } from "react-icons/io5";

interface FormData {
    name: string;
    quantity: string;
    price: string;
    product_id: string;
}

type SelectOption = {
    id: string;
    value: string;
    label: string;
    category: string;
    status: string;
    quantity: string;
};

const ReceptionForm = ({ ...props }) => {
    // console.log(props)
    // REGISTER NEW RECEPTION
    // WITH COLUMN :
    // - Name
    // - Reception ID
    // - Quantity
    // - Price
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: "",
        quantity: "",
        price: "",
        product_id: "",
    });
    const [dataProducts, setDataProducts] = useState<SelectOption[]>(() => {
        return props?.products.map((product: any) => {
            return {
                id: product.id,
                value: product.id,
                label: product.name,
                category: product.category,
                status: product.status,
                quantity: product.quantity + " " + product.unit
            }
        })

    })

    const [openSheet, setOpenSheet] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<SelectOption | null>(null)
    const [checkBoxSelectedProduct, setCheckBoxSelectedProduct] = useState<SelectOption | null>(null)
    const [search, setSearch] = useState<string>("")


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('receptions.store'));
    };

    const status = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        switch (selectedProduct?.status) {
            case "archived":
                text = "ARCHIVED";
                color = "bg-gray-600";

                break;
            case "published":
                text = "PUBLISHED";
                color = "bg-green-600";
                break;
            case "pinned":
                text = "PINNED";
                color = "bg-blue-600";
                break;
            default:
                text = "PUBLISHED";
                color = "bg-green-600";
                break;
        }
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                <p className={`px-3 py-1 rounded-sm text-xs font-medium text-white uppercase ${color}`}>
                    {text}
                </p>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/receptions">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Réceptions</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">Ajouter une réception</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                Ajouter une réception
                            </h2>
                            <p className="text-sm text-gray-600">
                                Ajouter une réception dans la base de données
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                            onClick={() => submit}
                            disabled={data.name === "" || data.quantity === "" || data.price === "" || data.product_id === ""}
                        >
                            <FaSave className="text-lg" />
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                        <div className="lg:col-span-2 flex flex-col gap-3">
                            <Label htmlFor="price" className="text-base"> Product </Label>
                            <div
                                className="h-12 flex flex-row justify-between items-center gap-2 border-2 rounded-md px-2 cursor-pointer"
                                onClick={() => setOpenSheet(true)}
                            >
                                <p className="w-full focus-visible:ring-transparent border-0">
                                    {selectedProduct?.label || 'Choisir un produit'}
                                </p>
                                <FaAngleDown className="text-lg text-gray-800" />
                            </div>
                            {/* PRODUCT INFORMATION */}
                            {selectedProduct && (
                                <div className="flex flex-col gap-4 py-5 px-5 ">
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium w-20 text-gray-800">ID :</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <p className="text-sm font-bold text-gray-500">{selectedProduct?.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium w-20 text-gray-800">Category :</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <p className="text-sm font-bold text-gray-500">{selectedProduct?.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium w-20 text-gray-800">Status :</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <div className="text-sm font-bold text-gray-500">{status()}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium w-20 text-gray-800">Quantité</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <p className="text-sm font-bold text-gray-500">{selectedProduct?.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base"> Nom de la réception </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity" className="text-base"> Quantité Ajouter </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.quantity}
                                    min={1}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-base"> Prix de unité</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.price}
                                    min={1}
                                    onChange={(e) => setData("price", e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                </form >
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetContent className={`w-[800px] sm:max-w-none p-0 ${sheetDialog.dialogSheet}`}>
                        <SheetHeader className="h-screen relative">
                            <SheetTitle className="px-5 pt-3">

                                {/* <Separator className="mt-2"/> */}
                                <div className="flex flex-row justify-between items-center gap-2 p-0">
                                    <h2 className="text-2xl text-gray-900 font-bold tracking-tight">
                                        Choisir un produit
                                    </h2>
                                    <div className="flex flex-row justify-between items-center gap-2">
                                        <Input
                                            id="search"
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Rechercher un produit"
                                            className="w-96 h-12 rounded-3xl border-2 focus-visible:ring-transparent"
                                        />
                                        <Button
                                            variant="outline"
                                            className="h-11 w-11 p-3 rounded-full border-2 border-gray-600 gap-2"
                                            onClick={() => {
                                                setOpenSheet(false)
                                                setSelectedProduct(checkBoxSelectedProduct)
                                                setData("product_id", checkBoxSelectedProduct?.id || "")
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

                                        {(dataProducts || []).filter((product: any) => product.label.toLowerCase().includes(search.toLowerCase())).map((product: any, index: number) => (
                                            <TableRow
                                                key={index}
                                                className={`hover:bg-gray-50 cursor-pointer ${checkBoxSelectedProduct?.value === product.value ? "bg-gray-100" : ""}`}
                                                onClick={() => setCheckBoxSelectedProduct(product)}
                                            >
                                                <TableCell className="h-12 ">
                                                    <div className="w-6 h-6 flex p-1 flex-row justify-center items-center border-2 border-gray-400 rounded-sm gap-2">
                                                        {checkBoxSelectedProduct?.value === product.value ? <FaCheck className="text-lg text-gray-600" /> : <FaCheck className="text-lg text-gray-600 invisible" />}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{product.label}</TableCell>
                                                <TableCell className="font-bold text-xs">{product.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(dataProducts || []).filter((product: any) => product.label.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>

                                </Table>
                            </div>

                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div >
        </>
    );
}

ReceptionForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default ReceptionForm;