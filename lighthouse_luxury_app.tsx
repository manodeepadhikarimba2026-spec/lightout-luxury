import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Wallet, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X, 
  Info,
  TrendingDown,
  TrendingUp,
  MapPin,
  Clock,
  Home,
  Briefcase,
  ChevronRight
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Scenario State ---
  const [scenarios, setScenarios] = useState({
    fundPlant: false,
    buyWorli: false,
    sellAlibaug: false,
    sellOldWorli: false
  });

  // --- Dynamic Calculations ---
  // Base values in Cr
  const baseLiquid = 80;
  const baseProperty = 120;
  
  let currentLiquid = baseLiquid;
  let currentProperty = baseProperty;

  // Apply scenario effects
  if (scenarios.fundPlant) currentLiquid -= 40;
  if (scenarios.buyWorli) { currentLiquid -= 15; currentProperty += 15; }
  if (scenarios.sellAlibaug) { currentLiquid += 15; currentProperty -= 15; }
  if (scenarios.sellOldWorli) { currentLiquid += 15; currentProperty -= 15; }

  // Total wealth remains 200Cr (assuming plant funding is an equity transfer, not a loss)
  const totalWealth = 200; 

  // --- Navigation Handler ---
  const handleNav = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-[#06080F]">
      {/* Inject custom fonts safely */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* --- Top Navigation --- */}
      <nav className="sticky top-0 z-50 bg-[#0A0D18]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => handleNav('dashboard')}>
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-white tracking-wide">LIGHTHOUSE</span>
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">Luxury Advisory</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {['dashboard', 'war-room', 'how-i-got-here'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNav(tab)}
                  className={`text-sm tracking-wider uppercase font-medium transition-all duration-300 border-b-2 py-8 ${
                    activeTab === tab 
                      ? 'text-[#D4AF37] border-[#D4AF37]' 
                      : 'text-gray-400 border-transparent hover:text-white hover:border-white/30'
                  }`}
                >
                  {tab.replace(/-/g, ' ')}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0D18] border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['dashboard', 'war-room', 'how-i-got-here'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNav(tab)}
                  className={`block w-full text-left px-3 py-4 text-sm tracking-wider uppercase font-medium ${
                    activeTab === tab ? 'text-[#D4AF37] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        
        {/* VIEW 1: PORTFOLIO DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl text-white">The Mehta Portfolio</h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Current allocation state before upcoming restructuring decisions.
              </p>
            </div>

            {/* Net Worth & Allocation Bar */}
            <div className="bg-[#0A0D18] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Building2 className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Total Net Worth</p>
                  <p className="font-serif text-5xl md:text-6xl text-white">₹200 <span className="text-2xl text-[#D4AF37]">Cr</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Real Estate / Liquid Split</p>
                  <p className="font-serif text-2xl text-white">60% / 40%</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex">
                <div className="bg-[#D4AF37] h-full transition-all duration-1000" style={{ width: '60%' }}></div>
                <div className="bg-blue-900 h-full transition-all duration-1000" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between mt-3 text-sm font-medium">
                <span className="text-[#D4AF37]">₹120 Cr (Real Estate)</span>
                <span className="text-blue-400">₹80 Cr (Liquid Assets)</span>
              </div>
            </div>

            {/* Property Grid */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                <Home className="w-6 h-6 text-[#D4AF37]" />
                Real Estate Holdings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Malabar Hill 5BHK', value: 60, desc: 'Primary family home', icon: Home, status: 'Stable' },
                  { name: 'BKC Office Floor', value: 25, desc: 'Leased to bank (18mo left)', icon: Briefcase, status: 'Yielding' },
                  { name: 'Worli 1985 3BHK', value: 15, desc: 'Rented, redevelopment vote in 6 weeks', icon: AlertTriangle, status: 'Critical Action' },
                  { name: 'Alibaug Bungalow', value: 15, desc: 'Weekend home (used ~4x/year)', icon: MapPin, status: 'Underutilized' },
                  { name: 'Thane 2x 2BHKs', value: 5, desc: 'Delayed construction (2 yrs late)', icon: Clock, status: 'Illiquid' },
                ].map((prop, idx) => (
                  <div key={idx} className="bg-[#0A0D18] border border-white/5 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group cursor-default">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/10 transition-colors">
                        <prop.icon className={`w-6 h-6 ${prop.status === 'Critical Action' ? 'text-red-400' : 'text-[#D4AF37]'}`} />
                      </div>
                      <span className="font-serif text-2xl text-white">₹{prop.value} <span className="text-sm text-gray-400">Cr</span></span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{prop.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[40px]">{prop.desc}</p>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-gray-500">Status</span>
                      <span className={`text-xs uppercase tracking-wider font-medium ${
                        prop.status === 'Critical Action' ? 'text-red-400' : 'text-[#D4AF37]'
                      }`}>{prop.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SCENARIO WAR-ROOM */}
        {activeTab === 'war-room' && (
          <div className="space-y-10 animate-in fade-in duration-700">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
              <div>
                <h1 className="font-serif text-4xl text-white mb-2">Scenario War-Room</h1>
                <p className="text-gray-400">Toggle decisions to model the portfolio's immediate future.</p>
              </div>
            </div>

            {/* Dynamic Counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sticky top-24 z-40 bg-[#06080F]/90 backdrop-blur-xl py-4 border-b border-white/10">
              <div className="bg-[#0A0D18] border border-white/10 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Liquid Cash</p>
                  <p className={`font-serif text-3xl transition-colors duration-300 ${currentLiquid < 30 ? 'text-red-400' : 'text-blue-400'}`}>
                    ₹{currentLiquid} Cr
                  </p>
                </div>
                <Wallet className={`w-8 h-8 opacity-50 ${currentLiquid < 30 ? 'text-red-400' : 'text-blue-400'}`} />
              </div>
              <div className="bg-[#0A0D18] border border-white/10 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Property Value</p>
                  <p className="font-serif text-3xl text-[#D4AF37] transition-colors duration-300">
                    ₹{currentProperty} Cr
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-[#D4AF37] opacity-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Toggles / Decisions */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-serif text-2xl text-white mb-6">Immediate Decisions</h2>
                
                {/* Decision 1 */}
                <label className={`block cursor-pointer p-6 rounded-xl border transition-all duration-300 ${scenarios.fundPlant ? 'bg-white/5 border-[#D4AF37]' : 'bg-[#0A0D18] border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${scenarios.fundPlant ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                      {scenarios.fundPlant && <CheckCircle2 className="w-4 h-4 text-[#0A0D18]" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Fund Riya's Plant Expansion</h3>
                      <p className="text-sm text-gray-400 mb-3">Divert liquid funds to business capital required in 2 years. Avoids external debt.</p>
                      <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 text-red-400">
                        <TrendingDown className="w-3 h-3" /> -₹40 Cr Liquid
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={scenarios.fundPlant} onChange={() => setScenarios({...scenarios, fundPlant: !scenarios.fundPlant})} />
                </label>

                {/* Decision 2 */}
                <label className={`block cursor-pointer p-6 rounded-xl border transition-all duration-300 ${scenarios.buyWorli ? 'bg-white/5 border-[#D4AF37]' : 'bg-[#0A0D18] border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${scenarios.buyWorli ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                      {scenarios.buyWorli && <CheckCircle2 className="w-4 h-4 text-[#0A0D18]" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Buy ₹15Cr Worli Flat for Arjun</h3>
                      <p className="text-sm text-gray-400 mb-3">Mr. Mehta's preference. Secures the price before month-end, but Arjun prefers to rent.</p>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 text-red-400">
                          <TrendingDown className="w-3 h-3" /> -₹15 Cr Liquid
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-green-500/10 text-green-400">
                          <TrendingUp className="w-3 h-3" /> +₹15 Cr Property
                        </span>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={scenarios.buyWorli} onChange={() => setScenarios({...scenarios, buyWorli: !scenarios.buyWorli})} />
                </label>

                {/* Decision 3 */}
                <label className={`block cursor-pointer p-6 rounded-xl border transition-all duration-300 ${scenarios.sellAlibaug ? 'bg-white/5 border-[#D4AF37]' : 'bg-[#0A0D18] border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${scenarios.sellAlibaug ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                      {scenarios.sellAlibaug && <CheckCircle2 className="w-4 h-4 text-[#0A0D18]" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Sell Alibaug Bungalow</h3>
                      <p className="text-sm text-gray-400 mb-3">Mrs. Mehta's suggestion. Liquidates an underutilized asset to ease immediate cash crunches.</p>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-green-500/10 text-green-400">
                          <TrendingUp className="w-3 h-3" /> +₹15 Cr Liquid
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 text-red-400">
                          <TrendingDown className="w-3 h-3" /> -₹15 Cr Property
                        </span>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={scenarios.sellAlibaug} onChange={() => setScenarios({...scenarios, sellAlibaug: !scenarios.sellAlibaug})} />
                </label>

                {/* Decision 4 */}
                <label className={`block cursor-pointer p-6 rounded-xl border transition-all duration-300 ${scenarios.sellOldWorli ? 'bg-white/5 border-[#D4AF37]' : 'bg-[#0A0D18] border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${scenarios.sellOldWorli ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                      {scenarios.sellOldWorli && <CheckCircle2 className="w-4 h-4 text-[#0A0D18]" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Sell Old Worli Flat (Pre-Vote)</h3>
                      <p className="text-sm text-gray-400 mb-3">Offload the asset before the redevelopment society vote in 6 weeks to eliminate uncertainty.</p>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-green-500/10 text-green-400">
                          <TrendingUp className="w-3 h-3" /> +₹15 Cr Liquid
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 text-red-400">
                          <TrendingDown className="w-3 h-3" /> -₹15 Cr Property
                        </span>
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={scenarios.sellOldWorli} onChange={() => setScenarios({...scenarios, sellOldWorli: !scenarios.sellOldWorli})} />
                </label>
              </div>

              {/* Advisory Output */}
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-white mb-6">Advisory Output</h2>
                
                <div className="bg-[#0A0D18] border border-[#D4AF37]/30 rounded-xl p-6 shadow-xl space-y-4">
                  
                  {/* Default / Neutral State */}
                  {currentLiquid >= 30 && !(scenarios.fundPlant && scenarios.buyWorli && !scenarios.sellAlibaug && !scenarios.sellOldWorli) && !scenarios.sellAlibaug && (
                    <div className="flex gap-3 text-gray-300">
                      <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">Toggle scenarios on the left to see Lighthouse Luxury's real-time analysis of the Mehta family portfolio.</p>
                    </div>
                  )}

                  {/* Warning: Liquidity Risk */}
                  {currentLiquid < 30 && (
                    <div className="flex gap-3 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200 leading-relaxed">
                        <strong className="text-red-400 block mb-1">High Liquidity Risk:</strong> 
                        Liquid reserves are getting dangerously low. Operating the family office and chemical business may require emergency high-interest debt.
                      </p>
                    </div>
                  )}

                  {/* Warning: Over-allocation to Property */}
                  {scenarios.fundPlant && scenarios.buyWorli && !scenarios.sellAlibaug && !scenarios.sellOldWorli && (
                    <div className="flex gap-3 bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-200 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">Strategic Conflict:</strong>
                        Warning: Funding both the plant and the new flat pushes your portfolio to 67.5% real estate, conflicting directly with Riya's goal of reducing property exposure.
                      </p>
                    </div>
                  )}

                  {/* Positive: Honoring Preferences */}
                  {scenarios.sellAlibaug && (
                    <div className="flex gap-3 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-green-200 leading-relaxed">
                        <strong className="text-green-400 block mb-1">Alignment Achieved:</strong>
                        Mrs. Mehta's preference to sell Alibaug is honored, freeing up capital for the plant or flat and easing overall family tension.
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Portfolio Composition</p>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
                      <div className="bg-[#D4AF37] h-full transition-all duration-500" style={{ width: `${(currentProperty / totalWealth) * 100}%` }}></div>
                      <div className="bg-blue-900 h-full transition-all duration-500" style={{ width: `${(currentLiquid / totalWealth) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>{((currentProperty / totalWealth) * 100).toFixed(1)}% Real Estate</span>
                      <span>{((currentLiquid / totalWealth) * 100).toFixed(1)}% Liquid</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: HOW I GOT HERE */}
        {activeTab === 'how-i-got-here' && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-700 pb-12">
            <header className="text-center space-y-6 pb-8 border-b border-white/10">
              <h1 className="font-serif text-4xl md:text-5xl text-white">How I Got Here</h1>
              <p className="text-[#D4AF37] text-lg font-medium tracking-wide">Behind the Advisory Strategy</p>
            </header>

            <article className="space-y-10 text-gray-300 leading-relaxed">
              
              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  The Problem
                </h2>
                <p>
                  The family is facing overlapping deadlines (a ₹15Cr flat purchase this week, a 6-week redevelopment vote for the old Worli property) while harboring deeply conflicting emotional goals. The core problem isn't just an intergenerational disagreement—it is a <strong>severe impending liquidity crunch masquerading as a real estate dispute.</strong> Without action, fulfilling the immediate desires of the patriarch will jeopardize the capital needed for the family's core wealth-generating asset (the chemical business).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  The User
                </h2>
                <p>
                  This product is designed for <strong>Anika (the Lighthouse Advisor)</strong> to use collaboratively with the <strong>Mehta family</strong>. By projecting scenarios interactively on an iPad or screen during their Sunday meeting, the app acts as a neutral, data-driven focal point. It removes personal attacks and frames desires objectively against mathematical constraints.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  Map of People & Assets
                </h2>
                <ul className="space-y-3 bg-[#0A0D18] p-6 rounded-xl border border-white/5">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span><strong>Mr. Mehta (62):</strong> Values legacy and controls the purse. Wants to buy the ₹15Cr Worli flat.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span><strong>Mrs. Mehta (58):</strong> Prioritizes family unity. Willing to sacrifice the ₹15Cr Alibaug home.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span><strong>Riya (34):</strong> Highly analytical (ex-IB). Wants liquidity/ROI. Needs ₹40Cr for the plant.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span><strong>Arjun (30):</strong> Desires independence from his father's oversight. Happy to rent instead of buy.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  Key Assumptions & Market Data
                </h2>
                <p>
                  I assumed specific real-world Mumbai valuations to total the ₹120Cr property portfolio based on current luxury metrics:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                  <li><strong>Malabar Hill 5BHK:</strong> Valued at ₹60Cr (Primary residence, highly illiquid).</li>
                  <li><strong>BKC Office:</strong> Valued at ₹25Cr (Steady yield, locked for 18mo).</li>
                  <li><strong>Worli Old (1985):</strong> Valued at ₹15Cr.</li>
                  <li><strong>Alibaug Bungalow:</strong> Valued at ₹15Cr.</li>
                  <li><strong>Thane 2BHKs:</strong> Valued at ₹5Cr.</li>
                </ul>
                <div className="mt-4 p-4 border-l-2 border-[#D4AF37] bg-white/5">
                  <strong>The Pivot Point:</strong> The biggest assumption that changes everything is that the 1985 Worli flat redevelopment will pass. If it fails, the asset deprecates further, and selling it <em>now</em> for ₹15Cr becomes the undisputed best financial move.
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  What I Left Out & Why
                </h2>
                <p>
                  I deliberately ignored capital gains tax implications, granular yield calculations, and the immediate liquidation of the Thane flats. Delayed under-construction flats are notoriously hard to sell quickly without a massive haircut. The focus is strictly on the immediate 30-day liquidity decisions that Anika must navigate this Sunday.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  What AI Got Wrong
                </h2>
                <p>
                  AI initially overestimated luxury rental yields in Mumbai (often citing global averages of 4-5%). In reality, South/Central Mumbai residential yields hover closer to <strong>1.5% - 2.5%</strong>. 
                </p>
                <p>
                  Catching this discrepancy was crucial: it proved that <strong>renting for Arjun is vastly cheaper mathematically</strong> than dropping ₹15Cr in cash right now, completely validating Riya and Arjun's stance against Mr. Mehta's impulse buy.
                </p>
              </section>

            </article>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;