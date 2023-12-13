import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { CgProfile } from "react-icons/cg";

// Shadcn
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
import { useTranslation } from "react-i18next";


// Types
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
const ProfileEdit = ({ ...props }) => {
    console.log(props?.auth?.user);
    const { data, setData, patch, transform, processing, errors, reset } = useForm<FormData>({
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

    const { t, i18n } = useTranslation()

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
            case 0:
                text = "GUEST";
                color = "bg-gray-600";
                Icon = <MdSecurityUpdateWarning className="text-xl text-gray-600" />
                break;
            case 1:
                text = "CLIENT";
                color = "bg-green-600";
                Icon = <MdOutlineSystemSecurityUpdateGood className="text-xl text-green-600" />
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
            transform((data: any) => {
                let data_ = { ...data };
                if (data_.new_password.length === 0) {
                    const { new_password, new_password_confirmation, ...rest } = data_;
                    return rest;
                }
            });
            patch(route('profile.update'), {
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
            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                <CgProfile className="h-12 w-12 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                {t("profile_page.title")}
                </h1>
            </div>
            <div className="container mx-auto px-5 py-5 font-sans rtl:font-arabic">
                <form onSubmit={submit} className="w-full">
                    <div className=" border-2 rounded-md grid mx-auto p-0 bg-white gap-5">
                        <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                            <div className="flex flex-row justify-start items-center gap-4">
                                <div className="flex justify-center items-center w-12 h-12 rounded-full  text-white text-2xl font-bold">
                                    <CgProfile className="h-12 w-12 text-gray-900" />
                                </div>
                                <div className="flex flex-col text-center md:text-left">
                                    <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                        {t("profile_page.title")}
                                        {/* Mon profile */}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {t("profile_page.sub_title")}
                                        {/* Modifier votre profile */}
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
                                    <Label htmlFor="name" className="text-base">
                                        {t("profile_page.first_name")}
                                        {/* Nom */}
                                    </Label>
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
                                    <Label htmlFor="name" className="text-base">
                                        {t("profile_page.last_name")}
                                        {/* Prénom */}
                                    </Label>
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
                                <Label htmlFor="phone" className="text-base">
                                    {t("profile_page.phone")}
                                    {/* Téléphone */}
                                </Label>
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
                                <Label htmlFor="address" className="text-base">
                                    {t("profile_page.address")}
                                    {/* Address */}
                                </Label>
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
                                <RadioGroup defaultValue={data.gender} className="flex justify-center md:justify-start rtl:md:justify-end gap-5"
                                    onValueChange={(v: 'male' | 'female') => setData('gender', v)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" className="w-7 h-7 rounded-lg" />
                                        <Label htmlFor="male" className="cursor-pointer text-lg">
                                            {t("global.male")}
                                            {/* Male */}
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" className="w-7 h-7 rounded-lg" />
                                        <Label htmlFor="female" className="cursor-pointer text-lg">
                                            {t("global.female")}
                                            {/* Female */}
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="new_password" className="text-base">
                                    {t("profile_page.new_password")}
                                    {/* Nouveau mot de passe */}
                                </Label>
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
                                <Label htmlFor="new_password_confirmation" className="text-base">
                                    {t("profile_page.new_password_confirmation")}
                                    {/* Confirmation du nouveau mot de passe */}
                                </Label>
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
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">
                                    {t("profile_page.name")}
                                    {/* Nom et prénom */}
                                </h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.first_name} {data?.last_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">
                                    {t("profile_page.role")}
                                    {/* Rôle */}
                                </h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    {role()}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">
                                    {t("profile_page.phone")}
                                    {/* Téléphone */}
                                </h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">
                                    {t("profile_page.address")}
                                    {/* Address */}
                                </h1>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm font-bold text-gray-500">
                                        {data?.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                <h1 className="text-sm font-medium md:w-40 text-gray-800">
                                    {t("profile_page.gender")}
                                    {/* Genre */}
                                </h1>
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
                            <div className={`flex flex-row justify-start items-center gap-2 ${i18n.dir() === "rtl" ? "font-arabic" : "font-sans"}`}>
                                <MdSecurityUpdateWarning className="text-xl text-gray-600" />
                                <h1 className="text-lg font-medium text-gray-900">
                                    {t("profile_page.confirm_password")}
                                    {/* Confirmation du mot de passe */}
                                </h1>
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
                        <DialogFooter className={i18n.dir() === "rtl" ? "font-arabic" : "font-sans"}>
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirmPassword(false)}
                            >
                                {t("global.cancel")}
                                {/* Annuler */}
                            </Button>
                            <Button
                                type="submit"
                                onClick={(e) => submit(e)}
                            >
                                {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : t("global.confirm")}
                            </Button>

                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
ProfileEdit.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default ProfileEdit;