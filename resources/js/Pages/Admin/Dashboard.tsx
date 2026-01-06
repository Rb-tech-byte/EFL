import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Link import added here
import Card, { CardContent, CardHeader, CardTitle } from '@/Components/Card';
import Badge from '@/Components/Badge';
import Table from '@/Components/Table';

// KPI Card Component
const KPICard = ({ title, value, icon, color, trend }: any) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-20 mr-4`}>
                <span className="text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
                    {trend && <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>{trend > 0 ? '+' : ''}{trend}%</span>}
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function Dashboard({ stats, recent_activity }: { stats: any, recent_activity: any[] }) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const activityColumns = [
        { header: 'User', accessor: 'user', className: 'font-medium text-gray-900' },
        { header: 'Action', accessor: 'action' },
        { header: 'Target', accessor: 'target', className: 'text-gray-500' },
        { header: 'Date', accessor: 'date', className: 'text-gray-400' },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'completed' || row.status === 'paid') variant = 'green';
                if (row.status === 'pending') variant = 'yellow';
                if (row.status === 'scheduled') variant = 'blue';

                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Overview">
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Breadcrumbs (Mock) */}
                <nav className="flex text-sm text-gray-500 mb-4">
                    <ol className="flex items-center space-x-2">
                        <li><Link href="/dashboard" className="hover:text-primary-600">Dashboard</Link></li>
                        <li><span className="text-gray-300">/</span></li>
                        <li className="text-gray-900 font-medium">Overview</li>
                    </ol>
                </nav>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href={route('admin.users.index')}>
                        <KPICard title="Total Students" value={stats.total_students} icon="🎓" color="bg-blue-500 text-blue-600" trend={12} />
                    </Link>
                    <Link href={route('admin.applications.index')}>
                        <KPICard title="Active Applications" value={stats.active_applications} icon="📝" color="bg-green-500 text-green-600" trend={5} />
                    </Link>
                    <Link href={route('admin.applications.index')}> {/* Linking to Applications as proxy for Appointments/Tasks */}
                        <KPICard title="Pending Actions" value={stats.pending_appointments} icon="📅" color="bg-purple-500 text-purple-600" />
                    </Link>
                    <Link href={route('admin.settings.payment')}> {/* Linking to Payment settings or future transactions page */}
                        <KPICard title="Total Revenue" value={formatCurrency(stats.revenue)} icon="💰" color="bg-orange-500 text-orange-600" trend={0} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader className="flex justify-between items-center bg-white sticky top-0 z-10">
                                <CardTitle>Recent Activity</CardTitle>
                                <div className="flex gap-2">
                                    {/* Quick Actions / Filters Placeholder */}
                                    <button className="text-xs bg-gray-50 hover:bg-gray-100 border px-3 py-1 rounded transition">Filter</button>
                                    <button className="text-xs bg-gray-50 hover:bg-gray-100 border px-3 py-1 rounded transition">Export</button>
                                </div>
                            </CardHeader>
                            <div className="p-0">
                                <Table
                                    columns={activityColumns}
                                    data={recent_activity}
                                    actions={(row) => (
                                        <button className="text-primary-600 hover:text-primary-800 text-xs font-medium">View</button>
                                    )}
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar / Secondary Content */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Pending Tasks</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <div className="text-4xl font-bold text-gray-800 mb-2">{stats.pending_tasks}</div>
                                    <p className="text-sm text-gray-500">Tasks requiring your attention</p>
                                    <button className="mt-4 w-full py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition">
                                        View All Tasks
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50 flex items-center gap-3 transition">
                                    <span className="p-1 bg-blue-100 text-blue-600 rounded">👥</span>
                                    <span className="text-sm font-medium">Add New Student</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50 flex items-center gap-3 transition">
                                    <span className="p-1 bg-green-100 text-green-600 rounded">🎓</span>
                                    <span className="text-sm font-medium">Add University</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50 flex items-center gap-3 transition">
                                    <span className="p-1 bg-purple-100 text-purple-600 rounded">📢</span>
                                    <span className="text-sm font-medium">Create Announcement</span>
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
