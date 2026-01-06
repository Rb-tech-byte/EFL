import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminOrdersIndex({ orders, stats }: any) {
    return (
        <AuthenticatedLayout header="Marketplace Orders">
            <Head title="Marketplace Orders" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Sales Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-900">${stats.total_revenue}</h3>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Platform Commission</p>
                        <h3 className="text-3xl font-bold text-green-600">${stats.total_commission}</h3>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                        <h3 className="text-3xl font-bold text-blue-600">{stats.total_orders}</h3>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">All Transactions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Order ID</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Commission</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.data.length > 0 ? orders.data.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono font-bold text-gray-900">#{order.order_number}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{order.user_name}</p>
                                            <p className="text-[10px] text-gray-500">{order.user_email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">${order.total_amount}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-600">${order.total_commission}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.created_at}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-block"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center text-gray-500">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
