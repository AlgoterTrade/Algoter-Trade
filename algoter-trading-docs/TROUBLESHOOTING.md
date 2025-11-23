# Troubleshooting Guide

Common issues and solutions for Algoter Trading Platform.

## 🚨 Installation Issues

### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Node version mismatch

**Solution:**
- Ensure you have Node.js v18 or higher
- Use `nvm` to switch versions:
  ```bash
  nvm install 18
  nvm use 18
  ```

### Problem: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

## 🔧 Runtime Issues

### Problem: Charts not displaying

**Solution:**
1. Check if Recharts is installed:
   ```bash
   npm list recharts
   ```
2. If missing, install:
   ```bash
   npm install recharts
   ```
3. Clear browser cache and reload

### Problem: Phantom wallet not connecting

**Solution:**
1. Ensure Phantom extension is installed
2. Check if wallet is unlocked
3. Refresh the page
4. Try disconnecting and reconnecting

### Problem: API errors (Binance/OpenAI)

**Solution:**
1. Check `.env.local` file exists
2. Verify API keys are correct
3. Check API rate limits
4. For Binance: Ensure API keys have correct permissions

### Problem: Strategy not saving

**Solution:**
1. Check browser localStorage is enabled
2. Clear browser cache
3. Try exporting strategy as JSON instead

## 🐛 Common Bugs

### Problem: Blocks not dragging

**Solution:**
1. Refresh the page
2. Clear browser cache
3. Check browser console for errors
4. Ensure @dnd-kit is installed:
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable
   ```

### Problem: Code generation not working

**Solution:**
1. Ensure blocks are properly configured
2. Check browser console for errors
3. Try removing and re-adding blocks

### Problem: Backtest not running

**Solution:**
1. Ensure strategy has at least one block
2. Check backtest configuration
3. Verify dates are valid
4. Check browser console for errors

### Problem: Market data not loading

**Solution:**
1. Check internet connection
2. Verify Binance API is accessible
3. Check browser console for CORS errors
4. Try refreshing the page

## 🔍 Debugging Tips

### Enable Debug Mode

Add to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

### Check Browser Console

1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### Check Server Logs

```bash
# Run with verbose logging
npm run dev -- --debug
```

## 📦 Dependency Issues

### Problem: Module not found

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Problem: Type errors

**Solution:**
```bash
# Rebuild TypeScript
npm run build
```

## 🌐 Network Issues

### Problem: CORS errors

**Solution:**
- This is normal for some APIs
- The app includes fallback mechanisms
- Check if API keys are configured

### Problem: Slow loading

**Solution:**
1. Check internet connection
2. Clear browser cache
3. Disable browser extensions
4. Try incognito mode

## 💾 Data Issues

### Problem: Strategies lost after refresh

**Solution:**
- Strategies are saved in localStorage
- Export important strategies as JSON
- Check browser settings allow localStorage

### Problem: Wallet connection lost

**Solution:**
- Reconnect wallet
- Check Phantom extension is active
- Clear browser cache if needed

## 🆘 Still Having Issues?

1. **Check GitHub Issues**: Search for similar problems
2. **Create an Issue**: Provide details about your problem
3. **Contact Support**: support@algotertrading.com

## 📝 Reporting Bugs

When reporting bugs, include:
- Browser and version
- Node.js version
- Error messages
- Steps to reproduce
- Screenshots if applicable

## ✅ Verification Checklist

Before reporting issues, verify:
- [ ] Node.js version is v18+
- [ ] All dependencies installed
- [ ] `.env.local` configured (if needed)
- [ ] Browser is up to date
- [ ] No browser extensions interfering
- [ ] Internet connection is stable


