import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackProvider } from "./context/SnackContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <SnackProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </SnackProvider>
    </BrowserRouter>
  );
}

export default App;