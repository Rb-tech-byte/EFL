import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function AuthorBookShow({ book }: any) {
    return (
        <AuthenticatedLayout header={book.title}>
            <Head title={`Details: ${book.title}`} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link
                        href={route('author.books.index')}
                        className="text-[10px] font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2 hover:text-indigo-800 transition-colors"
                    >
                        ← Return to Library
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Book Identity */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 overflow-hidden relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-8 shadow-2xl relative group">
                                <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full text-xs font-black uppercase">Preview Cover</span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-black text-gray-900 mb-2">{book.title}</h1>
                            <p className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-8">{book.category?.name || 'General'}</p>

                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Status</p>
                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${book.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {book.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Catalog ID</p>
                                    <p className="text-xs font-black font-mono">#{book.id}</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('author.books.edit', book.id)}
                            className="block w-full bg-gray-900 text-white text-center py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-gray-900/20 hover:scale-[1.02] transition-all"
                        >
                            Modify Content
                        </Link>
                    </div>

                    {/* Right Column: Analytics & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Perf Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Card className="p-6 border-none shadow-sm rounded-3xl group">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Sales</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-black text-gray-900">{book.downloads}</span>
                                    <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-lg">+4%</span>
                                </div>
                            </Card>
                            <Card className="p-6 border-none shadow-sm rounded-3xl px-6">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Rating</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-black text-gray-900">{book.average_rating || '0.0'}</span>
                                    <span className="text-amber-400 text-xl font-black group-hover:rotate-12 transition-transform">★</span>
                                </div>
                            </Card>
                            <Card className="p-6 border-none shadow-sm rounded-3xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Retail Price</p>
                                <p className="text-3xl font-black text-indigo-600">{book.price > 0 ? `$${book.price}` : 'FREE'}</p>
                            </Card>
                        </div>

                        {/* Content & Metadata */}
                        <Card className="p-10 border-none shadow-xl rounded-[3rem]">
                            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-4">
                                Description
                                <span className="h-px bg-gray-100 flex-1"></span>
                            </h2>
                            <div
                                className="text-gray-600 leading-relaxed mb-10 text-lg prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: book.description }}
                            />

                            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-4">
                                Book Metadata
                                <span className="h-px bg-gray-100 flex-1"></span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Format</p>
                                    <p className="font-black text-gray-900 uppercase tracking-widest text-sm">{book.format || 'Digital'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Pages</p>
                                    <p className="font-black text-gray-900 uppercase tracking-widest text-sm">{book.pages || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Language</p>
                                    <p className="font-black text-gray-900 uppercase tracking-widest text-sm">{book.language || 'English'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">ISBN</p>
                                    <p className="font-black text-gray-900 uppercase tracking-widest text-sm">{book.isbn || 'None'}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Reviews Recap */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-gray-900">Recent Customer Reviews</h2>
                            {book.reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {book.reviews.map((review: any) => (
                                        <div key={review.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex gap-6">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-gray-400">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-black text-gray-900">{review.user}</h4>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase">{review.created_at}</p>
                                                    </div>
                                                    <div className="flex text-amber-400 font-black">
                                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 italic">"{review.review}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="bg-gray-50 text-gray-400 p-10 rounded-[2.5rem] text-center font-bold italic">No reviews yet for this publication.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
