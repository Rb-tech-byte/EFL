import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }: { stats: any }) {
    const { auth } = usePage().props as any;
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Admin Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <div className="text-3xl font-bold text-blue-700">{stats.total_students}</div>
                                    <div className="text-blue-500 font-medium">Total Students</div>
                                </div>
                                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                    <div className="text-3xl font-bold text-green-700">{stats.active_applications}</div>
                                    <div className="text-green-500 font-medium">Active Applications</div>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <div className="text-3xl font-bold text-purple-700">{stats.total_universities}</div>
                                    <div className="text-purple-500 font-medium">Universities</div>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                                    <div className="text-3xl font-bold text-orange-700">{stats.pending_tasks}</div>
                                    <div className="text-orange-500 font-medium">Pending Tasks</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
