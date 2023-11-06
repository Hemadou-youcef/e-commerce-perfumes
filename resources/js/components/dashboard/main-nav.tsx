import { Link } from "@inertiajs/react"

import { cn } from "@/shadcn"


const parsePageId = (path: string) => path.substring(path.lastIndexOf('/') + 1)

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const pageId = parsePageId(window.location.pathname)
  console.log(pageId)
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin"
        className={`"text-sm font-medium transition-colors hover:text-primary transition-colors" ${
          pageId === "admin" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Overview
      </Link>
      <Link
        href="/admin/orders"
        className={`"text-sm font-medium transition-colors hover:text-primary transition-colors" ${
          pageId === "orders" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Orders
      </Link>
      <Link
        href="/admin/customers"
        className={`"text-sm font-medium transition-colors hover:text-primary" ${
          pageId === "customers" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Customers
      </Link>
      <Link
        href="/admin/products"
        className={`"text-sm font-medium transition-colors hover:text-primary" ${
          pageId === "products" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Products
      </Link>
      <Link
        href="/admin/settings"
        className={`"text-sm font-medium transition-colors hover:text-primary" ${
          pageId === "settings" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Settings
      </Link>
    </nav>
  )
}
