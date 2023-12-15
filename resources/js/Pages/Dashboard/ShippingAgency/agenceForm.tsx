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

type tarif = {
    wilaya: string;
    wilaya_ar: string;
    wilaya_code: number;
    home_delivery_price: number;
    agency_delivery_price: number;
}
interface FormData {
    name: string;
    name_ar: string;
}

type SelectOption = {
    id: string;
    value: string;
    label: string;
    category: string;
    status: string;
    quantity: string;
};

const AgenceForm = ({ ...props }) => {
    // console.log(props)
    const { data, setData, post, transform, processing, errors, reset } = useForm<FormData>({
        name: props?.agence?.name || "",
        name_ar: "",
    });
    const [currentTarif, setCurrentTarif] = useState<tarif>({
        wilaya: "",
        wilaya_ar: "",
        wilaya_code: 0,
        home_delivery_price: 0,
        agency_delivery_price: 0,
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('shipping_agency.store'));
    };

    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/agence">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Agences</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter une Agence</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                Ajouter une Agence
                            </h2>
                            <p className="text-sm text-gray-600">
                                Ajouter une Agence à votre liste
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                            onClick={(e) => post(route('shipping_agency.store'))}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <FaSave className="text-lg" />}

                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="grid p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-sm md:text-base"> Nom de la agence </Label>
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
                            <div className="grid gap-3">
                                <Label htmlFor="name_ar" className="text-sm md:text-base"> Nom de la agence en Arabe </Label>
                                <Input
                                    id="name_ar"
                                    type="text"
                                    dir="rtl"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent font-arabic"
                                    value={data.name_ar}
                                    onChange={(e) => setData("name_ar", e.target.value)}
                                />
                                {errors.name_ar && (
                                    <p className="text-xs font-bold text-red-500">{errors.name_ar}</p>
                                )}
                            </div>
                        </div>
                        {false && (<div className="col-span-2">
                            <Label htmlFor="prices" className="text-base"> Tarifs </Label>
                            <div className="flex flex-col gap-2">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead > Wilaya </TableHead>
                                            <TableHead > Wilaya en Arabe </TableHead>
                                            <TableHead > Code Wilaya </TableHead>
                                            <TableHead > Prix de livraison à domicile </TableHead>
                                            <TableHead > Prix de livraison à l'agence </TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                            {/* <TableRow key={index} className="hover:bg-gray-100">
                                                <TableCell className="text-center">
                                                    {price.wilaya}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {price.wilaya_ar}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {price.wilaya_code}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {price.home_delivery_price}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {price.agency_delivery_price}
                                                </TableCell>
                                            </TableRow> */}
                                    </TableBody>

                                </Table>
                                <div className="flex flex-row justify-between items-center gap-2">
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="wilaya"
                                            type="text"
                                            placeholder="Wilaya"
                                            className="w-full h-12 border-2 focus-visible:ring-transparent"
                                            value={currentTarif.wilaya}
                                            onChange={(e) => setCurrentTarif({ ...currentTarif, wilaya: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="wilaya_ar"
                                            type="text"
                                            placeholder="Wilaya en Arabe"
                                            className="w-full h-12 border-2 focus-visible:ring-transparent"
                                            value={currentTarif.wilaya_ar}
                                            onChange={(e) => setCurrentTarif({ ...currentTarif, wilaya_ar: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="wilaya_code"
                                            type="number"
                                            placeholder="Code Wilaya"
                                            className="w-full h-12 border-2 focus-visible:ring-transparent"
                                            value={currentTarif.wilaya_code}
                                            onChange={(e) => setCurrentTarif({ ...currentTarif, wilaya_code: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="home_delivery_price"
                                            type="number"
                                            placeholder="Prix de livraison à domicile"
                                            className="w-full h-12 border-2 focus-visible:ring-transparent"
                                            value={currentTarif.home_delivery_price}
                                            onChange={(e) => setCurrentTarif({ ...currentTarif, home_delivery_price: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="agency_delivery_price"
                                            type="number"
                                            placeholder="Prix de livraison à l'agence"
                                            className="w-full h-12 border-2 focus-visible:ring-transparent"
                                            value={currentTarif.agency_delivery_price}
                                            onChange={(e) => setCurrentTarif({ ...currentTarif, agency_delivery_price: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCurrentTarif({
                                                    wilaya: "",
                                                    wilaya_ar: "",
                                                    wilaya_code: 0,
                                                    home_delivery_price: 0,
                                                    agency_delivery_price: 0,
                                                })
                                            }}
                                        >
                                            Ajouter
                                        </Button>
                                    </div>


                                </div>

                            </div>
                        </div>
                        )}
                    </div>
                </form >

            </div >
        </>
    );
}

AgenceForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default AgenceForm;