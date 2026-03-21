import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                isActive("/") && "bg-purple-200 ",
                "p-2 rounded-md transition-all",
              )}
            >
              <Link to="/">Inicio</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Busqueda */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                isActive("/search") && "bg-purple-200",
                "p-2 rounded-md transition-all",
              )}
            >
              <Link to="/search">Busqueda</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
