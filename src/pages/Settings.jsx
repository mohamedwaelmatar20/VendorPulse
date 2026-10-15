import { useStore } from '../context/store'

export default function Settings() {
  const { settings, setSettings, resetAll } = useStore()

  const handleChange = e => {
    const { name, value, type } = e.target
    setSettings({ ...settings, [name]: type === 'number' ? Number(value) : value })
  }

  const handleReset = () => {
    if (window.confirm('This will bring back the demo data and delete your changes. Continue?')) {
      resetAll()
    }
  }

  return (
    <>
      <h3 className="mb-3">Settings</h3>

      <div className="card-box p-4 mb-3" style={{ maxWidth: 500 }}>
        <p className="text-muted small">Changes are saved automatically.</p>

        <label className="form-label">Store name</label>
        <input className="form-control mb-3" name="storeName" value={settings.storeName} onChange={handleChange} />

        <label className="form-label">Low-stock warning below</label>
        <input type="number" min="1" className="form-control" name="lowStock" value={settings.lowStock} onChange={handleChange} />
      </div>

      <div className="card-box p-4" style={{ maxWidth: 500 }}>
        <h6 className="text-danger">Danger zone</h6>
        <p className="text-muted small">Remove all your changes and restore the demo data.</p>
        <button className="btn btn-outline-danger" onClick={handleReset}>Reset all data</button>
      </div>
    </>
  )
}