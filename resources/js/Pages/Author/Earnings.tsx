import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuthorEarnings({ stats, transactions, monthlyData }: any) {
    return (
        <AuthenticatedLayout header="My Earnings">
            <Head title="My Earnings" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Balance</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.total_earnings}</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Pending Amount</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.pending_earnings}</h3>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Sales</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.total_sales}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Earnings Chart (Placeholder) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Earnings Overview (Last 6 Months)</h2>
                    <div className="h-64 flex items-end justify-between gap-4">
                        {monthlyData.map((d: any) => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-primary-100 rounded-t-lg transition-all hover:bg-primary-200 relative group"
                                    style={{ height: `${(d.earnings / stats.max_monthly) * 100}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${d.earnings}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Item</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Order ID</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Commission</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Net Earnings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.length > 0 ? transactions.map((tx: any) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{tx.book_title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{tx.order_number}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${tx.amount}</td>
                                        <td className="px-6 py-4 text-sm text-red-500 text-right">-${tx.commission}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">${tx.earnings}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-gray-500">No transactions recorded yet.</td>
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
