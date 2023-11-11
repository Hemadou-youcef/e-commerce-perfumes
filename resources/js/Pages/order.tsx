import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { Button } from "@/shadcn/ui/button";

import { Separator } from "@/shadcn/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"

const Order = () => {
    return (
        <>
            <div className="container mx-auto p-0 m-2 border  overflow-hidden">
                {/* SHOW ORDER DETAIL */}
                <div className="flex flex-col">
                    <div className="flex flex-col px-5 py-5">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight">La Commande: CM/123456789</h2>
                        <p className="text-sm text-gray-800">Passé le 12/12/2020</p>
                    </div>

                    <Separator className="" />
                    <div className="flex flex-col gap-4 py-5 px-5 ">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-bold w-52 text-gray-800">Date De Commande :</h1>
                            <p className="text-base font-medium text-gray-500">12/12/2020</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-bold w-52 text-gray-800">Prix Total :</h1>
                            <p className="text-base font-medium text-gray-500">12000 DA</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-bold w-52 text-gray-800">Client :</h1>
                            <p className="text-base font-medium text-gray-500">Youcef Hemadou</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-bold w-52 text-gray-800">Numéro :</h1>
                            <p className="text-base font-medium text-gray-500">0555912812</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-bold w-52 text-gray-800">Address :</h1>
                            <p className="text-base font-medium text-gray-500">Setif</p>
                        </div>
                    </div>
                    <Separator className="mt-0" />
                    <div className="flex flex-col gap-2 px-5 mt-2">
                        <h1 className="text-xl font-bold w-52 text-gray-800">Articles</h1>
                        <div className="w-full md:w-1/2 mb-5 border-2 rounded-lg">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                                        <TableHead className="w-full">Produit</TableHead>
                                        <TableHead className="text-center">Qte</TableHead>
                                        <TableHead className="text-center">Unit</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">INV001</TableCell>
                                        <TableCell>25000000000</TableCell>
                                        <TableCell className="text-center">G</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2  py-2 px-2 bg-gray-100">
                        <Button className="flex items-center h-9 space-x-2 bg-red-500 hover:bg-red-700 active:bg-red-800 text-white rounded-sm">
                            <span className="text-sm font-medium">Rejeter</span>
                        </Button>
                        <Button className="flex items-center h-9 space-x-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-sm">
                            <span className="text-sm font-medium">Confirmer la commande</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Order.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Order;