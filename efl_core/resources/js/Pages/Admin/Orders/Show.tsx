import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';

export default function AdminOrderShow({ order }: any) {
    return (
        <AuthenticatedLayout header={`Order Detail - ${order.order_number}`}>
            <Head title={`Order #${order.order_number}`} />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <Link href="/admin/orders" className="text-indigo-600 hover:text-indigo-900 font-bold flex items-center gap-2">
                        ← Back to Orders
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Purchased Items</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="p-6 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 bg-gray-50 rounded flex items-center justify-center text-xl shadow-sm border border-gray-100">
                                                📖
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{item.book_title}</p>
                                                <p className="text-xs text-gray-500">Author: {item.author_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">${item.total_price}</p>
                                            <p className="text-[10px] text-green-600 font-bold">Commission: ${item.commission_amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <div className="space-y-2 max-w-xs ml-auto">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${order.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Tax</span>
                                        <span>${order.tax}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>${order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Customer & Payment Info */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Customer Information</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                                    {order.user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{order.user.name}</p>
                                    <p className="text-sm text-gray-500">{order.user.email}</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Order Date</p>
                                    <p className="text-sm font-medium text-gray-900">{order.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Transaction ID</p>
                                    <p className="text-sm font-mono text-gray-900">{order.transaction_id || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Payment Method</p>
                                    <p className="text-sm font-medium text-gray-900 uppercase">{order.payment_method}</p>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                            <h4 className="font-bold mb-2">Need to adjust this order?</h4>
                            <p className="text-xs text-indigo-100 mb-4 opacity-80 leading-relaxed">
                                Marketplace orders are processed through Stripe/PayPal. Refunds and cancellations should be managed via the payment gateway directly for security.
                            </p>
                            <PrimaryButton className="w-full bg-white text-indigo-600 hover:bg-indigo-50 justify-center">
                                Contact Support
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
