import React from 'react';
import { LayoutDashboard, Users, DoorOpen, Headset, LogOut, CheckSquare, Bell, CreditCard, FileText, BarChart3, Tag } from 'lucide-react';
import logo from '../../assets/logo.png';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin-login';
    };

    const navItems = [
        { id: 'Dashboard',      icon: LayoutDashboard },
        { id: 'Students',       icon: Users },
        { id: 'Rooms',          icon: DoorOpen },
        { id: 'Support Service', icon: Headset },
        { id: 'Allocations',    icon: CheckSquare },
        { id: 'Notices',        icon: Bell },
        { id: 'Billing',        icon: CreditCard },
        { id: 'Invoices',       icon: FileText },
        { id: 'Reports',        icon: BarChart3 },
        { id: 'Discounts',      icon: Tag },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <aside className={`w-64 bg-white/80 backdrop-blur-xl border-r border-[rgba(18,32,31,0.08)] shadow-[18px_0_50px_rgba(18,32,31,0.08)] flex flex-col h-full fixed md:sticky top-0 z-50 transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                <div className="flex flex-col items-center justify-center pt-8 pb-6 border-b border-[rgba(18,32,31,0.08)] px-6 group cursor-pointer">
                    <img src={logo} alt="UNINEST Logo" className="h-16 w-16 object-contain mb-4 drop-shadow-[0_10px_24px_rgba(40,116,101,0.18)] transform transition-transform duration-300 group-hover:scale-105 mx-auto" />
                    <h2 className="text-xl font-extrabold text-[#12201f] tracking-[0.16em] text-center transform transition-all duration-300 group-hover:scale-105">
                        UNINEST
                    </h2>
                    <p className="text-xs text-[#60746f] font-medium tracking-wide mt-1 text-center">Management System</p>
                </div>
            
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                <p className="text-xs font-extrabold text-[#60746f] uppercase tracking-widest mb-4 px-2">Main Menu</p>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            activeTab === item.id 
                            ? 'bg-[#287465] text-white font-semibold shadow-[0_14px_30px_rgba(40,116,101,0.22)]' 
                            : 'text-[#60746f] hover:bg-white hover:text-[#12201f] font-medium'
                        }`}
                    >
                        <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-[#60746f]'}`} />
                        <span>{item.id}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-[rgba(18,32,31,0.08)] mt-auto bg-white/50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
        </>
    );
};

export default Sidebar;
