import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  client: string
  number: string
  address: string
  status: any
  email: string
  amount: number
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
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
