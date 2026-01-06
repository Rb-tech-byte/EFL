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
}

export default function MegaMenu({ scrolled, menuItems = [] }: MegaMenuProps) {
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
                        className={`px-4 py-2 font-medium text-sm tracking-wide transition-colors ${scrolled ? 'text-gray-800 hover:text-primary-600' : 'text-gray-900 hover:text-primary-600'
                            } ${activeMenu === item.name ? 'text-primary-600' : ''}`}
                    >
                        {item.name}
                        {/* Underline animation */}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transition-transform duration-300 origin-left ${activeMenu === item.name ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </button>

                    {/* Mega Menu Dropdown */}
                    {item.columns && item.columns.length > 0 && (
                        <div
                            className={`absolute top-full left-0 w-[600px] bg-white rounded-xl shadow-xl mt-4 p-8 border border-gray-100 transition-all duration-300 origin-top-left z-50 transform ${activeMenu === item.name
                                ? 'opacity-100 translate-y-0 visible'
                                : 'opacity-0 translate-y-2 invisible'
                                }`}
                            style={{ marginLeft: '-100px' }}
                        >
                            {/* Triangle/Arrow pointing up */}
                            <div className="absolute -top-2 left-[120px] w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                            <div className={`grid gap-8 ${item.columns.length === 1 ? 'grid-cols-1' : item.columns.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                {item.columns.map((col) => (
                                    <div key={col.id}>
                                        <h4 className="font-display font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">{col.title}</h4>
                                        <ul className="space-y-3">
                                            {col.links && col.links.map((link) => (
                                                <li key={link.id}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-gray-600 hover:text-primary-600 text-sm transition-colors flex items-center group"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-primary-500 transition-colors"></span>
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {/* Promo Card (Optional, for the last column or extra space) */}
                                {item.columns.length >= 2 && (
                                    <div className="col-span-1 bg-gray-50 rounded-lg p-4 flex flex-col justify-end items-start group cursor-pointer hover:bg-primary-50 transition-colors">
                                        <span className="text-xs font-bold text-primary-600 uppercase mb-2">Featured</span>
                                        <h5 className="font-bold text-gray-900 mb-1 group-hover:text-primary-700">Explore Campus Life</h5>
                                        <p className="text-xs text-gray-500 mb-3">See what it's really like to study abroad.</p>
                                        <Link href="/stories" className="text-xs font-semibold text-primary-600 flex items-center">
                                            Read Stories <span className="ml-1">→</span>
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
