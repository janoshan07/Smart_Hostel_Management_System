import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    BedDouble,
    Bell,
    Building2,
    CheckCircle2,
    ChevronRight,
    Clock3,
    CreditCard,
    Headphones,
    MessageSquareText,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    Wifi,
} from 'lucide-react';

const stats = [
    { value: '98%', label: 'Room allocation clarity' },
    { value: '24/7', label: 'Student support flow' },
    { value: '12k+', label: 'Managed hostel records' },
];

const features = [
    {
        icon: BedDouble,
        title: 'Room Booking',
        copy: 'Browse availability, reserve spaces, and keep every allocation update easy to follow.',
    },
    {
        icon: MessageSquareText,
        title: 'Complaint Care',
        copy: 'Raise maintenance or service tickets with cleaner tracking from request to resolution.',
    },
    {
        icon: CreditCard,
        title: 'Payments',
        copy: 'Manage invoices, payment history, and bank transfer verification in one connected flow.',
    },
];

const workflow = [
    { title: 'Register', copy: 'Create a student profile with verified hostel details.' },
    { title: 'Reserve', copy: 'Find rooms and follow booking status from a focused dashboard.' },
    { title: 'Manage', copy: 'Track notices, payments, complaints, and room updates daily.' },
];

const Home = () => {
    return (
        <main className="min-h-screen w-full overflow-hidden bg-[#f6f7f4] text-[#12201f]">
            <section className="relative min-h-screen px-5 py-5 sm:px-8 lg:px-10">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(41,121,106,0.24),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(233,167,82,0.22),transparent_26%),linear-gradient(135deg,#f6f7f4_0%,#eef3ee_48%,#dfeae5_100%)]"
                    aria-hidden="true"
                />
                <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col rounded-[28px] border border-white/80 bg-white/50 shadow-[0_30px_90px_rgba(18,32,31,0.14)] backdrop-blur-xl">
                    <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7 lg:px-9">
                        <Link to="/" className="flex items-center gap-3 text-[#12201f] no-underline">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(18,32,31,0.12)]">
                                <img src="/Logo.png" alt="UNINEST" className="h-9 w-9 object-contain" />
                            </span>
                            <span className="text-lg font-black tracking-[0.16em]">UNINEST</span>
                        </Link>

                        <nav className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/70 p-1 text-sm font-semibold text-[#49605d] shadow-sm md:flex">
                            <a href="#features" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Features</a>
                            <a href="#experience" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Experience</a>
                            <Link to="/admin-login" className="rounded-full px-4 py-2 transition hover:bg-[#12201f] hover:text-white">Admin</Link>
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link to="/login" className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#12201f] transition hover:bg-white sm:inline-flex">
                                Login
                            </Link>
                            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#12201f] px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(18,32,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[#1f3835]">
                                Register
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </header>

                    <div className="grid flex-1 items-center gap-10 px-5 pb-8 pt-6 sm:px-7 lg:grid-cols-[1.02fr_0.98fr] lg:px-9 lg:pb-10 lg:pt-4">
                        <div className="max-w-3xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3 py-2 text-sm font-bold text-[#287465] shadow-sm">
                                <Sparkles size={16} />
                                Premium hostel management for modern campuses
                            </div>
                            <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-normal text-[#12201f] sm:text-6xl lg:text-7xl">
                                Smart living, managed with calm precision.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#49605d]">
                                UNINEST brings student rooms, notices, support, invoices, and admin operations into a polished digital home built for speed and clarity.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#287465] px-6 py-4 text-sm font-black text-white shadow-[0_18px_36px_rgba(40,116,101,0.28)] transition hover:-translate-y-0.5 hover:bg-[#1f6054]">
                                    Start as Student
                                    <ChevronRight size={18} />
                                </Link>
                                <Link to="/admin-login" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfdad4] bg-white/80 px-6 py-4 text-sm font-black text-[#12201f] transition hover:-translate-y-0.5 hover:border-[#12201f]">
                                    Admin Portal
                                    <ShieldCheck size={18} />
                                </Link>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm">
                                        <p className="text-2xl font-black text-[#12201f]">{item.value}</p>
                                        <p className="mt-1 text-xs font-semibold leading-5 text-[#657873]">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative min-h-[520px] lg:min-h-[620px]">
                            <div className="absolute left-2 top-2 h-28 w-28 rounded-full bg-[#e9a752]/30 blur-2xl" aria-hidden="true" />
                            <div className="absolute bottom-8 right-0 h-36 w-36 rounded-full bg-[#287465]/20 blur-2xl" aria-hidden="true" />

                            <div className="relative ml-auto flex h-full max-w-[560px] flex-col justify-between overflow-hidden rounded-[26px] border border-[#d9e3df] bg-[#10201f] p-4 shadow-[0_34px_80px_rgba(18,32,31,0.32)]">
                                <div className="rounded-[22px] bg-[linear-gradient(140deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-bold text-[#9ed4c8]">Live Residence View</p>
                                            <h2 className="mt-2 text-2xl font-black text-white">North Wing</h2>
                                        </div>
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#12201f]">
                                            <Building2 size={24} />
                                        </span>
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        {['A1', 'A2', 'B4', 'C1', 'C5', 'D2'].map((room, index) => (
                                            <div
                                                key={room}
                                                className={`h-24 rounded-2xl border p-3 ${
                                                    index === 1 || index === 4
                                                        ? 'border-[#e9a752]/50 bg-[#e9a752]/20'
                                                        : 'border-white/10 bg-white/10'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between text-xs font-bold text-white/70">
                                                    <span>{room}</span>
                                                    <Wifi size={14} />
                                                </div>
                                                <div className="mt-7 h-2 rounded-full bg-white/10">
                                                    <div className={`h-full rounded-full ${index === 1 || index === 4 ? 'w-2/3 bg-[#e9a752]' : 'w-1/3 bg-[#73d8c1]'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                                    <div className="rounded-[22px] bg-white p-5 text-[#12201f]">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-black">Today</p>
                                            <Clock3 size={18} className="text-[#287465]" />
                                        </div>
                                        <p className="mt-5 text-4xl font-black">42</p>
                                        <p className="mt-2 text-sm font-semibold text-[#657873]">resolved service updates</p>
                                    </div>

                                    <div className="rounded-[22px] border border-white/10 bg-white/10 p-5">
                                        <p className="text-sm font-bold text-[#9ed4c8]">Priority Queue</p>
                                        <div className="mt-4 space-y-3">
                                            {[
                                                ['Payment review', CreditCard],
                                                ['Notice published', Bell],
                                                ['Support reply', Headphones],
                                            ].map(([label, Icon]) => (
                                                <div key={label} className="flex items-center gap-3 text-sm font-bold text-white">
                                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                                        <Icon size={17} />
                                                    </span>
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="bg-[#f6f7f4] px-5 py-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#287465]">Campus operations</p>
                            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#12201f] sm:text-5xl">
                                A cleaner command center for hostel life.
                            </h2>
                        </div>
                        <p className="max-w-xl text-base leading-7 text-[#60746f]">
                            The home page now presents UNINEST as a focused system for students and administrators, with clear entry points and a premium interface language.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {features.map(({ icon: Icon, title, copy }) => (
                            <article key={title} className="group rounded-[22px] border border-[#dbe5df] bg-white p-6 shadow-[0_18px_50px_rgba(18,32,31,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(18,32,31,0.12)]">
                                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#edf6f2] text-[#287465] transition group-hover:bg-[#287465] group-hover:text-white">
                                    <Icon size={25} />
                                </span>
                                <h3 className="mt-7 text-2xl font-black text-[#12201f]">{title}</h3>
                                <p className="mt-4 text-base leading-7 text-[#60746f]">{copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" className="bg-[#12201f] px-5 py-20 text-white sm:px-8 lg:px-10">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e9c07d]">Student journey</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                            From registration to daily living, every step feels intentional.
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                            A sharper home page gives students confidence before they sign in and gives admins a stronger platform impression from the first screen.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {['Secure access', 'Fast notices', 'Payment clarity', 'Support tracking'].map((item) => (
                                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-bold text-white/85">
                                    <CheckCircle2 size={16} className="text-[#9ed4c8]" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {workflow.map((item, index) => (
                            <article key={item.title} className="rounded-[22px] border border-white/10 bg-white/[0.06] p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#12201f]">
                                    <span className="text-lg font-black">{index + 1}</span>
                                </div>
                                <h3 className="mt-10 text-2xl font-black">{item.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-white/65">{item.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f6f7f4] px-5 py-20 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl rounded-[28px] border border-[#dbe5df] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(18,32,31,0.1)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e9a752]/20 text-[#a86618]">
                            <Star size={26} />
                        </span>
                        <div>
                            <h2 className="text-3xl font-black text-[#12201f]">Ready for a smarter hostel experience?</h2>
                            <p className="mt-3 max-w-2xl text-base leading-7 text-[#60746f]">
                                Choose the right portal and move straight into the system.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                        <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12201f] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#287465]">
                            Student Register
                            <Users size={18} />
                        </Link>
                        <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfdad4] px-6 py-4 text-sm font-black text-[#12201f] transition hover:-translate-y-0.5 hover:border-[#12201f]">
                            Student Login
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="bg-[#0d1716] px-5 py-10 text-white sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/Logo.png" alt="UNINEST" className="h-10 w-10 rounded-xl object-contain" />
                        <div>
                            <p className="text-base font-black tracking-[0.16em]">UNINEST</p>
                            <p className="text-sm text-white/55">Smart Hostel Management System</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm font-bold text-white/70">
                        <Link to="/login" className="transition hover:text-white">Login</Link>
                        <Link to="/signup" className="transition hover:text-white">Register</Link>
                        <Link to="/admin-login" className="transition hover:text-white">Admin Area</Link>
                    </div>
                    <p className="text-sm font-semibold text-white/45">Copyright {new Date().getFullYear()} UNINEST. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
};

export default Home;
