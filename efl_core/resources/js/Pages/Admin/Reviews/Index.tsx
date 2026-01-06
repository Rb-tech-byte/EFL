import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminReviewsIndex({ reviews, filters }: any) {
    const handleAction = (id: number, action: 'approve' | 'destroy') => {
        if (confirm(`Are you sure you want to ${action === 'approve' ? 'approve' : 'delete'} this review?`)) {
            if (action === 'approve') {
                router.patch(`/admin/reviews/${id}/approve`);
            } else {
                router.delete(`/admin/reviews/${id}`);
            }
        }
    };

    return (
        <AuthenticatedLayout header="Manage Reviews">
            <Head title="Manage Reviews" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Moderation</h1>
                    <p className="text-gray-600">Approve or remove customer reviews across all content.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Reviewer</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Book</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Review</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reviews.data.length > 0 ? reviews.data.map((review: any) => (
                                    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{review.user.name}</p>
                                            <p className="text-[10px] text-gray-500">{review.created_at}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-primary-600 font-medium">{review.book.title}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-700 line-clamp-2 italic">"{review.review}"</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${review.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {review.is_approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!review.is_approved && (
                                                    <button
                                                        onClick={() => handleAction(review.id, 'approve')}
                                                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleAction(review.id, 'destroy')}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-500">No reviews found.</td>
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
