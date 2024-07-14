# Oraggro: The Oracle Aggregator

Oracle Aggregator is a React-based dashboard application that fetches and displays cryptocurrency price feeds from multiple oracles, including Pyth and DIA. The application computes and displays the average price of a selected asset from the provided oracles.

## Features

- Fetches real-time price data from Pyth and DIA oracles.
- Integrates Pyth's new pull based oracle model, and connects using websockets.
- Integrates DIA's price oracle using REST API.
- Displays the average price of selected assets.
- Supports assets such as BTC, ETH, SOL, and MATIC.
- User-friendly interface with asset selection, dark mode switch, and responsive design.

## Technologies Used

- React
- TypeScript
- Next.js
- Tailwind CSS
- Axios
- Pythnet SDK

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hritvikkaushik/oraggro.git
cd oraggro
```

2. Install dependencies:

```bash
npm install
```

Open your browser and navigate to http://localhost:3000 to see the application in action.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

## Usage

### Components

`Home`: Main component that includes the asset selector, price display, and average price calculation.

`AssetSelector`: Component for selecting different assets.

`PricesTable`: Component for displaying prices from the oracles in a table format.

`NavigationBar`: Component for the navigation bar.

### Custom Hooks

`usePythPrice`: Custom hook for fetching price data from the Pyth oracle.

`useDIAPrice`: Custom hook for fetching price data from the DIA oracle.

### Utility Functions

`mapPythPriceToDisplayTablePrice`: Maps Pyth price data to a displayable format.

`mapDIAPriceToDisplayTablePrice`: Maps DIA price data to a displayable format.

`computeAveragePrice`: Computes the average price from the given prices.
