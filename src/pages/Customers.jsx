import { useState } from 'react'
import { useStore } from '../context/store'

const VIP_LIMIT = 500

export default function Customers() {
  const { customers, setCustomers } = useStore()
  const [search, setSearch] = useState('')

  const text = search.toLowerCase()
  const visible = customers.filter(
    c => c.name.toLowerCase().includes(text) || c.city.toLowerCase().includes(text)
  )

  const initials = name => name.split(' ').map(word => word[0]).join('')

  const remove = id => setCustomers(customers.filter(c => c.id !== id))

  return (
    <>
      <h3 className="mb-3">Customers</h3>

      <div className="card-box p-3">
        <input
          className="form-control w-auto mb-3"
          placeholder="Search name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Customer</th>
                <th>City</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar me-2">{initials(c.name)}</div>
                      <div>
                        <div className="fw-semibold">
                          {c.name}{' '}
                          {c.spent >= VIP_LIMIT && <span className="badge bg-warning text-dark">VIP</span>}
                        </div>
                        <div className="text-muted small">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.city}</td>
                  <td>{c.orders}</td>
                  <td>${c.spent}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(c.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan="5" className="text-center text-muted py-4">No customers found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}