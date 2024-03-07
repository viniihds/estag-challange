import CategoriesComponent from "./pages/CategoriesComponent"
import NavComponent from "./components/NavComponent"
import ProductsComponent from "./pages/ProductsComponent"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/categories" element={<CategoriesComponent />} />
          <Route path="/products" element={<ProductsComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
