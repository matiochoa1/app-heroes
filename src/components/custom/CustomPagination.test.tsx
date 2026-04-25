import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import type { PropsWithChildren } from "react";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

describe("CustomPagination", () => {
  test("should render component with default values", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText("Anterior")).toBeDefined();
    expect(screen.getByText("Siguiente")).toBeDefined();
  });

  test("should disable previous button when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    const previousButton = screen.getByText("Anterior");

    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("should disable next button when we are in the last page", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"]);

    const nextButton = screen.getByText("Siguiente");

    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("should disable button 3 when we are in the page 3", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=3"]);

    const secondPage = screen.getByText("2");
    const thirdPage = screen.getByText("3");

    expect(secondPage.getAttribute("variant")).toContain("outline");
    expect(thirdPage.getAttribute("variant")).toContain("default");
  });

  test("should change page when click on number button", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=3"]);

    const secondPage = screen.getByText("2");
    const thirdPage = screen.getByText("3");

    fireEvent.click(secondPage);

    expect(secondPage.getAttribute("variant")).toContain("default");
    expect(thirdPage.getAttribute("variant")).toContain("outline");
  });
});
