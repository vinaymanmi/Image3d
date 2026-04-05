import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logIn, signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (isLogin) {
      if (!username || !password) {
        setError('Please enter your username and password.');
        return;
      }
    } else {
      if (!email || !username || !password) {
        setError('Please fill in all fields (Email, Username, Password).');
        return;
      }
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await logIn(username, password);
        setSuccess('Login successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        await signUp(email, username, password);
        setSuccess('Registered successfully! You can now log in.');
        setIsLogin(true); // Switch to login mode
        setPassword('');  // Clear password for security
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-neon)] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      
      <div className="glass-panel p-8 w-full max-w-md z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Sign Up'}
        </h2>
        <p className="text-gray-400 text-center mb-8">
          {isLogin ? 'Enter your username to access your workspace.' : 'Create an account to start transforming images.'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-neon)] focus:ring-1 focus:ring-[var(--color-neon)] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-neon)] focus:ring-1 focus:ring-[var(--color-neon)] transition-colors"
                placeholder="yourusername"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-neon)] focus:ring-1 focus:ring-[var(--color-neon)] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--color-neon)] text-black font-semibold py-2.5 rounded-lg hover:bg-[#00d4ff] transition-colors flex justify-center items-center mt-6 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => { 
              setIsLogin(!isLogin); 
              setError(''); 
              setSuccess('');
            }}
            className="text-[var(--color-neon)] hover:underline focus:outline-none font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
