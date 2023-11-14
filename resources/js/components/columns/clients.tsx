import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientsInfo = {
    id: number;
    full_name: string;
    phone_number: string;
    address: string;
    role: number;
    status: string;
}

export const columns: ColumnDef<ClientsInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        size:1,
        maxSize:1,
    },
    {
        accessorKey: "full_name",
        header: "Utilisateur",
    },
    {
        accessorKey: "phone_number",
        header: "Numéro de téléphone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "role",
        header: "Role",
        maxSize: 1,
        cell: ({ row }) => {
            // CHECK IF RO
            let text = "NaN";
            let color = "bg-gray-600";
            switch (row.getValue("role")) {
                case 0:
                    text = "GUEST";
                    color = "bg-gray-600";
                    break;
                case 1:
                    text = "CLIENT";
                    color = "bg-green-600";
                    break;
                case 2:
                    text = "TRAVAILLEUR";
                    color = "bg-yellow-600";
                    break;
                case 3:
                    text = "ADMIN";
                    color = "bg-red-600";
                    break;
            }

            return (
                <div className="flex flex-row justify-start items-center gap-2">
                    <p className={`px-3 py-1 rounded-sm text-xs font-medium text-white uppercase ${color}`}>
                        {text}
                    </p>
                </div>
            )
        },

    },
]
