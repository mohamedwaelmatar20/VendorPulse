import * as seed from '../data/seed'
import { StoreContext } from './store'
import useLocalStorage from '../hooks/useLocalStorage'

export function StoreProvider({ children }) {
  const [products, setProducts] = useLocalStorage('vp-products', seed.products)
  const [orders, setOrders] = useLocalStorage('vp-orders', seed.orders)
  const [tickets, setTickets] = useLocalStorage('vp-tickets', seed.tickets)
  const [discounts, setDiscounts] = useLocalStorage('vp-discounts', seed.discounts)
  const [customers, setCustomers] = useLocalStorage('vp-customers', seed.customers)
  const [settings, setSettings] = useLocalStorage('vp-settings', seed.settings)

  const resetAll = () => {
    setProducts(seed.products)
    setOrders(seed.orders)
    setTickets(seed.tickets)
    setDiscounts(seed.discounts)
    setCustomers(seed.customers)
    setSettings(seed.settings)
  }

  const value = {
    products, setProducts,
    orders, setOrders,
    tickets, setTickets,
    discounts, setDiscounts,
    customers, setCustomers,
    settings, setSettings,
    resetAll,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}