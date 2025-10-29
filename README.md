# Art Explorer

A modern web application for exploring artworks from The Metropolitan Museum of Art collection. Built with React, TypeScript, and Tailwind CSS.

- Vercel Link: [https://art-explorer-nine.vercel.app/]

## 🎨 Features

- **Browse Artworks**: Explore thousands of artworks with infinite scroll
- **Advanced Search**: Search by artist name or culture
- **Favorites**: Save and manage your favorite artworks
- **Detailed View**: View high-resolution images and detailed information
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Scroll Restoration**: Maintains scroll position when navigating back
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **React Router** - Client-side routing
- **Zustand** - State management (favorites)
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Met Museum API** - Data source

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd agositnho_teles_jr
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

4. **Open in browser:**

```
http://localhost:5173
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Project Structure

```
src/
├── assets/          # SVG icons and images
├── components/      # Reusable UI components
│   ├── Buttons/     # Button components (Back, Hamburger, DayNight)
│   ├── Gallery/     # Gallery grid and cards
│   ├── Header/      # Header, Logo, Navigation
│   ├── Layout/      # Page layouts
│   └── SearchBar/   # Search input and results counter
├── hooks/           # Custom React hooks
│   ├── useMetMuseumArtworks.ts
│   ├── useFavoritesArtworks.ts
│   ├── useScrollRestoration.ts
│   ├── useSearchState.ts
│   ├── useToggle.ts
│   └── usePrefetchMetObject.ts
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Favorites.tsx
│   └── ArtDetails/
├── services/        # API clients
│   └── metMuseumApi.ts
├── stores/          # Zustand stores
│   └── useFavoritesStore.ts
├── styles/          # CSS and themes
│   ├── components/
│   └── themes.css
├── types/           # TypeScript type definitions
│   └── metMuseum.ts
├── utils/           # Utility functions
│   └── transformers.ts
└── App.tsx          # Root component
```

## 🎯 Core Features Implementation

### Data Fetching & Caching

- Uses TanStack Query for efficient data fetching and caching
- Prefetches artwork details on hover for instant navigation
- 5-minute stale time for API responses
- Automatic retry on failed requests

### Infinite Scroll

- Loads 15 artworks per page
- Intersection Observer API for scroll detection
- Smooth loading states with skeleton screens
- Maintains performance with memoized components

### Favorites System

- Persistent storage using localStorage via Zustand
- Optimistic UI updates
- Separate view for favorite artworks
- Real-time sync across components

### Dark Mode

- Class-based dark mode with Tailwind CSS v4
- Persists preference to localStorage
- Smooth transitions between themes
- Custom color palette for consistent branding

### Scroll Restoration

- Saves scroll position to sessionStorage
- Restores position when returning from detail pages
- Multiple restoration attempts for reliability
- Clears position on search/reset

## 🎨 Design Patterns & Best Practices

### SOLID Principles

- **Single Responsibility**: Each component/hook has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code
- **Dependency Inversion**: Components depend on abstractions (hooks), not implementations

### Performance Optimizations

- React.memo for expensive components
- useCallback for stable function references
- useMemo for derived data
- Code splitting with React.lazy (ready for future use)
- Image lazy loading and decoding optimization

### Accessibility

- Semantic HTML elements
- ARIA attributes (roles, labels, states)
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Sufficient color contrast ratios

## 🌐 API Integration

Uses [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/):

**Endpoints:**

- `GET /search` - Search artworks by query
- `GET /objects/{objectID}` - Get artwork details

**Features:**

- Fallback search strategy (artist/culture → general)
- Error handling with Promise.allSettled
- Response transformation to normalized format
- Retry logic for failed requests

## 🎨 Styling

- **Tailwind CSS v4** with CSS variables
- Custom color palette in `themes.css`
- Component-scoped styles in `@layer components`
- Responsive breakpoints (sm, md, lg, xl)
- Dark mode variants with `dark:` prefix

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/`)
- Type-safe API responses
- Shared type definitions in `/types`

### Vite

- Fast HMR (Hot Module Replacement)
- Optimized build output
- Asset handling (SVG, images)
- Path resolution

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- Intersection Observer API

## 🚢 Deployment

### Build for production:

```bash
npm run build
```

Output will be in `dist/` folder.

### Preview production build:

```bash
npm run preview
```

### Deploy to:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## 🐛 Known Issues & Limitations

- Met Museum API has rate limits (no auth required, but throttled)
- Some artworks may not have images (filtered out)
- API response times can vary
- Search is case-insensitive for better UX

## 📄 License

This project is for educational/portfolio purposes.
Artwork data provided by [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).

## 👤 Author

**Agostinho Ferreira Teles Jr.**

- LinkedIn: [https://www.linkedin.com/in/atelesjr/]
- GitHub: [https://github.com/atelesjr]

## 🙏 Acknowledgments

- The Metropolitan Museum of Art for providing the API
- React team for excellent documentation
- TanStack Query for powerful data fetching
- Tailwind CSS team for the utility-first framework

---

**Built with ❤️ using React + TypeScript + Vite**
