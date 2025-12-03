import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
export const api = axios.create({ baseURL: API_BASE, timeout:5000 })
export default api

export async function listProducts(){ const res = await api.get('/products'); return res.data }
export async function createOrder(product_id, buyer_id=1){ const res = await api.post(`/orders?product_id=${product_id}&buyer_id=${buyer_id}`); return res.data }
export async function getWallet(user_id){ const res = await api.get(`/wallets/${user_id}`); return res.data }
export async function requestPayout(seller_id, amount){ const res = await api.post(`/payouts/request?seller_id=${seller_id}&amount=${amount}`); return res.data }

// Seller onboarding & create product
export async function registerSeller(payload){ const res = await api.post('/sellers/register', payload); return res.data }
export async function createProduct(payload){ const res = await api.post('/products', payload); return res.data }
