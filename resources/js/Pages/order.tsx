

// inertia components
import { Link } from "@inertiajs/react";

// Layouts
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

// shadcn components
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"


// Icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineRight } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

const Order = () => {
    return (
        <>
            {/* TREE */}
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-lg text-gray-900 font-medium tracking-tight">Les Commandes</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">CM/123456789</h2>
            </div>
            <div className="container mx-auto p-0 m-2 border  overflow-hidden">
                {/* SHOW ORDER DETAIL */}
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5">
                        <div className="flex flex-col">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">La Commande: CM/123456789</h2>
                            <p className="text-sm text-gray-600">Passé le 12/12/2020</p>
                        </div>
                        {/* ACTIONS */}
                        <div className="flex justify-end gap-2">
                            <Button className="flex items-center h-9 space-x-2 bg-red-500 hover:bg-red-700 active:bg-red-800 text-white rounded-sm">
                                <span className="text-sm font-medium">Rejeter</span>
                                <AiOutlineCloseCircle className="text-xl" />
                            </Button>
                            <Button className="flex items-center h-9 space-x-2 bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-white rounded-sm">
                                <span className="text-sm font-medium">Confirmer la commande</span>
                                <AiOutlineCheckCircle className="text-xl" />
                            </Button>
                            {/* <Button className="flex items-center h-9 space-x-2 bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-white rounded-sm">
                                <span className="text-sm font-medium">Verify La Disponibilité</span>
                                <BsListCheck className="text-xl" />
                            </Button> */}
                        </div>
                    </div>

                    <Separator className="" />
                    <div className="flex flex-col gap-4 py-5 px-5 ">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-medium w-52 text-gray-800">Date De Commande :</h1>
                            <p className="text-base font-normal text-gray-500">12/12/2020</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-medium w-52 text-gray-800">Prix Total :</h1>
                            <p className="text-base font-normal text-gray-500">12000 DA</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-medium w-52 text-gray-800">Client :</h1>
                            <p className="text-base font-normal text-gray-500">Youcef Hemadou</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-medium w-52 text-gray-800">Numéro :</h1>
                            <p className="text-base font-normal text-gray-500">0555912812</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-base font-medium w-52 text-gray-800">Address :</h1>
                            <p className="text-base font-normal text-gray-500">Setif</p>
                        </div>
                    </div>
                    <Separator className="mt-0" />
                    <div className="flex flex-col gap-2 px-5 mt-2">
                        <Tabs defaultValue="articles" className="w-full">
                            <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent">
                                <TabsTrigger value="articles" className="w-52 border-b rounded-none">Articles</TabsTrigger>
                                <TabsTrigger value="stock" className="w-52  border-b rounded-none">Stock Consommation</TabsTrigger>
                                <TabsTrigger value="benefices" className="w-52  border-b rounded-none">Bénéfices</TabsTrigger>
                            </TabsList>
                            <TabsContent value="articles">
                                <div className="w-full md:w-3/4 mb-5 border-2 rounded-lg">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                <TableHead className="w-auto">Produit</TableHead>
                                                <TableHead>Qte</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead className="text-center w-52">Stock</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">INV001</TableCell>
                                                <TableCell className="font-bold">300 G</TableCell>
                                                <TableCell className="font-bold">1200 DA</TableCell>
                                                <TableCell className="text-center">
                                                    En attente de confirmation
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </Table>
                                </div>
                            </TabsContent>
                            <TabsContent value="stock">
                                {true && (
                                    <div className="flex flex-col justify-center w-full gap-2 px-5 mt-2 p-5">
                                        <p className="text-base text-center font-bold text-gray-800">Verify La Disponibilité D'abord</p>

                                    </div>
                                )}

                            </TabsContent>
                            <TabsContent value="benefices">
                                <div className="flex flex-col justify-center w-full gap-2 px-5 mt-2 p-5">
                                    <p className="text-base text-center font-bold text-gray-800">Verify La Disponibilité D'abord</p>

                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>

                </div>
            </div>
        </>
    );
}

Order.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Order;