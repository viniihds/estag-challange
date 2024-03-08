import CategoriesComponent from "./pages/CategoriesComponent"
import NavComponent from "./components/NavComponent"
import ProductsComponent from "./pages/ProductsComponent"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexComponent from "./pages/IndexComponent"
import HistoryComponent from "./pages/HistoryComponent"
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/categories" element={<CategoriesComponent />} />
          <Route path="/products" element={<ProductsComponent />} />
          <Route path="/" element={<IndexComponent />} />
          <Route path="/history" element={<HistoryComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
