import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';

export default function Cart({ cart, total, discount, finalTotal, coupon }: any) {
    const { auth } = usePage().props as any;

    const AdaptiveLayout = ({ children, header }: any) => {
        if (auth.user) {
            return <AuthenticatedLayout header={header}>{children}</AuthenticatedLayout>;
        }
        return <PublicLayout>{children}</PublicLayout>;
    };

    const [couponCode, setCouponCode] = useState('');

    const removeFromCart = (id: number) => {
        router.delete(`/cart/${id}`);
    };

    const applyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/cart/coupon', { code: couponCode });
    };

    const removeCoupon = () => {
        router.delete('/cart/coupon');
    };

    const cartItems = Object.values(cart);

    return (
        <AdaptiveLayout header="Shopping Cart">
            <Head title="Shopping Cart" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">You have {cartItems.length} items in your cart</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center gap-6">
                                    <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        {item.cover ? (
                                            <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase">
                                                {item.title.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">by {item.author}</p>
                                        <div className="flex items-center gap-4">
                                            <Link href={`/shop/${item.slug}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">View Item</Link>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">{item.formatted_price}</p>
                                    </div>
                                </div>
                            ))}

                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold mt-4"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">${Number(total).toFixed(2)}</span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <div className="flex items-center gap-2">
                                                <span>Discount</span>
                                                <button onClick={removeCoupon} className="text-[10px] bg-red-50 text-red-500 px-1 rounded hover:bg-red-100 transition-colors">Remove</button>
                                            </div>
                                            <span className="font-medium">-${Number(discount).toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-lg font-bold">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-primary-600">${Number(finalTotal).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Coupon Form */}
                                {!coupon ? (
                                    <form onSubmit={applyCoupon} className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Have a coupon?</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={e => setCouponCode(e.target.value)}
                                                placeholder="Enter code"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-green-600 font-bold uppercase">Coupon Applied</p>
                                            <p className="text-sm font-bold text-green-800">{coupon.code}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-green-600 font-bold">-{coupon.type === 'percentage' ? coupon.value + '%' : '$' + coupon.value}</p>
                                        </div>
                                    </div>
                                )}

                                <Link
                                    href="/checkout"
                                    className="w-full block py-4 bg-primary-600 text-white text-center rounded-xl font-bold text-lg hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                    </svg>
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.87-.25-3.35-1.13-3.95-2.07l1.45-1.11c.41.67 1.35 1.41 2.5 1.41 1.25 0 1.83-.56 1.83-1.13 0-.58-.45-.98-1.57-1.37-1.87-.63-3.6-1.55-3.6-3.76 0-1.81 1.15-3.13 2.92-3.48V5h2.82v1.89c1.47.22 2.76 1.05 3.32 1.81l-1.39 1.13c-.34-.52-1.03-1.07-1.93-1.07-1.13 0-1.55.56-1.55 1.11 0 .54.52.88 1.62 1.25 2.12.75 3.51 1.76 3.51 3.86 0 1.94-1.3 2.99-3.11 3.24z" />
                                    </svg>
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-10 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </AdaptiveLayout>
    );
}
