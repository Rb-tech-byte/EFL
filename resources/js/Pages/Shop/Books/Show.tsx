import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';

export default function ShopShow({ book, userOwnsBook, relatedBooks }: any) {
    const { auth } = usePage().props as any;

    const AdaptiveLayout = ({ children, header }: any) => {
        if (auth.user) {
            return <AuthenticatedLayout header={header}>{children}</AuthenticatedLayout>;
        }
        return <PublicLayout>{children}</PublicLayout>;
    };

    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [couponCode, setCouponCode] = useState('');

    const handlePurchase = () => {
        if (!auth.user) {
            router.get('/login');
            return;
        }
        router.post('/shop/purchase', {
            book_id: book.id,
            payment_method: paymentMethod,
            coupon_code: couponCode,
        });
    };

    const handleAddToWishlist = () => {
        if (!auth.user) {
            router.get('/login');
            return;
        }
        router.post('/wishlist', { book_id: book.id });
    };

    const handleAddToCart = () => {
        router.post('/cart/add', { book_id: book.id });
    }

    return (
        <AdaptiveLayout header={book.title}>
            <Head title={book.title} />

            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Book Cover & Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-6">
                                {book.cover_image ? (
                                    <img
                                        src={book.cover_image}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                {userOwnsBook ? (
                                    <Link
                                        href="/library"
                                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        In Your Library
                                    </Link>
                                ) : (
                                    <>
                                        {book.is_free ? (
                                            <button
                                                onClick={handlePurchase}
                                                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-bold shadow-lg shadow-primary-500/30"
                                            >
                                                Get Free Book
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all font-bold"
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => setShowPurchaseModal(true)}
                                                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-bold shadow-lg shadow-primary-500/30"
                                                >
                                                    Buy Now - {book.formatted_price}
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={handleAddToWishlist}
                                            className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 font-bold"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Add to Wishlist
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Book Stats */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Rating</span>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                        <span className="font-medium text-gray-900">
                                            {book.average_rating ? book.average_rating.toFixed(1) : 'N/A'}
                                        </span>
                                        <span className="text-gray-500">({book.reviews_count})</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Downloads</span>
                                    <span className="font-medium text-gray-900">{book.downloads}</span>
                                </div>
                                {book.pages && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Pages</span>
                                        <span className="font-medium text-gray-900">{book.pages}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Format</span>
                                    <span className="font-medium text-gray-900 uppercase">{book.format}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Language</span>
                                    <span className="font-medium text-gray-900">{book.language || 'English'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Author */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                                    <p className="text-lg text-gray-600">by {book.author.name}</p>
                                </div>
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium capitalize">
                                    {book.type}
                                </span>
                            </div>

                            {book.category && (
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm text-gray-600">Category:</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                        {book.category.name}
                                    </span>
                                </div>
                            )}

                            {book.tags && book.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {book.tags.map((tag: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                            <div className="prose max-w-none text-gray-700">
                                {book.description}
                            </div>
                        </div>

                        {/* Additional Info */}
                        {(book.isbn || book.publisher || book.published_date) && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {book.isbn && (
                                        <div>
                                            <span className="text-sm text-gray-600">ISBN</span>
                                            <p className="font-medium text-gray-900">{book.isbn}</p>
                                        </div>
                                    )}
                                    {book.publisher && (
                                        <div>
                                            <span className="text-sm text-gray-600">Publisher</span>
                                            <p className="font-medium text-gray-900">{book.publisher}</p>
                                        </div>
                                    )}
                                    {book.published_date && (
                                        <div>
                                            <span className="text-sm text-gray-600">Published</span>
                                            <p className="font-medium text-gray-900">{book.published_date}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        {book.allow_reviews && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews ({book.reviews_count})</h2>
                                {book.reviews && book.reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {book.reviews.map((review: any) => (
                                            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{review.user.name}</span>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm">{review.review}</p>
                                                <span className="text-xs text-gray-500 mt-1 block">{review.created_at}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No reviews yet</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Books */}
                {relatedBooks && relatedBooks.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Books</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedBooks.map((relatedBook: any) => (
                                <Link
                                    key={relatedBook.id}
                                    href={`/shop/${relatedBook.slug}`}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="aspect-[3/4] bg-gray-100">
                                        {relatedBook.cover_image && (
                                            <img
                                                src={relatedBook.cover_image}
                                                alt={relatedBook.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                                            {relatedBook.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 mb-2">{relatedBook.author.name}</p>
                                        <span className="text-sm font-bold text-primary-600">
                                            {relatedBook.formatted_price}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Purchase</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="stripe">Credit Card (Stripe)</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="credit_card">Credit Card</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code (Optional)</label>
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-primary-600">{book.formatted_price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowPurchaseModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchase}
                                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdaptiveLayout>
    );
}
