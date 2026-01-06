import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function StaffPayments({ payments }: { payments: any }) {
    const columns = [
        { header: 'Student', accessor: 'user.name', render: (row: any) => row.user?.name || 'N/A' },
        { header: 'Amount', render: (row: any) => `${row.currency} ${row.amount}` },
        { header: 'Date', render: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'paid') variant = 'green';
                if (row.status === 'failed') variant = 'red';
                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Finance">
            <Head title="Finance" />

            <div className="max-w-7xl mx-auto space-y-6">
                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={payments.data}
                            pagination={payments}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
