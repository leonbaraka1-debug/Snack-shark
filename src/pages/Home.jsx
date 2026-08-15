import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <main className="home">
        <section className="hero">
          <h1>Welcome to Snack Shop</h1>

          <p>
            Find your favorite snacks all in one place.
          </p>

          <a href="/shop" className="shop-button">
            Shop Now
          </a>
        </section>

        <section className="home-info">
          <h2>Our Snacks</h2>

          <p>
            We have a variety of snacks to choose from.
            Visit our shop to see what we have available.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;