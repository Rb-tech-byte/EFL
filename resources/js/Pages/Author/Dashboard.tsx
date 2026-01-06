import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuthorDashboard({ stats, recentBooks, recentSales, recentReviews }: any) {
    const statCards = [
        { name: 'Total Books', value: stats.total_books, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-blue-500' },
        { name: 'Total Earnings', value: stats.total_earnings, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
        { name: 'Total Sales', value: stats.total_sales, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', color: 'bg-purple-500' },
        { name: 'Avg Rating', value: stats.average_rating ? stats.average_rating.toFixed(1) : 'N/A', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'bg-yellow-500' },
    ];

    return (
        <AuthenticatedLayout header="Author Dashboard">
            <Head title="Author Dashboard" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card) => (
                        <div key={card.name} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className={`${card.color} p-3 rounded-xl text-white`}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.name}</p>
                                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Recent Sales</h2>
                            <Link href="/author/earnings" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentSales.length > 0 ? recentSales.map((sale: any) => (
                                <div key={sale.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{sale.book_title}</p>
                                            <p className="text-xs text-gray-500">{sale.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900">+{sale.earnings}</p>
                                        <p className="text-xs text-green-600 font-medium">Completed</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-gray-500">No sales recorded yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
                            <Link href="/author/reviews" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentReviews.length > 0 ? recentReviews.map((review: any) => (
                                <div key={review.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                                                {review.user_name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{review.user_name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{review.book_title}</p>
                                    <p className="text-xs text-gray-600 line-clamp-2 italic">"{review.review}"</p>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-gray-500">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Books */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Your Recent Books</h2>
                        <Link href="/author/books" className="text-sm font-medium text-primary-600 hover:text-primary-700">Manage Books</Link>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentBooks.length > 0 ? recentBooks.map((book: any) => (
                            <div key={book.id} className="flex gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {book.cover_image ? (
                                        <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{book.title}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{book.downloads} downloads</p>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${book.status === 'published' ? 'bg-green-100 text-green-700' :
                                            book.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {book.status}
                                    </span>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-8 text-center text-gray-500">
                                <p className="mb-4">You haven't uploaded any books yet.</p>
                                <Link href="/author/books/create" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Upload Your First Book</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
