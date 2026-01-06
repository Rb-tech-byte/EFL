import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import MegaMenu from '@/Components/MegaMenu';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth, menuItems, settings } = usePage().props as any;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const systemSettings = settings?.system || {};
    const siteName = systemSettings.site_name || 'EDUCATIONFORLIBERTY';
    const siteLogo = systemSettings.site_logo;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Universities', href: '/universities' },
        { name: 'Programs', href: '/programs' },
        { name: 'Shop', href: '/shop' },
        { name: 'Blog', href: '/blog' },
        { name: 'Events', href: '/events' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-primary-200 selection:text-primary-900 bg-[#f8fafc]">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${scrolled ? 'h-20' : 'h-24'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-4 group">
                                {siteLogo ? (
                                    <img src={siteLogo} alt={siteName} className="h-10 w-auto object-contain" />
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 shadow-2xl group-hover:scale-110 transition-transform">
                                            <ApplicationLogo className="w-full h-full rounded-xl" />
                                        </div>
                                        <span className={`text-2xl font-black tracking-[0.2em] ${scrolled || true ? 'text-white' : 'text-gray-900'} transition-colors uppercase`}>
                                            ELF
                                        </span>
                                    </div>
                                )}
                            </Link>
                        </div>

                        {/* Desktop Menu - Mega Menu & Standard Links */}
                        <div className="hidden lg:flex items-center h-full mx-8 space-x-1">
                            <MegaMenu scrolled={true} menuItems={menuItems} dark={true} />

                            <Link href="/shop" className="px-4 py-2 text-sm font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                                Shop
                            </Link>
                            <Link href="/blog" className="px-4 py-2 text-sm font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                                Blog
                            </Link>
                            <Link href="/events" className="px-4 py-2 text-sm font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                                Events
                            </Link>
                        </div>

                        {/* Auth Buttons & Cart */}
                        <div className="hidden md:flex items-center space-x-6">
                            {/* Shopping Cart */}
                            <Link
                                href="/cart"
                                className="relative p-2.5 transition-all rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-xl"
                            >
                                {auth.cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full border-2 border-[#0f172a] text-[10px] text-white flex items-center justify-center font-black">
                                        {auth.cartCount}
                                    </span>
                                )}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </Link>

                            <div className="h-6 w-px bg-white/10"></div>

                            {auth.user ? (
                                <Link href="/dashboard" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95">
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login" className="text-xs font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="px-6 py-2.5 bg-white text-gray-900 hover:bg-gray-100 text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95">
                                        Join Now
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setMobileMenuOpen(false)}
                ></div>

                {/* Mobile Slide-out Drawer */}
                <div className={`lg:hidden fixed top-0 right-0 h-full w-[300px] bg-[#0f172a] z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out transform border-l border-white/5 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full p-8">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 shadow-lg">
                                    <ApplicationLogo className="w-full h-full rounded-lg" />
                                </div>
                                <span className="text-sm font-black text-white tracking-[0.2em] uppercase">ELF</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-grow space-y-2">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-center py-5 bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block w-full text-center py-5 text-xs font-black uppercase tracking-widest text-white border border-white/10 rounded-2xl"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block w-full text-center py-5 bg-white text-gray-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow pt-24">
                {children}
            </main>

            <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 shadow-2xl">
                                    <ApplicationLogo className="w-full h-full rounded-xl" />
                                </div>
                                <span className="text-2xl font-black tracking-[0.2em] text-white uppercase">ELF</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                Redefining global education through excellence and innovation. Join the elite community.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Icons placeholders */}
                                {[1, 2, 3, 4].map((i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-slate-400 hover:text-white">
                                        <div className="w-5 h-5 bg-current opacity-50 rounded-sm"></div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-white">Platform</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><Link href="/universities" className="hover:text-primary-400 transition-colors">Universities</Link></li>
                                <li><Link href="/programs" className="hover:text-primary-400 transition-colors">Degree Programs</Link></li>
                                <li><Link href="/short-courses" className="hover:text-primary-400 transition-colors">Short Courses</Link></li>
                                <li><Link href="/online-degrees" className="hover:text-primary-400 transition-colors">Online Degrees</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-white">Resources</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><Link href="/student-portal" className="hover:text-primary-400 transition-colors">Student Portal</Link></li>
                                <li><Link href="/success-center" className="hover:text-primary-400 transition-colors">Success Center</Link></li>
                                <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog & Stories</Link></li>
                                <li><Link href="/faq" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-white">Contact</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 block w-2 h-2 rounded-full bg-primary-500"></span>
                                    <span>123 Education Lane<br />Knowledge City, KC 12345</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="block w-2 h-2 rounded-full bg-primary-500"></span>
                                    <a href="mailto:hello@educationforliberty.com" className="hover:text-white transition">hello@efl.com</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="block w-2 h-2 rounded-full bg-primary-500"></span>
                                    <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} ELF. ALL RIGHTS RESERVED.</p>
                        <div className="flex space-x-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                            <Link href="/cookies" className="hover:text-white transition">Cookie Settings</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
