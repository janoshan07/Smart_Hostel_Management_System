import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import API from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await API.post('/auth/login', { email, password });
            
            if (res.data.user.role !== 'Student') {
                setError('Access denied. Admin accounts please use the Admin Portal.');
                setIsLoading(false);
                return;
            }

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.msg || 'Invalid credentials or API server unavailable');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500/30 font-sans text-slate-100">
            <style>{`
                .auth-header-btn {
                    color: #ffffff !important;
                }
                .auth-header-btn:hover {
                    color: #ffffff !important;
                }
            `}</style>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-7 lg:px-9 mx-auto w-full max-w-7xl">
                <Link to="/" className="flex items-center gap-3 text-[#12201f] no-underline">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(18,32,31,0.08)] border border-slate-100">
                        <img src="/Logo.png" alt="UNINEST" className="h-9 w-9 object-contain" />
                    </span>
                    <span className="text-lg font-black tracking-[0.16em] text-[#12201f]">UNINEST</span>
                </Link>

                <nav className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/70 p-1 text-sm font-semibold text-[#49605d] shadow-sm md:flex">
                    <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Home</Link>
                    <a href="/#features" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Features</a>
                    <Link to="/admin-login" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Admin</Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Link to="/signup" className="auth-header-btn inline-flex items-center gap-2 rounded-full bg-[#12201f] px-4 py-2.5 text-sm font-bold shadow-[0_12px_30px_rgba(18,32,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[#1f3835]">
                        Register
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </header>

            {/* Main Content (Centered Form Card) */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12">
                <div className="w-full max-w-6xl bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-800/60 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row">

                
                {/* Left Branding Panel */}
                <div className="hidden md:flex w-2/5 relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/80 border-r border-slate-800/50">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg text-white font-bold text-xl mb-6">
                            UNINEST STUDENT PORTAL
                        </div>
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight mb-4">
                            Welcome back.
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Log in to your student portal to access rooms, notices, and billing.
                        </p>
                    </div>

                    <div className="relative z-10">
                         <div className="p-6 rounded-2xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 shadow-xl">
                            <p className="text-slate-300 italic mb-4">"The fastest way to manage accommodation operations effortlessly."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                                <div>
                                    <p className="text-white text-sm font-bold">Admin Team</p>
                                    <p className="text-slate-500 text-xs">University Housing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="w-full md:w-3/5 p-8 sm:p-12 relative flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10 flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logo} alt="HostelPro Logo" className="h-16 sm:h-20 md:h-24 w-auto max-w-full object-contain mb-8 drop-shadow-[0_10px_15px_rgba(99,102,241,0.25)] mx-auto md:mx-0 transform transition-transform duration-500 group-hover:scale-105" />
                            <h1 className="text-3xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-300">Student Portal</h1>
                            <p className="text-slate-400">Log in to manage your hostel stay.</p>
                        </div>

                        {error && (
                            <div className="mb-6 px-4 py-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center text-rose-400 animate-fade-in shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Email Input */}
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className={`text-xs font-semibold uppercase tracking-wider ${focusedField === 'email' ? 'text-indigo-400' : 'text-slate-400'} transition-colors pl-1`}>
                                    Student Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className={`w-5 h-5 ${focusedField === 'email' ? 'text-indigo-400' : 'text-slate-500'} transition-colors`} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="student@abc.edu"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className={`w-full bg-slate-800/50 text-slate-100 rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-300 border border-slate-700/50 focus:border-indigo-500/80 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-slate-600 backdrop-blur-sm`}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className={`text-xs font-semibold uppercase tracking-wider ${focusedField === 'password' ? 'text-indigo-400' : 'text-slate-400'} transition-colors pl-1`}>
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className={`w-5 h-5 ${focusedField === 'password' ? 'text-indigo-400' : 'text-slate-500'} transition-colors`} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className={`w-full bg-slate-800/50 text-slate-100 rounded-xl pl-10 pr-10 py-3 outline-none transition-all duration-300 border border-slate-700/50 focus:border-indigo-500/80 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-slate-600 backdrop-blur-sm`}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                    </button>
                                </div>
                            </div>

                            {/* Extra UX */}
                            <div className="flex items-center justify-between mt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500/50 focus:ring-offset-0 bg-slate-800"
                                    />
                                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                </label>
                                
                                <button type="button" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors hover:underline underline-offset-4">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-indigo-500/50 disabled:to-indigo-600/50 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all active:scale-[0.98] disabled:active:scale-100"
                            >
                                {isLoading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                                ) : (
                                    <><span className="tracking-wide">Sign In</span> <ArrowRight className="w-5 h-5 ml-1 inline" /></>
                                )}
                            </button>
                            
                            {/* Links */}
                            <div className="flex flex-col gap-3 text-center text-sm mt-8 pt-6 border-t border-slate-800/50">
                                <p className="text-slate-400">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline-offset-4 hover:underline">
                                        Register Now
                                    </Link>
                                </p>
                                <Link to="/admin-login" className="text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-slate-500">
                                    Switch to Admin Portal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            
            {/* Footer */}
            <footer className="relative z-10 bg-[#0d1716] px-5 py-8 text-white sm:px-8 lg:px-10 mt-auto">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/Logo.png" alt="UNINEST" className="h-10 w-10 rounded-xl object-contain bg-white/10 p-0.5" />
                        <div>
                            <p className="text-base font-black tracking-[0.16em]">UNINEST</p>
                            <p className="text-xs text-white/55 font-medium">Smart Hostel Management System</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-bold text-white/70">
                        <Link to="/" className="transition hover:text-white">Home</Link>
                        <Link to="/login" className="transition hover:text-white">Login</Link>
                        <Link to="/signup" className="transition hover:text-white">Register</Link>
                        <Link to="/admin-login" className="transition hover:text-white">Admin Area</Link>
                    </div>
                    <p className="text-xs font-semibold text-white/45">Copyright {new Date().getFullYear()} UNINEST. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
