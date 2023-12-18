import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/tables/data-table";
// import { OrdersInfo } from "@/components/columns/clientOrders";
import { useState } from "react";
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { PiStarFourFill } from "react-icons/pi"
import { useTranslation } from "react-i18next"
import { CiDeliveryTruck } from "react-icons/ci"
import Pagination from "@/components/tables/pagination";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { Head } from "@inertiajs/react";

type OrdersInfo = {
    id: number;
    status: string;
    total: number;
    order_products: any[];
    created_at: string;
}

const Orders = ({ ...props }) => {
    const [data, setData] = useState(props?.orders?.data)
    const { t, i18n } = useTranslation()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const columns: ColumnDef<OrdersInfo>[] = [
        {
            accessorKey: "id",
            header: t("orders_page.ID"),
            maxSize: 5,
        },
        {
            accessorKey: "created_at",
            header: t("orders_page.date"),
            cell: ({ row }) => {
                // CHECK IF THIS CREATED TODAY
                const today = new Date();
                const date = new Date(row?.original?.created_at);
                const isToday = date.getDate() == today.getDate() &&
                    date.getMonth() == today.getMonth() &&
                    date.getFullYear() == today.getFullYear();
                return (
                    <div className="flex items-center font-medium">
                        <span className="text-gray-500">{formatDate(row?.original?.created_at)}</span>
                        {isToday && (
                            <div className="flex items-center ml-2">
                                <PiStarFourFill className="w-4 h-4 text-purple-500" />
                            </div>
                        )}
                    </div>
                )
            },
            maxSize: 10,
        },
        {
            accessorKey: "order_products",
            header: t("orders_page.products_number"),
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row justify-start items-center gap-2">
                        <p className="text-sm font-medium text-gray-600 uppercase">{row.original.order_products.length}</p>
                    </div>
                )
            },
            maxSize: 10,
        },
        {
            accessorKey: "status",
            header: t("orders_page.status"),
            cell: ({ row }) => {
                // CHECK IF RO
                let text = "NaN";
                let Icon: JSX.Element = <></>;
                switch (row.getValue("status")) {
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
            },
            maxSize: 10,
        },
        {
            accessorKey: "total",
            header: t("orders_page.total_price"),
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row justify-start items-center gap-2">
                        <p className="text-sm font-medium text-gray-600 uppercase">{row.getValue("total") || "---"} {t('global.da')}</p>
                    </div>
                )
            },
            maxSize: 10,
        },
    ]


    return (
        <>
            <Head>
                <title>{t('orders_page.title')}</title>
                <meta name="description" content={
                    i18n.language === "fr" ?
                        "Consultez vos commandes"
                        :
                        "تحقق من طلباتك"
                } />
                <meta name="keywords" content="orders, commandes, consulter vos commandes, check your orders" />
            </Head>
            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300 font-sans rtl:font-arabic">
                <LiaLuggageCartSolid className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    {t('orders_page.title')}
                    {/* Mon Signets */}
                </h1>
            </div>
            <div className="container mx-auto py-10">
                <div className="max-w-full overflow-x-auto pb-2">
                    <DataTable columns={columns} data={data} baseUrl="/orders/" />
                </div>
                <Pagination meta={props?.orders} />
            </div>
        </>
    );
}

Orders.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Orders;