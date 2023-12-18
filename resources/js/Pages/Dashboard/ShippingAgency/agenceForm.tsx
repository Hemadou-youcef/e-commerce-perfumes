import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Head, Link, useForm } from "@inertiajs/react";
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

interface FormData {
    name: string;
    name_ar: string;
}


const AgenceForm = ({ ...props }) => {
    const editMode = props?.agence ? true : false;
    const { data, setData, post, transform, processing, errors, reset } = useForm<FormData>({
        name: "",
        name_ar: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('shipping_agency.store'));
    };

    return (
        <>
            <Head>
                <title>
                    {editMode ? "Modifier l'Agence" : "Ajouter une Agence"}
                </title>
            </Head>
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
                    </div>
                </form >

            </div >
        </>
    );
}

AgenceForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default AgenceForm;