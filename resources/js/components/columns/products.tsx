import { ColumnDef } from "@tanstack/react-table"
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { CiDeliveryTruck } from "react-icons/ci"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsInfo = {
    id: number;
    name: string;
    description: string;
    description_ar: string;
    main_image: string;
    quantity: string;
    unit: string;
    status: string;
    category: string;
    images?: string[];
    productPrices?: any[];
    receptions?: any[];
    orders?: any[];
}

export const columns: ColumnDef<ProductsInfo>[] = [
    {
        accessorKey: "id",
        header: "ID",
        maxSize: 5,
    },
    {
        accessorKey: "name",
        header: "Produit Name",
        maxSize: 60,
    },
    {
        accessorKey: "category",
        header: "Category",
        maxSize: 10,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            // CHECK IF RO
            let text = "NaN";
            let color = "bg-gray-600";
            switch (row.getValue("status")) {
                case "archived":
                    text = "ARCHIVED";
                    color = "bg-gray-600";
                    break;
                case "published":
                    text = "PUBLISHED";
                    color = "bg-green-600";
                    break;
                case "pinned":
                    text = "PINNED";
                    color = "bg-blue-600";
                    break;
                default:
                    text = "PUBLISHED";
                    color = "bg-green-600";
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
        maxSize: 10,
    },
    {
        accessorKey: "quantity",
        header: "Quantity En Stock",
        maxSize: 15,
    },
]
