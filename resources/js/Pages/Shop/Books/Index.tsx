import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';

export default function ShopIndex({ books, categories, filters }: any) {
    const { auth } = usePage().props as any;

    const AdaptiveLayout = ({ children, header }: any) => {
        if (auth.user) {
            return <AuthenticatedLayout header={header}>{children}</AuthenticatedLayout>;
        }
        return <PublicLayout>{children}</PublicLayout>;
    };

    const [search, setSearch] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');
    const [selectedType, setSelectedType] = useState(filters?.type || '');
    const [priceFilter, setPriceFilter] = useState(filters?.price_filter || '');
    const [sortBy, setSortBy] = useState(typeof filters?.sort === 'string' ? filters.sort : 'latest');

    const handleFilter = () => {
        router.get('/shop', {
            search,
            category: selectedCategory,
            type: selectedType,
            price_filter: priceFilter,
            sort: sortBy,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setSelectedType('');
        setPriceFilter('');
        setSortBy('latest');
        router.get('/shop');
    };

    return (
        <AdaptiveLayout header="Book Shop">
            <Head title="Book Shop" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Book Shop</h1>
                    <p className="text-xl text-gray-500 font-medium">Explore our curated collection of digital literature and media</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Search Anything</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                    placeholder="Keywords, titles, authors..."
                                    className="w-full pl-5 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-sm font-bold text-gray-900 placeholder:text-gray-300"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-sm font-bold text-gray-900"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Media Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-sm font-bold text-gray-900"
                            >
                                <option value="">All Types</option>
                                <option value="ebook">eBook</option>
                                <option value="novel">Novel</option>
                                <option value="magazine">Magazine</option>
                                <option value="audiobook">Audiobook</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Budget</label>
                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-sm font-bold text-gray-900"
                            >
                                <option value="">Any Price</option>
                                <option value="free">Free Only</option>
                                <option value="paid">Premium Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-50 gap-6">
                        <div className="flex items-center gap-4 bg-gray-50 px-6 py-2 rounded-2xl">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Sort:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none py-2 text-sm font-black text-gray-900 focus:ring-0 cursor-pointer"
                            >
                                <option value="latest">Newly Added</option>
                                <option value="popular">Most Popular</option>
                                <option value="rating">Top Rated</option>
                                <option value="price_low">Lower Price</option>
                                <option value="price_high">Higher Price</option>
                            </select>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={clearFilters}
                                className="flex-1 md:flex-none px-8 py-4 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleFilter}
                                className="flex-1 md:flex-none px-10 py-4 bg-gray-900 text-white rounded-2xl hover:bg-primary-600 transition-all duration-300 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary-500/10"
                            >
                                Refine Results
                            </button>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                {books.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {books.data.map((book: any) => (
                                <Link
                                    key={book.id}
                                    href={`/shop/${book.slug}`}
                                    className="group bg-white rounded-[2rem] border border-gray-100/80 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    {/* Image Container */}
                                    <div className="aspect-[3/4.2] relative overflow-hidden bg-gray-50">
                                        {book.cover_image ? (
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Status Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {book.is_free && (
                                                <span className="bg-emerald-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                                                    FREE
                                                </span>
                                            )}
                                            <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black tracking-widest px-3 py-1 rounded-full shadow-sm uppercase">
                                                {book.type}
                                            </span>
                                        </div>

                                        {/* Hover Action Button */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <span className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                                                Discover More
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-auto">
                                            <h3 className="text-lg font-black text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                {book.author.name}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between gap-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(1)].map((_, i) => (
                                                            <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-black text-gray-900">
                                                        {book.average_rating ? Number(book.average_rating).toFixed(1) : '0.0'}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    {book.reviews_count} Reviews
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className={`text-xl font-black ${book.is_free ? 'text-emerald-500' : 'text-primary-600'}`}>
                                                    {book.formatted_price}
                                                </p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    Ready to Read
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {books.links.length > 3 && (
                            <div className="flex justify-center gap-2">
                                {books.links.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        preserveState
                                        preserveScroll
                                        className={`px-4 py-2 rounded-lg transition-colors ${link.active
                                            ? 'bg-primary-600 text-white'
                                            : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No books found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </AdaptiveLayout>
    );
}
