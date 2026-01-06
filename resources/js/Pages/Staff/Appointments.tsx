import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function StaffAppointments({ appointments }: { appointments: any }) {
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
        {
            header: 'Actions',
            render: (row: any) => (
                <div className="flex gap-2">
                    {row.meeting_link && <a href={row.meeting_link} target="_blank" className="text-blue-600 hover:underline">Join</a>}
                    <button className="text-gray-600 hover:text-gray-900">Details</button>
                </div>
            )
        },
    ];

    return (
        <AuthenticatedLayout header="My Appointments">
            <Head title="Appointments" />

            <div className="max-w-7xl mx-auto space-y-6">
                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={appointments.data}
                            pagination={appointments}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
