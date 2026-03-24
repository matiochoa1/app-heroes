import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero-action";

export const useHeroInformation = (idSlug: string) => {
  return useQuery({
    queryKey: ["hero", idSlug],
    queryFn: () => getHero(idSlug),
    retry: false,
  });
};
