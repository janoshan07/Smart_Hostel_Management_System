import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../services/api';

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, setActiveTab }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Admin User', role: 'admin' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const loadUserFromStorage = () => {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    };

    useEffect(() => {
        loadUserFromStorage();
        // Listen for profile updates
        window.addEventListener('user-profile-updated', loadUserFromStorage);
        return () => {
            window.removeEventListener('user-profile-updated', loadUserFromStorage);
        };
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin-login');
    };

    return (
        <nav className="h-20 bg-white/78 backdrop-blur-xl border-b border-[rgba(18,32,31,0.08)] flex items-center justify-between px-6 md:px-8 z-40 sticky top-0 shadow-[0_10px_30px_rgba(18,32,31,0.06)]">
            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#60746f] hover:text-[#12201f] hover:bg-white rounded-lg transition-all"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block ml-4 md:ml-0">
                <div className="relative group flex items-center">
                    <Search className="absolute left-4 w-4 h-4 text-[#60746f] group-focus-within:text-[#287465] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search students, rooms, payments..."
                        className="w-full bg-white/90 border border-[#dbe5df] text-[#12201f] text-sm rounded-full pl-12 pr-4 py-2.5 outline-none focus:border-[#287465] transition-all placeholder:text-[#60746f] font-medium"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-5 ml-auto relative">
                <button className="relative p-2 rounded-full hover:bg-white text-[#60746f] hover:text-[#12201f] transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#287465] rounded-full ring-4 ring-white shadow-sm"></span>
                </button>
                
                <div className="flex items-center space-x-4 pl-5 border-l border-[#dbe5df] relative cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={dropdownRef}>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-[#12201f] tracking-wide">{user.name || 'Admin User'}</p>
                        <p className="text-xs text-[#287465] font-medium uppercase tracking-widest">{user.role || 'Admin'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#287465]/10 border border-[#287465]/20 flex items-center justify-center text-[#287465] shadow-inner overflow-hidden hover:ring-2 hover:ring-[#287465]/40 transition-all">
                        {user.profilePic ? (
                            <img src={user.profilePic.startsWith('data:image') || user.profilePic.startsWith('http') ? user.profilePic : `${BACKEND_URL}${user.profilePic}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-bold">{user.name ? user.name.charAt(0).toUpperCase() : 'A'}</span>
                        )}
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 border border-[#dbe5df] rounded-xl shadow-2xl py-2 z-50 animate-fade-in origin-top-right">
                            <div className="px-4 py-3 border-b border-[#dbe5df] mb-1">
                                <p className="text-sm font-semibold text-[#12201f] truncate">{user.name}</p>
                                <p className="text-xs text-[#60746f] truncate">{user.email || 'Admin'}</p>
                            </div>
                            
                            <button 
                                onClick={() => { setActiveTab('Profile'); setIsDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-[#60746f] hover:bg-[#287465]/10 hover:text-[#287465] flex items-center gap-3 transition-colors"
                            >
                                <User className="w-4 h-4" /> View Profile
                            </button>
                            
                            <button 
                                onClick={() => { setActiveTab('Profile'); setIsDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-[#60746f] hover:bg-[#287465]/10 hover:text-[#287465] flex items-center gap-3 transition-colors"
                            >
                                <Settings className="w-4 h-4" /> Edit Profile
                            </button>

                            <div className="h-px bg-[#dbe5df] my-1"></div>

                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-3 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
