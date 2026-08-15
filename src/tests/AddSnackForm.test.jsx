/* @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import AddSnackForm from "../components/AddSnackForm";

afterEach(() => {
  cleanup();
});

describe("AddSnackForm", () => {
  it("renders the form fields", () => {
    render(<AddSnackForm onAddSnack={vi.fn()} />);

    const nameInput =
      screen.getByPlaceholderText("Snack/Drink name");

    const priceInput =
      screen.getByPlaceholderText("Price");

    const imageInput =
      screen.getByPlaceholderText("Image URL");

    const button =
      screen.getByRole("button", {
        name: "Add Snack",
      });

    expect(nameInput).toBeTruthy();
    expect(priceInput).toBeTruthy();
    expect(imageInput).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("allows the user to enter snack information", () => {
    render(<AddSnackForm onAddSnack={vi.fn()} />);

    const nameInput =
      screen.getByPlaceholderText("Snack/Drink name");

    const priceInput =
      screen.getByPlaceholderText("Price");

    fireEvent.change(nameInput, {
      target: {
        name: "name",
        value: "Samosa",
      },
    });

    fireEvent.change(priceInput, {
      target: {
        name: "price",
        value: "50",
      },
    });

    expect(nameInput.value).toBe("Samosa");
    expect(priceInput.value).toBe("50");
  });

  it("calls onAddSnack when a valid snack is submitted", () => {
    const onAddSnack = vi.fn();

    render(<AddSnackForm onAddSnack={onAddSnack} />);

    const nameInput =
      screen.getByPlaceholderText("Snack/Drink name");

    const priceInput =
      screen.getByPlaceholderText("Price");

    fireEvent.change(nameInput, {
      target: {
        name: "name",
        value: "Samosa",
      },
    });

    fireEvent.change(priceInput, {
      target: {
        name: "price",
        value: "50",
      },
    });

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Add Snack",
      })
    );

    expect(onAddSnack).toHaveBeenCalledTimes(1);

    expect(onAddSnack).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Samosa",
        category: "Kenyan",
        type: "snack",
        price: 50,
        image: "",
      })
    );
  });

  it("does not submit when the name is empty", () => {
    const onAddSnack = vi.fn();

    render(<AddSnackForm onAddSnack={onAddSnack} />);

    const priceInput =
      screen.getByPlaceholderText("Price");

    fireEvent.change(priceInput, {
      target: {
        name: "price",
        value: "50",
      },
    });

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Add Snack",
      })
    );

    expect(onAddSnack).not.toHaveBeenCalled();
  });

  it("does not submit when the price is empty", () => {
    const onAddSnack = vi.fn();

    render(<AddSnackForm onAddSnack={onAddSnack} />);

    const nameInput =
      screen.getByPlaceholderText("Snack/Drink name");

    fireEvent.change(nameInput, {
      target: {
        name: "name",
        value: "Samosa",
      },
    });

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Add Snack",
      })
    );

    expect(onAddSnack).not.toHaveBeenCalled();
  });

  it("resets the form after successfully adding a snack", () => {
    const onAddSnack = vi.fn();

    render(<AddSnackForm onAddSnack={onAddSnack} />);

    const nameInput =
      screen.getByPlaceholderText("Snack/Drink name");

    const priceInput =
      screen.getByPlaceholderText("Price");

    fireEvent.change(nameInput, {
      target: {
        name: "name",
        value: "Mandazi",
      },
    });

    fireEvent.change(priceInput, {
      target: {
        name: "price",
        value: "30",
      },
    });

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Add Snack",
      })
    );

    expect(onAddSnack).toHaveBeenCalledTimes(1);

    expect(nameInput.value).toBe("");
    expect(priceInput.value).toBe("");
  });
});