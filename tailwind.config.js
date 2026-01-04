import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#eefcfb',
                    100: '#d5f5f4',
                    200: '#afece9',
                    300: '#7ddedb',
                    400: '#4bc7c5',
                    500: '#2c9c9b',
                    600: '#227f7f',
                    700: '#1e6667',
                    800: '#1d5253',
                    900: '#1a4546',
                    950: '#0d2829',
                },
                secondary: {
                    50: '#fffaf0',
                    100: '#feebc8',
                    200: '#fbd38d',
                    300: '#f6ad55',
                    400: '#ed8936',
                    500: '#dd6b20', // Burnt Orange
                    600: '#c05621',
                    700: '#9c4221',
                    800: '#7b341e',
                    900: '#652b19',
                    950: '#43190f',
                },
                accent: {
                    500: '#f6ad55', // Gold/Orange for highlighs
                    600: '#ed8936',
                }
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },

    plugins: [forms, require('@tailwindcss/typography')],
};
