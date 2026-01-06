import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuthorBookEdit({ book, categories }: any) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: book.title,
        description: book.description,
        category_id: book.category_id,
        type: book.type,
        format: book.format,
        price: book.price,
        is_free: book.is_free,
        isbn: book.isbn || '',
        pages: book.pages || '',
        language: book.language || 'English',
        publisher: book.publisher || '',
        published_date: book.published_date || '',
        tags: book.tags || [],
        allow_reviews: book.allow_reviews,
        screenshot_protected: book.screenshot_protected,
        cover_image: null as File | null,
        file: null as File | null,
        preview_file: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we are uploading possible files, we must spoof PUT with POST
        post(`/author/books/${book.id}`);
    };

    return (
        <AuthenticatedLayout header={`Edit: ${book.title}`}>
            <Head title={`Edit: ${book.title}`} />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/author/books" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-2 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Books
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
                    <p className="text-gray-600">Update your book information and files.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-full">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Book Title *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all h-32"
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Media Type *</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    required
                                >
                                    <option value="ebook">eBook</option>
                                    <option value="novel">Novel</option>
                                    <option value="magazine">Magazine</option>
                                    <option value="audiobook">Audiobook</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Pricing & Files</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Format *</label>
                                <input
                                    type="text"
                                    value={data.format}
                                    onChange={e => setData('format', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Price ($) *</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                        disabled={data.is_free}
                                    />
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_free"
                                        checked={data.is_free}
                                        onChange={e => setData('is_free', e.target.checked)}
                                        className="rounded text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="is_free" className="text-sm text-gray-600 font-medium cursor-pointer">This is a free book</label>
                                </div>
                            </div>

                            <div className="col-span-full border-t border-gray-50 pt-4">
                                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg flex gap-2 mb-4">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Leave file fields empty if you don't want to update the existing files.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (Optional)</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                            accept="image/*"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Book File (Optional)</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('file', e.target.files ? e.target.files[0] : null)}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Publishing Metadata</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ISBN</label>
                                <input
                                    type="text"
                                    value={data.isbn}
                                    onChange={e => setData('isbn', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Page Count</label>
                                <input
                                    type="number"
                                    value={data.pages}
                                    onChange={e => setData('pages', Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 p-8">
                        <Link href="/author/books" className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Cancel</Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
