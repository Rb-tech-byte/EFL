import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function AuthorBooksIndex({ books }: any) {
    const deleteBook = (id: number) => {
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            router.delete(route('author.books.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="Manage My Library">
            <Head title="My Books" />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">My Content Catalog</h1>
                        <p className="text-gray-500 font-medium">Manage your publications, track performance, and reach more readers.</p>
                    </div>
                    <Link
                        href={route('author.books.create')}
                        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 gap-3 group"
                    >
                        <span className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </span>
                        Upload New Work
                    </Link>
                </div>

                {books.data.length > 0 ? (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {books.data.map((book: any) => (
                                <div key={book.id} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        {book.cover_image ? (
                                            <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">📖</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        <div className="absolute top-4 left-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${book.status === 'published' ? 'bg-green-500/90 text-white' :
                                                book.status === 'pending' ? 'bg-amber-500/90 text-white' :
                                                    'bg-red-500/90 text-white'
                                                }`}>
                                                {book.status}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">{book.category || 'General'}</p>
                                            <h3 className="text-xl font-black truncate drop-shadow-md">{book.title}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Sales</p>
                                                <p className="text-sm font-black text-gray-900">{book.downloads}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Rating</p>
                                                <p className="text-sm font-black text-gray-900">{book.average_rating ? Number(book.average_rating).toFixed(1) : '-'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Price</p>
                                                <p className="text-sm font-black text-indigo-600">{book.formatted_price}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                            <Link
                                                href={route('author.books.edit', book.id)}
                                                className="flex-1 bg-gray-900 text-white text-center py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
                                            >
                                                Edit Content
                                            </Link>
                                            <Link
                                                href={route('author.books.show', book.id)}
                                                className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors group/btn"
                                                title="Analytics"
                                            >
                                                <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => deleteBook(book.id)}
                                                className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition-colors group/del"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5 text-gray-400 group-hover/del:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {books.links.length > 3 && (
                            <div className="flex justify-center gap-4 pt-12">
                                {books.links.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        preserveState
                                        className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xs font-black transition-all border ${link.active
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                            : link.url
                                                ? 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'
                                                : 'bg-gray-100 border-transparent text-gray-300 cursor-not-allowed text-[10px]'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner">📚</div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4">Your story starts here.</h2>
                            <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">Create your first publication and share your knowledge with thousands of students worldwide.</p>
                            <Link
                                href={route('author.books.create')}
                                className="inline-flex items-center px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 gap-3"
                            >
                                Get Started Now
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
