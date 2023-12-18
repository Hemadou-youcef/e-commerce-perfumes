import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { useTranslation } from "react-i18next";
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

import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { PiStarFourFill } from "react-icons/pi"
import { CiDeliveryTruck } from "react-icons/ci"
import { LiaLuggageCartSolid } from "react-icons/lia";
import { Button } from "@/shadcn/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import { useToast } from "@/shadcn/ui/use-toast";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";

const Order = ({ ...props }) => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const { t, i18n } = useTranslation()
    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const status = () => {
        let text = "NaN";
        let Icon: JSX.Element = <></>;
        switch (props?.order?.status) {
            case "pending":
                text = t("orders_page.pending");
                Icon = <StopwatchIcon />
                break;
            case "confirmed":
                text = t("orders_page.confirmed");
                Icon = <CheckCircledIcon className="text-green-400" />
                break;
            case "verified":
                text = t("orders_page.verified");
                Icon = <CheckCircledIcon className="text-green-400" />
                break;
            case "delivered":
                text = t("orders_page.delivered");
                Icon = <CiDeliveryTruck className="text-lg" />
                break;
            case "cancelled":
                text = t("orders_page.cancelled");
                Icon = <CrossCircledIcon />
                break;
        }

        return (
            <div className="flex flex-row justify-start items-center gap-2">
                <div className="flex flex-row justify-start items-center gap-2">
                    {Icon}
                </div>
                <p className="text-sm font-medium text-gray-600 uppercase">{text}</p>
            </div>
        )
    }

    const handleCancelOrder = () => {
        setDeleteLoading(true)
        router.post(route('client_cancel_order', props?.order?.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: t('global.success'),
                    description: t('order_page.order_cancelled'),
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: t('global.error'),
                    description: t('order_page.order_cancelled_error'),
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
            <Head>
                <title>{t('order_page.title')} #{props?.order?.id}</title>
                <meta name="description" content={t('order_page.title')} />
                <meta name="keywords" content={t('order_page.title')} />
            </Head>
            <div className="container mx-auto">
                {/* RETURN TO ORDERS */}
                <div className="flex flex-row justify-start items-center gap-2 my-5 ltr:font-sans rtl:font-arabic">
                    <Link href="/orders" className="text-sm font-bold text-gray-600 hover:text-gray-500 transition-colors  border-b pb-1">
                        {t('order_page.return_to_orders')}
                    </Link>
                    <p className="text-sm font-medium text-gray-600 border-b pb-1">/</p>
                    <p className="text-sm font-medium text-gray-600 border-b pb-1">{t('order_page.order')} #{props?.order?.id}</p>
                </div>
                {/* ORDER INFORMATION */}
                <div className="flex flex-col md:flex-row justify-between items-center  gap-5 mb-5 border-b pb-5 ltr:font-sans rtl:font-arabic">
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-2xl font-bold text-gray-700">{t('order_page.order')} #{props?.order?.id}</p>
                        <div className="flex gap-2 text-sm font-medium text-gray-500">({status()})</div>
                    </div>
                    {props?.order?.status === "pending" && (
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant="outline" className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors gap-2 flex justify-center items-center">
                                    {deleteLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                    {t('order_page.cancel_order')}
                                </Button>

                            </AlertDialogTrigger>
                            <AlertDialogContent className="font-arabic">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="">
                                        {t('order_page.cancel_order')}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('order_page.cancel_order_message')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {t('global.cancel')}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleCancelOrder()}
                                    >
                                        {t('global.confirm')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                </div>
                <div className="flex flex-col justify-start items-start gap-5 mb-5 border-b pb-5 ltr:font-sans rtl:font-arabic">
                    {/* ORDER INFORMATION */}
                    {/* DATE DE ORDER */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.order_date')}:</p>
                        <p className="text-base font-medium text-gray-700"> {formatDate(props?.order?.created_at)}</p>
                    </div>
                    {/* SHIPPING AGENCY */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.shipping_agency')}:</p>
                        <p className="text-base font-medium text-gray-700"> {i18n.language === "fr" ? props?.order?.shipping_agency?.name : props?.order?.shipping_agency?.name_ar}</p>
                    </div>
                    {/* SHIPPING PRICE */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.shipping_price')}:</p>
                        <p className="text-base font-medium text-gray-700"> {props?.order?.address?.shipping_price} {t("global.da")} ({props?.order?.address?.shipping_fee?.agency_delivery_price == props?.order?.address?.shipping_price ? t("order_page.agency_delivery") : t("order_page.home_delivery")})</p>
                    </div>
                    {/* TOTAL PRICE */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.total_price')}:</p>
                        <p className="text-base font-medium text-gray-700"> {props?.order?.total} {t('global.da')}</p>
                    </div>
                    {/* ADDRESS */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.shipping_address')}:</p>
                        <p className="text-base font-medium text-gray-700"> {props?.order?.address?.city} | {props?.order?.address?.street_address}</p>
                    </div>
                    {/* NUMBER OF PRODUCTS */}
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-base font-bold text-gray-700">{t('order_page.total_products')}:</p>
                        <p className="text-base font-medium text-gray-700"> {props?.order?.order_products.length}</p>
                    </div>

                </div>

                {/* PRODUCT LIST */}
                <div className="w-full mb-5 border-2 ">
                    <Table className="min-w-[700px] w-full ltr:font-sans rtl:font-arabic" dir={i18n.dir()}>
                        <TableHeader>
                            <TableRow className="bg-gray-100 hover:bg-gray-100">
                                <TableHead className="rtl:text-right w-7">{t("order_page.ID")}</TableHead>
                                <TableHead className="rtl:text-right">{t("order_page.product")}</TableHead>
                                <TableHead className="rtl:text-right w-20">{t("order_page.quantity")}</TableHead>
                                <TableHead className="rtl:text-right w-32">{t("order_page.price")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props?.order?.order_products.map((product, index) => (
                                <TableRow key={index} className="hover:bg-gray-100">
                                    <TableCell className="font-medium text-xs">{product?.product?.id}</TableCell>
                                    <TableCell className="font-medium text-xs">
                                        <Link href={`/products/${product?.product?.id}`} className="text-blue-600 hover:text-blue-500">
                                            {product?.product?.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-bold text-xs ">{product?.quantity * product?.product_price?.quantity} {t('units.' + product?.product_price?.unit?.toLowerCase())}</TableCell>
                                    <TableCell className="font-bold text-xs">{product?.price} {t('global.da')}</TableCell>
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
            </div>
        </>
    );
}


Order.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Order;