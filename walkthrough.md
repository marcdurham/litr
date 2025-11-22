# Literature Tracker Walkthrough

I have built a Next.js application to track literature inventory, orders, and distribution.

## Features

### 1. Dashboard
The dashboard provides a high-level overview of your inventory status.
- **Total Inventory**: Count of all items in stock.
- **Distributed (Month)**: Number of items handed out in the current month.
- **Low Stock Alerts**: Warning for items with low quantity (< 50).
- **Recent Activity**: A feed of the latest transactions (IN/OUT).

### 2. Inventory Management
The `/inventory` page lists all literature items with their current stock levels, type, and language.
- Visual status indicators (Green/Yellow/Red) for stock levels.

### 3. Orders (Incoming Stock)
The `/orders` page allows you to log new shipments.
- **Receive Stock Form**: Select an item and quantity to add to inventory.
- **Recent Arrivals**: History of all "IN" transactions.

### 4. Distribution (Outgoing Stock)
The `/distribution` page tracks items given to publishers.
- **Distribute Form**: Select an item, quantity, and publisher.
- **Recent Distribution**: History of all "OUT" transactions.

## Technical Details

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with a premium, clean design (Slate/Blue color palette).
- **Data**: In-memory mock store (`src/lib/store.ts`) that persists data while the server is running.
- **API**: Mock API routes (`/api/inventory`, `/api/transactions`) handling data mutations.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

You can also run the application using Docker:

```bash
docker compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Verification Results
- **Build**: `npm run build` passed successfully, confirming type safety and valid build configuration.
- **Docker**: `docker compose build` passed successfully, confirming the container image builds correctly.
