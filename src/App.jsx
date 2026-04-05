import { Routes, Route } from 'react-router-dom';
import AuthCard from './components/AuthCard';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';

function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden selection:bg-[var(--color-neon)] selection:text-black text-white relative">
      <div className="fixed top-0 w-full glass-panel !border-x-0 !border-t-0 p-4 z-50 flex justify-between items-center bg-black/50">
        <h1 className="text-2xl font-bold font-montserrat flex items-center">
          <span className="text-[var(--color-neon)] mr-2">Depth</span>Lens
        </h1>
        <div className="flex gap-4">
          <a href="/login" className="px-4 py-2 bg-[var(--color-neon)] text-black font-semibold rounded-lg hover:bg-white transition-colors">Log In</a>
        </div>
      </div>

      <Hero />
      <Features />
      <Pricing />

      <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DepthLens. All rights reserved.</p>
      </footer>
    </div>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthCard />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
