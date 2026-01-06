import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function StaffEvents({ events }: { events: any }) {
    const columns = [
        { header: 'Event', accessor: 'title', className: 'font-bold' },
        { header: 'Type', accessor: 'type' },
        { header: 'Start Time', render: (row: any) => new Date(row.start_time).toLocaleString() },
        { header: 'Location', accessor: 'location' },
    ];

    return (
        <AuthenticatedLayout header="Events">
            <Head title="Events" />

            <div className="max-w-7xl mx-auto space-y-6">
                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={events.data}
                            pagination={events}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
