# astro-woocommerce

A powerful, type-safe Astro integration for building headless e-commerce sites with WooCommerce.

## Quick Start

```bash
npm install @ardeshir/astro-woocommerce
```

See [`packages/astro-woocommerce/README.md`](./packages/astro-woocommerce/README.md) for full documentation.

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

## 📦 Publishing

```bash
# Build the package
npm run build -w packages/astro-woocommerce

# Publish to npm
cd packages/astro-woocommerce
npm publish
```

## 📝 Features

- ✅ Full TypeScript support
- ✅ Type-safe WooCommerce API client
- ✅ Product fetching with filtering & pagination
- ✅ Category management
- ✅ Search functionality
- ✅ Error handling
- ✅ Zero external dependencies

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open a GitHub issue.
