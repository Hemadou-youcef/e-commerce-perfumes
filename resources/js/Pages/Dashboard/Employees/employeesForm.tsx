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
import {  FaSave } from "react-icons/fa";

// Style
import { MdEdit } from "react-icons/md";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    username: string;
    password?: string;
    password_confirmation?: string;
    role: string;
}


const EmployeesForm = ({ ...props }) => {
    const editMode = props?.employee ? true : false;
    const { data, setData, post, patch, transform, processing, errors, reset } = useForm<FormData>({
        first_name: props?.employee?.first_name || "",
        last_name: props?.employee?.last_name || "",
        email: props?.employee?.email || "",
        phone: props?.employee?.phone || "",
        address: props?.employee?.address || "",
        gender: props?.employee?.gender || "male",
        username: props?.employee?.username || "",
        password: "",
        password_confirmation: "",
        role: props?.employee?.role?.toString() || "2",
    });

    const isAllRulesVerified = () => {

        const regex = /^[^\s@]+@[^\s@]+$/;
        const messages = [
            "Le nom doit être supérieur à 2 caractères",
            "Le prénom doit être supérieur à 2 caractères",
            "L'email doit être valide",
            "Le numéro de téléphone doit être égale à 10 caractères",
            "L'address doit être supérieur à 3 caractères",
            "le sexe doit être male ou female",
            "Le rôle doit être employee ou admin",
            "Le nom d'utilisateur doit être supérieur à 5 caractères",
            "Le mot de passe doit être supérieur à 7 caractères",
            "Le mot de passe doit être identique",
        ];
        const rules = [
            data.first_name.length > 2,
            data.last_name.length > 2,
            regex.test(data.email),
            data.phone.length == 10,
            data.address.length > 3,
            data.gender == "male" || data.gender == "female",
            data.role == "2" || data.role == "3",
            data.username.length > 5,
            editMode || (data?.password?.length || 0) > 7,
            (data?.password?.length || 0) > 0 ? data.password_confirmation == data.password : editMode,
        ];
        const AllRulesVerified = rules.every((rule) => rule);
        if (AllRulesVerified) {
            return [true, []];
        } else {
            // Get the ALL rules that are not verified
            const notVerifiedRules = rules.map((rule, index) => {
                if (!rule) {
                    return index;
                }
            }).filter((rule) => rule != undefined);
            // Get the messages of the rules that are not verified
            const notVerifiedMessages = notVerifiedRules.map((ruleIndex : any) => messages[ruleIndex]);
            return [false, notVerifiedMessages || []];
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) {
            transform((data) => (
                data?.password?.length == 0 ? { ...data, password: undefined, password_confirmation: undefined } : data
            ))
            return patch(route('employee.update', props.employee.id));
        } else {
            post(route('employee.store'));
        }

    };
    return (
        <>
            <Head>
                <title>
                    {editMode ? "Modifier un Employé" : "Ajouter un Employé"}
                </title>
            </Head>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/employees">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Employés</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                {editMode && <Link href={`/dashboard/employees/${props?.employee?.id}`}>
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">
                        {props?.employee?.first_name} {props?.employee?.last_name}
                    </h2>
                </Link>}
                {editMode && <AiOutlineRight className="text-sm text-gray-800" />}
                {editMode && <h2 className="text-sm md:text-lg text-gray-900 font-medium tracking-tight">Modifier un Employé</h2>}
                {!editMode && <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter un Employé</h2>}
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">

                                {editMode ? "Modifier un Employé" : "Ajouter un Employét"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {editMode ? "Modifier les informations de l'employé" : "Ajouter un Employé dans votre base de données"}
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            onClick={(e) => submit(e)}
                            disabled={processing || !isAllRulesVerified()[0]}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : editMode ? <MdEdit className="text-lg" /> : <FaSave className="text-lg" />}
                            <p className="group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">{editMode ? "Modifier" : "Ajouter"}</p>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="flex flex-col gap-2 px-5 pb-5 border-b border-gray-200">
                        {!isAllRulesVerified()[0] && <div className="flex flex-col gap-2">
                            {(isAllRulesVerified()[1] as string[]).map((message, index) => (
                                <p key={index} className="text-xs text-red-500">*{message}</p>
                            ))}
                        </div>}
                    </div>
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
                                    {errors.first_name && <p className="text-xs text-red-500">{errors.first_name}</p>}
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
                                    {errors.last_name && <p className="text-xs text-red-500">{errors.last_name}</p>}
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-base">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="phone" className="text-base">Téléphone (10 chiffres)</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
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
                                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                            </div>

                            <div className="grid gap-3 pt-3 px-5">
                                <RadioGroup defaultValue="male" className="flex gap-5" onValueChange={(v: 'male' | 'female') => setData('gender', v)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" className="w-7 h-7 rounded-lg" />
                                        <Label htmlFor="male" className="cursor-pointer text-lg">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" className="w-7 h-7 rounded-lg" />
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
                                        <SelectItem value="2">
                                            Employee
                                        </SelectItem>
                                        <SelectItem value="3" >
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
                                {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
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
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                {!editMode && data?.password?.length != 0 && ((data?.password?.length || 0) > 7 ? <p className="text-xs text-green-500">Mot de passe valide</p> : <p className="text-xs text-red-500">Mot de passe il faudrait supérieur à 7 caractères</p>)}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-base">Confirmer le mot de passe</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                />
                                {(data?.password?.length || 0) > 7 && (data?.password_confirmation?.length || 0) > 0 && (data.password_confirmation != data.password) && <p className="text-xs text-red-500">Mot de passe non identique</p>}

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