# 🎨 Norko Modern Design System

## Visual Style Guide - FRNTR Inspired

This design system creates a modern, minimalist e-commerce experience inspired by contemporary furniture stores, adapted for Norko's infrared heater brand.

## 🎯 Design Principles

### 1. **Clean Minimalism**
- Generous white space
- Typography-driven hierarchy
- Subtle color palette
- Focus on product photography

### 2. **Modern E-commerce**
- Grid-based layouts
- Card-based components
- Hover interactions
- Mobile-first responsive

### 3. **Norko Brand Adaptation**
- Warmth-focused messaging
- Technical precision
- Premium positioning
- Sustainable values

## 🎨 Color Palette

### Primary Colors
```css
--color-charcoal: #1f2937;    /* Primary text, buttons */
--color-light: #ffffff;       /* Backgrounds, cards */
--color-warm-gray: #f8fafc;   /* Section backgrounds */
--color-sage: #9ca3af;        /* Secondary text */
```

### Accent Colors
```css
--warm-gradient: linear-gradient(135deg, #fef7f0 0%, #fde4d3 100%);
--cool-gradient: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
--sage-gradient: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
```

## 📝 Typography

### Font Hierarchy
- **Hero Text**: `text-5xl lg:text-7xl font-bold` (80px/112px)
- **Section Titles**: `text-4xl font-bold` (36px)
- **Card Titles**: `text-xl font-bold` (20px)
- **Body Text**: `text-base` (16px)
- **Small Text**: `text-sm` (14px)

### Font Features
- Inter/System fonts for readability
- Font feature settings for better rendering
- Optimized line heights
- Proper text spacing

## 🧩 Component Library

### 1. **Hero Section**
```jsx
// Large impact area with product focus
<section className="relative bg-gray-50 overflow-hidden">
  <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
    <div className="flex items-center px-8 lg:px-16 py-16 lg:py-24">
      <h1 className="hero-text">WARMTH</h1>
      <p className="text-lg text-gray-600 mb-8">Description...</p>
      <button className="btn">Call to Action</button>
    </div>
    <div className="bg-warm-gradient">
      {/* Product imagery */}
    </div>
  </div>
</section>
```

### 2. **Product Cards**
```jsx
// Clean product presentation
<div className="category-card">
  <div className="aspect-square bg-warm-gradient flex items-center justify-center">
    <div className="text-6xl">🏠</div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">Indoor Collection</h3>
    <p className="text-gray-600 text-sm">Description</p>
  </div>
</div>
```

### 3. **Navigation**
```jsx
// Clean, minimal navigation
<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-modern border-b border-gray-100">
  <div className="container-modern">
    <div className="flex items-center justify-between h-16">
      <span className="text-2xl font-bold tracking-wider">NORKO</span>
      <nav className="hidden md:flex items-center space-x-8">
        <input className="search-modern" placeholder="Search..." />
        <Link className="nav-modern">Shop</Link>
      </nav>
    </div>
  </div>
</header>
```

### 4. **Content Blocks**
```jsx
// Magazine-style content sections
<section className="section-padding">
  <div className="container-modern">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="bg-rose-50 p-12 lg:p-16">
        <h2 className="text-2xl font-bold mb-6">Time to get comfortable</h2>
        <p className="text-gray-600 leading-relaxed">Content...</p>
      </div>
      <div className="bg-blue-50 min-h-[400px]">
        {/* Visual content */}
      </div>
    </div>
  </div>
</section>
```

## 📱 Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Grid Adaptations
- **Mobile**: Single column stacking
- **Tablet**: 2-column grids
- **Desktop**: 3+ column layouts

### Navigation
- **Mobile**: Hamburger menu
- **Desktop**: Horizontal navigation

## 🎭 Interactive Elements

### Hover States
```css
.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #374151;
}

.nav-modern:hover {
  color: #111827;
}
```

### Focus States
```css
.input-modern:focus {
  ring: 2px solid #1f2937;
  border-color: transparent;
}
```

### Transitions
- **Duration**: 200-300ms
- **Easing**: ease-out
- **Properties**: color, background, transform, shadow

## 🖼️ Image Strategy

### Product Photography
- **Hero images**: 1200x800px minimum
- **Card images**: 600x600px (square)
- **Lifestyle shots**: 1600x900px (16:9)

### Image Optimization
- Next.js Image component
- WebP format support
- Lazy loading
- Responsive sizing

### Placeholder Strategy
- Gradient backgrounds for missing images
- Icon-based representations
- Consistent aspect ratios

## 📐 Layout Patterns

### 1. **Hero + Grid Pattern**
```
[HERO SECTION - 50/50 split]
[Content Block 1]
[Product Grid - 3 columns]
[Content Block 2]
[Newsletter/CTA]
```

### 2. **Magazine Layout**
```
[Large Feature]
[Side-by-side blocks]
[Three-column cards]
[Full-width CTA]
```

### 3. **Product Page**
```
[Product Gallery | Product Details]
[Specifications Grid]
[Related Products]
[Reviews/Testimonials]
```

## 🚀 Implementation in VS Code

### Using Vibe Coding
1. **Start with wireframes**: Describe the layout in comments
2. **Build components**: Use the design system classes
3. **Iterate with AI**: Ask for specific adjustments
4. **Test responsive**: Preview at different screen sizes

### VS Code Extensions
- **Tailwind CSS IntelliSense**: Auto-complete classes
- **ES7+ React/Redux/React-Native snippets**: Fast component creation
- **Auto Rename Tag**: Maintain HTML structure
- **Prettier**: Consistent code formatting

## 🎨 Customization for Norko

### Brand Adaptations
- **Color temperature**: Warm oranges/reds for heat association
- **Technical precision**: Clean lines, exact measurements
- **Sustainability**: Natural color palette, eco-friendly messaging
- **Premium feel**: Quality typography, generous spacing

### Content Strategy
- **Product focus**: Hero product shots
- **Lifestyle integration**: Heaters in real environments  
- **Technical specs**: Clear, accessible information
- **Energy efficiency**: Sustainability messaging

## 📋 Implementation Checklist

### Phase 1: Foundation ✅
- [x] Created modern landing page component
- [x] Set up design system CSS
- [x] Implemented responsive grid
- [x] Added interactive elements

### Phase 2: Components
- [ ] Product card variants
- [ ] Search functionality
- [ ] Shopping cart overlay
- [ ] Product detail pages

### Phase 3: Content Integration
- [ ] Connect to Crystallize content
- [ ] Integrate Railway product data
- [ ] Image optimization setup
- [ ] SEO optimization

### Phase 4: Refinement
- [ ] Animation details
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Cross-browser testing

## 🔧 Development Commands

```bash
# Preview the modern design
npm run dev
# Visit: http://localhost:3000/modern-preview

# Build for production
npm run build

# Analyze bundle
npm run analyze
```

## 🎯 Next Steps

1. **Preview the design**: Start dev server and visit `/modern-preview`
2. **Iterate with Vibe**: Ask for specific component modifications
3. **Integrate with data**: Connect Crystallize and Railway APIs
4. **Optimize performance**: Image optimization, code splitting
5. **Test across devices**: Ensure responsive behavior

This design system provides the foundation for a modern, professional e-commerce experience that will position Norko as a premium infrared heater brand while maintaining excellent usability and performance.
