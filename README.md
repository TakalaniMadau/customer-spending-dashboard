# React + TypeScript + Vite

A **URL-driven**, **production-ready** React dashboard for visualizing customer spending data. Built with a focus on simplicity, debuggability, and modern best practices.

---

## 🏗️ Architecture Principles

This dashboard follows four guiding principles:

| Principle                             | Implementation                                                  |
| ------------------------------------- | --------------------------------------------------------------- |
| **URL is the source of truth**        | All filters, periods, sorting, and pagination live in the URL   |
| **No duplicated state**               | No `useState` mirroring URL values, no syncing effects          |
| **Server data is derived, not owned** | React Query fetches based on URL params; UI never "stores" data |
| **UI state stays local**              | Only modals, dropdowns, and hover states use local state        |

### Why URL-Driven?

- **Shareable** — Copy the URL to share exact dashboard state
- **Debuggable** — See all active filters in the address bar
- **Bookmarkable** — Save specific views for quick access
- **Back/Forward works** — Browser navigation just works

---

## URL Parameters

```
/dashboard
  ?period=30d              # 7d, 30d, 90d, 1y, or custom
  &category=Groceries      # Filter by category
  &startDate=2024-08-16    # Custom date range start
  &endDate=2024-09-16      # Custom date range end
  &sortBy=date_desc        # date_desc, date_asc, amount_desc, amount_asc
  &page=1                  # Pagination
  &months=12               # Trends chart months
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **pnpm** 10.x (or npm/yarn)
- **Docker** (optional, for containerized deployment)

### Local Development

```bash
# Clone the repository
git clone git@github.com:TakalaniMadau/customer-spending-dashboard.git
cd customer-spending-dashboard

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

app will be available at http://localhost:5173

# Build for production

pnpm build

# Preview production build

pnpm preview

# Build and start the container

docker compose up -d

# View logs

docker compose logs -f

# Stop the container

docker compose down
