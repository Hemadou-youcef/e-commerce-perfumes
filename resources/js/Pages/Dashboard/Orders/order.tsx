

// inertia components
import { Link, router } from "@inertiajs/react";

// Layouts
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

// shadcn components
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"


// Icons
import { AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters, AiOutlineMinus, AiOutlinePlus, AiOutlineRight, AiTwotonePhone } from "react-icons/ai";
import { BsFillTelephoneOutboundFill, BsListCheck } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { CiDeliveryTruck } from "react-icons/ci";
import { Progress } from "@/shadcn/ui/progress";
import { TbExternalLink } from "react-icons/tb";


// Types
type receptionDataFrame = {
    reception_id: number,
    reception_name: string,
    reception_date: string,
    order_product_id: number,
    rest_quantity: number,
    used_quantity: number,
    quantity: number,
}

const Order = ({ ...props }) => {
    console.log(props)
    const [order, setOrder] = useState(props?.order)
    const [loadingAction, setLoadingAction] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [productSelected, setProductSelected] = useState<any>(null);
    const [receptions, setReceptions] = useState<receptionDataFrame[]>([]);

    const [quantityTotalSelected, setQuantityTotalSelected] = useState(0);

    const handleSelectQuantity = (product) => {
        setProductSelected(product);
        setQuantityTotalSelected(receptions.filter((reception) => reception?.order_product_id == product?.id).reduce((a, b) => a + b?.used_quantity, 0));
        setOpen(true);
    }

    useEffect(() => {

        setOrder(props?.order);
        getAllReceptions();

    }, [props?.order])

    const getAllReceptions = () => {
        const receptionsList: receptionDataFrame[] = [];
        props?.order?.order_products.forEach((product_order) => {
            product_order?.product?.receptions?.forEach((reception) => {
                receptionsList.push({
                    reception_id: reception?.id,
                    reception_name: reception?.name,
                    reception_date: reception?.created_at,
                    order_product_id: product_order?.id,
                    rest_quantity: reception?.rest,
                    used_quantity: 0,
                    quantity: 0,
                })
            })
        })
        setReceptions(receptionsList);
    }

    const handleCancelOrder = () => {
        setCancelLoading(true);
        router.post(route('cancel_order', order?.id), {}, {
            onSuccess: () => {
                console.log("success")
            },
            onError: () => {
                console.log("error")
            },
            onFinish: () => {
                setCancelLoading(false);
            }
        })
    }

    const handleVerifyDisponibility = () => {
        setLoadingAction(true);
        router.post(route('verify_order', order?.id), {}, {
            onSuccess: () => {
                console.log("success")
            },
            onError: () => {
                console.log("error")
            },
            onFinish: () => {
                setLoadingAction(false);
            }
        })
    }

    const handleConfirmOrder = () => {
        setLoadingAction(true);
        const data = receptions.filter((reception) => reception?.quantity > 0).map((reception) => {
            return {
                reception_id: reception?.reception_id,
                order_product_id: reception?.order_product_id,
                quantity: reception?.quantity,
            }
        })
        router.post(route('confirm_order', order?.id), {
            data: encodeURIComponent(JSON.stringify(data))
        }, {
            onSuccess: () => {
                console.log("success")
            },
            onError: () => {
                console.log("error")
            },
            onFinish: () => {
                setLoadingAction(false);
            }
        })
    }

    const handleDeliverOrder = () => {
        setLoadingAction(true);
        router.post(route('deliver_order', order?.id), {}, {
            onSuccess: () => {
                console.log("success")
            },
            onError: () => {
                console.log("error")
            },
            onFinish: () => {
                setLoadingAction(false);
            }
        })
    }

    const autoComplete = () => {
        if (!needQuantityForConfirm()) return false;

        // Clone the receptions array to avoid mutating the original
        let updatedReceptions = [...receptions];

        // Iterate over each product in the order
        props?.order?.order_products.forEach((product_order) => {
            const usedQuantity = receptions.filter((reception) => reception?.order_product_id == product_order?.id).reduce((a, b) => a + b?.quantity, 0);
            if (usedQuantity == product_order?.total_quantity) return true; // Skip products that are already fulfilled
            let remainingQuantity = product_order?.total_quantity - usedQuantity;

            // Check each reception for available stock
            product_order?.product?.receptions?.some((reception) => {
                if (reception?.rest > 0) {
                    // Sufficient stock is available for the entire quantity needed
                    if (reception?.rest >= remainingQuantity) {
                        updatedReceptions = updatedReceptions.map((item) => {
                            if (item?.reception_id === reception?.id) {
                                return {
                                    ...item,
                                    used_quantity: remainingQuantity,
                                    quantity: item?.quantity + remainingQuantity,
                                };
                            }
                            return item;
                        });
                        remainingQuantity = 0;
                        return true; // Break out of the loop since all needed quantity is fulfilled
                    } else {
                        // Use the available stock and reduce the remaining quantity
                        updatedReceptions = updatedReceptions.map((item) => {
                            if (item?.reception_id === reception?.id) {
                                const usedQuantity = Math.min(reception?.rest, remainingQuantity);
                                return {
                                    ...item,
                                    used_quantity: item?.used_quantity + usedQuantity,
                                    quantity: item?.quantity + usedQuantity,
                                };
                            }
                            return item;
                        });
                        remainingQuantity -= reception?.rest;
                    }
                }
            });
        });

        // Update the state with the modified receptions array and total quantity
        setReceptions(updatedReceptions);
        setQuantityTotalSelected(order?.total);
    };

    const needQuantityForConfirm = () => {
        let neededQuantity = false;
        order?.order_products.forEach((product_order) => {
            const usedQuantity = receptions.filter((reception) => reception?.order_product_id == product_order?.id).reduce((a, b) => a + b?.quantity, 0);
            if (usedQuantity != product_order?.total_quantity) {
                neededQuantity = true;
            }
        });
        return neededQuantity;
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const Status = () => {
        let text = "NaN";
        let Icon: JSX.Element = <></>;
        switch (props?.order?.status) {
            case "pending":
                text = "En attente";
                Icon = <StopwatchIcon width={20} height={20} className="w-5" />
                break;
            case "confirmed":
                text = "Confirmé";
                Icon = <CheckCircledIcon width={20} height={20} className="w-5 text-green-400" />
                break;
            case "verified":
                text = "Vérifié";
                Icon = <CheckCircledIcon width={20} height={20} className="w-5 text-green-400" />
                break;
            case "delivered":
                text = "Livré";
                Icon = <CiDeliveryTruck className="text-xl" />
                break;
            case "cancelled":
                text = "Annulé";
                Icon = <CrossCircledIcon width={20} height={20} className="w-5" />
                break;
        }
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                {Icon}
                <p className={`px-1 py-1 rounded-sm text-xs font-bold text-gray-900 uppercase `}>
                    {text}
                </p>
            </div>
        )
    }

    return (
        <>
            {/* TREE */}
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">CM/{order?.id.toString().padStart(5, "000")}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden">
                {/* SHOW ORDER DETAIL */}
                <div className="flex flex-col ">
                    <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">CM/{order?.id.toString().padStart(5, "000")}</h2>
                            {/* <p className="text-sm text-gray-600">Passé le 12/12/2020</p> */}
                        </div>
                        {/* ACTIONS */}
                        <div className="flex justify-end gap-2">
                            {(order?.status != "delivered" && order?.status != "cancelled") && (
                                <Button
                                    variant="outline"
                                    className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                    onClick={() => handleCancelOrder()}
                                    disabled={cancelLoading}
                                >
                                    <span className="text-sm font-medium">Cancel</span>
                                    {cancelLoading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineCloseCircle className="text-xl" />}
                                </Button>
                            )}
                            {order?.status == "pending" && (
                                <Button
                                    variant="outline"
                                    className="flex items-center border-transparent h-9 space-x-2 bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-white hover:text-gray-100"
                                    onClick={() => handleVerifyDisponibility()}
                                    disabled={loadingAction}
                                >
                                    <span className="text-sm font-medium">Verify La Disponibilité</span>
                                    {loadingAction ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <BsListCheck className="text-xl" />}
                                </Button>
                            )}
                            {order?.status == "verified" && (
                                <Button
                                    variant="outline"
                                    className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                    onClick={() => handleConfirmOrder()}
                                    disabled={needQuantityForConfirm() || loadingAction}
                                >
                                    <span className="text-sm font-medium">Confirmer la commande</span>
                                    {loadingAction ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineCheckCircle className="text-xl" />}
                                </Button>
                            )}
                            {order?.status == "confirmed" && (
                                <Button
                                    variant="outline"
                                    className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                    onClick={() => handleDeliverOrder()}
                                    disabled={loadingAction}
                                >
                                    <span className="text-sm font-medium">Livré</span>
                                    {loadingAction ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineCheckCircle className="text-xl" />}
                                </Button>
                            )}
                            {/* <Button
                                variant="outline"
                                className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                onClick={() => testSerialisation()}
                            >
                                <span className="text-sm font-medium">Confirmer la commande</span>
                                <AiOutlineCheckCircle className="text-xl" />
                            </Button> */}
                            {/* <Button className="flex items-center h-9 space-x-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-full">
                                <span className="text-sm font-medium">Rejeter</span>
                                <AiOutlineCloseCircle className="text-xl" />
                            </Button>
                            <Button className="flex items-center h-9 space-x-2 bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white rounded-full">
                                <span className="text-sm font-medium">Confirmer la commande</span>
                                <AiOutlineCheckCircle className="text-xl" />
                            </Button> */}

                        </div>
                    </div>

                    <Separator className="" />
                    <div className="flex flex-col gap-4 py-5 px-5 ">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Status </h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                {Status()}
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Date De Commande :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <AiOutlineCalendar className="text-xl text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{formatDate(order?.created_at)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Prix Total :</h1>
                            <p className="text-sm font-bold text-green-500">{order?.total} DA</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Client :</h1>
                            <Link href={`/users/${order?.user?.id}`} className="flex flex-row justify-start items-center gap-2">
                                <CgProfile className="text-xl text-blue-800" />
                                <p className="text-sm font-bold text-blue-600">
                                    {order?.user?.first_name} {order?.user?.last_name}
                                </p>
                            </Link>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Numéro :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{order?.user?.phone}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <h1 className="text-sm font-medium w-40 text-gray-800">Address :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <IoLocationSharp className="text-lg text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{order?.user?.address}</p>
                            </div>
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
                                <div className="w-full mb-5 border-2 ">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                <TableHead className="w-7">ID</TableHead>
                                                <TableHead className="w-auto">Produit</TableHead>
                                                <TableHead className="w-20">Qte</TableHead>
                                                <TableHead className="w-32">Price</TableHead>
                                                <TableHead className="text-center w-80">Stock</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {order?.order_products.map((product, index) => (
                                                <TableRow key={index} className="hover:bg-gray-100">
                                                    <TableCell className="font-medium text-xs">{product?.product?.id}</TableCell>
                                                    <TableCell className="font-medium text-xs">{product?.product?.name}</TableCell>
                                                    <TableCell className="font-bold text-xs">{product?.total_quantity} G</TableCell>
                                                    <TableCell className="font-bold text-xs">{product?.price} DA</TableCell>
                                                    <TableCell className="text-center text-sm">
                                                        {order?.status != "pending" && (
                                                            <p className="text-sm font-bold text-gray-500">
                                                                {product?.product?.quantity} {product?.product?.unit} ({product?.total_quantity} {product?.product?.unit} réservé)
                                                            </p>
                                                        )}

                                                        {order?.status == "pending" && (Object.keys(props?.errors).length == 0 ? (
                                                            <p className="text-sm font-bold text-gray-500">
                                                                En attente de confirmation
                                                            </p>
                                                        ) :
                                                            Object.values(props?.errors).indexOf(product?.product_id) != -1 ? (
                                                                <p className="text-sm font-bold text-red-500">{product?.product?.quantity} {product?.product?.unit} (Quantité Insuffisante) </p>
                                                            ) : (
                                                                <p className="text-sm font-bold text-gray-500">{product?.product?.quantity} {product?.product?.unit} </p>
                                                            )
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {/* <TableRow>
                                                <TableCell className="font-medium text-xs">INV001</TableCell>
                                                <TableCell className="font-bold text-xs">300 G</TableCell>
                                                <TableCell className="font-bold text-xs">1200 DA</TableCell>
                                                <TableCell className="text-center text-sm">
                                                    En attente de confirmation
                                                </TableCell>
                                            </TableRow> */}
                                        </TableBody>

                                    </Table>
                                </div>
                            </TabsContent>
                            <TabsContent value="stock">
                                {order?.status == "pending" && (
                                    <div className="flex flex-col justify-center w-full gap-2 px-5 mt-2 p-5">
                                        <p className="text-base text-center font-bold text-gray-800">Verify La Disponibilité D'abord</p>

                                    </div>
                                )}
                                {order?.status == "verified" && (
                                    <>
                                        <div className="mb-2 flex justify-end">
                                            <Button
                                                variant="outline" className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                                onClick={() => autoComplete()}
                                                disabled={!needQuantityForConfirm()}
                                            >
                                                <span className="text-sm font-medium">
                                                    Auto Complete
                                                </span>
                                            </Button>
                                        </div>
                                        <div className="flex flex-col p-0 rounded-md border-2 ">

                                            <Table className="w-full">
                                                <TableHeader>
                                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                        <TableHead className="w-auto">Produit</TableHead>
                                                        <TableHead className="w-20">Qte</TableHead>
                                                        <TableHead className="w-64">Quantité Sélectionnée</TableHead>
                                                        <TableHead className="text-center w-52">Stock</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {order?.order_products.map((product, index) => (
                                                        <TableRow key={index} className="hover:bg-gray-100">
                                                            <TableCell className="font-medium text-xs">{product?.product?.name}</TableCell>
                                                            <TableCell className="font-bold text-xs">{product?.total_quantity} G</TableCell>
                                                            <TableCell className="font-bold text-xs">
                                                                <Progress
                                                                    className="bg-gray-300"
                                                                    value={(receptions.filter((reception) => reception?.order_product_id == product?.id).reduce((a, b) => a + b?.quantity, 0) * 100) / product?.total_quantity}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button variant="outline" className="font-medium text-xs border border-gray-400 uppercase" onClick={() => handleSelectQuantity(product)}>
                                                                    sélectionner la quantité
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>

                                            </Table>

                                        </div>
                                    </>

                                )}
                                {(order?.status == "confirmed" || order?.status == "delivered") && (
                                    <>
                                        <div className="flex flex-col p-0 rounded-md border-2 ">

                                            <Table className="w-full">
                                                <TableHeader>
                                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                        <TableHead className="text-center ">Product</TableHead>
                                                        <TableHead className="w-52">Date</TableHead>
                                                        <TableHead className="w-64">QTE</TableHead>
                                                        <TableHead className="w-5">Product</TableHead>
                                                        <TableHead className="w-5">Reception</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {order?.order_products.map((product, index) => product?.reservations.map((reservation, index) => (
                                                        <TableRow key={index} className="hover:bg-gray-100">

                                                            <TableCell className="font-medium text-xs">{product?.product?.name}</TableCell>
                                                            <TableCell className="font-bold text-xs">{formatDate(reservation?.created_at)}</TableCell>
                                                            <TableCell className="font-bold text-xs">{reservation?.quantity} G</TableCell>
                                                            <TableCell className="font-bold text-xs">
                                                                <Link href={`/admin/products/${product?.product_id}`}>
                                                                    <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                                        <TbExternalLink className="text-lg" />
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell className="font-bold text-xs">
                                                                <Link href={`/admin/receptions/${reservation.reception_id}`}>
                                                                    <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                                        <TbExternalLink className="text-lg" />
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    )))}
                                                </TableBody>

                                            </Table>

                                        </div>
                                    </>

                                )}
                            </TabsContent>
                            <TabsContent value="benefices">
                                <div className="flex flex-col justify-center w-full gap-2 px-5 mt-2 p-5">
                                    <p className="text-base text-center font-bold text-gray-800">Soon</p>

                                </div>
                            </TabsContent>
                        </Tabs>

                    </div>

                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>Sélectionner la quantité En Stock</DialogTitle>
                        {/* <DialogDescription>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <AiOutlineCalendar className="text-xl text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{formatDate(order?.created_at)}</p>
                            </div>
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {productSelected && (
                            <div className="flex flex-row justify-start items-center gap-2 relative">
                                <Progress value={(quantityTotalSelected * 100) / productSelected?.total_quantity} className="h-7 col-span-3 rounded-md bg-gray-300" />
                                <p className="w-full text-sm text-center font-bold text-white px-3 p-1 rounded-md absolute top-0"
                                    style={{
                                        textShadow: "0px 0px 5px rgba(0,0,0,0.5)"
                                    }}
                                >
                                    {quantityTotalSelected}/{productSelected?.total_quantity} {productSelected?.product?.unit}
                                </p>
                                {/* <p className="text-sm font-bold text-gray-500">{quantityTotalSelected} {productSelected?.product?.unit}</p> */}
                            </div>
                        )}
                        <div className="">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                        <TableHead className="w-20">Reception</TableHead>
                                        <TableHead className="w-48">Date</TableHead>
                                        <TableHead className="w-64">Quantité Sélectionnée</TableHead>
                                        <TableHead className="text-center w-52">Stock</TableHead>
                                        <TableHead className="text-center w-52">action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {receptions.filter((reception) => reception?.order_product_id == productSelected?.id).map((reception, index) => (
                                        <TableRow key={index} className="hover:bg-gray-100">
                                            <TableCell className="font-medium text-xs">{reception?.reception_name}</TableCell>
                                            <TableCell className="font-bold text-xs">{formatDate(reception?.reception_date)}</TableCell>
                                            <TableCell className="font-bold text-xs">
                                                <Progress
                                                    className="bg-gray-300"
                                                    value={(reception?.used_quantity * 100) / reception?.rest_quantity}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <p className="col-span-2 min-w-[100px] text-sm text-center font-bold text-white bg-gray-900 px-3 p-1 rounded-md">{reception?.used_quantity}/{reception?.rest_quantity}</p>
                                            </TableCell>
                                            <TableCell className="text-center flex  justify-center items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="w-36 col-span-1 p-0 px-5 h-8 font-bold border-gray-400 uppercase"
                                                    onClick={() => {
                                                        setReceptions(receptions.map((item) => {
                                                            if (item?.reception_id == reception?.reception_id) {
                                                                return {
                                                                    ...item,
                                                                    used_quantity: 0,
                                                                }
                                                            }
                                                            return item;
                                                        }))
                                                        setQuantityTotalSelected(quantityTotalSelected - reception?.used_quantity);

                                                    }}
                                                    disabled={reception?.used_quantity == 0}
                                                >
                                                    Vider
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-36 col-span-1 p-0 px-5 h-8 font-bold border-gray-400 uppercase"
                                                    onClick={() => {
                                                        let needed = productSelected?.total_quantity - quantityTotalSelected;
                                                        if (reception?.rest_quantity > needed && needed > 0) {
                                                            setReceptions(receptions.map((item) => {
                                                                if (item?.reception_id == reception?.reception_id) {
                                                                    return {
                                                                        ...item,
                                                                        used_quantity: item?.used_quantity + (needed > reception?.rest_quantity ? reception?.rest_quantity : needed),
                                                                    }
                                                                }
                                                                return item;
                                                            }))
                                                            setQuantityTotalSelected(quantityTotalSelected + (needed > reception?.rest_quantity ? reception?.rest_quantity : needed));
                                                        } else if (reception?.rest_quantity < needed && needed > 0) {
                                                            setReceptions(receptions.map((item) => {
                                                                if (item?.reception_id == reception?.reception_id) {
                                                                    return {
                                                                        ...item,
                                                                        used_quantity: item?.used_quantity + reception?.rest_quantity,
                                                                    }
                                                                }
                                                                return item;
                                                            }))
                                                            setQuantityTotalSelected(quantityTotalSelected + reception?.rest_quantity);
                                                        }
                                                    }}
                                                    disabled={quantityTotalSelected == productSelected?.total_quantity}
                                                >
                                                    Compléter
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => {
                                setOpen(false);
                                setReceptions(receptions.map((item) => {
                                    if (item?.order_product_id == productSelected?.id) {
                                        return {
                                            ...item,
                                            quantity: item?.used_quantity,
                                        }
                                    }
                                    return item;
                                }))
                                setQuantityTotalSelected(0);
                            }}

                        >
                            Sauvegarder
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Order.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Order;