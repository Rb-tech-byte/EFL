import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function StudentAppointments({ appointments }: { appointments: any }) {
    const columns = [
        { header: 'Consultant', accessor: 'consultant.name', render: (row: any) => row.consultant?.name || 'TBD' },
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
            header: 'Link',
            render: (row: any) => row.meeting_link ? <a href={row.meeting_link} target="_blank" className="text-blue-600 underline">Join</a> : '-'
        },
    ];

    return (
        <AuthenticatedLayout header="My Appointments">
            <Head title="My Appointments" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Upcoming Sessions</h2>
                    <button className="btn-primary">Book New Session</button>
                </div>

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
