// import { ColumnDef } from "@tanstack/react-table"
// import {
//     CheckCircledIcon,
//     CrossCircledIcon,
//     StopwatchIcon,
// } from "@radix-ui/react-icons"
// import { CiDeliveryTruck } from "react-icons/ci"
// import { Button } from "@/shadcn/ui/button"
// import { PiStarFourFill } from "react-icons/pi"
// import { useTranslation } from "react-i18next"
// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type OrdersInfo = {
//     id: number;
//     status: string;
//     total: number;
//     order_products: any[];
//     created_at: string;
// }

// const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// }
// const { t, } = useTranslation()

// export const columns: ColumnDef<OrdersInfo>[] = [
//     {
//         accessorKey: "id",
//         header: t("ID"),
//         maxSize: 5,
//     },
//     {
//         accessorKey: "created_at",
//         header: t("Date"),
//         cell: ({ row }) => {
//             // CHECK IF THIS CREATED TODAY
//             const today = new Date();
//             const date = new Date(row?.original?.created_at);
//             const isToday = date.getDate() == today.getDate() &&
//                 date.getMonth() == today.getMonth() &&   
//                 date.getFullYear() == today.getFullYear();   
//             return (
//                 <div className="flex items-center font-medium">
//                     <span className="text-gray-500">{formatDate(row?.original?.created_at)}</span>
//                     {isToday && (
//                         <div className="flex items-center ml-2">
//                             <PiStarFourFill className="w-4 h-4 text-purple-500" />
//                         </div>
//                     )}
//                 </div>
//             )
//         },
//         maxSize:10,
//     },
//     {
//         accessorKey: "status",
//         header: t("Statut"),
//         cell: ({ row }) => {
//             // CHECK IF RO
//             let text = "NaN";
//             let Icon: JSX.Element = <></>;
//             switch (row.getValue("status")) {
//                 case "pending":
//                     text = "En attente";
//                     Icon = <StopwatchIcon />
//                     break;
//                 case "confirmed":
//                     text = "Confirmé";
//                     Icon = <CheckCircledIcon className="text-green-400" />
//                     break;
//                 case "verified":
//                     text = "Vérifié";
//                     Icon = <CheckCircledIcon className="text-green-400" />
//                     break;
//                 case "delivered":
//                     text = "Livré";
//                     Icon = <CiDeliveryTruck className="text-lg" />
//                     break;
//                 case "cancelled":
//                     text = "Annulé";
//                     Icon = <CrossCircledIcon />
//                     break;
//             }

//             return (
//                 <div className="flex flex-row justify-start items-center gap-2">
//                     <div className="flex flex-row justify-start items-center gap-2">
//                         {Icon}
//                     </div>
//                     <p className="text-sm font-medium text-gray-600 uppercase">{text}</p>
//                 </div>
//             )
//         },
//         maxSize: 10,
//     },
//     {
//         accessorKey: "total",
//         header: t("total_price"),
//         cell: ({ row }) => {
//             return (
//                 <div className="flex flex-row justify-start items-center gap-2">
//                     <p className="text-sm font-medium text-gray-600 uppercase">{row.getValue("total") || "---"} DA</p>
//                 </div>
//             )
//         },
//         maxSize: 10,
//     },
// ]
