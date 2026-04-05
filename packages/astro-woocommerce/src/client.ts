import type {
  WooCommerceConfig,
  Product,
  ProductCategory,
  FilterParams,
  PaginationParams,
  WooCommerceError,
} from './types'

export class WooCommerceClient {
  private storeUrl: string
  private consumerKey?: string
  private consumerSecret?: string
  private version: string
  private baseUrl: string

  constructor(config: WooCommerceConfig) {
    this.storeUrl = config.storeUrl.replace(/\/$/, '')
    this.consumerKey = config.consumerKey
    this.consumerSecret = config.consumerSecret
    this.version = config.version || 'v1'
    this.baseUrl = `${this.storeUrl}/wp-json/wc/store/${this.version}`
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (options.headers && typeof options.headers === 'object') {
      Object.assign(headers, options.headers)
    }

    if (this.consumerKey && this.consumerSecret) {
      const credentials = btoa(`${this.consumerKey}:${this.consumerSecret}`)
      headers['Authorization'] = `Basic ${credentials}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error: WooCommerceError = {
        code: 'API_ERROR',
        message: `WooCommerce API error: ${response.status}`,
        data: { status: response.status },
      }
      throw error
    }

    return response.json() as Promise<T>
  }

  async getProducts(params?: FilterParams): Promise<Product[]> {
    const queryParams = new URLSearchParams()

    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.offset) queryParams.append('offset', params.offset.toString())
    if (params?.orderby) queryParams.append('orderby', params.orderby)
    if (params?.order) queryParams.append('order', params.order)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.category) queryParams.append('category', params.category.toString())
    if (params?.tag) queryParams.append('tag', params.tag.toString())
    if (params?.on_sale) queryParams.append('on_sale', 'true')
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString())
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString())
    if (params?.stock_status) queryParams.append('stock_status', params.stock_status)

    const query = queryParams.toString()
    const endpoint = `/products${query ? `?${query}` : ''}`

    return this.request<Product[]>(endpoint)
  }

  async getProduct(slug: string): Promise<Product | null> {
    try {
      const products = await this.request<Product[]>(`/products?slug=${slug}`)
      return products[0] || null
    } catch {
      return null
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      return await this.request<Product>(`/products/${id}`)
    } catch {
      return null
    }
  }

  async getCategories(params?: PaginationParams): Promise<ProductCategory[]> {
    const queryParams = new URLSearchParams()

    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())

    const query = queryParams.toString()
    const endpoint = `/products/categories${query ? `?${query}` : ''}`

    return this.request<ProductCategory[]>(endpoint)
  }

  async getCategory(slug: string): Promise<ProductCategory | null> {
    try {
      const categories = await this.request<ProductCategory[]>(
        `/products/categories?slug=${slug}`
      )
      return categories[0] || null
    } catch {
      return null
    }
  }

  async getCategoryById(id: number): Promise<ProductCategory | null> {
    try {
      return await this.request<ProductCategory>(`/products/categories/${id}`)
    } catch {
      return null
    }
  }

  async getProductsByCategory(
    categoryId: number,
    params?: FilterParams
  ): Promise<Product[]> {
    return this.getProducts({ ...params, category: categoryId })
  }

  async searchProducts(query: string, params?: FilterParams): Promise<Product[]> {
    return this.getProducts({ ...params, search: query })
  }

  async getOnSaleProducts(params?: FilterParams): Promise<Product[]> {
    return this.getProducts({ ...params, on_sale: true })
  }
}

export function createWooCommerceClient(config: WooCommerceConfig): WooCommerceClient {
  return new WooCommerceClient(config)
}
