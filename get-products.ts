import { WooCommerceClient } from './packages/astro-woocommerce/src/client'

async function main() {
  const wc = new WooCommerceClient({ storeUrl: 'https://cms.ardeshirshojaei.com' })
  const products = await wc.getProducts({ per_page: 3 })

  console.log('📦 Your Products:\n')
  products.forEach(p => {
    console.log(`• ${p.name}`)
    console.log(`  Price: ${p.prices?.currency_symbol}${p.prices?.price}`)
    console.log(`  Slug: ${p.slug}`)
    console.log(`  Image: ${p.images?.[0]?.src || 'No image'}`)
    console.log(`  Categories: ${p.categories?.map(c => c.name).join(', ') || 'None'}\n`)
  })
}

main()
