import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function BlogIndex({ posts }: any) {
    return (
        <PublicLayout>
            <Head title="Blog & Stories" />

            <div className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Blog & Success Stories</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">Insights, tips, and inspiring stories from the global education community.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {posts.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.data.map((post: any) => (
                            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col">
                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10 flex items-center justify-center text-6xl">✍️</div>
                                    )}
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-wider">{post.category || 'Article'}</span>
                                        <span className="text-xs text-gray-400">{post.created_at}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3 font-sans leading-relaxed">
                                        {post.content?.replace(/<[^>]*>/g, '').substring(0, 160)}...
                                    </p>
                                    <Link href={`/blog/${post.slug}`} className="mt-auto text-primary-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read Article <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="text-6xl mb-6 text-gray-300">✍️</div>
                        <h2 className="text-2xl font-bold text-gray-400">No blog posts found</h2>
                        <p className="text-gray-500 mt-2">We're currenty working on some exciting stories for you.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
