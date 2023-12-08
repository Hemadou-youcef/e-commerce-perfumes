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
import { AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { FaAngleDown, FaCheck, FaSave } from "react-icons/fa";

// Style
import sheetDialog from '@/styles/dialog.module.css'
import { IoClose } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons";
import SelectProductSheet from "@/components/dashboard/order/selectProductSheet";

interface FormData {
    name: string;
    quantity: string;
    price: number;
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
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: "",
        quantity: "",
        price: 1,
        product_id: "",
    });
    const [totalPrice, setTotalPrice] = useState(1)
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


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('reception.store'));
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
    
    const selectProduct = (product: any) => {
        console.log(product)
        setSelectedProduct({
            label: product.name,
            value: product.id,
            id: product.id,
            category: product.category,
            status: product.status,
            quantity: product.quantity + " " + product.unit
        })
        setData("product_id", product.id)
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/receptions">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Réceptions</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter une réception</h2>
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
                            onClick={(e) => post(route('reception.store'))}
                            disabled={processing || data.name === "" || data.quantity === "" || data.price <= 0 || data.product_id === ""}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <FaSave className="text-lg" />}

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
                            {errors.product_id && (
                                <p className="text-xs font-bold text-red-500">{errors.product_id}</p>
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
                                {errors.name && (
                                    <p className="text-xs font-bold text-red-500">{errors.name}</p>
                                )}
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
                                {errors.quantity && (
                                    <p className="text-xs  text-red-500">{errors.quantity}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-base"> Prix Total </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={totalPrice}
                                    min={1}
                                    onChange={(e) => {
                                        setTotalPrice(parseInt(e.target.value))
                                        setData("price", parseInt(e.target.value) / parseInt(data.quantity))
                                    }}
                                />
                                {errors.price && (
                                    <p className="text-xs  text-red-500">{errors.price}</p>
                                )}
                            </div>
                        </div>

                    </div>
                </form >
                {openSheet && (
                    <SelectProductSheet
                        openSheet={openSheet}
                        setOpenSheet={setOpenSheet}
                        setSelectedProduct={selectProduct}
                    />
                )}
                
            </div >
        </>
    );
}

ReceptionForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default ReceptionForm;