import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/ui/avatar"
import { Link } from "@inertiajs/react";
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { CiDeliveryTruck } from "react-icons/ci";

export function RecentSales({ orders }) {
  console.log(orders)
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  const orderStatus = ({ status }) => {
    let text = "";
    let Icon: JSX.Element = <></>;
    console.log(status)
    switch (status) {
      case "pending":
        text = "En attente";
        Icon = <StopwatchIcon />
        break;
      case "confirmed":
        text = "Confirmé";
        Icon = <CheckCircledIcon className="text-green-400" />
        break;
      case "verified":
        text = "Vérifié";
        Icon = <CheckCircledIcon className="text-green-400" />
        break;
      case "delivered":
        text = "Livré";
        Icon = <CiDeliveryTruck className="text-lg" />
        break;
      case "cancelled":
        text = "Annulé";
        Icon = <CrossCircledIcon />
        break;
    }
    return (
      <Avatar className="h-9 w-9 font-arabic">
        <AvatarFallback>
          {Icon}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="space-y-8">
      {orders.map((order, index) => (
        <Link
          href={`/dashboard/orders/${order.id}`}
          key={index}
          className="flex items-center"
        >
          {/* <Avatar className="h-9 w-9 font-arabic">
            <AvatarFallback>
              {order?.status == "delivered" && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {order?.status}
              </span>}
            </AvatarFallback> 
          </Avatar>*/}
          <div className="flex-shrink-0 h-9 w-9">
            {orderStatus(order)}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none font-arabic">
              {order?.user?.first_name} {order?.user?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +{order?.total} DA
          </div>
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
