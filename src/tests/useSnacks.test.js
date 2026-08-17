import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
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

    // Let the mount effect's fetch resolve
    await act(async () => {
      await result.current.refetch();
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

    // Mount's GET must return an array, POST must return the created snack,
    // otherwise the mount fetch would poison `snacks` with a non-array value.
    window.fetch = vi.fn((url, options = {}) => {
      const method = options.method || "GET";
      if (method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => createdSnack,
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    });

    const { result } = renderHook(() => useSnacks());

    // Wait for the mount effect's GET to finish so it can't clobber
    // state after the POST below resolves.
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addProduct(newSnack);
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
    const existingSnack = {
      id: "1",
      name: "Crispy Chips",
      category: "Kenyan",
      type: "Chips",
      price: 100,
    };

    const updatedSnack = {
      ...existingSnack,
      price: 150,
    };

    // Mount's GET returns the existing snack so there's something to update.
    // PATCH returns the updated version.
    window.fetch = vi.fn((url, options = {}) => {
      const method = options.method || "GET";
      if (method === "PATCH") {
        return Promise.resolve({
          ok: true,
          json: async () => updatedSnack,
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => [existingSnack],
      });
    });

    const { result } = renderHook(() => useSnacks());

    // Wait for the mount effect's GET to finish so it can't clobber
    // state after the PATCH below resolves.
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateProduct("1", {
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
    const existingSnack = {
      id: "1",
      name: "Crispy Chips",
      category: "Kenyan",
      type: "Chips",
      price: 100,
    };

    // Mount's GET returns the existing snack so there's something to delete.
    // DELETE returns an empty object, matching json-server's real behavior.
    window.fetch = vi.fn((url, options = {}) => {
      const method = options.method || "GET";
      if (method === "DELETE") {
        return Promise.resolve({
          ok: true,
          json: async () => ({}),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => [existingSnack],
      });
    });

    const { result } = renderHook(() => useSnacks());

    // Wait for the mount effect's GET to finish so it can't clobber
    // state after the DELETE below resolves.
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteProduct("1");
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