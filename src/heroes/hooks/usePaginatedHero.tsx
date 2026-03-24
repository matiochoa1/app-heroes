import { useQuery } from "@tanstack/react-query";

import { getHeroesByPageAction } from "../actions/get-heroes-by-page-action";

export const usePaginatedHero = (
  page: number,
  limit: number,
  category = "all",
) => {
  return useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category), //cuando una funcion recibe argumentos estos tienen que ser parte del queryKey recomendacion de tanstack query
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
