import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/ui/avatar"
import { Link } from "@inertiajs/react";

export function RecentSales({ orders }) {

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div className="space-y-8">
      {orders.map((order, index) => (
        <Link 
          href={`/dashboard/orders/${order.id}`}
          key={index}
          className="flex items-center"
          >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order?.user?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className="ml-auto font-medium">{order?.total} DA</div>
        </Link>
      ))}
      {orders.length === 0 && (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">
              Aucune Commande récente
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
