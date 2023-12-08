import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategorieInfo = {
    id: number;
    name: string;
    name_ar: string;
}

export const columns: ColumnDef<CategorieInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize:5,
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex flex-row items-center gap-2 font-arabic">
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
]
