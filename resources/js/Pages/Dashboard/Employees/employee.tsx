import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, router } from "@inertiajs/react";
import { useState } from "react";


// Shadcn Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";

// Icons
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { BsFillTelephoneOutboundFill, BsPersonBadgeFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { RiAdminFill } from "react-icons/ri";
import { useToast } from "@/shadcn/ui/use-toast";
import { TbExternalLink } from "react-icons/tb";

// Types
const Client = ({ ...props }) => {
    console.log(props?.employee)
    const [data, setData] = useState(props?.employee)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const role = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        let Icon: JSX.Element = <></>;
        switch (data?.role) {
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

    const canDeleteAndEdit = () => {
        const rules = [
            props?.auth?.user?.role == 4,
            props?.auth?.user?.role == 3 && data?.role == 2,
        ]
        return rules.some((rule) => rule)
    }
    const handleDeleteEmployee = () => {
        setDeleteLoading(true)
        router.delete(route('employee.destroy', data?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: 'Le Utilisateur a été supprimé avec succès',
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la suppression du Utilisateur',
                    duration: 5000,
                })
            },
            onFinish: () => {
                setDeleteLoading(false)
            },
        })
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/employees">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Utilisateurs</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">
                    {data?.first_name} {data?.last_name}
                </h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                    <div className="flex flex-col text-center md:text-left">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                            {data?.first_name} {data?.last_name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {data?.username}
                        </p>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        {canDeleteAndEdit() && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="group p-1 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                        <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Supprimer</p>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Supprimer L'Utilisateur
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer cette Utilisateur ? Cette action est irréversible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteEmployee()}
                                        >
                                            Continuer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        {canDeleteAndEdit() && (
                            <Link href={`/dashboard/employees/${data?.id}/edit`}>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                >
                                    <LiaEdit className="text-2xl" />
                                    <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Modifier</p>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Rôle :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            {role()}
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Numéro :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {data?.phone}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Address :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <IoLocationSharp className="text-lg text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {data?.address}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date De Inscription :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {formatDate(data?.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 mt-2">
                    <Tabs defaultValue="confirmed_orders" className="w-full">
                        <TabsList className="flex h-auto flex-col md:flex-row justify-start items-center gap-2 bg-transparent  overflow-x-auto">
                            {[3, 4].includes(data.role) && (
                                <TabsTrigger value="confirmed_orders" className="w-52  border-b rounded-none">Les commandes confirmées</TabsTrigger>
                            )}
                            <TabsTrigger value="delivered_orders" className="w-52  border-b rounded-none">Les commandes livrées</TabsTrigger>
                            {[3, 4].includes(data.role) && (
                                <TabsTrigger value="cancelled_orders" className="w-52  border-b rounded-none">Les commandes annulées</TabsTrigger>
                            )}
                        </TabsList>
                        <TabsContent value="confirmed_orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-16">Client</TableHead>
                                            <TableHead className="w-32">La commande</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.confirmed_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/client/${order.user_id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/orders/${order.id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(data?.confirmed_orders || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                        </TabsContent>
                        <TabsContent value="delivered_orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-16">Client</TableHead>
                                            <TableHead className="w-32">La commande</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.delivered_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/client/${order.user_id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/orders/${order.id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(data?.delivered_orders || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                        </TabsContent>
                        <TabsContent value="cancelled_orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">Client</TableHead>
                                            <TableHead className="w-60">La commande</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.cancelled_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/client/${order.user_id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/orders/${order.id}`}>
                                                        <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(data?.cancelled_orders || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    );
}

Client.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Client;
