import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Applications({ applications }: any) {
    const [previewApp, setPreviewApp] = useState<any>(null);

    const openPreview = (app: any) => {
        setPreviewApp(app);
    };

    const closePreview = () => {
        setPreviewApp(null);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Applications</h2>}>
            <Head title="My Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">All Applications</h3>
                            <Link href={route('programs.index')} className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded hover:bg-primary-700 transition">
                                New Application
                            </Link>
                        </div>

                        {applications.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <div className="text-4xl mb-4">📂</div>
                                <p className="text-lg">You haven't applied to any programs yet.</p>
                                <p className="text-sm mb-6">Start your journey today!</p>
                                <Link href={route('programs.index')} className="text-primary-600 hover:underline">Browse Programs</Link>
                            </div>
                        ) : (
                            <div className="bg-white border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program / University</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {applications.map((app: any) => (
                                            <tr key={app.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {app.university_logo ? (
                                                            <img className="h-10 w-10 rounded-full border mr-4 object-contain bg-white" src={app.university_logo} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-lg">🏛️</div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{app.program}</div>
                                                            <div className="text-sm text-gray-500">{app.university}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{app.date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                app.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                                                    app.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'}`}>
                                                        {app.status_label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {app.status === 'draft' ? (
                                                        <Link href={route('application.create', { program_id: app.program_id })} className="text-primary-600 hover:text-primary-900 font-bold">Continue</Link>
                                                    ) : (
                                                        <button onClick={() => openPreview(app)} className="text-gray-600 hover:text-gray-900">View Details</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Modal (Same as Dashboard) */}
            <Modal show={!!previewApp} onClose={closePreview}>
                <div className="p-6">
                    {previewApp && (
                        <>
                            <div className="flex justify-between items-start mb-4 border-b pb-2">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Application Preview</h2>
                                    <p className="text-sm text-gray-500">#{previewApp.id} - {previewApp.university}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${previewApp.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{previewApp.status_label}</span>
                            </div>

                            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-semibold block text-gray-700">Program:</span> {previewApp.program}</div>
                                    <div><span className="font-semibold block text-gray-700">Submitted:</span> {previewApp.date}</div>
                                </div>

                                {previewApp.data && (
                                    <>
                                        <div className="bg-gray-50 p-4 rounded">
                                            <h3 className="font-bold text-sm mb-2 text-gray-800">Statement of Purpose</h3>
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap max-h-32 overflow-y-auto">{previewApp.data.statement || "No statement."}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-sm mb-2 text-gray-800">Attached Documents</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-center justify-between bg-white border p-2 rounded text-sm">
                                                    <span className="flex items-center gap-2">🛂 Passport</span>
                                                    {previewApp.data.passport_path ? <a href={previewApp.data.passport_path} target="_blank" className="text-primary-600 hover:underline">View</a> : <span className="text-gray-400">Missing</span>}
                                                </li>
                                                <li className="flex items-center justify-between bg-white border p-2 rounded text-sm">
                                                    <span className="flex items-center gap-2">📜 Transcripts</span>
                                                    {previewApp.data.transcript_path ? <a href={previewApp.data.transcript_path} target="_blank" className="text-primary-600 hover:underline">View</a> : <span className="text-gray-400">Missing</span>}
                                                </li>
                                                <li className="flex items-center justify-between bg-white border p-2 rounded text-sm">
                                                    <span className="flex items-center gap-2">🗣️ English Test</span>
                                                    {previewApp.data.english_test_path ? <a href={previewApp.data.english_test_path} target="_blank" className="text-primary-600 hover:underline">View</a> : <span className="text-gray-400">Missing</span>}
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closePreview}>Close</SecondaryButton>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
