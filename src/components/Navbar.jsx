function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Snack Shop
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/admin">Admin</a>
      </div>
    </nav>
  );
}

export default Navbar;