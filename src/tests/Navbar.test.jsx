import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Navbar from "../components/Navbar";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  it("renders the Snack Shop logo", () => {
    render(<Navbar />);

    expect(screen.getByText("Snack Shop")).toBeTruthy();
  });

  it("renders the Home link", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });

    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("renders the Shop link", () => {
    render(<Navbar />);

    const shopLink = screen.getByRole("link", { name: "Shop" });

    expect(shopLink).toBeTruthy();
    expect(shopLink.getAttribute("href")).toBe("/shop");
  });

  it("renders the Admin link", () => {
    render(<Navbar />);

    const adminLink = screen.getByRole("link", { name: "Admin" });

    expect(adminLink).toBeTruthy();
    expect(adminLink.getAttribute("href")).toBe("/admin");
  });

  it("renders all three navigation links", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    const links = nav.querySelectorAll("a");

    expect(links).toHaveLength(3);
  });
});