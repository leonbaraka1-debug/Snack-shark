/* @vitest-environment jsdom */

import {describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {render, screen, fireEvent, cleanup } from "@testing-library/react";
  import SnackCard from "../components/SnackCard";

const updatePrice = vi.fn();

vi.mock("../hooks/useSnacks", () => ({
  useSnacks: () => ({
    updatePrice,
  }),
}));

const snack = {
  id: 1,
  name: "Samosa",
  description: "A delicious Kenyan snack",
  origin: "Kenya",
  price: 50,
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("SnackCard", () => {
  it("renders the snack information", () => {
    render(<SnackCard snack={snack} />);

    expect(
      screen.getByText("Samosa")
    ).toBeTruthy();

    expect(
      screen.getByText("A delicious Kenyan snack")
    ).toBeTruthy();

    expect(
      screen.getByText("Kenya", { exact: true })
    ).toBeTruthy();

    expect(
      screen.getByText("$50.00")
    ).toBeTruthy();
  });

  it("does not show admin controls for a normal user", () => {
    render(<SnackCard snack={snack} />);

    expect(
      screen.queryByRole("button", {
        name: "Edit Price",
      })
    ).toBeNull();
  });

  it("shows the Edit Price button for an admin", () => {
    render(
      <SnackCard
        snack={snack}
        isAdmin={true}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    ).toBeTruthy();
  });

  it("opens the price editing form when Edit Price is clicked", () => {
    render(
      <SnackCard
        snack={snack}
        isAdmin={true}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Save",
      })
    ).toBeTruthy();

    expect(
      screen.getByRole("button", {
        name: "Cancel",
      })
    ).toBeTruthy();

    expect(
      screen.getByRole("spinbutton")
    ).toBeTruthy();
  });

  it("allows the admin to change the price", () => {
    render(
      <SnackCard
        snack={snack}
        isAdmin={true}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    );

    const priceInput =
      screen.getByRole("spinbutton");

    fireEvent.change(priceInput, {
      target: {
        value: "75",
      },
    });

    expect(priceInput.value).toBe("75");
  });

  it("calls updatePrice when the new price is saved", async () => {
    updatePrice.mockResolvedValueOnce();

    render(
      <SnackCard
        snack={snack}
        isAdmin={true}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    );

    const priceInput =
      screen.getByRole("spinbutton");

    fireEvent.change(priceInput, {
      target: {
        value: "75",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      })
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 0)
    );

    expect(
      updatePrice
    ).toHaveBeenCalledTimes(1);

    expect(
      updatePrice
    ).toHaveBeenCalledWith(1, "75");
  });

  it("closes the editing form when Cancel is clicked", () => {
    render(
      <SnackCard
        snack={snack}
        isAdmin={true}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Save",
      })
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Edit Price",
      })
    ).toBeTruthy();

    expect(
      screen.queryByRole("button", {
        name: "Save",
      })
    ).toBeNull();
  });
});