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
import { AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineUnarchive } from "react-icons/md";

// Types
import { ProductsInfo } from "@/components/columns/products";

const Reception = ({ ...props }) => {
    // console.log(props?.product)
    const [product, setProduct] = useState<ProductsInfo | null>(props?.product)

    const status = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        switch (product?.status) {
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
                <Link href="/admin/products">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Produits</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">{product?.name}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">{product?.name}</h2>
                            <p className="text-sm text-gray-600">{product?.category}</p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <MdOutlineUnarchive className="text-2xl" />
                        </Button>
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <AiOutlineDelete className="text-2xl" />
                        </Button>
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <LiaEdit className="text-2xl" />
                        </Button>
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="grid grid-cols-5 gap-5">
                        {(product?.images || []).map((image, index) => (
                            <div key={index} className="relative h-64 border shadow-md rounded-md">
                                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED" className="absolute h-full w-full object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-20 text-gray-800">ID :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">#{product?.id}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-20 text-gray-800">Category :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.category}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-20 text-gray-800">Status :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{status()}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-20 text-gray-800">Quantité</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.quantity} {product?.unit}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start  gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Description :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.description.split('<br/>').map((value) => (<><span>{value}</span><br /></>))}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start  gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Description En arabe :</h1>
                        <div className="flex flex-row justify-end items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.description_ar.split('<br/>').map((value) => (<><span>{value}</span><br /></>))}</p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 px-5 mt-2">
                    <Tabs defaultValue="prices" className="w-full">
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent">
                            <TabsTrigger value="prices" className="w-52 border-b rounded-none">Les prix</TabsTrigger>
                            <TabsTrigger value="reception" className="w-52  border-b rounded-none">Les reception</TabsTrigger>
                            <TabsTrigger value="orders" className="w-52  border-b rounded-none">Les commandes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="prices">
                            <div className="w-full lg:w-[400px] mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-auto">ID</TableHead>
                                            <TableHead>Quantité</TableHead>
                                            <TableHead>Prix</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.productPrices || []).map((price, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{price.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{price.quantity} {price.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{price.price} DA</TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.productPrices || []).length === 0 && (
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
                        <TabsContent value="reception">
                            <div className="w-full lg:w-[600px] mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-auto">ID</TableHead>
                                            <TableHead>Quantité</TableHead>
                                            <TableHead>Reste En Stock</TableHead>
                                            <TableHead>Par les employés</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.receptions || []).map((reception, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{reception.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.quantity} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.rest} G</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.user_id}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.receptions || []).length === 0 && (
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
                        <TabsContent value="orders">
                            <div className="w-full lg:w-[800px] mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-auto">ID</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.total} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.status} {product?.unit}</TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.orders || []).length === 0 && (
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