import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReceptionInfo = {
    id: number;
    name: string;
    quantity: string;
    price: string;
    rest: string;
    user?: any;
    product?: any;
    reservations?: any[];
    created_at?: any;
}

export const columns: ColumnDef<ReceptionInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize: 1,
    },
    {
        accessorKey: "name",
        header: "Nom du Reception",
        maxSize: 20,
    },
    {
        accessorKey: "product.name",
        header: "Nom du Produit",
        maxSize: 20,
    },
    {
        accessorKey: "user",
        header: "Ajouter par",
        cell: ({ row }:{row :any }) => {
            return (
                <div className="flex items-center">
                    {row?.original.user?.first_name} {row?.original.user?.last_name}
                </div>
            )
        },
        maxSize: 20,
    },
    {
        accessorKey: "quantity",
        header: "Quantity du Reception",
        cell: ({ row }:{row :any }) => {
            return (
                <div className="flex items-center">
                    {row?.original.quantity} {row?.original.product?.unit}
                </div>
            )
        },
        maxSize: 10,
    },
    {
        accessorKey: "rest",
        header: "Rest En Stock",
        cell: ({ row }:{row :any }) => {
            return (
                <div className="flex items-center">
                    {row?.original.rest} {row?.original.product?.unit}
                </div>
            )
        },
        maxSize: 8,
    },
]
