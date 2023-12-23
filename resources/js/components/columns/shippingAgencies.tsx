import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
import { FaPowerOff } from "react-icons/fa";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShippingAgenciesInfo = {
    id: number;
    name: string;
    name_ar: string;
    active: boolean;
}

export const columns: ColumnDef<ShippingAgenciesInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize: 5,
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex flex-row items-center gap-2 font-arabic font-sm">
                    <span>{row?.original?.name}</span>
                </div>
            )
        },
        maxSize: 15,
    },
    {
        accessorKey: "name_ar",
        header: "Nom Arabe",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex flex-row items-center gap-2 font-arabic">
                    <span>{row?.original?.name_ar}</span>
                </div>
            )
        },
        maxSize: 15,
    },
    {
        accessorKey: "active",
        header: "Statut",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    {row?.original?.active === 1 && (
                        <div className="flex items-center gap-2 rounded-none bg-green-100 px-2 py-1">
                            <FaPowerOff className="text-green-700 text-xl" />
                            <p className="text-sm font-bold text-green-700">Active</p>
                        </div>
                    )}
                    {row?.original?.active === 0 && (
                        <div className="flex items-center gap-2 rounded-none bg-red-100 px-2 py-1">
                            <FaPowerOff className="text-red-700 text-xl" />
                            <p className="text-sm font-bold text-red-700">Désactivé</p>
                        </div>
                    )}
                </div>
            )
        },
        maxSize: 10,
    },
]
