import React, { useState, useEffect, useRef } from 'react';
import { X, HelpCircle } from 'lucide-react';

const ConnectWalletModal = ({ isOpen, onClose }) => {
  const [showHelp, setShowHelp] = useState(false);
  const modalRef = useRef(null);

  const wallets = [
    { name: 'WalletConnect', logo: '🔗' },
    { name: 'Phantom', logo: '👻' },
    { name: 'Trust Wallet', logo: '🛡️' },
    { name: 'MetaMask', logo: '🦊' },
    { name: 'Coinbase Wallet', logo: '🔵' },
    { name: 'Ledger', logo: '🔐' },
    { name: 'All Wallets', logo: '🔐'},
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setShowHelp(false);
          onClose();
        }
      };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowHelp(false);
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
  }

  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = 'unset';
  };
}, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          setShowHelp(false);
          onClose();
        }}
      />
      
      {/* Modal */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div ref={modalRef} className="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          
          {showHelp ? (
            // Help Content
            <>
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                  </button>  
                </div>
                <h2 className="text-xl font-semibold text-white">Don't have a wallet?</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    A crypto wallet is a digital tool that lets you store, send, and receive cryptocurrencies. Think of it as your digital bank account for crypto.
                  </p>
                  
                  <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-300 mb-2">Getting Started:</h3>
                    <ol className="text-sm text-blue-200 space-y-1">
                      <li>1. Choose a wallet from the list</li>
                      <li>2. Download and install the app</li>
                      <li>3. Create your account</li>
                      <li>4. Secure your recovery phrase</li>
                      <li>5. Come back and connect!</li>
                    </ol>
                  </div>

                  <p className="text-sm text-gray-400">
                    We recommend MetaMask for beginners - it's the most popular and user-friendly option.
                  </p>
                </div>

                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Choose a Wallet
                </button>
              </div>
            </>
          ) : (
            // Main Content
            <>
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowHelp(true)}
                    className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-white" />
                  </button>
                  
                </div>
                <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 font-bold text-white " />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-2">
                  {wallets.map((wallet, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-4 p-4 bg-gray-800 border border-slate-700 rounded-2xl hover:border-blue-500 hover:bg-slate-800 transition-all"
                      onClick={() => {
                        // Handle wallet connection logic here
                        console.log(`Connecting to ${wallet.name}`);
                        onClose();
                      }}
                    >
                      <span className="text-2xl">{wallet.logo}</span>
                      <span className="font-medium text-white">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;

