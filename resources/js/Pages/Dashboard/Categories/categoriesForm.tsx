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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
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
import { MdEdit } from "react-icons/md";

interface FormData {
    name: string;
    name_ar: string;
}


const CategoriesForm = ({ ...props }) => {
    console.log(props)
    const editMode = props?.category ? true : false;
    const { data, setData, post, patch, processing, errors, reset } = useForm<FormData>({
        name: props?.category?.name || "",
        name_ar: props?.category?.name_ar || "",
    });

    const isAllRulesVerified = () => {
        const rules = [
            data.name.length > 0,
            data.name_ar.length > 0,
        ];
        return rules.every((rule) => rule);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) {
            return patch(route('category.update', props?.category?.id));
        } else {
            post(route('category.store'));
        }

    };
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href={route("categories")}>
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Categories</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                {editMode && <Link href={`/dashboard/categories/${props?.category?.id}`}>
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">
                        {props?.category?.name.length > 16 ? props?.category?.name.substring(0, 16) + "..." : props?.category?.name}
                    </h2>
                </Link>}
                {editMode && <AiOutlineRight className="text-sm text-gray-800" />}
                {editMode && <h2 className="text-sm md:text-lg text-gray-900 font-medium tracking-tight">Modifier un Categorie</h2>}
                {!editMode && <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter un Categorie</h2>}
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                               {editMode ? "Modifier un Categorie" : "Ajouter un Categorie"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {editMode ? "Modifier les informations du Categorie" : "Ajouter un Categorie dans votre base de données"}
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            onClick={(e) => submit(e)}
                            disabled={processing || !isAllRulesVerified()}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : editMode ? <MdEdit className="text-lg" /> : <FaSave className="text-lg" />}
                            <p className="group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">{editMode ? "Modifier" : "Ajouter"}</p>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="p-5 flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base">Nom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />

                                {errors.name ? (errors.name && <p className="text-xs text-red-500">{errors.name}</p>) : 
                                (editMode && data.name.length == 0 && <p className="text-xs text-red-500">Le nom est obligatoire</p>)}

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name_ar" className="text-base">Nom Arabe</Label>
                                <Input
                                    id="name_ar"
                                    type="text"
                                    dir="rtl"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.name_ar}
                                    onChange={(e) => setData("name_ar", e.target.value)}
                                />
                                {errors.name_ar ? (errors.name_ar && <p className="text-xs text-red-500">{errors.name_ar}</p>) :
                                (editMode && data.name_ar.length == 0 && <p className="text-xs text-red-500">Le nom Arabe est obligatoire</p>)} 
                            </div>
                        </div>


                    </div>
                </form >
            </div >
        </>
    );
}

CategoriesForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default CategoriesForm;