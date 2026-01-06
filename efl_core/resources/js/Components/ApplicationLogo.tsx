import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="24" fill="url(#logo-gradient)" />
            <path
                d="M30 35H70V45H30V35ZM30 50H70V60H30V50ZM30 65H55V75H30V65Z"
                fill="white"
                fillOpacity="0.3"
            />
            <text
                x="50"
                y="65"
                fill="white"
                fontSize="38"
                fontWeight="900"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{ letterSpacing: '-0.05em' }}
            >
                ELF
            </text>
        </svg>
    );
}
