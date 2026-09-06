async function fetchBinanceDerivativesData(symbol: string) {
  try {
    console.log(`\n--- Fetching data for ${symbol} ---`);

    // 1. Global Long/Short Ratio (Accounts)
    const lsRes = await fetch(
      `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=5m&limit=1`
    );
    const lsData = await lsRes.json();
    const latestLS = lsData[0];

    // 2. Taker Buy/Sell Volume Ratio
    const takerRes = await fetch(
      `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=5m&limit=1`
    );
    const takerData = await takerRes.json();
    const latestTaker = takerData[0];

    console.log('1. Long/Short Account Ratio:');
    console.log(`   - Long Account %: ${(parseFloat(latestLS.longAccount) * 100).toFixed(2)}%`);
    console.log(`   - Short Account %: ${(parseFloat(latestLS.shortAccount) * 100).toFixed(2)}%`);
    console.log(`   - Long/Short Ratio: ${latestLS.longShortRatio}`);

    console.log('\n2. Taker Buy/Sell Volume:');
    console.log(`   - Buy/Sell Ratio: ${latestTaker.buySellRatio}`);
    console.log(`   - Buy Volume: ${latestTaker.buyVol}`);
    console.log(`   - Sell Volume: ${latestTaker.sellVol}`);

    // Анализ за Short сигнал
    const lsRatio = parseFloat(latestLS.longShortRatio);
    const buySellRatio = parseFloat(latestTaker.buySellRatio);

    console.log('\n3. Signal Score Evaluation:');
    let points = 0;

    if (lsRatio > 1.8) {
      console.log('   [+] High Long/Short Ratio (>1.8) -> Heavy Retail Long Trap (+2 pts)');
      points += 2;
    } else if (lsRatio > 1.3) {
      console.log('   [+] Moderate Long/Short Ratio (>1.3) (+1 pt)');
      points += 1;
    }

    if (buySellRatio < 0.85) {
      console.log('   [+] Taker Volume Selling Dominance (<0.85) -> Market Dumping (+2 pts)');
      points += 2;
    } else if (buySellRatio < 0.95) {
      console.log('   [+] Taker Volume Slight Selling (<0.95) (+1 pt)');
      points += 1;
    }

    console.log(`\n== Total Added Score for Short: ${points} pts ==`);
  } catch (error) {
    console.error('Error fetching metrics:', error);
  }
}

fetchBinanceDerivativesData('BTCUSDT');
