import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Analytics from './pages/Analytics'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Support from './pages/Support'
import Discounts from './pages/Discounts'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="main-area flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/analytics" />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}