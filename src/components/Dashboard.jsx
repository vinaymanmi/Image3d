import { useState, useCallback } from 'react';
import { Upload, X, LogOut, Settings, Download, Info } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [autoFocus, setAutoFocus] = useState(true);
  const [exportState, setExportState] = useState({ state: 'idle', type: null });
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleExport = (type) => {
    setExportState({ state: 'processing', type });
    setTimeout(() => {
      setExportState({ state: 'complete', type });
      setTimeout(() => {
        setExportState({ state: 'idle', type: null });
        
        // Physically trigger a file download to the user's local disk
        const link = document.createElement('a');
        link.href = uploadedImage;
        // Downloading the mapped image
        link.download = `DepthLens_${type}_Render.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
      }, 2000);
    }, 4500);
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    } else {
      alert("Please upload a PNG or JPG file.");
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const onFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-gradient-to-br from-[#050505] to-[#111] border-t-2 border-[var(--color-neon)]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center glass-panel rounded-none shadow-md sticky top-0 z-40">
        <h1 className="text-2xl font-bold font-montserrat flex items-center">
          <span className="text-[var(--color-neon)] mr-2">Depth</span>Lens
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 shadow-inner">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            {/* Display user's username instead of email */}
            <span className="text-gray-300 text-sm hidden sm:inline-block font-semibold tracking-wide">
              @{user?.displayName || "Guest"}
            </span>
          </div>
          <button
            onClick={() => setShowLogoutAlert(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-montserrat mb-2">Workspace Studio</h2>
          <p className="text-gray-400 max-w-2xl">
            Upload your flat 2D photography to our intelligent pipeline. Our WebGL compiler handles the geometry extraction to synthesize immersive parallax depth maps perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Side Panel Tools */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-neon)] rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <Settings size={18} className="text-[var(--color-neon)]"/> Engine Tuning
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="flex justify-between text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
                    <span>Parallax Depth</span>
                    <span className="text-[var(--color-neon)]">75%</span>
                  </label>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-[var(--color-neon)] h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
                    <span>Edge Softness</span>
                    <span className="text-[var(--color-neon)]">High</span>
                  </label>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-[var(--color-neon)] h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className={`pt-4 border-t border-white/10 flex items-center justify-between ${!uploadedImage ? 'opacity-50 pointer-events-none' : ''}`}>
                  <span className="text-sm font-medium text-gray-300">Auto-Focus Layering</span>
                  <div 
                    onClick={() => setAutoFocus(!autoFocus)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 shadow-[0_0_10px_rgba(0,242,255,0.2)] ${autoFocus ? 'bg-[var(--color-neon)]/30' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-md transition-all duration-300 ${autoFocus ? 'bg-[var(--color-neon)] right-1' : 'bg-gray-400 left-1'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 shadow-xl relative overflow-hidden">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <Download size={18} className="text-[var(--color-neon)]"/> Export Module
              </h3>
              {uploadedImage ? (
                <>
                  <p className="text-xs text-gray-400 mb-4">Export capabilities are unlocked because a model is active.</p>
                  <button 
                    onClick={() => handleExport('WebGL')}
                    disabled={exportState.state !== 'idle'}
                    className="w-full py-2.5 mb-3 rounded-lg border border-[var(--color-neon)]/50 text-[var(--color-neon)] font-bold hover:bg-[var(--color-neon)] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {exportState.state === 'processing' && exportState.type === 'WebGL' ? 'Compiling Nodes...' : 'Compile WebGL Component'}
                  </button>
                  <button 
                    onClick={() => handleExport('MP4')}
                    disabled={exportState.state !== 'idle'}
                    className="w-full py-2.5 rounded-lg bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors border border-transparent hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {exportState.state === 'processing' && exportState.type === 'MP4' ? 'Rendering Frames...' : 'Export MP4 Cinematic'}
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500 opacity-60">
                  <Info size={24} className="mb-2" />
                  <p className="text-sm">Upload an image to unlock export operations.</p>
                </div>
              )}
            </div>
          </div>

          {/* Central 3D Canvas Panel */}
          <div className="lg:col-span-3">
            {!uploadedImage ? (
              <div
                className={`h-full min-h-[500px] border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center transition-all ${
                  isDragging 
                    ? 'border-[var(--color-neon)] bg-[var(--color-neon)]/10 scale-[1.01] shadow-[0_0_30px_rgba(0,242,255,0.15)]' 
                    : 'border-white/20 hover:border-white/40 bg-white/5'
                }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl transition-colors duration-500 ${isDragging ? 'bg-[var(--color-neon)] shadow-[var(--color-neon)]/50' : 'bg-gray-800 shadow-black/80'}`}>
                  <Upload size={40} className={isDragging ? 'text-black' : 'text-gray-400'} />
                </div>
                <h2 className="text-3xl font-bold mb-3 font-montserrat tracking-tight">Drag & Drop your image</h2>
                <p className="text-gray-400 mb-8 text-center max-w-sm text-lg">
                  Submit a native <strong className="text-white">JPG</strong> or <strong className="text-white">PNG</strong> to generate a 3D hologram matrix.
                </p>

                <label className="bg-white text-black px-8 py-3.5 rounded-full font-bold cursor-pointer hover:bg-[var(--color-neon)] hover:scale-105 transition-all outline-none">
                  Browse Device Files
                  <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={onFileChange} />
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-white/10 to-transparent p-4 rounded-xl border-l-[3px] border-[var(--color-neon)]">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-10 h-10 rounded-md bg-[var(--color-neon)]/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-neon)] animate-ping absolute"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--color-neon)] relative z-10"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide">3D Processed Engine Active</h4>
                      <p className="text-xs text-[var(--color-neon)] uppercase tracking-widest font-semibold mt-1">WebGL Sub-Routine Mounted</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 transition-all font-medium text-sm w-full sm:w-auto justify-center"
                  >
                    <X size={16} /> Terminate Process
                  </button>
                </div>

                {/* The 3D Render Canvas */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-[var(--color-neon)] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <ThreeCanvas imageUrl={uploadedImage} autoFocus={autoFocus} />
                </div>

                <div className="text-center text-sm font-medium tracking-wide text-gray-500 mt-6 glass-panel py-3 max-w-sm mx-auto">
                  Hover over the image boundary to trigger gyro logic.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="glass-panel p-8 max-w-sm w-full mx-4 shadow-2xl shadow-[var(--color-neon)]/10 relative border-[var(--color-neon)]/30 border">
            <h3 className="text-2xl font-bold mb-3 font-montserrat text-center">Confirm Logout</h3>
            <p className="text-gray-300 mb-8 text-center text-sm">
              Are you sure you want to end your session and leave the workspace?
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowLogoutAlert(false)}
                className="px-6 py-2.5 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-lg font-bold bg-[var(--color-neon)] text-black hover:bg-[#00d4ff] transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Processing UI */}
      {exportState.state === 'processing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 max-w-sm w-full mx-4 relative border-[var(--color-neon)] border shadow-[0_0_40px_rgba(0,242,255,0.2)] flex flex-col items-center text-center">
            <div className="w-16 h-16 border-4 border-white/10 border-t-[var(--color-neon)] rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold mb-2 font-montserrat">
              {exportState.type === 'WebGL' ? 'Packaging Scene...' : 'Rendering Export...'}
            </h3>
            <p className="text-gray-400 text-sm">Please do not close this window while the matrices are processed directly against your device GPU.</p>
          </div>
        </div>
      )}

      {/* Export Complete UI */}
      {exportState.state === 'complete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 max-w-sm w-full mx-4 shadow-2xl relative border-green-500/50 border bg-green-500/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-montserrat tracking-tight">Export Successful</h3>
            <p className="text-gray-400 text-sm">Readying payload protocol stream...</p>
          </div>
        </div>
      )}
    </div>
  );
}
