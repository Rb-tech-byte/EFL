import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RichTextEditor from '@/Components/RichTextEditor';

interface BookForm {
    title: string;
    description: string;
    category_id: number | string;
    type: string;
    format: string;
    price: number;
    is_free: boolean;
    cover_image: File | null;
    file: File | null;
    preview_file: File | null;
    isbn: string;
    pages: number | string;
    language: string;
    publisher: string;
    published_date: string;
    tags: string[];
    allow_reviews: boolean;
    screenshot_protected: boolean;
}

export default function AuthorBookCreate({ categories }: any) {
    const { data, setData, post, processing, errors } = useForm<BookForm>({
        title: '',
        description: '',
        category_id: '',
        type: 'ebook',
        format: '',
        price: 0,
        is_free: false,
        cover_image: null,
        file: null,
        preview_file: null,
        isbn: '',
        pages: '',
        language: 'English',
        publisher: '',
        published_date: '',
        tags: [],
        allow_reviews: true,
        screenshot_protected: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/author/books');
    };

    return (
        <AuthenticatedLayout header="Upload New Book">
            <Head title="Upload New Book" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/author/books" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-2 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Books
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Upload New Book</h1>
                    <p className="text-gray-600">Provide all the necessary details to publish your content.</p>
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
                                    placeholder="Enter book title"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                <RichTextEditor
                                    value={data.description}
                                    onChange={content => setData('description', content)}
                                    placeholder="Tell readers what your book is about..."
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
                                    placeholder="e.g. PDF, EPUB, MP3"
                                    required
                                />
                                {errors.format && <p className="text-red-500 text-xs mt-1">{errors.format}</p>}
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
                                        required={!data.is_free}
                                    />
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_free"
                                        checked={data.is_free}
                                        onChange={e => {
                                            const free = e.target.checked;
                                            setData({ ...data, is_free: free, price: free ? 0 : Number(data.price) });
                                        }}
                                        className="rounded text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="is_free" className="text-sm text-gray-600 font-medium cursor-pointer">This is a free book</label>
                                </div>
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            <div className="col-span-full border-t border-gray-50 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image *</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                        accept="image/*"
                                        required
                                    />
                                    {errors.cover_image && <p className="text-red-500 text-xs mt-1">{errors.cover_image}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Book File *</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('file', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                        required
                                    />
                                    {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                                </div>

                                <div className="col-span-full">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Preview/Sample File (Optional)</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('preview_file', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                    />
                                    {errors.preview_file && <p className="text-red-500 text-xs mt-1">{errors.preview_file}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Publishing Metadata</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ISBN (Optional)</label>
                                <input
                                    type="text"
                                    value={data.isbn}
                                    onChange={e => setData('isbn', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="International Standard Book Number"
                                />
                                {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Page Count (Optional)</label>
                                <input
                                    type="number"
                                    value={data.pages}
                                    onChange={e => setData('pages', e.target.value ? Number(e.target.value) : '')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="Enter total pages"
                                />
                                {errors.pages && <p className="text-red-500 text-xs mt-1">{errors.pages}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                                <input
                                    type="text"
                                    value={data.language}
                                    onChange={e => setData('language', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Publisher (Optional)</label>
                                <input
                                    type="text"
                                    value={data.publisher}
                                    onChange={e => setData('publisher', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="Enter publisher name"
                                />
                            </div>

                            <div className="col-span-full space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="allow_reviews"
                                        checked={data.allow_reviews}
                                        onChange={e => setData('allow_reviews', e.target.checked)}
                                        className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5"
                                    />
                                    <div>
                                        <label htmlFor="allow_reviews" className="text-sm font-bold text-gray-700 cursor-pointer">Allow Customer Reviews</label>
                                        <p className="text-xs text-gray-500">Enable readers to rate and review your book after purchase.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="screenshot_protected"
                                        checked={data.screenshot_protected}
                                        onChange={e => setData('screenshot_protected', e.target.checked)}
                                        className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5"
                                    />
                                    <div>
                                        <label htmlFor="screenshot_protected" className="text-sm font-bold text-gray-700 cursor-pointer">Add Screenshot Protection</label>
                                        <p className="text-xs text-gray-500">Enable DRM protection to prevent unauthorized screenshots on compatible readers.</p>
                                    </div>
                                </div>
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
                            {processing ? 'Uploading...' : 'Publish Book'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
