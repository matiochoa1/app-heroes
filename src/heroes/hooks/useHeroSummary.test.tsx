import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useHeroSummary } from "./useHeroSummary";
import { getSummaryAction } from "../actions/get-summary-action";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import tanstackCustomProvider from "@/tests/helpers/TestCustomProvider";

// Lo importante es testear nuestro custom hook y no tanto que tanstack funcione
// Metodo para crear un mock sin depender de terceros
vi.mock("../actions/get-summary-action", () => ({
  getSummaryAction: vi.fn(),
}));

// Asi tenemos acceso a poder manipular mas facilmente el mock y retornar lo que querramos
const mockGetSummaryAction = vi.mocked(getSummaryAction);

describe("useHeroSumary", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanstackCustomProvider(), // necesitamos usarlo como wrapper
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success with data when API call succeeds", async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: "1",
        name: "Superman",
      },
      smartestHero: {
        id: "2",
        name: "Batman",
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse; // este es el objeto que quiero que mi funcion responda

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanstackCustomProvider(),
    });

    // Tecnica para esperar el siguiente state
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test("should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch summary");

    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });
});
