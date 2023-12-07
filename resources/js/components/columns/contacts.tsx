import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContactsInfo = {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    subject: string;
    message: number;
}

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export const columns: ColumnDef<ContactsInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize:10,
    },
    {
        accessorKey: "subject",
        header: "Sujet",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex items-center font-bold">
                    {row?.original.subject}
                </div>
            )
        },
        maxSize: 30,
    },
    {
        accessorKey: "full_name",
        header: "Expéditeur",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex items-center font-medium">
                    {row?.original.first_name} {row?.original.last_name}
                </div>
            )
        },
        maxSize: 20,
    },
    {
        accessorKey: "email",
        header: "Email",
        maxSize: 20,
    },
    
    {
        accessorKey: "created_at",
        header: "Date d'envoi",
        cell: ({ row }: { row: any }) => {
            return (
                <div className="flex items-center font-medium">
                    {formatDate(row?.original.created_at)}
                </div>
            )
        },
        maxSize: 20,
    },
]
