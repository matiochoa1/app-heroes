import { useQuery } from "@tanstack/react-query";

import { getHeroesByPageAction } from "../actions/get-heroes-by-page-action";

export const usePaginatedHero = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["heroes", { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit), //cuando una funcion recibe argumentos estos tienen que ser parte del queryKey recomendacion de tanstack query
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
