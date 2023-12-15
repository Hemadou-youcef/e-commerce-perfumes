import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { CgProfile } from "react-icons/cg";

// Shadcn
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group"
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"


// Icons
import { FormEventHandler, useEffect, useState } from "react";
import { MdEdit, MdOutlineSystemSecurityUpdateGood, MdSecurityUpdateWarning } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BsPersonBadgeFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";


interface FormData {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    gender: string;
    password: string;
    new_password: string;
    new_password_confirmation: string;
}

const Profile = ({ ...props }) => {
    console.log(props?.auth?.user);
    const { data, setData, patch,transform, processing, errors, reset } = useForm<FormData>({
        first_name: props?.auth?.user?.first_name,
        last_name: props?.auth?.user?.last_name,
        phone: props?.auth?.user?.phone,
        gender: props?.auth?.user?.gender,
        address: props?.auth?.user?.address,
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setData(data => ({
            ...data,
            first_name: props?.auth?.user?.first_name,
            last_name: props?.auth?.user?.last_name,
            phone: props?.auth?.user?.phone,
            gender: props?.auth?.user?.gender,
            address: props?.auth?.user?.address,
            password: "",
            new_password: "",
            new_password_confirmation: "",
        }));

    }, [props?.auth?.user]);

    const isAllRulesVerified = () => {
        const rules = [
            data.first_name.length > 0,
            data.last_name.length > 0,
            data.phone.length > 0,
            data.address.length > 0,
            data.gender.length > 0,
            data.new_password.length > 7 || data.new_password.length === 0,
            data.new_password_confirmation.length > 7 || data.new_password_confirmation.length === 0,
            data.new_password === data.new_password_confirmation,
        ];
        return rules.every((rule) => rule);
    }

    const role = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        let Icon: JSX.Element = <></>;
        switch (props?.auth?.user?.role) {
            case 2:
                text = "EMPLOYEE";
                color = "bg-blue-600";
                Icon = <BsPersonBadgeFill className="text-xl text-blue-600" />
                break;
            case 3:
                text = "ADMIN";
                color = "bg-purple-600";
                Icon = <RiAdminFill className="text-xl text-purple-600" />
                break;

        }
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                {Icon}
                <p className={`px-3 py-1 rounded-sm text-xs font-medium text-white uppercase ${color}`}>
                    {text}
                </p>
            </div>
        )
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode && showConfirmPassword) {
            transform((data : any) => {
                let data_ = { ...data };
                if (data_.new_password.length === 0) {
                    const { new_password, new_password_confirmation, ...rest } = data_;
                    return rest;
                }
            });
            patch(route('dashboard_profile.update'), {
                onSuccess: () => {
                    reset();
                    setEditMode(false);
                    setShowConfirmPassword(false);
                }
            });
        } else if (editMode && !showConfirmPassword) {
            setShowConfirmPassword(true);
        } else {
            setEditMode(true);
        }
    }

    return (
        <>
            <div className="md:container md:mx-auto md:px-5 md:py-5">
                <form onSubmit={submit} className="w-full">
                    <div className=" border-2 rounded-md grid mx-auto p-0 md:my-5 bg-white gap-5">
                        <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                            <div className="flex flex-row justify-start items-center gap-4">
                                <div className="flex justify-center items-center w-12 h-12 rounded-full  text-white text-2xl font-bold">
                                    <CgProfile className="h-12 w-12 text-gray-900" />
                                </div>
                                <div className="hidden md:flex flex-col text-center md:text-left">
                                    <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                        Mon profile
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Modifier votre profile
                                    </p>
                                </div>
                            </div>
                            {/* ACTIONS */}
                            <div className="flex justify-end gap-2">
                                {editMode && <Button
                                    variant="outline"
                                    className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                                    onClick={(e) => setEditMode(!editMode)}
                                >
                                    <IoClose className="text-lg" />
                                </Button>}
                                <Button
                                    variant="outline"
                                    className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                                    onClick={(e) => submit(e)}
                                    disabled={processing || !isAllRulesVerified()}
                                >
                                    {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : !editMode ? <MdEdit className="text-lg" /> : <FaSave className="text-lg" />}

                                </Button>
                            </div>
                        </div>
                        {editMode && <div className="grid gap-5 px-5 pb-5 pt-0">
                            <div className="grid gap-3 md:grid-cols-2">
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
                                <Label htmlFor="phone" className="text-base">Téléphone</Label>
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
                                <RadioGroup defaultValue={data.gender} className="flex justify-center md:justify-start gap-5"
                                    onValueChange={(v: 'male' | 'female') => setData('gender', v)}>
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

                            <div className="grid gap-3">
                                <Label htmlFor="new_password" className="text-base">Nouveau mot de passe</Label>
                                <Input
                                    id="new_password"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.new_password}
                                    onChange={(e) => setData("new_password", e.target.value)}
                                />
                                {errors.new_password && <p className="text-xs text-red-500">{errors.new_password}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="new_password_confirmation" className="text-base">Confirmation du nouveau mot de passe</Label>
                                <Input
                                    id="new_password_confirmation"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.new_password_confirmation}
                                    onChange={(e) => setData("new_password_confirmation", e.target.value)}
                                />
                                {errors.new_password_confirmation && <p className="text-xs text-red-500">{errors.new_password_confirmation}</p>}
                            </div>


                        </div>}
                        {!editMode && <div className="grid gap-5 px-5 pb-5 pt-0">
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Nom</h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.first_name} {data?.last_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Role</h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    {role()}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Téléphone</h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Address</h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Genre</h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.gender}
                                    </p>
                                </div>
                            </div>

                        </div>}
                    </div>
                </form>
            </div>
            <Dialog open={showConfirmPassword}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <MdSecurityUpdateWarning className="text-xl text-gray-600" />
                                <h1 className="text-lg font-medium text-gray-900">Confirmation du mot de passe</h1>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            <div className="grid my-5">
                                <Input
                                    id="password"
                                    type="password"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    onKeyDown={(key) => {
                                        if (key.key === "Enter") {
                                            submit(key);
                                        }
                                    }}
                                />
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>
                        </DialogDescription>
                        <DialogFooter className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirmPassword(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                onClick={(e) => submit(e)}
                            >
                                {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : "Confirmer"}
                            </Button>

                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Profile;