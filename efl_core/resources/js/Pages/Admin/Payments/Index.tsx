import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';
import {
    CurrencyDollarIcon,
    ClockIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ArrowDownTrayIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Stats {
    total_revenue: number;
    pending_amount: number;
    successful_count: number;
    pending_count: number;
}

export default function PaymentIndex({ payments, stats }: { payments: any, stats: Stats }) {
    const columns = [
        {
            header: 'Student',
            accessor: 'user.name',
            render: (row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {row.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{row.user?.name || 'Unknown User'}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{row.user?.email}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Amount',
            render: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-black text-slate-900">{row.currency} {Number(row.amount).toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">{row.method}</span>
                </div>
            )
        },
        {
            header: 'Transaction ID',
            accessor: 'transaction_id',
            render: (row: any) => (
                <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    {row.transaction_id || 'INTERNAL-TRX'}
                </span>
            )
        },
        {
            header: 'Date',
            accessor: 'created_at',
            render: (row: any) => (
                <div className="flex flex-col">
                    <span className="text-sm text-slate-700 font-medium">{new Date(row.created_at).toLocaleDateString()}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )
        },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                let icon = null;
                if (row.status === 'paid') {
                    variant = 'green';
                    icon = <CheckCircleIcon className="w-3 h-3 mr-1" />;
                }
                if (row.status === 'failed') {
                    variant = 'red';
                }
                if (row.status === 'pending') {
                    variant = 'yellow';
                    icon = <ClockIcon className="w-3 h-3 mr-1" />;
                }
                return (
                    <Badge variant={variant} className="uppercase tracking-widest text-[9px] font-black px-3 py-1">
                        <div className="flex items-center">
                            {icon}
                            {row.status}
                        </div>
                    </Badge>
                );
            }
        },
    ];

    const statCards = [
        {
            name: 'Total Revenue',
            value: `USD ${Number(stats.total_revenue).toLocaleString()}`,
            icon: <CurrencyDollarIcon className="w-6 h-6 text-emerald-600" />,
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            label: 'Collected payments'
        },
        {
            name: 'Pending Funds',
            value: `USD ${Number(stats.pending_amount).toLocaleString()}`,
            icon: <ClockIcon className="w-6 h-6 text-amber-600" />,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-700',
            label: 'Unprocessed total'
        },
        {
            name: 'Transactions',
            value: stats.successful_count,
            icon: <CheckCircleIcon className="w-6 h-6 text-blue-600" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            label: 'Successful payments'
        },
        {
            name: 'Waiting',
            value: stats.pending_count,
            icon: <ArrowPathIcon className="w-6 h-6 text-purple-600" />,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            label: 'Pending approval'
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Finance Management" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-primary-600 font-black tracking-[0.2em] uppercase text-[10px] mb-2 block">Financial Overview</span>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payments & <span className="text-primary-600">Transactions</span></h2>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Export Data
                        </button>
                        <Link href={route('admin.orders.index')} className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                            View All Orders
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => (
                        <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`${stat.bgColor} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                                        {stat.icon}
                                    </div>
                                    <Badge variant="gray" className="text-[9px] font-black uppercase tracking-tighter bg-white/50">Live</Badge>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">{stat.name}</h3>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                                    <p className="text-[10px] text-slate-400 font-medium italic">{stat.label}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Payments Table Section */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by student, TRX ID..."
                                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'paid', 'pending', 'failed'].map((filter) => (
                                <button key={filter} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === 'all' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="p-0">
                            <Table
                                columns={columns}
                                data={payments.data}
                                pagination={payments}
                                actions={(row) => (
                                    <div className="flex gap-2 justify-end pr-4">
                                        <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors bg-slate-50 hover:bg-primary-50 rounded-xl">
                                            <ArrowDownTrayIcon className="w-4 h-4" />
                                        </button>
                                        <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            Details
                                        </button>
                                    </div>
                                )}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
