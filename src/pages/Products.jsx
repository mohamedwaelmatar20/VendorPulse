import { useState, useMemo } from 'react'
import { useStore } from '../context/store'
import ProductModal from '../components/ProductModal'

const PAGE_SIZE = 5

const COLUMNS = [
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'warehouse', label: 'Warehouse' },
]

export default function Products() {
  const { products, setProducts, settings } = useStore()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [editing, setEditing] = useState(null) // null = modal closed, {} = new, product = edit

  // 1) search  2) sort
  const filtered = useMemo(() => {
    const text = search.toLowerCase()
    const list = products.filter(
      p => p.name.toLowerCase().includes(text) || p.category.toLowerCase().includes(text)
    )
    return list.sort((a, b) => {
      const x = a[sort.key]
      const y = b[sort.key]
      const result = typeof x === 'number' ? x - y : String(x).localeCompare(y)
      return sort.dir === 'asc' ? result : -result
    })
  }, [products, search, sort])

  // 3) pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = key => {
    setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }))
  }

  const toggleRow = id => {
    setSelected(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    const ids = rows.map(r => r.id)
    const allSelected = ids.every(id => selected.includes(id))
    setSelected(allSelected ? selected.filter(id => !ids.includes(id)) : [...new Set([...selected, ...ids])])
  }

  const deleteSelected = () => {
    setProducts(products.filter(p => !selected.includes(p.id)))
    setSelected([])
  }

  const addStock = () => {
    setProducts(products.map(p => (selected.includes(p.id) ? { ...p, stock: p.stock + 10 } : p)))
    setSelected([])
  }

  const saveProduct = data => {
    if (data.id) {
      setProducts(products.map(p => (p.id === data.id ? data : p)))
    } else {
      setProducts([...products, { ...data, id: Date.now() }])
    }
    setEditing(null)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Products</h3>
        <button className="btn btn-primary" onClick={() => setEditing({})}>
          <i className="bi bi-plus-lg"></i> Add Product
        </button>
      </div>

      <div className="card-box p-3">
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input
            className="form-control w-auto"
            placeholder="Search name or category..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
          {selected.length > 0 && (
            <>
              <button className="btn btn-outline-success" onClick={addStock}>+10 stock ({selected.length})</button>
              <button className="btn btn-outline-danger" onClick={deleteSelected}>Delete ({selected.length})</button>
            </>
          )}
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="form-check-input"
                    checked={rows.length > 0 && rows.every(r => selected.includes(r.id))}
                    onChange={toggleAll} />
                </th>
                <th></th>
                {COLUMNS.map(col => (
                  <th key={col.key} className="sortable" onClick={() => toggleSort(col.key)}>
                    {col.label}
                    {sort.key === col.key && <i className={`bi ms-1 ${sort.dir === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id}>
                  <td>
                    <input type="checkbox" className="form-check-input"
                      checked={selected.includes(p.id)} onChange={() => toggleRow(p.id)} />
                  </td>
                  <td>{p.image ? <img src={p.image} alt={p.name} className="product-img" /> : <div className="product-img"></div>}</td>
                  <td className="fw-semibold">{p.name}</td>
                  <td><span className="badge bg-secondary">{p.category}</span></td>
                  <td>${p.price}</td>
                  <td>
                    {p.stock}{' '}
                    {p.stock < settings.lowStock && <span className="badge bg-danger">Low stock</span>}
                  </td>
                  <td>{p.warehouse}</td>
                  <td>
                    <button className="btn btn-sm btn-light" onClick={() => setEditing(p)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan="8" className="text-center text-muted py-4">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted small">Page {page} of {totalPages}</span>
          <div className="btn-group">
            <button className="btn btn-outline-secondary btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <button className="btn btn-outline-secondary btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>

      {editing && <ProductModal product={editing} onSave={saveProduct} onClose={() => setEditing(null)} />}
    </>
  )
}