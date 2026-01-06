import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminBooksIndex({ books, filters }: any) {
    const togglePublish = (id: number, status: string) => {
        const action = status === 'published' ? 'unpublish' : 'publish';
        if (confirm(`Are you sure you want to ${action} this book?`)) {
            router.patch(`/admin/books/${id}/${action}`);
        }
    };

    return (
        <AuthenticatedLayout header="Manage Books">
            <Head title="Manage Books" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Management</h1>
                    <p className="text-gray-600">Overview of all content in the marketplace.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Book</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Author</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Category</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Revenue</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {books.data.length > 0 ? books.data.map((book: any) => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                    {book.cover_image && <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 truncate">{book.title}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{book.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{book.author_name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{book.category_name}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">${book.total_revenue}</p>
                                            <p className="text-[10px] text-gray-500">{book.sales_count} sales</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${book.status === 'published' ? 'bg-green-100 text-green-700' :
                                                    book.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => togglePublish(book.id, book.status)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${book.status === 'published' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                                                        }`}
                                                >
                                                    {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                                </button>
                                                <Link
                                                    href={`/admin/books/${book.id}`}
                                                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-gray-500">No books found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
