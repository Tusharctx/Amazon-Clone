
# Amazon Clone - E-Commerce Application

A modern, full-featured e-commerce platform built with React and Firebase, inspired by Amazon's user experience and design patterns.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Key Assumptions](#key-assumptions)
- [Architecture Decisions](#architecture-decisions)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

This Amazon Clone is a production-ready e-commerce application that replicates core Amazon features including product browsing, shopping cart management, order processing, and user authentication. The application uses modern React patterns with TypeScript for type safety and Firebase for backend services and real-time synchronization.

**Key Highlights:**
-  Firebase Authentication (Email/Password, Google Sign-In ready)
-  Real-time cart synchronization across devices
-  Complete order management system
-  Checkout with address validation
-  User account management
-  Product ratings and star ratings
-  Product search and category filtering
-  Fully responsive design (mobile, tablet, desktop)
-  Amazon-inspired UI with Tailwind CSS

---

##  Features

### Authentication & User Management
- User registration with email validation
- Email/password login
- Password reset capability
- User profile management
- Persistent authentication with Firebase

### Product Management
- Browse products by category
- Product detail pages with images and specifications
- Star rating system (1-5 stars)
- Prime eligibility indicator
- Product availability checking
- Dynamic pricing display

### Shopping Experience
- Add/remove products from cart
- Update product quantities
- Real-time cart persistence to Firestore
- View cart summary with subtotals
- Price calculation with automatic tax (8%) and shipping

### Checkout Process
- Delivery address form with validation
- Order summary review
- Order number generation
- Automatic order creation in Firestore
- Order confirmation page

### Order Management
- View order history
- Track individual orders
- Order status monitoring
- Order details with item breakdown
- Estimated delivery dates

### Additional Features
- Customer Service page
- Prime Membership information
- Product Recommendations
- Device showcase (Devices page)
- WishLists page
- Account management dashboard
- 404 error page with navigation help

### UI/UX Features
- Navigation sidebar with category filtering
- Footer with links and information
- Toast notifications (Sonner + Radix UI)
- Tooltip support
- Responsive navigation bar
- Currency context for potential multi-currency support
- Smooth loading states

---

## 🛠 Tech Stack

### Frontend Framework & Build
| Package | Version | Purpose |
|---------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | Latest | Type safety |
| **Vite** | Latest | Build tool and dev server |
| **React Router** | 6.30.1 | Client-side routing |
| **Tailwind CSS** | Latest | Utility-first CSS framework |

### State Management & Data Fetching
| Package | Version | Purpose |
|---------|---------|---------|
| **TanStack React Query** | 5.83.0 | Server state management |
| **Context API** | Built-in | Client state management (Cart, Auth, Currency, Orders) |
| **React Hook Form** | 7.61.1 | Form state management |

### Backend & Database
| Service | Purpose |
|---------|---------|
| **Firebase** | 12.11.0 |
| **Firebase Auth** | User authentication |
| **Firestore** | Real-time database |

### UI Component Library
- **Radix UI** - Unstyled, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Badge, Breadcrumb
  - Button, Card, Carousel, Checkbox, Collapsible
  - Command, Context Menu, Dialog, Drawer, Dropdown Menu
  - Form, Hover Card, Input, Label, Menubar
  - Navigation Menu, Pagination, Popover, Progress
  - Radio Group, Scroll Area, Select, Separator
  - Sheet, Sidebar, Slider, Switch, Table
  - Tabs, Textarea, Toggle, Tooltip
- **shadcn/ui** - React components built on Radix UI + Tailwind CSS

### Utilities & Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| **Zod** | 3.25.76 | Schema validation |
| **Lucide React** | 0.462.0 | Icons |
| **Date-fns** | 3.6.0 | Date utilities |
| **Recharts** | 2.15.4 | Chart library |
| **Sonner** | 1.7.4 | Toast notifications |
| **Embla Carousel** | 8.6.0 | Carousel component |
| **clsx** | 2.1.1 | Conditional classnames |
| **Tailwind Merge** | 2.6.0 | Merge tailwind classes |

### Development & Testing
| Package | Purpose |
|---------|---------|
| **Vitest** | Unit/integration testing |
| **Playwright** | E2E testing |
| **@testing-library/react** | React component testing |
| **ESLint** | Code linting |
| **Autoprefixer** | CSS vendor prefixing |

---

##  Project Structure

```
Amazon-Clone-main/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── ... (25+ more UI components)
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── Footer.tsx             # Footer with links
│   │   ├── CategorySidebar.tsx    # Category filtering
│   │   ├── ProductCard.tsx        # Product card display
│   │   ├── PriceDisplay.tsx       # Price formatting
│   │   ├── StarRating.tsx         # Star rating display
│   │   └── NavLink.tsx            # Navigation link
│   │
│   ├── context/
│   │   ├── AuthContext.tsx        # User authentication
│   │   ├── CartContext.tsx        # Shopping cart state
│   │   ├── CurrencyContext.tsx    # Multi-currency support
│   │   └── OrdersContext.tsx      # Order management
│   │
│   ├── pages/
│   │   ├── Home.tsx               # Landing page
│   │   ├── Index.tsx              # Products listing
│   │   ├── ProductDetail.tsx      # Product details
│   │   ├── Cart.tsx               # Shopping cart
│   │   ├── Checkout.tsx           # Order checkout
│   │   ├── OrderConfirmation.tsx  # Confirmation page
│   │   ├── Orders.tsx             # Order history
│   │   ├── OrderDetail.tsx        # Individual order view
│   │   ├── Login.tsx              # User login
│   │   ├── Register.tsx           # User registration
│   │   ├── YourAccount.tsx        # Account management
│   │   ├── CustomerService.tsx    # Support page
│   │   ├── WishLists.tsx          # Wishlist page
│   │   ├── Recommendations.tsx    # Recommendations
│   │   ├── PrimeMembership.tsx    # Prime info
│   │   ├── Devices.tsx            # Device showcase
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── config/
│   │   └── firebase.ts            # Firebase initialization
│   │
│   ├── data/
│   │   └── products.ts            # Product data
│   │
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast hook
│   │
│   ├── App.tsx                    # Main app with routes
│   ├── main.tsx                   # React entry point
│   ├── App.css                    # Global styles
│   └── index.css                  # Base styles
│
├── public/
│   └── robots.txt
│
├── test/
│   ├── example.test.ts            # Test example
│   └── setup.ts                   # Test setup
│
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── playwright.config.ts
│   ├── components.json             # shadcn/ui config
│   ├── index.html
│   ├── .env.example                # Environment variables template
│   ├── .gitignore
│   ├── .env.local                  # Local environment (not committed)
│   ├── bun.lock / package-lock.json
│   └── README files
│       ├── README.md               # Original (empty)
│       ├── README_COMPREHENSIVE.md # This file
│       ├── ENV_SETUP.md            # Environment setup guide
│       └── FIRESTORE_SETUP.md      # Firebase setup guide
```

---

##  Setup Instructions

### Prerequisites
- **Node.js** 18+ or **Bun** runtime
- **npm** 9+ or **yarn** or **bun**
- Firebase account with a configured project
- Git (for cloning the repository)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Amazon-Clone-main
```

### Step 2: Install Dependencies
Choose one of the following package managers:

**Using npm:**
```bash
npm install
```

**Using bun:**
```bash
bun install
```

**Using yarn:**
```bash
yarn install
```

### Step 3: Configure Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase credentials in `.env.local` (see [Environment Configuration](#environment-configuration) section)

### Step 4: Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Create these Firestore collections:
   - `users` - User profiles
   - `carts` - Shopping carts
   - `orders` - Order history
   - `products` - Product catalog (optional, currently using local data)

### Step 5: Verify Setup
```bash
npm run dev
```

The application should be running at `http://localhost:8080`

---

##  Environment Configuration

### .env.local File Template

Create a `.env.local` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### How to Get Firebase Credentials

1. Go to Firebase Console → Project Settings
2. Copy the configuration object values
3. Map them to the `VITE_` prefixed environment variables above

### Security Notes
-  **Never commit `.env.local` to version control**
- Use `.env.example` as a template in version control
- Each developer should have their own `.env.local`
- Rotation of credentials is recommended periodically

---

##  Running the Application

### Development Mode
```bash
npm run dev
```
- Hot Module Replacement (HMR) enabled
- DevTools active
- Source maps enabled

### Production Build
```bash
npm run build
```
Creates optimized production bundle in `dist/`

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing

---

##  Available Scripts

```bash
# Development
npm run dev              # Start development server on port 8080

# Building
npm run build            # Build for production
npm run build:dev        # Build in development mode

# Testing
npm run test             # Run tests once
npm run test:watch      # Run tests in watch mode

# Code Quality
npm run lint            # Run ESLint

# Preview
npm run preview         # Preview production build locally
```

---

##  Key Assumptions

### 1. **User Authentication**
- Authentication is handled entirely by Firebase Auth
- Email/password is the primary auth method
- Google Sign-In can be added without major changes
- User session persists across page refreshes

### 2. **Data Storage**
- **User data** stored in Firestore under `users/{userId}`
- **Cart data** persisted in Firestore with localStorage fallback
- **Orders** stored in Firestore under `orders/{userId}`
- **Products** currently loaded from local TypeScript (`data/products.ts`)
- Cart state syncs to Firestore only when user is authenticated

### 3. **Product Data**
- Products are defined locally in `src/data/products.ts`
- Products have fixed IDs, names, prices, categories, stock, ratings
- Product images are handled via URLs or base64 data
- Prime eligibility is a boolean flag per product
- **Future**: Can be migrated to Firestore with minimal changes

### 4. **Pricing & Tax**
- Tax rate is hardcoded at 8%
- Shipping is $0 for orders over $50, $5 for smaller orders
- Currency formatting assumes USD
- Prices are stored as numbers (cents or dollars based on implementation)

### 5. **Cart Behavior**
- Cart is local until user registers/logs in
- On login, cart syncs to Firestore
- On logout, local cart is cleared
- Cart persists across sessions when user is authenticated
- Duplicate products increase quantity instead of creating new items

### 6. **Order Processing**
- Order numbers are auto-generated on checkout
- Orders include itemized list, totals, shipping address
- No actual payment processing (assumed to be added later)
- Orders are immediately marked as confirmed
- Delivery estimation is calculated as 3-5 business days

### 7. **User Interface**
- Responsive design uses Tailwind CSS with mobile-first approach
- Navigation bar and footer are present on all pages except login/register
- Category sidebar appears on product listing pages
- All forms use React Hook Form with Zod validation
- Toast notifications use Sonner library

### 8. **Accessibility**
- Built on Radix UI primitives (accessible by design)
- ARIA labels and roles properly configured
- Keyboard navigation supported throughout
- Color contrast meets WCAG standards (via Tailwind)

### 9. **Performance**
- React Router lazy loading supported but not implemented
- TanStack Query configured for server state (can be expanded)
- Vite SWC compiler for fast builds
- Code splitting handled automatically by Vite

### 10. **Error Handling**
- Firebase errors caught and logged to console
- User-facing errors shown via toast notifications
- 404 page for invalid routes
- Graceful degradation when Firestore is unavailable

---

##  Architecture Decisions

### Context API for State Management
**Why**: Chosen over Redux/Zustand for:
- Simpler setup for medium-sized app
- Built into React (no extra dependencies)
- Sufficient for cart, auth, currency, orders state

**Trade-off**: Performance could degrade with very frequent updates
**Mitigation**: Can migrate to Zustand if needed

### Firebase for Backend
**Why**: Chosen for:
- Real-time database capabilities
- Built-in authentication
- No server maintenance required
- Generous free tier
- Security rules for data access control

**Trade-off**: Vendor lock-in, costs scale with usage
**Mitigation**: API abstraction layer can ease migration

### Tailwind CSS + shadcn/ui
**Why**: Chosen for:
- Rapid UI development
- Accessible components out of box
- Highly customizable
- Large community support
- Smaller bundle than Material UI

### Vite over Create React App
**Why**: Chosen for:
- Lightning fast dev server
- Faster builds
- Modern ESM support
- Better DX with HMR

---

##  Security Considerations

### Current Implementation
1. **Firebase Security Rules** - Should be configured to:
   - Restrict cart access to authenticated users
   - Users can only view their own orders
   - Product reads are public

2. **Environment Variables** - Firebase config is public (expected by Firebase)
   - API Keys are restricted via Firebase Console
   - No sensitive data in env variables

3. **Authentication** - Firebase Auth handles:
   - Password hashing
   - Session management
   - HTTPS enforcement

### Recommendations for Production
1. Implement Firebase Security Rules strictly
2. Add rate limiting to API endpoints (if using Cloud Functions)
3. Validate all user input server-side
4. Implement CSRF protection if adding API routes
5. Regular security audits
6. Update dependencies regularly

---

##  Future Enhancements

### Phase 1: Core Features
- [ ] Product image upload/management
- [ ] Product reviews and ratings by users
- [ ] Wishlists (persistence to Firestore)
- [ ] Email notifications (order confirmation, shipping)
- [ ] Search functionality with filters

### Phase 2: Advanced Features
- [ ] Payment integration (Stripe/PayPal)
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Customer support chat
- [ ] Recommendation engine

### Phase 3: Scale & Optimize
- [ ] Server-side rendering (Next.js migration)
- [ ] GraphQL API
- [ ] Caching strategies (Redis)
- [ ] CDN for images
- [ ] Analytics integration

### Phase 4: Commerce Features
- [ ] Multiple payment methods
- [ ] Coupon/discount codes
- [ ] Subscription/recurring orders
- [ ] Seller dashboard
- [ ] Multi-vendor support

---

##  Support & Documentation

### Related Documentation
- [ENV_SETUP.md](./ENV_SETUP.md) - Detailed environment setup
- [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md) - Firebase/Firestore configuration

### External Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Router Documentation](https://reactrouter.com/)

---

##  License

This project is provided as-is for educational and development purposes.

---

##  Troubleshooting

### Common Issues

**Issue: Firebase credentials not loading**
- Ensure `.env.local` is in project root
- Verify `VITE_` prefix on all environment variables
- Restart dev server after changing `.env.local`

**Issue: Cart not persisting after login**
- Check Firestore database rules allow user to read/write
- Verify user is authenticated (check console logs)
- Check browser console for Firebase errors

**Issue: Port 8080 already in use**
- Change port in `vite.config.ts` server.port
- Or kill process using port 8080

**Issue: Styles not loading**
- Ensure Tailwind CSS is building (check `dist/` after build)
- Clear browser cache and rebuild

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Status**: Production Ready
