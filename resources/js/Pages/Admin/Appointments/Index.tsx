import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card, { CardContent, CardHeader, CardTitle } from '@/Components/Card'; // Fixed Import (Assuming Card components are exported this way based on previous context, verify if needed)
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function AppointmentIndex({ appointments }: { appointments: any }) {
    const columns = [
        { header: 'Student', accessor: 'user.name', render: (row: any) => row.user?.name || 'N/A' },
        { header: 'Date', accessor: 'date' },
        { header: 'Time', accessor: 'time' },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'confirmed') variant = 'green';
                if (row.status === 'cancelled') variant = 'red';
                if (row.status === 'pending') variant = 'yellow';
                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
        { header: 'Consultant', accessor: 'consultant.name', render: (row: any) => row.consultant?.name || 'Unassigned' },
    ];

    return (
        <AuthenticatedLayout header="Appointments">
            <Head title="Appointments" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
                    <Link href="#" className="btn-primary">
                        + New Appointment
                    </Link>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={appointments.data}
                            pagination={appointments}
                            actions={(row) => (
                                <div className="flex gap-2 justify-end">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Cancel</button>
                                </div>
                            )}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
