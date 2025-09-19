// Gold purchase calculator logic (Persian) -- runs in browser
(function(){
  const $ = id => document.getElementById(id);
  const weight = $('weight');
  const pricePerGram = $('pricePerGram');
  const type = $('type');
  const laborPerGram = $('laborPerGram');
  const shopProfitPercent = $('shopProfitPercent');
  const taxPercent = $('taxPercent');
  const calcBtn = $('calcBtn');
  const resetBtn = $('resetBtn');
  const resultCard = $('resultCard');
  const rawPrice = $('rawPrice');
  const laborTotal = $('laborTotal');
  const profitAmount = $('profitAmount');
  const taxBase = $('taxBase');
  const taxAmount = $('taxAmount');
  const finalPrice = $('finalPrice');

  function format(n){ return n.toLocaleString('fa-IR'); }

  function calculate(){
    const w = parseFloat(weight.value) || 0;
    const p = parseFloat(pricePerGram.value) || 0;
    const isNew = type.value === 'new';
    const laborPerG = parseFloat(laborPerGram.value) || 0;
    const profitPct = parseFloat(shopProfitPercent.value) || 0;
    const taxPct = parseFloat(taxPercent.value) || 0;

    const raw = w * p;
    const labor = isNew ? (laborPerG * w) : 0;
    const profit = (profitPct/100) * raw;
    const taxBaseVal = labor + profit;
    const tax = (taxPct/100) * taxBaseVal;
    const final = raw + labor + profit + tax;

    rawPrice.textContent = format(Math.round(raw));
    laborTotal.textContent = format(Math.round(labor));
    profitAmount.textContent = format(Math.round(profit));
    taxBase.textContent = format(Math.round(taxBaseVal));
    taxAmount.textContent = format(Math.round(tax));
    finalPrice.textContent = format(Math.round(final));
    resultCard.style.display = 'block';

    return {raw, labor, profit, taxBaseVal, tax, final};
  }

  calcBtn.addEventListener('click', calculate);
  resetBtn.addEventListener('click', ()=>{
    weight.value='5'; pricePerGram.value='9129400'; laborPerGram.value='200000'; shopProfitPercent.value='7'; taxPercent.value='10';
    resultCard.style.display='none';
  });

  // service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(()=>console.log('sw registered')).catch(console.error);
  }

  // beforeinstallprompt for non-iOS browsers
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    // we won't auto show an install button; user can use browser controls
  });
})();