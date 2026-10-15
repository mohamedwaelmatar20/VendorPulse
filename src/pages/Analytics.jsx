import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { useStore } from '../context/store'
import StatCard from '../components/StatCard'
import { monthlySales, topProducts, regions } from '../data/seed'

const PIE_COLORS = ['#4f46e5', '#06b6d4', '#f59e0b', '#94a3b8']

export default function Analytics() {
  const { products, orders, settings } = useStore()

  const totalRevenue = monthlySales.reduce((sum, m) => sum + m.revenue, 0)
  const totalProfit = monthlySales.reduce((sum, m) => sum + m.profit, 0)
  const margin = Math.round((totalProfit / totalRevenue) * 100)
  const lowStock = products.filter(p => p.stock < settings.lowStock).length

  return (
    <>
      <h3 className="mb-3">Analytics</h3>

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3"><StatCard title="Revenue" value={`$${totalRevenue.toLocaleString()}`} icon="bi-currency-dollar" color="success" /></div>
        <div className="col-6 col-xl-3"><StatCard title="Profit margin" value={`${margin}%`} icon="bi-percent" color="primary" /></div>
        <div className="col-6 col-xl-3"><StatCard title="Orders" value={orders.length} icon="bi-bag" color="info" /></div>
        <div className="col-6 col-xl-3"><StatCard title="Low stock items" value={lowStock} icon="bi-exclamation-triangle" color="danger" /></div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <div className="card-box p-3">
            <h6>Monthly revenue & profit</h6>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card-box p-3">
            <h6>Sales by region</h6>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={regions} dataKey="value" nameKey="name" outerRadius={90} label>
                    {regions.map((r, i) => <Cell key={r.name} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card-box p-3">
            <h6>Top-selling products</h6>
            <div style={{ height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sold" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}