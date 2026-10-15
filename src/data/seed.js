export const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 59, stock: 24, warehouse: 'Cairo', image: '' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 120, stock: 6, warehouse: 'Alexandria', image: '' },
  { id: 3, name: 'Running Shoes', category: 'Fashion', price: 80, stock: 40, warehouse: 'Cairo', image: '' },
  { id: 4, name: 'Cotton T-Shirt', category: 'Fashion', price: 15, stock: 3, warehouse: 'Giza', image: '' },
  { id: 5, name: 'Coffee Maker', category: 'Home', price: 45, stock: 18, warehouse: 'Giza', image: '' },
  { id: 6, name: 'Desk Lamp', category: 'Home', price: 22, stock: 9, warehouse: 'Alexandria', image: '' },
  { id: 7, name: 'Yoga Mat', category: 'Sports', price: 25, stock: 31, warehouse: 'Cairo', image: '' },
  { id: 8, name: 'Water Bottle', category: 'Sports', price: 10, stock: 2, warehouse: 'Cairo', image: '' },
]

export const orders = [
  { id: 1001, customer: 'Ahmed Ali', total: 120, status: 'Pending' },
  { id: 1002, customer: 'Sara Hassan', total: 59, status: 'Pending' },
  { id: 1003, customer: 'Omar Khaled', total: 95, status: 'Processing' },
  { id: 1004, customer: 'Mona Adel', total: 45, status: 'Shipped' },
  { id: 1005, customer: 'Youssef Nabil', total: 80, status: 'Delivered' },
]

export const tickets = [
  {
    id: 1, customer: 'Ahmed Ali', subject: 'Item arrived damaged', type: 'Refund', open: true,
    messages: [{ from: 'customer', text: 'My smart watch screen is cracked. I want a refund.' }],
  },
  {
    id: 2, customer: 'Sara Hassan', subject: 'Where is my order?', type: 'Question', open: true,
    messages: [{ from: 'customer', text: 'It has been 5 days, can you check the status?' }],
  },
  {
    id: 3, customer: 'Mona Adel', subject: 'Wrong size', type: 'Complaint', open: false,
    messages: [
      { from: 'customer', text: 'I received a size M instead of L.' },
      { from: 'vendor', text: 'Sorry! We sent the correct size today.' },
    ],
  },
]

export const discounts = [
  { id: 1, code: 'WELCOME10', type: 'percent', value: 10, used: 34 },
  { id: 2, code: 'FREESHIP', type: 'fixed', value: 5, used: 12 },
]

// Chart data
export const monthlySales = [
  { month: 'Jan', revenue: 4200, profit: 1300 },
  { month: 'Feb', revenue: 5100, profit: 1700 },
  { month: 'Mar', revenue: 4800, profit: 1500 },
  { month: 'Apr', revenue: 6300, profit: 2300 },
  { month: 'May', revenue: 7200, profit: 2900 },
  { month: 'Jun', revenue: 8100, profit: 3400 },
]

export const topProducts = [
  { name: 'Smart Watch', sold: 120 },
  { name: 'Headphones', sold: 98 },
  { name: 'Shoes', sold: 76 },
  { name: 'Coffee Maker', sold: 54 },
  { name: 'Yoga Mat', sold: 41 },
]

export const regions = [
  { name: 'Cairo', value: 45 },
  { name: 'Alexandria', value: 25 },
  { name: 'Giza', value: 20 },
  { name: 'Other', value: 10 },
]
export const customers = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@mail.com', city: 'Cairo', orders: 12, spent: 840 },
  { id: 2, name: 'Sara Hassan', email: 'sara@mail.com', city: 'Alexandria', orders: 7, spent: 410 },
  { id: 3, name: 'Omar Khaled', email: 'omar@mail.com', city: 'Giza', orders: 3, spent: 190 },
  { id: 4, name: 'Mona Adel', email: 'mona@mail.com', city: 'Cairo', orders: 15, spent: 1120 },
  { id: 5, name: 'Youssef Nabil', email: 'youssef@mail.com', city: 'Mansoura', orders: 1, spent: 80 },
]

export const settings = {
  storeName: 'VendorPulse',
  lowStock: 10,
}