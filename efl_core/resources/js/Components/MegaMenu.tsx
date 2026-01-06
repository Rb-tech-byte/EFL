import { Link } from '@inertiajs/react';
import { useState, useRef } from 'react';

interface MenuLink {
    id: number;
    name: string;
    href: string;
    order: number;
}

interface MenuColumn {
    id: number;
    title: string;
    order: number;
    links: MenuLink[];
}

interface MenuItem {
    id: number;
    name: string;
    order: number;
    is_active: boolean;
    columns: MenuColumn[];
}

interface MegaMenuProps {
    scrolled: boolean;
    menuItems?: MenuItem[];
    dark?: boolean;
}

export default function MegaMenu({ scrolled, menuItems = [], dark = false }: MegaMenuProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (name: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(name);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 100);
    };

    // Filter active menu items
    const activeMenuItems = menuItems.filter(item => item.is_active);

    return (
        <div className="flex items-center h-full">
            {activeMenuItems.map((item) => (
                <div
                    key={item.id}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={`px-4 py-2 text-sm font-black uppercase tracking-widest transition-all duration-300 ${dark || scrolled
                                ? 'text-gray-300 hover:text-white'
                                : 'text-gray-900 hover:text-primary-600'
                            } ${activeMenu === item.name ? (dark || scrolled ? 'text-white' : 'text-primary-600') : ''}`}
                    >
                        {item.name}
                        {/* Underline animation */}
                        <span className={`absolute bottom-6 left-4 right-4 h-0.5 bg-primary-500 transition-all duration-300 origin-center ${activeMenu === item.name ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></span>
                    </button>

                    {/* Mega Menu Dropdown */}
                    {item.columns && item.columns.length > 0 && (
                        <div
                            className={`absolute top-[80%] left-0 w-[650px] bg-[#0f172a]/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] mt-4 p-10 border border-white/5 transition-all duration-500 origin-top z-50 transform ${activeMenu === item.name
                                    ? 'opacity-100 translate-y-0 visible scale-100'
                                    : 'opacity-0 translate-y-4 invisible scale-95'
                                }`}
                            style={{ marginLeft: '-150px' }}
                        >
                            <div className={`grid gap-10 ${item.columns.length === 1 ? 'grid-cols-1' : item.columns.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                {item.columns.map((col) => (
                                    <div key={col.id}>
                                        <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-6 px-1">{col.title}</h4>
                                        <ul className="space-y-4">
                                            {col.links && col.links.map((link) => (
                                                <li key={link.id}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-gray-300 hover:text-white text-sm font-bold transition-all flex items-center group gap-3"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary-500 group-hover:scale-150 transition-all"></span>
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {item.columns.length >= 2 && (
                                    <div className="col-span-1 p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between items-start group hover:bg-white/10 transition-all">
                                        <div>
                                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-3 block">Expert Advice</span>
                                            <h5 className="font-black text-white text-lg leading-tight mb-2">Academic Excellence awaits.</h5>
                                            <p className="text-xs text-gray-400 leading-relaxed font-bold">Book a free consultation session with our senior counselors.</p>
                                        </div>
                                        <Link href="/appointments" className="mt-6 text-xs font-black uppercase tracking-widest text-primary-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Book Now <span>→</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
