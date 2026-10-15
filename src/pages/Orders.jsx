import { useStore } from '../context/store'
import StatusBadge from '../components/StatusBadge'

const STAGES = ['Pending', 'Processing', 'Shipped', 'Delivered']
const NAMES = ['Nour Samir', 'Karim Fathy', 'Laila Magdy', 'Tarek Ezzat', 'Dina Salem']

export default function Orders() {
  const { orders, setOrders } = useStore()

  // dir = +1 moves forward, -1 moves back
  const moveOrder = (id, dir) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status: STAGES[STAGES.indexOf(o.status) + dir] } : o
    ))
  }

  const simulateOrder = () => {
    const newOrder = {
      id: Date.now(),
      customer: NAMES[Math.floor(Math.random() * NAMES.length)],
      total: Math.floor(Math.random() * 150) + 10,
      status: 'Pending',
    }
    setOrders([newOrder, ...orders])
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Order Fulfillment</h3>
        <button className="btn btn-primary" onClick={simulateOrder}>
          <i className="bi bi-bell"></i> Simulate new order
        </button>
      </div>

      <div className="row g-3">
        {STAGES.map(stage => {
          const stageOrders = orders.filter(o => o.status === stage)
          return (
            <div key={stage} className="col-12 col-md-6 col-xl-3">
              <div className="kanban-col p-3">
                <div className="d-flex justify-content-between mb-3">
                  <StatusBadge status={stage} />
                  <span className="text-muted">{stageOrders.length}</span>
                </div>

                {stageOrders.map(o => (
                  <div key={o.id} className="card-box p-3 mb-2">
                    <div className="fw-semibold">#{o.id}</div>
                    <div className="text-muted small">{o.customer}</div>
                    <div className="fw-bold mb-2">${o.total}</div>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-light" disabled={stage === STAGES[0]} onClick={() => moveOrder(o.id, -1)}>
                        <i className="bi bi-arrow-left"></i>
                      </button>
                      <button className="btn btn-sm btn-primary ms-auto" disabled={stage === STAGES[3]} onClick={() => moveOrder(o.id, 1)}>
                        Next <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}