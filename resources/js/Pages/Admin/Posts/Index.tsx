import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';

export default function PostIndex({ posts }: { posts: any }) {
    const columns = [
        { header: 'Title', accessor: 'title', className: 'font-semibold' },
        { header: 'Author', accessor: 'author.name', render: (row: any) => row.author?.name || 'Unknown' },
        { header: 'Date', render: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'published') variant = 'green';
                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Blog Posts">
            <Head title="Blog Management" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
                    <Link href="#" className="btn-primary">
                        + New Post
                    </Link>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={posts.data}
                            pagination={posts}
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
