export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="card-box p-3 d-flex align-items-center">
      <div className={`fs-3 text-${color} me-3`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <div className="text-muted small">{title}</div>
        <div className="fs-4 fw-bold">{value}</div>
      </div>
    </div>
  )
}