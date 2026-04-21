# astro-woocommerce

[![npm version](https://img.shields.io/npm/v/astro-woocommerce.svg)](https://www.npmjs.com/package/astro-woocommerce)
[![npm downloads](https://img.shields.io/npm/dw/astro-woocommerce.svg)](https://www.npmjs.com/package/astro-woocommerce)

A powerful, type-safe Astro integration for building headless e-commerce sites with WooCommerce.

## Stats

| Metric | Count |
|--------|-------|
| npm Downloads (weekly) | — |
| GitHub Stars | — |
| GitHub Forks | — |
| GitHub Watchers | — |

## Features

- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Lightweight**: Minimal dependencies, optimized for performance
- **REST API**: Uses WooCommerce Store REST API for fast, reliable data fetching
- **Developer-Friendly**: Simple, intuitive API for common e-commerce operations
- **Secure**: Support for API key authentication
- **Flexible**: Works with any Astro project structure

## Installation

```bash
npm install astro-woocommerce
```

## Quick Start

### 1. Configure your store

Create a `.env` file with your WooCommerce store details:

```env
PUBLIC_WOOCOMMERCE_STORE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret
```

### 2. Create a client instance

```typescript
import { createWooCommerceClient } from 'astro-woocommerce'

const woocommerce = createWooCommerceClient({
  storeUrl: import.meta.env.PUBLIC_WOOCOMMERCE_STORE_URL,
  consumerKey: import.meta.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: import.meta.env.WOOCOMMERCE_CONSUMER_SECRET,
})
```

### 3. Fetch products in your Astro components

```astro
---
import { createWooCommerceClient } from 'astro-woocommerce'

const woocommerce = createWooCommerceClient({
  storeUrl: import.meta.env.PUBLIC_WOOCOMMERCE_STORE_URL,
  consumerKey: import.meta.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: import.meta.env.WOOCOMMERCE_CONSUMER_SECRET,
})

const products = await woocommerce.getProducts({ per_page: 12 })
---

<div class="grid gap-4">
  {products.map(product => (
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      {product.images[0] && <img src={product.images[0].src} alt={product.name} />}
    </div>
  ))}
</div>
```

## API Reference

### `createWooCommerceClient(config)`

Creates a new WooCommerce client instance.

**Parameters:**
- `config.storeUrl` (string, required): Your WooCommerce store URL
- `config.consumerKey` (string, optional): API consumer key for authentication
- `config.consumerSecret` (string, optional): API consumer secret for authentication
- `config.version` (string, optional): WooCommerce Store API version (default: 'v1')

**Returns:** `WooCommerceClient` instance

### Products

#### `getProducts(params?)`

Fetch multiple products with optional filtering and pagination.

```typescript
const products = await woocommerce.getProducts({
  per_page: 20,
  page: 1,
  orderby: 'date',
  order: 'desc',
  search: 'coffee',
  on_sale: true,
  min_price: 10,
  max_price: 100,
})
```

**Parameters:**
- `per_page` (number): Products per page (default: 10)
- `page` (number): Page number (default: 1)
- `orderby` ('date' | 'title' | 'price' | 'popularity' | 'rating'): Sort field
- `order` ('asc' | 'desc'): Sort order
- `search` (string): Search query
- `category` (number | string): Filter by category ID or slug
- `tag` (number | string): Filter by tag ID or slug
- `on_sale` (boolean): Show only sale items
- `min_price` (number): Minimum price filter
- `max_price` (number): Maximum price filter
- `stock_status` ('instock' | 'outofstock' | 'onbackorder'): Stock status filter

#### `getProduct(slug)`

Fetch a single product by slug.

```typescript
const product = await woocommerce.getProduct('my-awesome-product')
```

#### `getProductById(id)`

Fetch a single product by ID.

```typescript
const product = await woocommerce.getProductById(123)
```

#### `getOnSaleProducts(params?)`

Fetch all products currently on sale.

```typescript
const saleProducts = await woocommerce.getOnSaleProducts({ per_page: 10 })
```

#### `searchProducts(query, params?)`

Search for products by keyword.

```typescript
const results = await woocommerce.searchProducts('coffee', { per_page: 20 })
```

### Categories

#### `getCategories(params?)`

Fetch all product categories.

```typescript
const categories = await woocommerce.getCategories({ per_page: 50 })
```

#### `getCategory(slug)`

Fetch a single category by slug.

```typescript
const category = await woocommerce.getCategory('coffee')
```

#### `getCategoryById(id)`

Fetch a single category by ID.

```typescript
const category = await woocommerce.getCategoryById(42)
```

#### `getProductsByCategory(categoryId, params?)`

Fetch products in a specific category.

```typescript
const products = await woocommerce.getProductsByCategory(42, { per_page: 20 })
```

## Type Definitions

All responses are fully typed:

```typescript
import type { Product, ProductCategory } from 'astro-woocommerce'

const product: Product = await woocommerce.getProduct('my-product')
const category: ProductCategory = await woocommerce.getCategory('coffee')
```

## Error Handling

```typescript
try {
  const product = await woocommerce.getProduct('non-existent')
  if (!product) {
    console.log('Product not found')
  }
} catch (error) {
  console.error('API Error:', error)
}
```

## Example Usage

**Product Page Component:**

```astro
---
import { createWooCommerceClient } from 'astro-woocommerce'

const woocommerce = createWooCommerceClient({
  storeUrl: 'https://your-store.com',
})

const products = await woocommerce.getProducts({ per_page: 12 })
---

<div class="products-grid">
  {products.map(product => (
    <div class="product-card">
      <img src={product.images[0]?.src} alt={product.name} />
      <h3>{product.name}</h3>
      <p class="price">{product.prices?.currency_symbol}{product.prices?.price}</p>
      <p class="category">{product.categories[0]?.name}</p>
    </div>
  ))}
</div>
```

All data fetched dynamically with full TypeScript type safety.

## Examples

### Display a product grid

```astro
---
import { createWooCommerceClient } from 'astro-woocommerce'

const woocommerce = createWooCommerceClient({
  storeUrl: import.meta.env.PUBLIC_WOOCOMMERCE_STORE_URL,
})

const products = await woocommerce.getProducts({ per_page: 12 })
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <a href={`/products/${product.slug}`} class="group">
      {product.images[0] && (
        <img
          src={product.images[0].src}
          alt={product.name}
          class="w-full h-64 object-cover rounded-lg"
        />
      )}
      <h3 class="mt-4 font-semibold">{product.name}</h3>
      <p class="text-gray-600">{product.price}</p>
    </a>
  ))}
</div>
```

### Build a product detail page

```astro
---
import { createWooCommerceClient } from 'astro-woocommerce'

const woocommerce = createWooCommerceClient({
  storeUrl: import.meta.env.PUBLIC_WOOCOMMERCE_STORE_URL,
})

export async function getStaticPaths() {
  const products = await woocommerce.getProducts({ per_page: 100 })
  return products.map(product => ({
    params: { slug: product.slug },
  }))
}

const { slug } = Astro.params
const product = await woocommerce.getProduct(slug)

if (!product) {
  return Astro.redirect('/products')
}
---

<div>
  <h1>{product.name}</h1>
  {product.images[0] && <img src={product.images[0].src} alt={product.name} />}
  <p>{product.description}</p>
  <p class="text-2xl font-bold">{product.price}</p>
  <a href={product.add_to_cart.url} class="btn btn-primary">
    {product.add_to_cart.text}
  </a>
</div>
```

## License

MIT

## Support

For issues, questions, or contributions, visit the [GitHub repository](https://github.com/ardeshir/astro-woocommerce).
