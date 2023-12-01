
// React Components
import { useEffect, useState } from "react";

// Inertia Components
import { Link, router } from "@inertiajs/react";

// Main Components
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

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
import { AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineSystemSecurityUpdateGood, MdSecurityUpdateWarning } from "react-icons/md";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaFemale, FaMale } from "react-icons/fa";

const Client = ({ ...props }) => {
    console.log(props)
    const [client, setClient] = useState(props?.client)
    const [confirmeloading, setConfirmeloading] = useState(false)
    const [deleteloading, setDeleteloading] = useState(false)

    useEffect(() => {
        setClient(props?.client)
    }, [props.client])

    const role = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        let Icon: JSX.Element = <></>;
        switch (client?.role) {
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

    const confirmClient = () => {
        setConfirmeloading(true)
        router.post(route('confirm_account', { id: client?.id }), {}, {
            onSuccess: () => {
                setConfirmeloading(false)
                setClient({ ...client, role: 1 })
            },
            onError: () => {
                setConfirmeloading(false)
            }
        })
    }
    const deleteClient = () => {
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/clients">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Clients</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">
                    {client?.first_name} {client?.last_name}
                </h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                    <div className="flex flex-col text-center md:text-left">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight">{client?.first_name} {client?.last_name}</h2>
                        <p className="text-sm text-gray-600">{client?.username}</p>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        {[3, 4].includes(props?.auth?.user?.role) &&
                            <Button
                                variant="outline"
                                className="flex items-center w-44 h-9 space-x-2 border-transparent bg-transparent border-red-600 text-red-600 hover:text-red-700"
                                onClick={() => deleteClient()}
                                disabled={deleteloading}
                            >
                                <span className="text-sm font-medium">
                                    Supprimer Client
                                </span>
                                {deleteloading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-xl" />}
                            </Button>
                        }
                        {[3, 4].includes(props?.auth?.user?.role) && client?.role == 0 && (
                            <Button
                                variant="outline"
                                className="flex items-center w-44 h-9 space-x-2 border-transparent bg-transparent border-green-600 text-green-600 hover:text-green-700"
                                onClick={() => confirmClient()}
                                disabled={confirmeloading}
                            >
                                <span className="text-sm font-medium">Confirmer Client</span>
                                {confirmeloading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineCheckCircle className="text-xl" />}
                            </Button>
                        )}

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
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Genre :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            {client?.gender == "male" ? (
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <FaMale className="text-xl text-blue-600" />
                                    <p className="px-3 py-1 rounded-sm text-xs font-medium text-white bg-blue-600 uppercase ">
                                        Homme
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <FaFemale className="text-xl text-pink-600" />
                                    <p className="px-3 py-1 rounded-sm text-xs font-medium text-white bg-pink-600 uppercase ">
                                        Femme
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Numéro :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {client?.phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Address :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <IoLocationSharp className="text-lg text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {client?.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Date De Inscription :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {client?.created_at}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 px-5 mt-2">
                    <Tabs defaultValue="orders" className="w-full">
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent">
                            <TabsTrigger value="orders" className="w-52 border-b rounded-none">Les commandes</TabsTrigger>
                            <TabsTrigger value="bookmarks" className="w-52  border-b rounded-none">Signets</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">User</TableHead>
                                            <TableHead className="w-60">quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(client?.orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.total} {client?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(client?.orders || []).length === 0 && (
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
                        <TabsContent value="bookmarks">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">Produit</TableHead>
                                            <TableHead className="w-60">Date de création</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(client?.bookmarks || []).map((bookmark, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{bookmark.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{bookmark.product_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{bookmark.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(client?.bookmarks || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
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