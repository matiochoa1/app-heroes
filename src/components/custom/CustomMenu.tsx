import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { HomeIcon, Search } from "lucide-react";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <NavigationMenu className="py-10">
        <NavigationMenuList className="flex gap-2">
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                isActive("/") && "bg-purple-300 ",
                "p-2 rounded-md transition-all hover:bg-purple-200 text-lg",
              )}
            >
              <HomeIcon />
              <Link to="/">Inicio</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Busqueda */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                isActive("/search") && "bg-purple-300",
                "p-2 rounded-md transition-all hover:bg-purple-200 text-lg",
              )}
            >
              <Search />
              <Link to="/search">Busqueda</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
