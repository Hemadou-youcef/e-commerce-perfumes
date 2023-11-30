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
import { TiPlus } from "react-icons/ti";

// Types
import { ProductsInfo } from "@/components/columns/products";
import { TbExternalLink } from "react-icons/tb";

const Product = ({ ...props }) => {
    console.log(props?.product)
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
                        <Link href={`/admin/receptions/create`}>
                            <Button
                                variant="outline"
                                className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                                disabled={(product?.reservations || []).length > 0}
                            >
                                <TiPlus className="text-2xl" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                        >
                            <MdOutlineUnarchive className="text-2xl" />
                        </Button>
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                        >
                            <AiOutlineDelete className="text-2xl" />
                        </Button>
                        <Link href={`/admin/products/${product?.id}/edit`}>
                            <Button
                                variant="outline"
                                className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"

                            >
                                <LiaEdit className="text-2xl" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="grid grid-cols-5 gap-5">
                        {(product?.images || []).map((image: any, index) => (
                            <div key={index} className="relative h-64 border shadow-md rounded-md">
                                <img
                                    src={`/storage/${image.path}`}
                                    className="absolute h-full w-full object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">ID :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">#{product?.id}</p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Category :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.category}</p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Status :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="text-sm font-bold text-gray-500">{status()}</div>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Quantité</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.quantity} {product?.unit}</p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Description :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="text-sm font-bold text-gray-500">{product?.description.split('<br/>').map((value, index) => (<div key={index}><span>{value}</span><br /></div>))}</div>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Description En arabe :</h1>
                        <div className="flex flex-row justify-end items-center gap-2">
                            <div className="text-sm font-bold text-gray-500">{product?.description_ar.split('<br/>').map((value, index) => (<div key={index}><span>{value}</span><br /></div>))}</div>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 mt-2">
                    <Tabs defaultValue="prices" className="w-full">
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent  overflow-x-auto">
                            <TabsTrigger value="prices" className="w-52 border-b rounded-none">Les prix</TabsTrigger>
                            <TabsTrigger value="reception" className="w-52  border-b rounded-none">Les reception</TabsTrigger>
                            <TabsTrigger value="orders" className="w-52  border-b rounded-none">Les commandes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="prices" className="px-5">
                            <div className="w-full  mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">Quantité</TableHead>
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
                        <TabsContent value="reception" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-32">Quantité</TableHead>
                                            <TableHead className="w-36">Reste En Stock</TableHead>
                                            <TableHead className="w-60">Ajouter par</TableHead>
                                            <TableHead className="w-auto">Date</TableHead>
                                            <TableHead className="w-5"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.receptions || []).map((reception, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{reception.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.quantity} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.rest} G</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.created_at}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/admin/receptions/${reception.id}`}>
                                                        <Button variant="outline" className="flex items-center space-x-2 bg-transparent hover:bg-gray-200">
                                                            <TbExternalLink className="text-lg" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
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
                        <TabsContent value="orders" className="px-5">
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
                                        {(product?.orders || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.total} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
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

Product.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Product;
