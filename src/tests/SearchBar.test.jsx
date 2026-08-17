/* @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import SearchBar from "../components/SearchBar";

afterEach(() => {
  cleanup();
});

describe("SearchBar", () => {
  it("renders the search input and category selector", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("Search snacks or drinks...")
    ).toBeTruthy();

    expect(
      screen.getByRole("combobox")
    ).toBeTruthy();
  });

  it("allows the user to enter a search query", () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const searchInput = screen.getByPlaceholderText(
      "Search snacks or drinks..."
    );

    fireEvent.change(searchInput, {
      target: {
        value: "Samosa",
      },
    });

    expect(searchInput.value).toBe("Samosa");
  });

  it("calls onSearch when the category is changed", () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const categorySelect = screen.getByRole("combobox");

    fireEvent.change(categorySelect, {
      target: {
        value: "Kenyan",
      },
    });

    expect(onSearch).toHaveBeenCalled();
  });

  it("uses the selected category when searching", () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const searchInput = screen.getByPlaceholderText(
      "Search snacks or drinks..."
    );

    const categorySelect = screen.getByRole("combobox");

    fireEvent.change(categorySelect, {
      target: {
        value: "Kenyan",
      },
    });

    fireEvent.change(searchInput, {
      target: {
        value: "Samosa",
      },
    });

    expect(onSearch).toHaveBeenCalled();

    expect(onSearch).toHaveBeenLastCalledWith(
      "Samosa",
      "Kenyan"
    );
  });
});