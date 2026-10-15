import { useState } from 'react'
import { useStore } from '../context/store'

export default function Support() {
  const { tickets, setTickets } = useStore()
  const [activeId, setActiveId] = useState(tickets[0]?.id)
  const [text, setText] = useState('')

  const active = tickets.find(t => t.id === activeId)

  const updateTicket = (id, changes) => {
    setTickets(tickets.map(t => (t.id === id ? { ...t, ...changes } : t)))
  }

  const sendReply = e => {
    e.preventDefault()
    if (!text.trim()) return
    updateTicket(active.id, { messages: [...active.messages, { from: 'vendor', text }] })
    setText('')
  }

  return (
    <>
      <h3 className="mb-3">Support Inbox</h3>
      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <div className="card-box">
            <div className="list-group list-group-flush">
              {tickets.map(t => (
                <button
                  key={t.id}
                  className={`list-group-item list-group-item-action ${t.id === activeId ? 'active' : ''}`}
                  onClick={() => setActiveId(t.id)}
                >
                  <div className="d-flex justify-content-between">
                    <strong>{t.customer}</strong>
                    <span className={`badge ${t.open ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {t.open ? 'Open' : 'Resolved'}
                    </span>
                  </div>
                  <div className="small">{t.subject}</div>
                  <span className="badge bg-secondary mt-1">{t.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          {active && (
            <div className="card-box p-3">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">{active.subject}</h5>
                <button className="btn btn-sm btn-outline-success" onClick={() => updateTicket(active.id, { open: !active.open })}>
                  {active.open ? 'Mark resolved' : 'Reopen'}
                </button>
              </div>

              <div className="chat-box mb-3">
                {active.messages.map((m, i) => (
                  <div key={i} className={`d-flex mb-2 ${m.from === 'vendor' ? 'justify-content-end' : ''}`}>
                    <div className={`p-2 rounded-3 ${m.from === 'vendor' ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '75%' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form className="d-flex gap-2" onSubmit={sendReply}>
                <input className="form-control" placeholder="Write a reply..." value={text} onChange={e => setText(e.target.value)} />
                <button className="btn btn-primary">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}