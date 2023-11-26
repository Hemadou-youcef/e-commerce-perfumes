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
import { AiOutlineRight } from "react-icons/ai";
import { FaAngleDown, FaCheck, FaSave } from "react-icons/fa";

// Style
import sheetDialog from '@/styles/dialog.module.css'
import { IoClose } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons";

interface FormData {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    gender: string;
    username: string;
    password: string;
    password_confirmation: string;
    role: string;
}


const EmployeesForm = ({ ...props }) => {

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        gender: "male",
        username: "",
        password: "",
        password_confirmation: "",
        role: "employee",
    });

    const isAllRulesVerified = () => {
        const rules = [
            data.first_name.length > 2,
            data.last_name.length > 2,
            data.phone.length > 6,
            data.address.length > 3,
            data.gender == "male" || data.gender == "female",
            data.role == "employee" || data.role == "admin",
            data.username.length > 5,
            data.password.length > 5,
            data.password_confirmation == data.password,
        ];
        return rules.every((rule) => rule);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('employee.store'));
    };
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/employees">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Employés</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">Ajouter un Employé</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                Ajouter un Employé
                            </h2>
                            <p className="text-sm text-gray-600">
                                Ajouter un Employé dans votre base de données
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                            onClick={(e) => submit(e)}
                            disabled={processing || !isAllRulesVerified()}
                        >
                            {processing ? <ReloadIcon className="h-5 w-5 animate-spin" /> : <FaSave className="text-lg" />}

                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-5 flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="name" className="text-base">Nom</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full h-12 border-2 focus-visible:ring-transparent"
                                        value={data.first_name}
                                        onChange={(e) => setData("first_name", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name" className="text-base">Prénom</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full h-12 border-2 focus-visible:ring-transparent"
                                        value={data.last_name}
                                        onChange={(e) => setData("last_name", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="phone" className="text-base">Téléphone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="address" className="text-base">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3 pt-3 px-5">
                                <RadioGroup defaultValue="male" className="flex gap-5" onValueChange={(v: 'male' | 'female') => setData('gender', v)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" className="w-7 h-7 rounded-lg" />
                                        <Label htmlFor="male" className="cursor-pointer text-lg">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female"  className="w-7 h-7 rounded-lg"/>
                                        <Label htmlFor="female" className="cursor-pointer text-lg">Female</Label>
                                    </div>
                                </RadioGroup>
                            </div>



                        </div>
                        <div className="p-5 flex flex-col gap-5">
                            <div className="grid gap-3">
                                <Label htmlFor="role" className="text-base">Rôle</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(v: string) => setData('role', v)}
                                >
                                    <SelectTrigger className="w-full h-12">
                                        <SelectValue placeholder="employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="employee">
                                            Employee
                                        </SelectItem>
                                        <SelectItem value="admin" >
                                            Admin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username" className="text-base">Nom d'utilisateur</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.username}
                                    onChange={(e) => setData("username", e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-base">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation" className="text-base">Confirmer le mot de passe</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    );
}

EmployeesForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default EmployeesForm;