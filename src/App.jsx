import { Routes, Route, Link } from 'react-router-dom';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import './App.css';

function Home() {
  return (
    <section id="center">
      <h1>Snack-shark</h1>
      <p>E-commerce admin portal. Navigate to Shop or Admin to get started.</p>
    </section>
  );
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;