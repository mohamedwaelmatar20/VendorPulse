import { NavLink } from 'react-router-dom'
import { useStore } from '../context/store'

export default function Sidebar() {
  const { orders, tickets, settings } = useStore()

  const links = [
    { to: '/analytics', icon: 'bi-graph-up', label: 'Analytics' },
    { to: '/products', icon: 'bi-box-seam', label: 'Products' },
    { to: '/orders', icon: 'bi-truck', label: 'Orders', badge: orders.filter(o => o.status === 'Pending').length },
    { to: '/customers', icon: 'bi-people', label: 'Customers' },
    { to: '/support', icon: 'bi-chat-dots', label: 'Support', badge: tickets.filter(t => t.open).length },
    { to: '/discounts', icon: 'bi-tag', label: 'Discounts' },
    { to: '/settings', icon: 'bi-gear', label: 'Settings' },
  ]

  return (
    <aside className="sidebar p-3">
      <h4 className="text-white mb-4">
        <i className="bi bi-lightning-charge-fill text-warning"></i> {settings.storeName}
      </h4>
      <nav className="nav flex-column">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} className="nav-link d-flex align-items-center">
            <i className={`bi ${link.icon} me-2`}></i>
            {link.label}
            {link.badge > 0 && <span className="badge bg-danger ms-auto">{link.badge}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}