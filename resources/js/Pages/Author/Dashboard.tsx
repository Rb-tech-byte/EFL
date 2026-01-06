import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function AuthorDashboard({ stats, recentBooks, recentSales, recentReviews, authorStatus, auth }: any) {
    const statCards = [
        { name: 'My Total Earnings', value: `$${stats.total_earnings}`, icon: '💰', color: 'from-green-500 to-emerald-600', description: 'Total lifetime earnings' },
        { name: 'Active Inventory', value: stats.total_books, icon: '📚', color: 'from-blue-500 to-indigo-600', description: 'Books in your catalog' },
        { name: 'Market Sales', value: stats.total_sales, icon: '📈', color: 'from-purple-500 to-violet-600', description: 'Total copies sold' },
        { name: 'Reader Balance', value: stats.average_rating ? stats.average_rating : 'N/A', icon: '⭐', color: 'from-amber-500 to-orange-600', description: 'Average reader rating' },
    ];

    return (
        <AuthenticatedLayout header="Author Overview">
            <Head title="Author Dashboard" />

            <div className="max-w-7xl mx-auto space-y-8 px-4 py-8">
                {/* Welcome Header */}
                <div className="relative overflow-hidden bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-extrabold mb-2">Welcome back, {auth.user.name.split(' ')[0]}! 👋</h1>
                            <p className="text-indigo-100 opacity-90 max-w-xl">
                                Your writing is making an impact! Here's how your shop is performing today.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                            <span className="text-sm font-medium">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${authorStatus === 'approved' ? 'bg-green-400/20 text-green-300 border border-green-400/30' :
                                    authorStatus === 'pending' ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' :
                                        'bg-red-400/20 text-red-300 border border-red-400/30'
                                }`}>
                                {authorStatus}
                            </span>
                        </div>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-400/10 rounded-full blur-2xl"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card) => (
                        <div key={card.name} className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg ring-4 ring-white`}>
                                    {card.icon}
                                </div>
                            </div>
                            <p className="text-sm font-bold text-gray-500 mb-1">{card.name}</p>
                            <h3 className="text-3xl font-black text-gray-900 mb-2">{card.value}</h3>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{card.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Sales - 2/3 width on wide screens */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-none shadow-xl">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h2 className="text-xl font-black text-gray-900">Live Sales</h2>
                                <Link href="/author/earnings" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                    Full Report
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentSales.length > 0 ? recentSales.map((sale: any) => (
                                    <div key={sale.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-indigo-100">
                                                📚
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{sale.book_title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-gray-400 font-medium">{sale.date}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span className="text-[10px] text-indigo-500 font-bold uppercase">{sale.order_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-indigo-600">+${sale.earnings}</p>
                                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Net Profit</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-20 text-center text-gray-500">
                                        <div className="text-4xl mb-4">🛒</div>
                                        <p className="font-bold">No sales recorded yet.</p>
                                        <p className="text-sm text-gray-400 mt-1">Keep writing, the world is waiting!</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Inventory Quick View */}
                        <Card className="p-6 border-none shadow-xl">
                            <h2 className="text-xl font-black text-gray-900 mb-6 font-display">Manage Your Inventory</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {recentBooks.map((book: any) => (
                                    <Link
                                        key={book.id}
                                        href={route('author.books.edit', book.id)}
                                        className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50/50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all"
                                    >
                                        <div className="w-16 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                            {book.cover_image ? (
                                                <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">📙</div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-black text-gray-900 truncate">{book.title}</h3>
                                            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-wider">{book.downloads} Downloads</p>
                                            <div className="mt-2">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${book.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                                    }`}>
                                                    {book.status}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Left Column: Reviews & Profile Info */}
                    <div className="space-y-8">
                        {/* Profile Completion / Status */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-black mb-4">Author Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>Profile Strength</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                                    Your profile is almost complete! Add more details to build trust with your readers.
                                </p>
                                <Link href="/author/profile" className="block text-center py-3 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-colors">
                                    Complete Profile
                                </Link>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <Card className="border-none shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-black text-gray-900">Reader Feedback</h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentReviews.length > 0 ? recentReviews.map((review: any) => (
                                    <div key={review.id} className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs">
                                                    {review.user_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900">{review.user_name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-indigo-600 font-black uppercase mb-2 tracking-wide truncate">{review.book_title}</p>
                                        <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50 p-3 rounded-2xl ring-1 ring-gray-100">
                                            "{review.review}"
                                        </p>
                                    </div>
                                )) : (
                                    <div className="p-12 text-center text-gray-500">
                                        <p className="font-bold text-sm">No feedback yet.</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
