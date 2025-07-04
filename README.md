# Norko Infrared Heaters - E-commerce Frontend

A modern e-commerce website for Norko infrared heaters, built with Next.js 15 and powered by [Crystallize](https://crystallize.com) headless CMS. This project provides a complete online store for premium infrared heating solutions.

## 🚀 Project Status

**Development Phase**: Content Model Setup

- ✅ Project setup and configuration complete
- ✅ Basic UI and routing implemented
- ✅ Crystallize integration configured (tenant: greedyhippy)
- ✅ Error handling and fallbacks in place
- 🔄 **Next Step**: Set up content model in Crystallize and run codegen

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Windows environment (batch scripts included)

### Development Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Environment Configuration:**
   The `.env.local` file is already configured with Crystallize tenant details.

3. **Start Development Server:**

**Option A: Using npm directly**

```bash
npm run dev
```

**Option B: Using Windows batch script (recommended for Windows)**

```bash
start-dev.bat
```

**Option C: Safe mode (if you encounter port/permission issues)**

```bash
npm run dev-safe
```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

### 🔧 Windows Troubleshooting

If you encounter permission or port issues on Windows:

1. **Run as Administrator:**

```bash
start-dev-admin.bat
```

2. **Fix permissions:**

```bash
fix-permissions.bat
```

3. **Check detailed troubleshooting:**
   See `TROUBLESHOOTING.md` for common Windows-specific issues.

## 📁 Project Structure

```
├── app/                    # Next.js 15 app directory
│   ├── (shop)/            # Shop routes group
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── header.tsx         # Site header with navigation
│   ├── footer.tsx         # Site footer
│   └── cart/              # Cart-related components
├── generated/             # GraphQL generated types (placeholder)
│   ├── discovery/         # Discovery API types
│   └── shop/              # Shop API types
├── core/                  # Core utilities and helpers
├── use-cases/             # Business logic layer
└── utils/                 # Utility functions
```

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run dev-safe` - Start dev server with specific localhost binding
- `npm run build` - Build for production
- `npm run build-debug` - Build with debug information
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types (run after setting up content model)
- `npm run prettier` - Format code with Prettier

## ⚙️ Current Configuration

### Crystallize Setup

- **Tenant**: greedyhippy
- **Region**: US East
- **APIs**: Discovery + Shop API configured
- **Authentication**: Access tokens configured in `.env.local`

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: TailwindCSS v3 + Custom Components
- **CMS**: Crystallize Headless
- **Language**: TypeScript
- **Image Processing**: Sharp (Windows compatible)
- **Styling**: TailwindCSS + Custom design system

## 🔄 Next Steps

### Phase 1: Content Model Setup (Current)

1. **Set up Crystallize Content Model:**

    - Create product shapes for infrared heaters
    - Set up categories (Indoor, Outdoor, Commercial)
    - Configure product variants and pricing
    - Add sample products

2. **Generate Real GraphQL Types:**

```bash
npm run codegen
```

3. **Replace placeholder types** in `generated/` folder

### Phase 2: Railway Integration (Upcoming)

- Set up Railway API sync for inventory management
- Implement real-time product updates
- Configure automated order processing

### Phase 3: Production Deployment

- Configure production environment
- Set up CI/CD pipeline
- Performance optimization

## 🐛 Known Issues & Solutions

### Development Issues

- **Placeholder GraphQL Types**: Currently using placeholder types to allow development. Real types will be generated after content model setup.
- **Windows Permissions**: Use provided batch scripts for Windows-specific permission handling.
- **Port Conflicts**: Use `dev-safe` script or admin script if port 3000 is occupied.

### Error Handling

- Comprehensive error boundaries implemented
- Graceful fallbacks for missing Crystallize content
- User-friendly error pages for 404/500 scenarios

## 📚 Documentation

- **Main Documentation**: This README
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **Crystallize Docs**: [crystallize.com/learn](https://crystallize.com/learn)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 🤝 Contributing

This is a private project for Norko. For development questions or issues, refer to the troubleshooting guide or contact the development team.

## 📄 License

Private - Norko Infrared Heaters
