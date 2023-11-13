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
export type Payment = {
    id: number
    client: string
    number: string
    address: string
    status: any
    total_price: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "client",
        header: "Client",
    },
    {
        accessorKey: "number",
        header: "Number",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            // CHECK IF RO
            let text = "NaN";
            let Icon: JSX.Element = <></>;
            switch (row.getValue("status")) {
                case "1":
                    text = "En attente";
                    Icon = <StopwatchIcon />
                    break;
                case "2":
                    text = "Confirmé";
                    Icon = <CheckCircledIcon className="text-green-400" />
                    break;
                case "3":
                    text = "Livré";
                    Icon = <CiDeliveryTruck className="text-lg" />
                    break;
                case "0":
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

    },
    {
        accessorKey: "total_price",
        header: "Prix ​​total",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-sm font-medium text-gray-600 uppercase">{row.getValue("total_price") || "---"} DA</p>
                </div>
            )
        }
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
