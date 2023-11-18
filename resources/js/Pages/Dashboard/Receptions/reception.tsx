// React Components
import { useState } from "react";

// Inertia Components
import { Link } from "@inertiajs/react";

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
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

// Types
import { ReceptionInfo } from "@/components/columns/reception";
import { FaChevronRight } from "react-icons/fa";


const Reception = ({ ...props }) => {
    console.log(props?.reception)
    const [reception, setReception] = useState<ReceptionInfo | null>(props?.reception)

    const status = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        switch (reception?.product?.status) {
            case "archived":
                text = "ARCHIVED";
                color = "bg-gray-600";

                break;
            case "published":
                text = "PUBLISHED";
                color = "bg-green-600";
                break;
            case "pinned":
                text = "PINNED";
                color = "bg-blue-600";
                break;
            default:
                text = "PUBLISHED";
                color = "bg-green-600";
                break;
        }
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                <p className={`px-3 py-1 rounded-sm text-xs font-medium text-white uppercase ${color}`}>
                    {text}
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/receptions">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Réceptions</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">{reception?.name}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">{reception?.name}</h2>
                            <p className="text-sm text-gray-600">{reception?.product?.name}</p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">

                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 " disabled={(reception?.reservations || []).length > 0}>
                            <AiOutlineDelete className="text-2xl" />
                        </Button>
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Quantité reçue :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{reception?.quantity} {reception?.product?.unit}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Prix De Unit :</h1>
                        <p className="text-sm font-bold text-green-500">{reception?.price} DA</p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Date De Création :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">{reception?.created_at}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Créer Par :</h1>
                        <Link href={`/users/${reception?.user?.id}`} className="flex flex-row justify-start items-center gap-2">
                            <CgProfile className="text-xl text-blue-800" />
                            <p className="text-sm font-bold text-blue-600">
                                {reception?.user?.first_name} {reception?.user?.last_name}
                            </p>
                        </Link>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 px-5 mt-2">
                    <Tabs defaultValue="product_information" className="w-full">
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent">
                            <TabsTrigger value="product_information" className="w-52 border-b rounded-none">Information Du Produit</TabsTrigger>
                            <TabsTrigger value="reservation" className="w-52  border-b rounded-none">Les Réservation</TabsTrigger>
                        </TabsList>
                        <TabsContent value="product_information">
                            <div className="flex flex-col gap-4 py-5 px-5 ">
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <h1 className="text-sm font-medium w-40 text-gray-800">Nom du Produit :</h1>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <p className="text-sm font-bold text-gray-500">#{reception?.product?.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <h1 className="text-sm font-medium w-40 text-gray-800">Category :</h1>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <p className="text-sm font-bold text-gray-500">{reception?.product?.category}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <h1 className="text-sm font-medium w-40 text-gray-800">Status :</h1>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <div className="text-sm font-bold text-gray-500">{status()}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <h1 className="text-sm font-medium w-40 text-gray-800">Quantité Total</h1>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <p className="text-sm font-bold text-gray-500">{reception?.product?.quantity} {reception?.product?.unit}</p>
                                    </div>
                                </div>
                                <Link href={`/admin/products/${reception?.product?.id}`}>
                                    <Button variant="outline" className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-800">
                                        <p className="text-sm font-bold text-gray-600">Voir Le Produit</p>
                                        <FaChevronRight className="text-sm text-gray-600" />
                                    </Button>
                                </Link>
                            </div>
                        </TabsContent>
                        <TabsContent value="reservation">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">Command</TableHead>
                                            <TableHead className="w-40">Consommation</TableHead>
                                            <TableHead >Date De Réservation</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(reception?.reservations || []).map((reservation, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{reservation.id}</TableCell>
                                                <TableCell className="font-bold text-xs">Command #{reservation.order_product_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{reservation.quantity} {reception?.product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{reservation.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(reception?.reservations || []).length === 0 && (
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

Reception.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Reception;