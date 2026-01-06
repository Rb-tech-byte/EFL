import { ReactNode } from 'react';

const variants = {
    gray: 'bg-gray-100 text-gray-700',
    red: 'bg-red-50 text-red-700 border border-red-100',
    yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
    green: 'bg-green-50 text-green-700 border border-green-100',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    purple: 'bg-purple-50 text-purple-700 border border-purple-100',
    pink: 'bg-pink-50 text-pink-700 border border-pink-100',
    orange: 'bg-orange-50 text-orange-700 border border-orange-100',
};

type BadgeVariant = keyof typeof variants;

export default function Badge({
    children,
    variant = 'gray',
    className = ''
}: {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
