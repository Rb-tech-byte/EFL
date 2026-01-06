import { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-100 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <h3 className={`text-lg font-bold text-slate-800 ${className}`}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}
