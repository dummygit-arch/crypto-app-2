// utils/handleConnectWallet.js
export function handleConnectWallet() {
  if (typeof window !== 'undefined' && window.appkit?.open) {
    window.appkit.open();
  } else {
    console.warn('🕒 AppKit not ready, retrying...');
    setTimeout(() => {
      if (window.appkit?.open) {
        window.appkit.open();
      } else {
        console.error('❌ AppKit still not ready.');
      }
    }, 500); // Wait half a second
  }
}
