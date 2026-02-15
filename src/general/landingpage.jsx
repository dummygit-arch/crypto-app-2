import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import {
  Shield, Zap, Wallet, ArrowRight, AlertCircle,
  Clock, CheckCircle, BarChart2, Lock,
  Activity, ArrowUpRightFromCircle
} from 'lucide-react';
import TopBar from '../components/topBar';
import Hero_pic from '../assets/cta-img-with-bg.png';
import {
  useWeb3ModalAccount,
  useWeb3Modal,
} from '@web3modal/ethers5/react';
import BackToTopButton from '../components/backToTopButton';

const AnimatedBlob = ({ className, delay = 0 }) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${className}`}
    style={{ animationDelay: `${delay}s` }}
  ></div>
);

const HeroImage = () => (
  <div className="relative w-full max-w-2xl mx-auto perspective-container">
    <div className="relative transform-gpu transition-all duration-700 hover:scale-105">
      <img 
        src={Hero_pic} 
        alt="Hero Visual" 
        className="relative z-10 drop-shadow-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-10"></div>
    </div>
  </div>
);

const FeatureCard = ({ feature, index, isConnected, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onClick={isConnected ? undefined : handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 transition-all duration-500 ${
        isConnected
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer'
      }`}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 transition-opacity duration-500 ${!isConnected && isHovered ? 'opacity-100' : ''}`}></div>
      
      {/* Icon container with animated background */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-0 transition-opacity duration-500 ${!isConnected && isHovered ? 'opacity-50' : ''}`}></div>
        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-500">
          <feature.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-500 group-hover:scale-110 transform" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {feature.desc}
      </p>
      
      {/* Arrow indicator */}
      {!isConnected && (
        <div className={`absolute bottom-6 right-6 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          <ArrowRight className="w-5 h-5 text-blue-400" />
        </div>
      )}
    </div>
  );
};

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const isConnected = Boolean(address);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = async () => {
    setClicked(true);
    try {
      await open();
    } catch (e) {
      console.error(e);
    } finally {
      setClicked(false);
    }
  };

  const features = [
    { icon: Shield, title: 'Migration', desc: 'Securely transfer your assets across wallets or chains with minimal risk and full encryption.' },
    { icon: Zap, title: 'Claim Airdrop', desc: 'Quickly claim eligible airdrops directly to your wallet without third-party tools.' },
    { icon: Activity, title: 'Swap', desc: 'Instantly swap between tokens with real-time price execution and low fees.' },
    { icon: BarChart2, title: 'Slippage', desc: 'Control slippage tolerance to avoid unexpected losses during volatile market moves.' },
    { icon: Wallet, title: 'Exchange', desc: 'Trade across multiple pairs with our integrated, user-friendly decentralized exchange.' },
    { icon: ArrowUpRightFromCircle, title: 'Claim Token', desc: 'Redeem your tokens earned from rewards, referrals, or staking bonuses.' },
    { icon: CheckCircle, title: 'Whitelist', desc: 'Gain early access to token sales, exclusive features, and partner programs.' },
    { icon: AlertCircle, title: 'Wallet Glitch / Error', desc: 'Report wallet-related bugs, syncing issues, or missing balance problems.' },
    { icon: Clock, title: 'Transaction Delay', desc: 'Understand pending transactions and troubleshoot delayed network confirmations.' },
  ];

  return (
    <>
      <TopBar />
      
      {/* Continuous background wrapper */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBlob className="top-0 -left-20 w-96 h-96 bg-purple-500" delay={0} />
          <AnimatedBlob className="top-0 -right-20 w-96 h-96 bg-blue-500" delay={2} />
          <AnimatedBlob className="-bottom-20 left-1/4 w-96 h-96 bg-pink-500" delay={4} />
          <AnimatedBlob className="-bottom-20 right-1/4 w-96 h-96 bg-indigo-500" delay={1} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className={`space-y-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-6">
                {/* Eyebrow text */}
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-blue-300 tracking-wide">NEXT-GEN TRADING PLATFORM</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  The Future of{' '}
                  <span className="block mt-2">
                    <Typewriter
                      options={{
                        strings: ['Crypto Trading', 'Digital Assets', 'DeFi Solutions', 'Blockchain Tech'],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 50,
                        wrapperClassName: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block',
                      }}
                    />
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Experience seamless cryptocurrency trading with advanced tools, real-time analytics, and institutional-grade security. Join millions of traders worldwide.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative">
                    <w3m-button className="!rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$2.4B+</div>
                  <div className="text-sm text-gray-400">Trading Volume</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">500K+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <HeroImage />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-semibold text-purple-300 tracking-wide">FEATURES</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Make Your Selection Below
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose from key features below to manage, trade, and grow your digital assets with ease.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                isConnected={isConnected}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      </section>
      
      </div>
      {/* End continuous background wrapper */}

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Lock className="w-6 h-6 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-md opacity-50"></div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">CryptoPlatform</span>
            </div>
            
            {/* Links */}
            <div className="flex space-x-8 justify-start md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-gray-500 text-center">© 2025 Blockchain Rectification. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BackToTopButton />

      <style jsx="true">{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .perspective-container {
          perspective: 1000px;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grid > div {
          animation: fadeInUp 0.6s ease-out backwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-pulse-slow {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default LandingPage;