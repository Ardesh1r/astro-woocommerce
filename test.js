import { WooCommerceClient } from './packages/astro-woocommerce/src/client.ts'

const woocommerce = createWooCommerceClient({
  storeUrl: 'https://cms.ardeshirshojaei.com',
})

console.log('🧪 Testing astro-woocommerce integration...\n')

async function runTests() {
  try {
    // Test 1: Get all products
    console.log('1️⃣  Testing getProducts()...')
    const products = await woocommerce.getProducts({ per_page: 5 })
    console.log(`   ✅ Retrieved ${products.length} products`)
    if (products.length > 0) {
      console.log(`   📦 First product: "${products[0].name}" (ID: ${products[0].id})`)
    }

    // Test 2: Get single product by slug
    if (products.length > 0) {
      console.log(`\n2️⃣  Testing getProduct(slug)...`)
      const singleProduct = await woocommerce.getProduct(products[0].slug)
      if (singleProduct) {
        console.log(`   ✅ Retrieved product: "${singleProduct.name}"`)
        console.log(`   💰 Price: ${singleProduct.prices?.currency_symbol}${singleProduct.prices?.price}`)
        console.log(`   📸 Images: ${singleProduct.images?.length || 0}`)
        console.log(`   📂 Categories: ${singleProduct.categories?.length || 0}`)
      } else {
        console.log(`   ⚠️  Product not found by slug`)
      }
    }

    // Test 3: Get categories
    console.log(`\n3️⃣  Testing getCategories()...`)
    const categories = await woocommerce.getCategories({ per_page: 10 })
    console.log(`   ✅ Retrieved ${categories.length} categories`)
    if (categories.length > 0) {
      console.log(`   📁 First category: "${categories[0].name}" (ID: ${categories[0].id})`)
    }

    // Test 4: Search products
    console.log(`\n4️⃣  Testing searchProducts()...`)
    const searchResults = await woocommerce.searchProducts('product', { per_page: 5 })
    console.log(`   ✅ Search returned ${searchResults.length} results`)

    // Test 5: Get on-sale products
    console.log(`\n5️⃣  Testing getOnSaleProducts()...`)
    const saleProducts = await woocommerce.getOnSaleProducts({ per_page: 5 })
    console.log(`   ✅ Retrieved ${saleProducts.length} sale products`)

    // Test 6: Filter products
    console.log(`\n6️⃣  Testing getProducts() with filters...`)
    const filtered = await woocommerce.getProducts({
      per_page: 5,
      orderby: 'date',
      order: 'desc',
    })
    console.log(`   ✅ Retrieved ${filtered.length} products (sorted by date, descending)`)

    console.log(`\n✨ All tests passed! Integration is working correctly.\n`)
    return true
  } catch (error) {
    console.error(`\n❌ Test failed:`, error)
    return false
  }
}

runTests().then(success => {
  process.exit(success ? 0 : 1)
})
