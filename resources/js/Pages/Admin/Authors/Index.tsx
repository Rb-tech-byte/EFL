import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminAuthorsIndex({ authors, filters }: any) {
    const handleStatusUpdate = (id: number, action: 'approve' | 'reject') => {
        if (confirm(`Are you sure you want to ${action} this author?`)) {
            router.patch(`/admin/authors/${id}/${action}`);
        }
    };

    return (
        <AuthenticatedLayout header="Manage Authors">
            <Head title="Manage Authors" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Author Management</h1>
                        <p className="text-gray-600">Review author applications and manage existing profiles.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Author</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Registered</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Books</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Commission</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {authors.data.length > 0 ? authors.data.map((author: any) => (
                                    <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                                    {author.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{author.name}</p>
                                                    <p className="text-xs text-gray-500 lowercase">{author.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{author.created_at}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{author.books_count}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-bold text-center">{author.commission_rate}%</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${author.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    author.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {author.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {author.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(author.id, 'approve')}
                                                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(author.id, 'reject')}
                                                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <Link
                                                    href={`/admin/authors/${author.id}`}
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
                                        <td colSpan={6} className="px-6 py-20 text-center text-gray-500">No authors found.</td>
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
