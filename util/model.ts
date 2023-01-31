export interface User {
    name: string
    email: string
    password: string
    id: number
}

export interface OrderDetail {
    id: number
    order_id: number
    product_id: number
    quantity: number
    price: number
    discount_amount: number
    subtotal: number
    created_at: string
    updated_at: string
    name: string
    address: string
    total: number
}