import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 -z-10"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-200 blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-200 blur-3xl opacity-40 animate-pulse delay-700"></div>

            <div className="mb-6 relative z-10">
                <Link href="/" className="flex flex-col items-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        E
                    </div>
                    <span className="mt-3 text-2xl font-display font-bold text-gray-900">EducationForLiberty</span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-8 py-8 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl relative z-10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {children}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 relative z-10">
                &copy; {new Date().getFullYear()} EducationForLiberty. All rights reserved.
            </div>
        </div>
    );
}
