import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Checkout({ cart, coupon }: any) {
    const cartItems = Object.values(cart);
    const subtotal = cartItems.reduce((acc: number, item: any) => acc + Number(item.price), 0);

    let discount = 0;
    if (coupon) {
        const couponValue = Number(coupon.value);
        if (coupon.type === 'percentage') {
            discount = (subtotal * couponValue) / 100;
        } else {
            discount = couponValue;
        }
    }

    const finalTotal = Math.max(0, subtotal - discount);

    const { data, setData, post, processing, errors } = useForm({
        payment_method: 'pesapal',
        billing_address: '',
        city: '',
        country: 'United States',
        postal_code: '',
        coupon_code: coupon ? coupon.code : '',
    });

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we have multiple items, we might need a Bulk Purchase method or handle it in a loop
        // Standard practice is to have a single "Order" with multiple "OrderItem"
        router.post('/shop/purchase', {
            ...data,
            cart: cartItems.map((item: any) => item.id), // Sending all IDs
        });
    };

    return (
        <AuthenticatedLayout header="Checkout">
            <Head title="Checkout" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order to access your books immediately.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleCheckout} className="space-y-6">
                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">1</span>
                                    Payment Method
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${data.payment_method === 'pesapal' ? 'border-primary-600 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="pesapal"
                                            checked={data.payment_method === 'pesapal'}
                                            onChange={e => setData('payment_method', e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="w-12 h-8 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden">
                                            <span className="text-[8px] font-black text-white bg-orange-500 w-full h-full flex items-center justify-center">PESAPAL</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Pesapal</p>
                                            <p className="text-xs text-gray-500">Mobile Money & Card (Kenya/East Africa)</p>
                                        </div>
                                        {data.payment_method === 'pesapal' && (
                                            <div className="absolute top-2 right-2 text-primary-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </label>

                                    <label className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${data.payment_method === 'stripe' ? 'border-primary-600 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="stripe"
                                            checked={data.payment_method === 'stripe'}
                                            onChange={e => setData('payment_method', e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="w-12 h-8 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
                                            <span className="text-[10px] font-black text-blue-600 italic">Stripe</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Card</p>
                                            <p className="text-xs text-gray-500">International Credit/Debit Card</p>
                                        </div>
                                        {data.payment_method === 'stripe' && (
                                            <div className="absolute top-2 right-2 text-primary-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </label>

                                    <label className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${data.payment_method === 'paypal' ? 'border-primary-600 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={data.payment_method === 'paypal'}
                                            onChange={e => setData('payment_method', e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="w-12 h-8 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
                                            <span className="text-[10px] font-black text-blue-800 italic">PayPal</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">PayPal</p>
                                            <p className="text-xs text-gray-500">Fast and secure with PayPal</p>
                                        </div>
                                        {data.payment_method === 'paypal' && (
                                            <div className="absolute top-2 right-2 text-primary-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">2</span>
                                    Billing Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                        <input
                                            type="text"
                                            value={data.billing_address}
                                            onChange={e => setData('billing_address', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            placeholder="123 Street Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                                        <select
                                            value={data.country}
                                            onChange={e => setData('country', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            required
                                        >
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Canada">Canada</option>
                                            {/* Add more countries */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            value={data.postal_code}
                                            onChange={e => setData('postal_code', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            placeholder="Postal Code"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold text-xl hover:bg-primary-700 shadow-xl shadow-primary-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Complete Purchase - ${finalTotal.toFixed(2)}
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item: any) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-12 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                            {item.cover && <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.formatted_price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-100 mb-6">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-sm text-green-600">
                                        <span>Discount ({coupon.code})</span>
                                        <span className="font-bold">-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-lg font-black pt-2 border-t border-gray-50">
                                    <span className="text-gray-900">Final Total</span>
                                    <span className="text-primary-600">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c-.13.35-.209.725-.209 1.116 0 5.05 3.125 9.401 7.562 11.161h.076c4.437-1.76 7.562-6.111 7.562-11.161 0-.391-.079-.766-.209-1.116z" />
                                    </svg>
                                    <span>Secure checkout powered by Stripe</span>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed">
                                    By completing your purchase, you agree to our Terms of Service and Privacy Policy. All digital content is available immediately upon successful payment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
