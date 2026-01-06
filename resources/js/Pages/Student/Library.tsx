import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Library({ library }: any) {
    return (
        <AuthenticatedLayout header="My Library">
            <Head title="My Library" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Library</h1>
                    <p className="text-gray-600">Access and download your purchased books</p>
                </div>

                {library.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {library.map((item: any) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
                            >
                                <div className="aspect-[3/4] bg-gray-100 relative">
                                    {item.book.cover_image ? (
                                        <img
                                            src={item.book.cover_url}
                                            alt={item.book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                        <a
                                            href={`/library/download/${item.id}`}
                                            className="w-full py-2 bg-white text-gray-900 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                                        >
                                            Download {item.book.format.toUpperCase()}
                                        </a>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                        {item.book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{item.book.author.name}</p>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Purchased: {item.purchased_at}</span>
                                        <span>{item.download_count} downloads</span>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={`/shop/${item.book.slug}`}
                                            className="flex-1 py-2 text-center text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <Link
                                            href="/reviews"
                                            className="flex-1 py-2 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            Write Review
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your library is empty</h2>
                        <p className="text-gray-600 mb-8">You haven't purchased any books yet.</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Browse Shop
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
