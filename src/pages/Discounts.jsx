import { useState } from 'react'
import { useStore } from '../context/store'

const randomCode = () => 'SAVE' + Math.random().toString(36).slice(2, 6).toUpperCase()

export default function Discounts() {
  const { discounts, setDiscounts } = useStore()
  const [form, setForm] = useState({ code: randomCode(), type: 'percent', value: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const createDiscount = e => {
    e.preventDefault()
    const value = Number(form.value)
    if (!form.code.trim()) return setError('Code is required')
    if (value <= 0) return setError('Value must be greater than 0')
    if (form.type === 'percent' && value > 100) return setError('Percent cannot be more than 100')
    if (discounts.some(d => d.code === form.code.toUpperCase())) return setError('This code already exists')

    setDiscounts([...discounts, { id: Date.now(), code: form.code.toUpperCase(), type: form.type, value, used: 0 }])
    setForm({ code: randomCode(), type: 'percent', value: '' })
    setError('')
  }

  const simulateUse = id => {
    setDiscounts(discounts.map(d => (d.id === id ? { ...d, used: d.used + 1 } : d)))
  }

  const remove = id => setDiscounts(discounts.filter(d => d.id !== id))

  return (
    <>
      <h3 className="mb-3">Discount Campaigns</h3>

      <form className="card-box p-3 mb-3" onSubmit={createDiscount}>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label">Code</label>
            <div className="input-group">
              <input className="form-control" name="code" value={form.code} onChange={handleChange} />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setForm({ ...form, code: randomCode() })}>
                <i className="bi bi-shuffle"></i>
              </button>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label">Type</label>
            <select className="form-select" name="type" value={form.type} onChange={handleChange}>
              <option value="percent">Percentage (%)</option>
              <option value="fixed">Fixed ($)</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label">Value</label>
            <input type="number" className="form-control" name="value" value={form.value} onChange={handleChange} />
          </div>
          <div className="col-12 col-md-2">
            <button className="btn btn-primary w-100">Create</button>
          </div>
        </div>
      </form>

      <div className="card-box p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr><th>Code</th><th>Discount</th><th>Times used</th><th></th></tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d.id}>
                <td><code className="fs-6">{d.code}</code></td>
                <td>{d.type === 'percent' ? `${d.value}%` : `$${d.value}`}</td>
                <td>{d.used}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-light me-1" onClick={() => simulateUse(d.id)}>Simulate use</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => remove(d.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}