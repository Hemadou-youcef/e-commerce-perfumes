

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
import { FaBuildingUser } from "react-icons/fa6";
import OrderReceptionsSelector from "@/components/dashboard/order/orderReceptionsSelector";


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

type reservationDataFrame = {
    reception_id: number,
    order_product_id: number,
    quantity: number,
}

const Order = ({ ...props }) => {
    console.log(props)

    // Order State
    const [order, setOrder] = useState(props?.order)
    const [productSelected, setProductSelected] = useState<any>(null);
    const [receptions, setReceptions] = useState<receptionDataFrame[]>([]);
    const [reservations, setReservations] = useState<reservationDataFrame[]>([]);

    // Order Boolean States
    const [loadingAction, setLoadingAction] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [open, setOpen] = useState(false);



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
        const data = reservations.map((reservation) => {
            if (reservation?.quantity == 0) return false;
            return {
                reception_id: reservation?.reception_id,
                order_product_id: reservation?.order_product_id,
                quantity: reservation?.quantity,
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

        // EMPTY THE RESERVATIONS ARRAY
        setReservations([]);

        // Clone the receptions array to avoid mutating the original
        let updatedReceptions = [...receptions];
        let updatedReservations: reservationDataFrame[] = [];

        // Iterate over each product in the order and work with the reservations
        props?.order?.order_products.forEach((product_order) => {
            let remainingQuantity = product_order?.total_quantity;
            // CREATE RESERVATION FOR EACH RECEPTIONS IF NEEDED 
            product_order?.product?.receptions?.forEach((reception) => {
                const alreadyReservedQuantity = updatedReservations.filter((reservation: reservationDataFrame) => reservation?.reception_id == reception?.id).reduce((a, b) => a + b?.quantity, 0);

                const receptionRestQuantity = reception?.rest - alreadyReservedQuantity;
                if (reception?.rest > 0) {
                    const reservation = {
                        reception_id: reception?.id,
                        order_product_id: product_order?.id,
                        quantity: 0,
                    }
                    if (remainingQuantity > 0) {
                        if (remainingQuantity > receptionRestQuantity) {
                            reservation.quantity = receptionRestQuantity;
                            remainingQuantity -= receptionRestQuantity;
                        }
                        else {
                            reservation.quantity = remainingQuantity;
                            remainingQuantity = 0;
                        }
                    }


                    updatedReservations.push(reservation);
                    // Update all the reception quantity that have same reception_id
                    updatedReceptions = updatedReceptions.map((reception) => {
                        if (reception?.reception_id == reservation?.reception_id) {
                            reception.quantity = alreadyReservedQuantity + reservation?.quantity;
                        }
                        reception.used_quantity = 0;
                        return reception;
                    })


                }
            })
        })
        setReceptions(updatedReceptions);
        setReservations(updatedReservations);

    };

    const createReservation = () => {
        const data: reservationDataFrame[] = [];
        receptions.forEach((reception) => {
            if (reception?.quantity > 0) {
                data.push({
                    reception_id: reception?.reception_id,
                    order_product_id: reception?.order_product_id,
                    quantity: reception?.used_quantity,
                })
            }
        })
        setReservations(data);
    }
    const needQuantityForConfirm = () => {
        let neededQuantity = false;
        order?.order_products.forEach((product_order) => {
            const usedQuantity = reservations.filter((reservation) => reservation?.order_product_id == product_order?.id).reduce((a, b) => a + b?.quantity, 0);
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
                <Link href="/dashboard/orders">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">CM/{order?.id.toString().padStart(5, "000")}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border-2  rounded-none md:rounded-md overflow-hidden shadow-md">
                {/* SHOW ORDER DETAIL */}
                <div className="flex flex-col ">
                    <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">CM/{order?.id.toString().padStart(5, "000")}</h2>
                            {/* <p className="text-sm text-gray-600">Passé le 12/12/2020</p> */}
                        </div>
                        {/* ACTIONS */}
                        <div className="flex flex-col md:flex-row items-center md:justify-end gap-2">
                            {props?.auth?.user?.role === 3 && (order?.status != "delivered" && order?.status != "cancelled") && (
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button
                                            variant="outline"
                                            className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                            disabled={cancelLoading}
                                        >
                                            <span className="text-sm font-medium">Annuler</span>
                                            {cancelLoading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineCloseCircle className="text-xl" />}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Annuler La Commande
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Êtes-vous sûr de vouloir annuler cette commande ?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Annuler
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleCancelOrder()}
                                            >
                                                Continuer
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            )}
                            {props?.auth?.user?.role === 3 && order?.status == "pending" && (
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
                            {props?.auth?.user?.role === 3 && order?.status == "verified" && (
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

                        </div>
                    </div>

                    <Separator className="" />
                    <div className="flex flex-col gap-4 py-5 px-5 ">
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Status </h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                {Status()}
                            </div>
                        </div>
                        <Separator className="mt-0 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Agence :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <FaBuildingUser className="text-xl text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{order?.shipping_provider}</p>
                            </div>
                        </div>
                        <Separator className="mt-0 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Prix Total :</h1>
                            <p className="text-sm font-bold text-blue-500">{order?.total} DA</p>
                        </div>
                        {order?.status == "delivered" && (
                            <>
                                <Separator className="mt-0 md:hidden" />
                                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                    <h1 className="text-sm font-medium md:w-40 text-gray-800">Bénéfice :</h1>
                                    <p className="text-sm font-bold text-green-500">{order?.profit} DA</p>
                                </div>
                            </>
                        )}
                        <Separator className="mt-0 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Client :</h1>
                            <Link href={`/users/${order?.user?.id}`} className="flex flex-row justify-start items-center gap-2">
                                <CgProfile className="text-xl text-blue-800" />
                                <p className="text-sm font-bold text-blue-600">
                                    {order?.user?.first_name} {order?.user?.last_name}
                                </p>
                            </Link>
                        </div>
                        <Separator className="mt-0 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Numéro :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{order?.user?.phone}</p>
                            </div>
                        </div>
                        <Separator className="mt-0 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Address :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <IoLocationSharp className="text-lg text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{order?.user?.address}</p>
                            </div>
                        </div>
                    </div>
                    <Separator className="mt-0" />
                    <div className="flex flex-col gap-2 px-5 my-2">
                        <Tabs defaultValue="infos" className="w-full">
                            <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent overflow-x-auto">
                                <TabsTrigger value="infos" className="w-52 border-b rounded-none">Informations Supplémentaires</TabsTrigger>
                                <TabsTrigger value="articles" className="w-52 border-b rounded-none">Articles</TabsTrigger>
                                {(order?.status != "cancelled" && order?.status != "pending") && (
                                    <TabsTrigger value="stock" className="w-52  border-b rounded-none">Stock Consommation</TabsTrigger>
                                )}
                                {order?.status == "delivered" && (
                                    <TabsTrigger value="benefices" className="w-52  border-b rounded-none">Bénéfices</TabsTrigger>
                                )}
                            </TabsList>
                            <TabsContent value="infos">
                                <div className="flex flex-col gap-3 px-5 p-5">
                                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Total Articles :</h1>
                                        <p className="text-sm font-bold text-gray-500">{order?.order_products?.length}</p>
                                    </div>
                                    <Separator className="mt-0 md:hidden" />
                                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date De Commande :</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <AiOutlineCalendar className="text-xl text-gray-800" />
                                            <p className="text-sm font-bold text-gray-500">{formatDate(order?.created_at)}</p>
                                        </div>
                                    </div>
                                    <Separator className="mt-0 md:hidden" />
                                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Dernière Modification :</h1>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <AiOutlineCalendar className="text-xl text-gray-800" />
                                            <p className="text-sm font-bold text-gray-500">{formatDate(order?.updated_at)}</p>
                                        </div>
                                    </div>
                                    {(order?.status != "pending" && order?.status != "cancelled" && order?.status != "verified") && (
                                        <>
                                            <Separator className="mt-0 md:hidden" />
                                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Confirmé Par :</h1>
                                                <Link href={`/employees/${order?.confirmed_by?.id}`} className="flex flex-row justify-start items-center gap-2">
                                                    <CgProfile className="text-xl text-blue-800" />
                                                    <p className="text-sm font-bold text-blue-600">
                                                        {order?.confirmed_by?.first_name} {order?.confirmed_by?.last_name}
                                                    </p>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    {order?.status == "delivered" && (
                                        <>
                                            <Separator className="mt-0 md:hidden" />
                                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Livré Par :</h1>
                                                <Link href={`/employees/${order?.delivered_by?.id}`} className="flex flex-row justify-start items-center gap-2">
                                                    <CgProfile className="text-xl text-blue-800" />
                                                    <p className="text-sm font-bold text-blue-600">
                                                        {order?.delivered_by?.first_name} {order?.delivered_by?.last_name}
                                                    </p>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    {order?.status == "cancelled" && (
                                        <>
                                            <Separator className="mt-0 md:hidden" />
                                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                                                <h1 className="text-sm font-medium md:w-40 text-gray-800">Annulé Par :</h1>
                                                <Link href={`/employees/${order?.cancelled_by?.id}`} className="flex flex-row justify-start items-center gap-2">
                                                    <CgProfile className="text-xl text-blue-800" />
                                                    <p className="text-sm font-bold text-blue-600">
                                                        {order?.cancelled_by?.first_name} {order?.cancelled_by?.last_name}
                                                    </p>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="articles">
                                <div className="w-full mb-5 border-2 ">
                                    <Table className="min-w-[700px] w-full">
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
                                {props?.auth?.user?.role === 3 && order?.status == "verified" && (
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

                                            <Table className="min-w-[700px] w-full">
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
                                                                    value={(reservations.filter((reservation) => reservation?.order_product_id == product?.id).reduce((a, b) => a + b?.quantity, 0) * 100) / product?.total_quantity}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button variant="outline" className="font-medium text-xs border border-gray-400 uppercase" onClick={() => {
                                                                    setOpen(true);
                                                                    setProductSelected(product);
                                                                }}>
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

                                            <Table className="min-w-[700px] w-full">
                                                <TableHeader>
                                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                        <TableHead className="">Product</TableHead>
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
                                                                <Link href={`/dashboard/products/${product?.product_id}`}>
                                                                    <Button variant="outline" className="flex items-center border-gray-900 space-x-2 bg-transparent hover:bg-gray-200">
                                                                        <TbExternalLink className="text-lg" />
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell className="font-bold text-xs">
                                                                <Link href={`/dashboard/receptions/${reservation.reception_id}`}>
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
                                <div className="flex flex-col justify-center w-full gap-2 mt-2 p-2 ">
                                    <Table className="min-w-[700px] w-full font-mono border-y border-dashed border-gray-900">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                <TableHead className="w-96">Produit</TableHead>
                                                <TableHead className="w-20">Qte</TableHead>
                                                <TableHead className="">Price</TableHead>
                                                <TableHead className="text-center min-w-[150px]">Prix ​​d'achat</TableHead>
                                                <TableHead className="text-center min-w-[150px]">Bénéfice</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {order?.order_products.map((product, index) => (
                                                <TableRow key={index} className="hover:bg-gray-100 border-b border-dashed border-gray-500">
                                                    <TableCell className="font-medium text-xs">{product?.product?.name}</TableCell>
                                                    <TableCell className="font-bold text-xs">{product?.total_quantity} G</TableCell>
                                                    <TableCell className="font-bold text-xs">{product?.price} DA</TableCell>
                                                    <TableCell className="text-center text-sm">{product?.buying_price} DA</TableCell>
                                                    <TableCell className="font-bold text-green-500  text-center  text-sm">{product?.price - product?.buying_price} DA</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow className="hover:bg-gray-100 border-b-2">
                                                <TableCell className="font-medium text-base text-center" colSpan={2}>
                                                    Total
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{order?.total} DA</TableCell>
                                                <TableCell className="text-center text-sm">
                                                    {order?.order_products.reduce((a, b) => a + b?.buying_price, 0)}
                                                    DA</TableCell>
                                                <TableCell className="font-bold text-green-500 text-center text-sm">{order?.profit} DA</TableCell>
                                            </TableRow>
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
                        </Tabs>
                    </div>
                </div>
            </div >
            {/* MODAL */}
            {
                open && (<OrderReceptionsSelector
                    open={open}
                    setOpen={setOpen}
                    productSelected={productSelected}
                    receptions={receptions}
                    setReceptions={setReceptions}
                    reservations={reservations}
                    setReservations={setReservations}
                />)
            }
        </>
    );
}

Order.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Order;