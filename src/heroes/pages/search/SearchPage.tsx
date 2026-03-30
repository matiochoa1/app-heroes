import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { searchHeroAction } from "@/heroes/actions/search-heros.action";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: searchData = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotron
        title="Busqueda de Superheroes"
        description="Descubre, explora y administra tus super heroes favoritos"
      />

      <CustomBreadcrumbs currentPage="Buscador de Heroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {searchData.length === 0 ? (
        <p className="py-5 bg-purple-500 rounded-md text-white text-lg text-center font-bold">
          No hay resultados con ese criterio de busqueda...
        </p>
      ) : (
        <HeroGrid heroes={searchData} />
      )}
    </>
  );
};
