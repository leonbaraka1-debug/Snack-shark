/**
 * @vitest-environment jsdom
 */

import {render, screen, cleanup } from "@testing-library/react";
import {describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SnackList from "../components/SnackList";

const mockUseSnacks = vi.fn();

vi.mock("../hooks/useSnacks", () => ({
  useSnacks: () => mockUseSnacks(),
}));

vi.mock("../components/SnackCard", () => ({
  default: ({ snack, isAdmin }) => (
    <div data-testid="snack-card">
      <span>{snack.name}</span>
      <span>{isAdmin ? "Admin" : "User"}</span>
    </div>
  ),
}));

describe("SnackList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows the loading message while snacks are loading", () => {
    mockUseSnacks.mockReturnValue({
      snacks: [],
      loading: true,
    });

    render(<SnackList />);

    expect(screen.getByText("Loading snacks...")).toBeTruthy();
  });

  it("shows a message when there are no snacks", () => {
    mockUseSnacks.mockReturnValue({
      snacks: [],
      loading: false,
    });

    render(<SnackList />);

    expect(screen.getByText("No snacks found.")).toBeTruthy();
  });

  it("renders all snacks", () => {
    const snacks = [
      {
        id: 1,
        name: "Samosa",
        price: 50,
      },
      {
        id: 2,
        name: "Chapati",
        price: 30,
      },
      {
        id: 3,
        name: "Coke",
        price: 100,
      },
    ];

    mockUseSnacks.mockReturnValue({
      snacks,
      loading: false,
    });

    render(<SnackList />);

    expect(screen.getByText("Samosa")).toBeTruthy();
    expect(screen.getByText("Chapati")).toBeTruthy();
    expect(screen.getByText("Coke")).toBeTruthy();
  });

  it("renders the correct number of SnackCards", () => {
    const snacks = [
      {
        id: 1,
        name: "Samosa",
        price: 50,
      },
      {
        id: 2,
        name: "Chapati",
        price: 30,
      },
      {
        id: 3,
        name: "Coke",
        price: 100,
      },
    ];

    mockUseSnacks.mockReturnValue({
      snacks,
      loading: false,
    });

    render(<SnackList />);

    expect(screen.getAllByTestId("snack-card")).toHaveLength(3);
  });

  it("passes isAdmin=true to SnackCard when the user is an admin", () => {
    const snacks = [
      {
        id: 1,
        name: "Samosa",
        price: 50,
      },
    ];

    mockUseSnacks.mockReturnValue({
      snacks,
      loading: false,
    });

    render(<SnackList isAdmin={true} />);

    expect(screen.getByText("Admin")).toBeTruthy();
  });

  it("passes isAdmin=false to SnackCard by default", () => {
    const snacks = [
      {
        id: 1,
        name: "Samosa",
        price: 50,
      },
    ];

    mockUseSnacks.mockReturnValue({
      snacks,
      loading: false,
    });

    render(<SnackList />);

    expect(screen.getByText("User")).toBeTruthy();
  });
});