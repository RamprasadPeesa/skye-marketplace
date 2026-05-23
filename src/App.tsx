import React from 'react';
import { Sparkles, Shield, Activity, Menu } from 'lucide-react';
import { OnboardingWizard } from './components/OnboardingWizard';
import { MiloChat } from './components/MiloChat';
import { Sidebar } from './components/Sidebar';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    userId,
    profile,
    activeGigs,
    matches,
    loading,
    totalEscrow,
    saveProfile,
    addMessage,
    saveGig,
    saveMatches,
    updateMatchDecision,
    releaseEscrow,
  } = useAppState();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-400 text-sm">Loading Milo...</p>
        </div>
      </div>
    );
  }

  if (!profile?.onboarding_complete) {
    return (
      <OnboardingWizard
        onComplete={async (data) => {
          await saveProfile(data);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/8 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 border-b border-slate-800/50 backdrop-blur-sm flex-shrink-0">
        <div className="px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">Milo</h1>
              <p className="text-xs text-slate-500 leading-none mt-0.5">Campus Gig Marketplace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">Live</span> · Powered by Milo AI
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-500">Escrow Protected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar
            profile={profile}
            activeGigs={activeGigs}
            matches={matches}
            totalEscrow={totalEscrow}
          />
        </div>

        {/* Chat area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>
          <MiloChat
            profile={profile}
            userId={userId}
            onSaveGig={saveGig}
            onSaveMatches={saveMatches}
            onUpdateMatchDecision={updateMatchDecision}
            onReleaseEscrow={releaseEscrow}
            onPersistMessage={addMessage}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
