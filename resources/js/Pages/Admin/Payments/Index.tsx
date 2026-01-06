import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function PaymentIndex({ payments }: { payments: any }) {
    const columns = [
        { header: 'Student', accessor: 'user.name', render: (row: any) => row.user?.name || 'N/A' },
        { header: 'Amount', render: (row: any) => `${row.currency} ${row.amount}` },
        { header: 'Method', accessor: 'method' },
        { header: 'Date', accessor: 'created_at', render: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'paid') variant = 'green';
                if (row.status === 'failed') variant = 'red';
                if (row.status === 'pending') variant = 'yellow';
                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Finance">
            <Head title="Payments" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Payments & Finance</h2>
                    <Link href="#" className="btn-primary">
                        Record Payment
                    </Link>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={payments.data}
                            pagination={payments}
                            actions={(row) => (
                                <div className="flex gap-2 justify-end">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Invoice</button>
                                </div>
                            )}
                        />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
