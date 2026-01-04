import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, recentApplications, userName }: { stats: any[], recentApplications: any[], userName: string }) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    // Stats and recentApplications passed from controller


    return (
        <AuthenticatedLayout
            header="Student Dashboard"
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-primary-900/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-display font-bold mb-2">Welcome back, {userName || user.name}! 👋</h1>
                        <p className="text-blue-100 max-w-xl">You have <span className="font-bold text-white">2 upcoming deadlines</span> this week. Keep up the great work on your applications.</p>
                        <div className="mt-6">
                            <button className="px-6 py-2 bg-white text-primary-700 font-bold rounded-lg shadow-sm hover:bg-blue-50 transition">
                                View Action Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-xl`}>
                                    {stat.icon}
                                </div>
                                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                            </div>
                            <div className="text-gray-500 font-medium text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activities / Applications */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-800">Recent Applications</h3>
                                <a href="#" className="text-primary-600 text-sm font-semibold hover:text-primary-700">View All</a>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentApplications.map((app, idx) => (
                                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-lg">
                                                🏫
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{app.university}</div>
                                                <div className="text-sm text-gray-500">{app.program}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                                                {app.status}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">{app.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recommended / Sidebar Widgets */}
                    <div className="space-y-6">
                        {/* Profile Completeness */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">Profile Completeness</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-primary-600">
                                            85%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
                                    <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Add your language test scores to reach 100%.</p>
                                <button className="w-full py-2 text-sm font-semibold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                                    Complete Profile
                                </button>
                            </div>
                        </div>

                        {/* Top Destinations */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
                            <h3 className="font-bold text-lg mb-2">Study in the UK</h3>
                            <p className="text-indigo-100 text-sm mb-4">Discover top universities and scholarships available for international students.</p>
                            <button className="px-4 py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg shadow hover:bg-gray-100 transition">
                                Explore Options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
