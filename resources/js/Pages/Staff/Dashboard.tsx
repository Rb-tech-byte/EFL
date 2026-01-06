import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Link import added here
import Card, { CardContent, CardHeader, CardTitle } from '@/Components/Card';
import Badge from '@/Components/Badge';
import Table from '@/Components/Table';

// KPI Card Component
const KPICard = ({ title, value, icon, color }: any) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-20 mr-4`}>
                <span className="text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
            </div>
        </CardContent>
    </Card>
);

export default function Dashboard({ stats }: { stats: any }) {

    return (
        <AuthenticatedLayout header="Overview">
            <Head title="Staff Dashboard" />

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
                    <KPICard title="Applications to Review" value={stats.pending_applications || 0} icon="📝" color="bg-blue-500 text-blue-600" />
                    <KPICard title="My Pending Tasks" value={stats.my_tasks || 0} icon="✅" color="bg-green-500 text-green-600" />
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tasks Area */}
                    <Card>
                        <CardHeader className="flex justify-between items-center bg-white sticky top-0 z-10">
                            <CardTitle>My Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-gray-500">
                                No pending tasks found.
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
