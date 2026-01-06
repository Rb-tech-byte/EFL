import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface Column {
    header: string;
    accessor?: string;
    render?: (row: any) => ReactNode;
    className?: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    pagination?: any;
    actions?: (row: any) => ReactNode;
}

export default function Table({ columns, data, pagination, actions }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && (
                            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((row, rowIdx) => (
                            <tr key={row.id || rowIdx} className="hover:bg-gray-50/50 transition-colors">
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {col.render ? col.render(row) : (col.accessor ? row[col.accessor] : '-')}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500 text-sm">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {pagination && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    {/* Simplified pagination for now, easy to enhance with Laravel's Paginator links */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{pagination.from || 0}</span> to <span className="font-medium">{pagination.to || 0}</span> of <span className="font-medium">{pagination.total}</span> results
                        </div>
                        <div className="flex gap-2">
                            {pagination.links?.map((link: any, i: number) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${link.active ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></span>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
