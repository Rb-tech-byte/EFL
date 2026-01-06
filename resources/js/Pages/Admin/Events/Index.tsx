import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function EventIndex({ events }: { events: any }) {
    const columns = [
        { header: 'Title', accessor: 'title', className: 'font-semibold' },
        { header: 'Type', accessor: 'type', render: (row: any) => <span className="capitalize">{row.type}</span> },
        { header: 'Date', render: (row: any) => new Date(row.start_time).toLocaleDateString() },
        { header: 'Location', accessor: 'location' },
        {
            header: 'Visibility',
            render: (row: any) => {
                return row.is_public ? <Badge variant="green">Public</Badge> : <Badge variant="gray">Private</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Events">
            <Head title="Events" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
                    <Link href="#" className="btn-primary">
                        + Create Event
                    </Link>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={events.data}
                            pagination={events}
                            actions={(row) => (
                                <div className="flex gap-2 justify-end">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                </div>
                            )}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
