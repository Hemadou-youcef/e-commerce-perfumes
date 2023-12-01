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
        maxSize: 15,
    },
    {
        accessorKey: "name_ar",
        header: "Nom Arabe",
        maxSize: 15,
    },
]
