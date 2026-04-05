import type { AstroIntegration } from 'astro'
import type { WooCommerceConfig } from './types'

export function integration(config: WooCommerceConfig): AstroIntegration {
  return {
    name: '@ardeshir/astro-woocommerce',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript('page', `
          window.wooCommerceConfig = ${JSON.stringify(config)};
        `)
      },
    },
  }
}

export default integration
