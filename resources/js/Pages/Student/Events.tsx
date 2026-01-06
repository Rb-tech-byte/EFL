import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card, { CardContent } from '@/Components/Card';
import Badge from '@/Components/Badge';

export default function StudentEvents({ events }: { events: any }) {
    return (
        <AuthenticatedLayout header="Events">
            <Head title="Events" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.data.map((event: any) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600"
                                alt="Event"
                                className="w-full h-40 object-cover rounded-t-xl"
                            />
                            <CardContent className="space-y-4">
                                <div>
                                    <Badge variant="blue">{event.type}</Badge>
                                    <h3 className="text-lg font-bold text-gray-900 mt-2">{event.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{event.description}</p>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span>📅</span>
                                        <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>⏰</span>
                                        <span>{new Date(event.start_time).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                    View Details
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
