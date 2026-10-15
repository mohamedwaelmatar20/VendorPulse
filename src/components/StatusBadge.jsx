const COLORS = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
}

export default function StatusBadge({ status }) {
  return <span className={`badge bg-${COLORS[status]}`}>{status}</span>
}