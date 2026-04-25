import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchControls } from "./SearchControls";
import { beforeEach } from "node:test";

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}

const renderSearchControls = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe("SearchControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render SearchControls with default values", () => {
    const { container } = renderSearchControls();

    expect(container).toMatchSnapshot();
  });

  test("should set input value when search param name is set", () => {
    renderSearchControls(["/?name=batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );

    expect(input.getAttribute("value")).toBe("batman");
  });

  test("should change params when input is changed and enter is pressed", () => {
    renderSearchControls(["/?name=batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );

    fireEvent.change(input, { target: { value: "superman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("superman");
  });
});
