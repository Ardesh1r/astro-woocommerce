# Astro Woocommerce

A powerful, type-safe Astro integration for building headless e-commerce sites with WooCommerce.

## Stats

[![npm version](https://img.shields.io/npm/v/astro-woocommerce.svg?style=flat-square)](https://www.npmjs.com/package/astro-woocommerce)
[![npm downloads](https://img.shields.io/npm/dw/astro-woocommerce.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/astro-woocommerce)
[![GitHub stars](https://img.shields.io/github/stars/Ardesh1r/astro-woocommerce.svg?style=flat-square)](https://github.com/Ardesh1r/astro-woocommerce)
[![GitHub forks](https://img.shields.io/github/forks/Ardesh1r/astro-woocommerce.svg?style=flat-square)](https://github.com/Ardesh1r/astro-woocommerce)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

## Quick Start

```bash
npm install astro-woocommerce
```

See [`packages/astro-woocommerce/README.md`](./packages/astro-woocommerce/README.md) for full documentation.

## Production Ready

This integration is designed for production use with any WooCommerce store. It provides type-safe access to products, categories, and cart operations with full TypeScript support.

## 📁 Project Structure

```
astro-woocommerce/
├── packages/
│   └── astro-woocommerce/     # Main integration package
│       ├── src/
│       │   ├── types.ts       # TypeScript type definitions
│       │   ├── client.ts      # WooCommerce API client
│       │   ├── integration.ts # Astro integration hook
│       │   └── index.ts       # Package exports
│       └── README.md          # Full documentation
├── demo/                       # Example Astro site
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro    # Product listing
│   │   │   └── products/[slug].astro # Product detail
│   │   └── layouts/
│   └── astro.config.mjs
└── package.json               # Workspace root
```

## 🛠️ Development

### Setup

```bash
npm install
```

### Build the integration

```bash
npm run build -w packages/astro-woocommerce
```

### Run the demo site

```bash
cd demo
cp .env.example .env
# Edit .env with your WooCommerce store details
npm run dev
```

## Publishing

```bash
# Build the package
npm run build -w packages/astro-woocommerce

# Publish to npm
cd packages/astro-woocommerce
npm publish
```

## 📝 Features

- Full TypeScript support
- Type-safe WooCommerce API client
- Product fetching with filtering & pagination
- Category management
- Search functionality
- Error handling
- Zero external dependencies

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open a GitHub issue.
