import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useSnacks from "../hooks/useSnacks";

describe("useSnacks", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches snacks successfully", async () => {
    const snacks = [
      {
        id: "1",
        name: "Crispy Chips",
        category: "Kenyan",
        type: "Chips",
        price: 100,
      },
    ];

    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => snacks,
    });

    const { result } = renderHook(() => useSnacks());

    await act(async () => {
      await result.current.fetchSnacks();
    });

    expect(result.current.snacks).toEqual(snacks);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/snacks"
    );
  });

  it("adds a new snack", async () => {
    const newSnack = {
      name: "Samosa",
      category: "Kenyan",
      type: "Pastry",
      price: 50,
    };

    const createdSnack = {
      id: "3",
      ...newSnack,
    };

    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdSnack,
    });

    const { result } = renderHook(() => useSnacks());

    await act(async () => {
      await result.current.addSnack(newSnack);
    });

    expect(result.current.snacks).toContainEqual(createdSnack);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/snacks",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("updates a snack", async () => {
    const updatedSnack = {
      id: "1",
      name: "Crispy Chips",
      category: "Kenyan",
      type: "Chips",
      price: 150,
    };

    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => updatedSnack,
    });

    const { result } = renderHook(() => useSnacks());

    await act(async () => {
      await result.current.updateSnack("1", {
        price: 150,
      });
    });

    expect(result.current.snacks).toContainEqual(updatedSnack);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/snacks/1",
      expect.objectContaining({
        method: "PATCH",
      })
    );
  });

  it("deletes a snack", async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useSnacks());

    await act(async () => {
      await result.current.deleteSnack("1");
    });

    expect(result.current.snacks).toEqual([]);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/snacks/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});