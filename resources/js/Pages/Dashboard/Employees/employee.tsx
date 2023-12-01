import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link } from "@inertiajs/react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";

// Icons
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { BsFillTelephoneOutboundFill, BsPersonBadgeFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { RiAdminFill } from "react-icons/ri";

// Types
const Client = ({ ...props }) => {
    const [data, setData] = useState(props?.employee)

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

    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/employees">
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
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <AiOutlineDelete className="text-2xl" />
                        </Button>
                        <Link href={`/admin/employees/${data?.id}/edit`}>
                            <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                                <LiaEdit className="text-2xl" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Rôle :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            {role()}
                        </div>
                    </div>
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
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent  overflow-x-auto">
                            <TabsTrigger value="confirmed_orders" className="w-52  border-b rounded-none">Les commandes confirmées</TabsTrigger>
                            <TabsTrigger value="delivered_orders" className="w-52  border-b rounded-none">Les commandes livrées</TabsTrigger>
                            <TabsTrigger value="canceled_orders" className="w-52  border-b rounded-none">Les commandes annulées</TabsTrigger>
                        </TabsList>
                        <TabsContent value="confirmed_orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">User</TableHead>
                                            <TableHead className="w-60">quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.confirmed_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
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
                                            <TableHead className="w-40">User</TableHead>
                                            <TableHead className="w-60">quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.delivered_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
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
                        <TabsContent value="canceled_orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">User</TableHead>
                                            <TableHead className="w-60">quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.canceled_orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(data?.canceled_orders || []).length === 0 && (
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