import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./theme/mode-toggle";
import { AccountMenu } from "./AccountMenu";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to={"/"}>
            <Home className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to={"/orders"}>
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
