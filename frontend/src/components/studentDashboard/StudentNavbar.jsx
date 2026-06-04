import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../services/api';

const StudentNavbar = ({ profile }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const studentName = profile?.firstName ? `${profile.firstName} ${profile.lastName}` : 'Student Name';
    const firstInitial = profile?.firstName?.[0] || 'S';

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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="h-20 bg-white/78 backdrop-blur-xl border-b border-[rgba(18,32,31,0.08)] flex items-center justify-between px-6 z-40 relative shadow-[0_10px_30px_rgba(18,32,31,0.06)] w-full shrink-0">
            <div className="flex items-center">
               {/* <h2 className="text-xl font-extrabold text-[#12201f] tracking-[0.16em] hidden sm:block">
                    UNINEST
                </h2>*/}
            </div>

            <div className="flex-1 max-w-xl mx-auto ml-4 sm:ml-6 hidden md:block">
                <div className="relative group flex items-center">
                    <Search className="absolute left-4 w-4 h-4 text-[#60746f] group-focus-within:text-[#287465] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search notices, payments..."
                        className="w-full bg-white/90 border border-[#dbe5df] text-[#12201f] text-sm rounded-full pl-12 pr-4 py-2.5 outline-none focus:border-[#287465] transition-all placeholder:text-[#60746f] font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-5 ml-auto relative">
                <button className="relative p-2 rounded-full hover:bg-white text-[#60746f] hover:text-[#12201f] transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#287465] rounded-full ring-4 ring-white shadow-sm"></span>
                </button>
                
                <div className="flex items-center space-x-4 pl-5 border-l border-[#dbe5df] relative cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={dropdownRef}>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-[#12201f] tracking-wide">{studentName}</p>
                        <p className="text-xs text-[#287465] font-medium uppercase tracking-widest">STUDENT</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#287465]/10 border border-[#287465]/20 flex items-center justify-center text-[#287465] shadow-inner overflow-hidden hover:ring-2 hover:ring-[#287465]/40 transition-all">
                        {profile?.profilePic ? (
                            <img src={profile.profilePic.startsWith('data:image') || profile.profilePic.startsWith('http') ? profile.profilePic : `${BACKEND_URL}${profile.profilePic}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-bold text-lg">{firstInitial}</span>
                        )}
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 border border-[#dbe5df] rounded-xl shadow-2xl py-2 z-50 animate-fade-in origin-top-right text-left">
                            <div className="px-4 py-3 border-b border-[#dbe5df] mb-1">
                                <p className="text-sm font-semibold text-[#12201f] truncate">{studentName}</p>
                                <p className="text-xs text-[#60746f] truncate">{profile?.userId?.email || 'Student'}</p>
                            </div>
                            
                            <button 
                                onClick={() => { navigate('/student/profile'); setIsDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-[#60746f] hover:bg-[#287465]/10 hover:text-[#287465] flex items-center gap-3 transition-colors"
                            >
                                <User className="w-4 h-4" /> View Profile
                            </button>
                            
                            <button 
                                onClick={() => { navigate('/student/profile?edit=true'); setIsDropdownOpen(false); }}
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
export default StudentNavbar;
