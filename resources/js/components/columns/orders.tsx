import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
import { Button } from "@/shadcn/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersInfo = {
    id: number
    client: string
    number: string
    address: string
    status: string
    total: number
    user: any
}

export const columns: ColumnDef<OrdersInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize: 5,
    },
    {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-sm font-medium text-gray-600 uppercase">{row?.original?.user?.first_name} {row?.original?.user?.last_name}</p>
                </div>
            )
        },
        maxSize: 20,
    },
    {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-sm font-medium text-gray-600 uppercase">{row?.original?.user?.phone}</p>
                </div>
            )
        },
        maxSize: 10,
    },
    {
        accessorKey: "address",
        header: "Address",
        maxSize: 40,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            // CHECK IF RO
            let text = "NaN";
            let Icon: JSX.Element = <></>;
            switch (row.getValue("status")) {
                case "pending":
                    text = "En attente";
                    Icon = <StopwatchIcon />
                    break;
                case "confirmed":
                    text = "Confirmé";
                    Icon = <CheckCircledIcon className="text-green-400" />
                    break;
                case "verified":
                    text = "Vérifié";
                    Icon = <CheckCircledIcon className="text-green-400" />
                    break;
                case "delivered":
                    text = "Livré";
                    Icon = <CiDeliveryTruck className="text-lg" />
                    break;
                case "cancelled":
                    text = "Annulé";
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
        header: "Prix ​​total",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-sm font-medium text-gray-600 uppercase">{row.getValue("total") || "---"} DA</p>
                </div>
            )
        },
        maxSize: 10,
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => (
    //         <div>
    //             <Button
    //                 className="w-full"
    //                 onClick={() => console.log(row)}
    //             >
    //                 Voir
    //             </Button>
    //         </div>
    //     ),
    //     size: 1,
    // },
]
