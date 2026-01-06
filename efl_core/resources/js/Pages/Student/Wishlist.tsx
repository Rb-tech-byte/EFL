import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Wishlist({ wishlist }: any) {
    const removeFromWishlist = (id: number) => {
        if (confirm('Are you sure you want to remove this book from your wishlist?')) {
            router.delete(`/wishlist/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header="My Wishlist">
            <Head title="My Wishlist" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                    <p className="text-gray-600">Books you've saved for later</p>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item: any) => (
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
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 rounded-full shadow-sm transition-all duration-200"
                                        title="Remove from wishlist"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                        {item.book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{item.book.author.name}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-bold text-primary-600">
                                            {item.book.formatted_price}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">
                                                {item.book.average_rating ? Number(item.book.average_rating).toFixed(1) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/shop/${item.book.slug}`}
                                        className="w-full block py-2 text-center text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        View & Buy
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8">Save books you're interested in to find them easily later.</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Explore Shop
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
