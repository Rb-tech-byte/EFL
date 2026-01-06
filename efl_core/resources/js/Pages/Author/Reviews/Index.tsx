import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function AuthorReviewsIndex({ reviews }: any) {
    return (
        <AuthenticatedLayout header="Reader Feedback">
            <Head title="Reader Reviews" />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Reader Intelligence</h1>
                    <p className="text-gray-500 font-medium">Understand how readers perceive your work and build your reputation.</p>
                </div>

                {reviews.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.data.map((review: any) => (
                            <Card key={review.id} className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl">
                                            {review.user_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900">{review.user_name}</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-xl gap-1">
                                        <span className="text-amber-500 text-lg">★</span>
                                        <span className="text-sm font-black text-amber-700">{review.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">Reviewed for</p>
                                    <h4 className="text-sm font-black text-gray-700 underline decoration-indigo-200 underline-offset-4">{review.book_title}</h4>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-3xl relative">
                                    <svg className="absolute top-4 right-4 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M10 8v8h6l-3 7h-6l3-7h-3v-8zM24 8v8h6l-3 7h-6l3-7h-3v-8z"></path>
                                    </svg>
                                    <p className="text-gray-600 leading-relaxed relative z-10 italic">"{review.comment}"</p>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
                                        Public Response (Upcoming)
                                    </button>
                                    <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-gray-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-32 h-32 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner">⭐</div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4">No feedback yet.</h2>
                            <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">As more students read your books, your ratings and reviews will appear here.</p>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {reviews.links.length > 3 && (
                    <div className="flex justify-center gap-4 pt-12">
                        {reviews.links.map((link: any, index: number) => (
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
        </AuthenticatedLayout>
    );
}
