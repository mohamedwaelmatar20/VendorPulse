import { useState } from 'react'

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports']
const WAREHOUSES = ['Cairo', 'Alexandria', 'Giza']

export default function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '', category: 'Electronics', price: '', stock: '', warehouse: 'Cairo', image: '',
    ...product, // when editing, this fills the form with the existing product
  })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImage = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(prev => ({ ...prev, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Product name is required')
    if (Number(form.price) <= 0) return setError('Price must be greater than 0')
    if (form.stock === '' || Number(form.stock) < 0) return setError('Stock must be 0 or more')
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock) })
  }

  return (
    <>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{form.id ? 'Edit Product' : 'Add Product'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <label className="form-label">Name</label>
              <input className="form-control mb-3" name="name" value={form.name} onChange={handleChange} />

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Price ($)</label>
                  <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Stock</label>
                  <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Warehouse</label>
                  <select className="form-select" name="warehouse" value={form.warehouse} onChange={handleChange}>
                    {WAREHOUSES.map(w => <option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <label className="form-label">Image</label>
              <input type="file" accept="image/*" className="form-control" onChange={handleImage} />
              {form.image && <img src={form.image} alt="preview" className="product-img mt-2" />}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}