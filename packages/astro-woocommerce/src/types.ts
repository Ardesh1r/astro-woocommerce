export interface WooCommerceConfig {
  storeUrl: string
  consumerKey?: string
  consumerSecret?: string
  version?: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string | null
  currency_symbol: string
  images: ProductImage[]
  categories: ProductCategory[]
  tags: ProductTag[]
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  sku: string
  weight: string | null
  dimensions: {
    length: string
    width: string
    height: string
  }
  attributes: ProductAttribute[]
  variations: number[]
  add_to_cart: {
    text: string
    url: string
  }
  prices: {
    price: string
    regular_price: string
    sale_price: string | null
    currency_symbol: string
  }
  meta?: Record<string, any>
}

export interface ProductImage {
  id: number
  src: string
  alt: string
  name: string
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  description: string
  image?: {
    id: number
    src: string
    alt: string
  }
  parent: number
  count: number
}

export interface ProductTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

export interface ProductAttribute {
  id: number
  name: string
  option: string
}

export interface Cart {
  items: CartItem[]
  total: string
  subtotal: string
  currency_symbol: string
}

export interface CartItem {
  key: string
  id: number
  quantity: number
  name: string
  price: string
  total: string
  image?: ProductImage
}

export interface PaginationParams {
  per_page?: number
  page?: number
  offset?: number
}

export interface FilterParams extends PaginationParams {
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order'
  order?: 'asc' | 'desc'
  search?: string
  category?: number | string
  tag?: number | string
  on_sale?: boolean
  min_price?: number
  max_price?: number
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'
}

export interface WooCommerceError {
  code: string
  message: string
  data?: {
    status: number
  }
}

export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}
