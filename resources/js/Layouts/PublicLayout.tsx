import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import MegaMenu from '@/Components/MegaMenu';

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
        { name: 'Services', href: '/services' },
        { name: 'Stories', href: '/stories' },
        { name: 'Events', href: '/events' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-primary-200 selection:text-primary-900 bg-gray-50">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass h-20' : 'bg-transparent h-24'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                {siteLogo ? (
                                    <img src={siteLogo} alt={siteName} className="h-10 w-auto object-contain" />
                                ) : (
                                    <span className={`text-2xl font-display font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'} transition-colors`}>
                                        {siteName}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Desktop Menu - Mega Menu */}
                        <div className="hidden md:flex items-center h-full mx-8">
                            <MegaMenu scrolled={scrolled} menuItems={menuItems} />
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {auth.user ? (
                                <Link href="/dashboard" className="btn-primary">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="btn-primary">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-600 hover:text-primary-600 focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'}`}>
                    <div className="px-4 space-y-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                            {auth.user ? (
                                <Link href="/dashboard" className="col-span-2 text-center btn-primary">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-center px-4 py-2 text-gray-700 font-semibold border border-gray-200 rounded-full hover:bg-gray-50">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="text-center btn-primary">
                                        Sign up
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
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                                    E
                                </div>
                                <span className="text-xl font-display font-bold">EducationForLiberty</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Empowering the next generation of leaders through accessible, world-class education and global opportunities.
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
                        <p className="text-slate-500 text-xs">© {new Date().getFullYear()} EducationForLiberty. All rights reserved.</p>
                        <div className="flex space-x-6 text-slate-500 text-xs">
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
