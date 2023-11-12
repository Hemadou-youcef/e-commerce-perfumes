import { Icons } from "@/components/icons"
import { Button } from "@/shadcn/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"

export function UserAuthForm() {
  return (
    <Card>
      <CardContent className="grid gap-4 p-5">
        
        <div className="grid gap-2">
          <Label htmlFor="user_name">User name</Label>
          <Input id="user_name" type="user_name" placeholder="User name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>


  )
}

{/* <div className="relative">
<div className="absolute inset-0 flex items-center">
  <span className="w-full border-t" />
</div>
<div className="relative flex justify-center text-xs uppercase">
  <span className="bg-background px-2 text-muted-foreground">
    Or continue with
  </span>
</div>
</div> */}