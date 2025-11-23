# Installation Guide

This guide will walk you through installing and setting up the Algoter Trading Platform.

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm/yarn)
- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space

## Step-by-Step Installation

### Step 1: Install Node.js

If you don't have Node.js installed:

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the instructions
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Clone the Repository

```bash
git clone https://github.com/yourusername/algoter-trading-platform.git
cd algoter-trading-platform
```

### Step 3: Install Dependencies

Choose one of the following package managers:

#### Using npm:
```bash
npm install
```

#### Using pnpm (recommended for faster installs):
```bash
npm install -g pnpm
pnpm install
```

#### Using yarn:
```bash
npm install -g yarn
yarn install
```

### Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add the following variables (all optional):
   ```env
   # OpenAI API Key (for AI features)
   OPENAI_API_KEY=sk-your-key-here

   # Binance API (for advanced trading features)
   BINANCE_API_KEY=your-api-key
   BINANCE_API_SECRET=your-api-secret
   ```

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Docker Installation (Optional)

If you prefer using Docker:

```bash
# Build the image
docker build -t algoter-trading .

# Run the container
docker run -p 3000:3000 algoter-trading
```

## Verifying Installation

After installation, verify everything works:

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the home page
3. Navigate to `/studio` to access the strategy builder
4. Check that all pages load correctly

## Common Issues

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions to common installation problems.

## Next Steps

- Read the [Quick Start Guide](./QUICK_START.md)
- Explore the [Features Documentation](./FEATURES.md)
- Start building your first strategy!


