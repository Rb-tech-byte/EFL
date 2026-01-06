import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventsIndex({ events }: any) {
    return (
        <PublicLayout>
            <Head title="Events & Webinars" />

            <div className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Upcoming Events & Webinars</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">Connect with universities and experts through our live sessions.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {events.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.data.map((event: any) => (
                            <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col">
                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 flex items-center justify-center text-6xl">📅</div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                        {event.date}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 mb-4 text-xs font-bold text-purple-600 uppercase tracking-widest">
                                        <span>{event.time || 'TBA'}</span>
                                        <span>•</span>
                                        <span>{event.location || 'Online'}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors line-clamp-2">{event.title}</h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3 font-sans leading-relaxed">{event.description}</p>
                                    <Link href={`/events/${event.slug}`} className="mt-auto px-6 py-3 bg-purple-600 text-white rounded-xl font-bold text-center hover:bg-purple-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20">
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="text-6xl mb-6 text-gray-300">📅</div>
                        <h2 className="text-2xl font-bold text-gray-400">No upcoming events found</h2>
                        <p className="text-gray-500 mt-2">New webinars and workshops are coming soon. Stay tuned!</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
