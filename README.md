# Algoter Trading Platform

<div align="center">

![Algoter Trading](https://img.shields.io/badge/Algoter-Trading-14b8a6?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A powerful no-code algorithmic trading strategy builder that allows users to create, backtest, and deploy trading strategies without writing a single line of code.**

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Support](#-support)

</div>

---

## 📖 About

Algoter Trading is a comprehensive platform designed for both beginners and experienced traders who want to create, test, and deploy algorithmic trading strategies. With its intuitive drag-and-drop interface, you can build complex trading strategies without any programming knowledge.

### Why Algoter Trading?

- 🎯 **No-Code Solution**: Build trading strategies visually with drag-and-drop blocks
- 🤖 **AI-Powered**: Get intelligent strategy recommendations from AI
- 📊 **Real-Time Data**: Access live market data from Binance
- 🔄 **Backtesting**: Test your strategies against historical data before deploying
- 💼 **Wallet Tracking**: Monitor Solana wallet addresses and track holdings
- 🐦 **Social Monitoring**: Track Twitter accounts for sentiment analysis
- 🎨 **Beautiful UI**: Modern 3D visualizations powered by Three.js

---

## 🚀 Features

### Core Features

- **📐 Strategy Builder**: Visual drag-and-drop interface to create trading strategies
  - Pre-built blocks for indicators (RSI, MACD, Moving Averages, etc.)
  - Conditional logic blocks
  - Risk management blocks
  - Export/Import strategies

- **📈 Backtesting Engine**: Test strategies with historical data
  - Configurable date ranges
  - Performance metrics (Sharpe Ratio, Sortino Ratio, Win Rate, etc.)
  - Trade history export to CSV
  - Visual performance charts

- **💹 Trading Dashboard**: Real-time market monitoring
  - Live price updates from Binance
  - Technical indicators visualization
  - AI strategy advisor
  - Portfolio performance tracking

- **👛 Wallet Tracker**: Monitor Solana wallets
  - Track multiple wallet addresses
  - View portfolio value and 24h changes
  - Monitor token holdings
  - Transaction history

- **🐦 Twitter Monitor**: Social sentiment analysis
  - Track Twitter accounts
  - Analyze tweet sentiment
  - Monitor engagement metrics
  - Multiple account support

- **🎨 3D Visualizations**: Beautiful interactive 3D graphics
  - Powered by Three.js and React Three Fiber
  - Smooth animations and transitions
  - Modern dark theme UI

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9+) or **pnpm** (v8+) or **yarn** (v1.22+)
- **Git** - [Download](https://git-scm.com/)

### Optional (for enhanced features):

- **OpenAI API Key** - For AI-powered strategy recommendations
- **Binance API Keys** - For advanced trading features and real-time data

---

## 🛠️ Installation

### Step 1: Clone the Repository

git clone https://github.com/AlgoterTrade/Algoter-Trade.git
cd Algoter-Trade
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6
```

### Step 2: Install Dependencies

Choose one of the following package managers:

**Using npm:**
```bash
npm install
```

**Using pnpm (recommended for faster installs):**
```bash
pnpm install
```

**Using yarn:**
```bash
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key (optional, for AI features)
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Binance API (optional, for advanced features)
# Get your API keys from: https://www.binance.com/en/my/settings/api-management
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_API_SECRET=your_binance_api_secret_here
```

> **Note**: The application will work without these API keys, but some features (AI advisor, advanced trading) will be limited.

### Step 4: Run the Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 5: Build for Production

```bash
npm run build
npm start
```

---

## 🎯 Quick Start

### 1. Connect Your Wallet

1. Navigate to the **Login** page
2. Click **"Connect Phantom Wallet"**
3. Approve the connection in your Phantom wallet extension
4. Your wallet address will be displayed once connected

### 2. Build Your First Strategy

1. Go to **Studio** from the navigation menu
2. Drag blocks from the sidebar onto the canvas:
   - **Indicators**: RSI, MACD, Moving Averages, etc.
   - **Conditions**: Price comparisons, indicator thresholds
   - **Actions**: Buy, Sell, Set Stop Loss/Take Profit
   - **Risk Management**: Position sizing, portfolio allocation
3. Connect blocks by dragging from output to input ports
4. Configure each block by clicking on it
5. Click **"Save Strategy"** to store your strategy

### 3. Backtest Your Strategy

1. Navigate to **Backtest** page
2. Click **"Load Strategy"** to load your saved strategy
3. Configure backtest parameters:
   - Start Date
   - End Date
   - Initial Capital
   - Commission Rate
4. Click **"Run Backtest"**
5. Review the results:
   - Performance metrics
   - Trade history
   - Visual charts
6. Export results to CSV if needed

### 4. Monitor Markets

1. Go to **Trading Dashboard**
2. View real-time market data
3. Use the AI advisor for strategy suggestions
4. Monitor technical indicators

### 5. Track Wallets

1. Navigate to **Wallet Tracker**
2. Enter a Solana wallet address
3. View portfolio value, holdings, and transactions
4. Track multiple wallets simultaneously

---

## 📚 Documentation

<<<<<<< HEAD
### Available Pages & Features

#### 🏠 Home Page (`/`)
- Landing page with 3D animated background
- Quick access to all main features
- Navigation links to all sections

#### 🔐 Login Page (`/login`)
- Connect Phantom wallet for Solana integration
- Secure wallet authentication
- Session management

#### 📐 Strategy Page (`/strategy`)
- Overview of strategy building concepts
- Introduction to AlgoBlocks components
- Links to Studio for actual strategy creation

#### 🎨 Studio (`/studio`)
The main strategy builder with visual drag-and-drop interface:

**Block Types:**
- **Indicators**: Moving Average (SMA/EMA), RSI, MACD, Bollinger Bands
- **Conditions**: Price Above/Below, Crossover, Percent Change
- **Actions**: Buy, Sell, Set Stop Loss, Set Take Profit
- **Risk Management**: Position Size, Max Drawdown, Portfolio Allocation

**Features:**
- Drag and drop blocks onto canvas
- Connect blocks via input/output ports
- Configure each block's parameters
- Auto-generate code from visual blocks
- Save/Load strategies to localStorage
- Export/Import strategies as JSON
- Load pre-built templates:
  - Golden Cross Strategy
  - RSI Oversold Strategy
  - MACD Crossover Strategy

**Tabs:**
- **Builder**: Visual block editor
- **Code**: Auto-generated code view
- **Settings**: Strategy configuration (name, market, timeframe, capital, etc.)

#### 📊 Backtest Page (`/backtest`)
Test your strategies against historical data:

**Features:**
- Load strategies saved from Studio
- Configure backtest parameters:
  - Start Date & End Date
  - Initial Capital
  - Commission Rate
- Run backtest and view results:
  - **Performance Tab**: Net Profit, Win Rate, Drawdown, Sharpe Ratio
  - **Trades Tab**: Complete trade history with export to CSV
  - **Metrics Tab**: Risk metrics (Max Drawdown, Volatility, Sortino, Calmar) and Performance metrics (Total Trades, Win/Loss Ratio, Avg Holding Time, Profit Factor)
- Visual performance charts (Equity Curve)
- Market data widget with real-time prices

#### 💹 Trading Dashboard (`/trading`)
Real-time market monitoring and analysis:

**Features:**
- Live market data from Binance API
- Support for multiple cryptocurrencies: BTC, ETH, BNB, SOL, ADA
- Real-time price updates (refreshes every 30 seconds)
- 24h change percentage and volume
- Technical indicators:
  - Moving Averages (SMA 7, SMA 25)
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
- Interactive price charts with historical data
- AI Strategy Advisor (requires OpenAI API key)
- Market condition analysis

#### 👛 Wallet Tracker (`/wallet-tracker`)
Monitor Solana wallet addresses:

**Features:**
- Search and track Solana wallet addresses
- View portfolio value and 24h changes
- Monitor token holdings with individual values
- View recent transaction history
- Track multiple wallets (saved to localStorage)
- Link to Solscan for detailed blockchain view
- Copy wallet address to clipboard

#### 👥 Community Page (`/community`)
Community features and strategy sharing:

**Features:**
- Strategy Marketplace (UI preview)
  - Browse shared trading strategies
  - View ratings and download counts
  - Filter by tags (Trend Following, Crypto, Volatility, etc.)
- Leaderboard (UI preview)
  - Top performing traders
  - Monthly performance rankings
- 3D network visualization of community connections

#### 📖 Docs Page (`/docs`)
Comprehensive platform documentation:

**Sections:**
- Getting Started: Connect wallet, create strategy, run backtest, deploy
- Strategy Builder: Creating and configuring blocks
- Backtesting: Testing strategies with historical data
- Trading Dashboard: Monitoring real-time markets
- Wallet Tracker: Tracking Solana wallets
- Twitter Monitor: Monitoring Twitter accounts (feature documentation)

#### 📄 Legal Pages
- **Terms & Conditions** (`/terms`): Platform terms of service
- **Privacy Policy** (`/privacy`): Data privacy and usage policies

### Key Features Summary

✅ **Fully Implemented:**
- Strategy Builder (Studio) with drag-and-drop
- Backtesting engine with comprehensive metrics
- Real-time market data from Binance
- Wallet tracking for Solana
- Strategy templates
- Save/Load/Export/Import strategies
- Code generation from visual blocks

⚠️ **UI Only (Demo):**
- Community marketplace (shows sample strategies)
- Leaderboard (shows sample rankings)
- Twitter Monitor (UI exists, full functionality may require API setup)

For more details, visit the [Docs page](/docs) in the application or check the [GitHub repository](https://github.com/AlgoterTrade/Algoter-Trade).
=======
Comprehensive documentation is available in the `algoter-trading-docs` directory:

- **[Installation Guide](./INSTALLATION.md)** - Detailed installation instructions
- **[Quick Start Guide](./QUICK_START.md)** - Step-by-step getting started tutorial
- **[Features Documentation](./FEATURES.md)** - Complete feature documentation
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6

---

## 🏗️ Project Structure

```
<<<<<<< HEAD
Algoter-Trade/
=======
algoter-trading-platform/
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── login/                   # Login/Wallet connection
│   ├── studio/                  # Strategy builder
│   ├── backtest/                # Backtesting page
│   ├── trading/                 # Trading dashboard
│   ├── wallet-tracker/          # Wallet tracking
│   ├── community/               # Community features
│   ├── docs/                    # Documentation page
│   ├── terms/                   # Terms & Conditions
│   └── privacy/                 # Privacy Policy
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── main-scene.tsx           # 3D background scene
│   ├── trading-dashboard.tsx    # Trading dashboard component
│   ├── market-data.tsx          # Market data widget
│   ├── ai-assistant.tsx         # AI advisor component
│   └── navigation.tsx          # Navigation component
├── lib/                          # Utility libraries
│   ├── binance.ts               # Binance API integration
│   ├── openai.ts                # OpenAI API integration
│   ├── backtest-engine.ts       # Backtesting engine
│   ├── indicators.ts            # Technical indicators
<<<<<<< HEAD
│   ├── strategy-templates.ts     # Strategy templates
│   ├── phantom-wallet.ts        # Phantom wallet integration
│   └── utils.ts                 # Utility functions
=======
│   ├── strategy-templates.ts    # Strategy templates
│   ├── phantom-wallet.ts        # Phantom wallet integration
│   └── utils.ts                 # Utility functions
├── algoter-trading-docs/         # Documentation files
│   ├── README.md                # This file
│   ├── INSTALLATION.md          # Installation guide
│   ├── QUICK_START.md           # Quick start guide
│   ├── FEATURES.md              # Features documentation
│   └── TROUBLESHOOTING.md       # Troubleshooting guide
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6
├── public/                       # Static assets
│   ├── favicon.svg              # Favicon
│   └── ...                      # Other static files
├── styles/                       # Additional styles
├── hooks/                        # Custom React hooks
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── next.config.mjs               # Next.js configuration
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod
- **State Management**: React Hooks
- **API Integration**: 
  - Binance API (market data)
  - OpenAI API (AI features)
  - Solana Web3.js (wallet integration)

---

## 🎨 Features in Detail

### Strategy Builder

The Strategy Builder uses a visual block-based system:

- **Indicator Blocks**: Calculate technical indicators (RSI, MACD, SMA, EMA, etc.)
- **Condition Blocks**: Define when to trigger actions based on price or indicator values
- **Action Blocks**: Execute trades (Buy/Sell) or set stop loss/take profit levels
- **Risk Management Blocks**: Control position sizing and portfolio allocation

### Backtesting Engine

The backtesting engine allows you to:

- Test strategies against historical data
- Configure custom date ranges
- Set initial capital and commission rates
- View comprehensive performance metrics
- Export trade history to CSV

### Trading Dashboard

Real-time trading dashboard features:

- Live market data from Binance
- Interactive price charts
- Technical indicator overlays
- AI-powered strategy recommendations
- Portfolio performance tracking

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [https://algoter.trade](https://algoter.trade)
- **GitHub**: [AlgoterTrade/Algoter-Trade](https://github.com/AlgoterTrade/Algoter-Trade)
- **Twitter**: [@algotertrade](https://x.com/algotertrade)
- **Documentation**: [https://algotertrading.com/docs](https://algotertrading.com/docs)
=======
- **Twitter**: [@algotertrade](https://x.com/algotertrade)
- **GitHub**: [https://github.com/yourusername/algoter-trading-platform](https://github.com/yourusername/algoter-trading-platform)

---

## 💬 Support

Need help? We're here for you!

- 📧 **Email**: support@algoter.trade
<<<<<<< HEAD
- 🐛 **Issues**: [GitHub Issues](https://github.com/AlgoterTrade/Algoter-Trade/issues)
- 📖 **Documentation**: Check the [GitHub repository](https://github.com/AlgoterTrade/Algoter-Trade) for detailed documentation
=======
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/algoter-trading-platform/issues)
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6
- 🐦 **Twitter**: [@algotertrade](https://x.com/algotertrade)

---

## ⚠️ Disclaimer

**Important**: Trading cryptocurrencies and other financial instruments involves substantial risk of loss. This platform is for educational and research purposes only. Past performance does not guarantee future results. Always do your own research and never invest more than you can afford to lose.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ by the Algoter Trading Team**

⭐ Star this repo if you find it helpful!

</div>
<<<<<<< HEAD

=======
>>>>>>> 84ab03cbf7b1f7f54b7aad13fa34cd13662bd8c6
