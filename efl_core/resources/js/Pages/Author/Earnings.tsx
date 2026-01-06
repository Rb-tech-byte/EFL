import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function AuthorEarnings({ stats, transactions, monthlyData }: any) {
    const maxMonthly = Math.max(...monthlyData.map((d: any) => d.earnings), 500);

    return (
        <AuthenticatedLayout header="Financial Analytics">
            <Head title="Author Earnings" />

            <div className="max-w-7xl mx-auto space-y-8 px-4 py-8">
                {/* Header Summary */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-indigo-100 font-bold uppercase tracking-widest text-[10px] mb-2 opacity-80">Total Revenue</p>
                            <h3 className="text-5xl font-black mb-6">${stats.total_earnings}</h3>
                            <div className="flex gap-4">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                                    <p className="text-[9px] font-black uppercase text-indigo-200 mb-1">Total Sales</p>
                                    <p className="text-xl font-black">{stats.total_sales}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                                    <p className="text-[9px] font-black uppercase text-indigo-200 mb-1">Growth</p>
                                    <p className="text-xl font-black">+12.5%</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-[400px]">
                        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-amber-200 transition-colors">
                            <div>
                                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform">⏳</div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Clearance</p>
                                <h4 className="text-2xl font-black text-gray-900">${stats.pending_earnings}</h4>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">Released 14 days after sale completion.</p>
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-green-200 transition-colors">
                            <div>
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform">🏧</div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Available to Withdraw</p>
                                <h4 className="text-2xl font-black text-gray-900">${(stats.total_earnings - stats.pending_earnings).toFixed(2)}</h4>
                            </div>
                            <button className="mt-4 text-[10px] font-black text-white bg-indigo-600 py-2 rounded-xl uppercase tracking-widest hover:bg-indigo-700 transition-colors">Withdraw</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Performance Chart */}
                    <Card className="lg:col-span-2 p-8 border-none shadow-xl rounded-[2rem]">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-black text-gray-900">Revenue Performance</h2>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> This Period
                                </span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-6 px-4">
                            {monthlyData.map((d: any) => (
                                <div key={d.month} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                                    <div className="w-full relative flex items-end justify-center h-full">
                                        <div
                                            className="w-full max-w-[40px] bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl transition-all duration-500 absolute bottom-0"
                                            style={{ height: '100%' }}
                                        ></div>
                                        <div
                                            className="w-full max-w-[40px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-2xl transition-all duration-700 relative z-10 shadow-lg shadow-indigo-600/20"
                                            style={{ height: `${(d.earnings / maxMonthly) * 100}%` }}
                                        >
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap -translate-y-2 group-hover:translate-y-0">
                                                ${d.earnings}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Activity */}
                    <Card className="p-8 border-none shadow-xl rounded-[2rem] overflow-hidden flex flex-col bg-gray-900 text-white">
                        <h2 className="text-xl font-black mb-6">Financial Summary</h2>
                        <div className="space-y-6 flex-1">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div>
                                    <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-1">Market Commission</p>
                                    <p className="text-lg font-black">30%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-1">Your Share</p>
                                    <p className="text-lg font-black text-green-400">70%</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-black mb-4 uppercase tracking-widest opacity-60">Payout Progress</p>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <div className="flex justify-between text-[9px] font-black uppercase">
                                    <span>$325.00 pending</span>
                                    <span>$500.00 Limit</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-[10px] text-white/40 leading-relaxed italic border-t border-white/10 pt-6">
                                Payments are processed on the 1st of every month for accounts exceeding the $50 minimum balance.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Detailed Transactions */}
                <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white">
                        <h2 className="text-2xl font-black text-gray-900">Transaction History</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Export CSV</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Details</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Retail Price</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Commission</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Net Profit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.data.length > 0 ? transactions.data.map((tx: any) => (
                                    <tr key={tx.id} className="hover:bg-indigo-50/10 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${tx.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900">{tx.book_title}</p>
                                                    <p className="text-[10px] font-medium text-gray-400 uppercase">Order #{tx.order_number}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-gray-500">{tx.date}</td>
                                        <td className="px-8 py-6 text-sm font-black text-gray-900">${tx.amount}</td>
                                        <td className="px-8 py-6 text-[10px] font-black text-red-400 uppercase">-${tx.commission}</td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-black">
                                                +${tx.earnings}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="text-4xl mb-4">💳</div>
                                            <p className="text-gray-400 font-bold">No transactions found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {transactions.links.length > 3 && (
                        <div className="p-8 border-t border-gray-50 flex justify-center gap-2 bg-gray-50/30">
                            {transactions.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveState
                                    className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${link.active ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:border-indigo-200'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
