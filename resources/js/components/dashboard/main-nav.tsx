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
    <>
      <div className="hidden md:block">
      </div>
      <nav
        className={cn("hidden lg:flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >

        <Link
          href="/admin"
          className={`"text-sm font-medium transition-colors hover:text-primary transition-colors" ${pageId === "admin" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Aperçu
        </Link>
        <Link
          href="/admin/orders"
          className={`"text-sm font-medium transition-colors hover:text-primary transition-colors" ${pageId === "orders" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Les Commandes
        </Link>
        <Link
          href="/admin/users"
          className={`"text-sm font-medium transition-colors hover:text-primary" ${pageId === "users" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Utilisateurs
        </Link>
        <Link
          href="/admin/products"
          className={`"text-sm font-medium transition-colors hover:text-primary" ${pageId === "products" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Produits
        </Link>
        <Link
          href="/admin/stock"
          className={`"text-sm font-medium transition-colors hover:text-primary" ${pageId === "stock" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Inventaire
        </Link>
        <Link
          href="/admin/settings"
          className={`"text-sm font-medium transition-colors hover:text-primary" ${pageId === "settings" ? "text-primary" : "text-muted-foreground"
            }`}
        >
          Settings
        </Link>

      </nav>
    </>
  )
}
