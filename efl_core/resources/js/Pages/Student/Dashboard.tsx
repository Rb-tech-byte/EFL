import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ stats, recentApplications, messages, universities, userName }: any) {
    const [previewApp, setPreviewApp] = useState<any>(null);

    const openPreview = (app: any) => {
        setPreviewApp(app);
    };

    const closePreview = () => {
        setPreviewApp(null);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Welcome & Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {stats.map((stat: any, index: number) => (
                            <div key={index} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 text-xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Applications Section (Left Column) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">My Applications</h3>
                                    <Link href={route('programs.index')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Find Programs →</Link>
                                </div>

                                <div className="space-y-4">
                                    {recentApplications.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>You haven't started any applications yet.</p>
                                            <Link href={route('programs.index')} className="mt-2 inline-block text-primary-600 hover:underline">Browse Programs</Link>
                                        </div>
                                    ) : (
                                        recentApplications.map((app: any) => (
                                            <div key={app.id} className="border rounded-lg p-4 hover:shadow-md transition bg-gray-50 md:bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    {app.university_logo ? (
                                                        <img src={app.university_logo} alt="Logo" className="w-12 h-12 object-contain rounded bg-white p-1 border" />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xl">🏛️</div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{app.program}</h4>
                                                        <p className="text-sm text-gray-600">{app.university}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${app.statusColor}`}>
                                                                {app.status_label}
                                                            </span>
                                                            <span className="text-xs text-gray-400">• {app.date}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 w-full md:w-auto">
                                                    {app.status === 'draft' ? (
                                                        <Link
                                                            href={route('application.create', { program_id: app.program_id })}
                                                            className="w-full md:w-auto text-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded hover:bg-primary-700 transition"
                                                        >
                                                            Continue
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            onClick={() => openPreview(app)}
                                                            className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded hover:bg-gray-50 transition"
                                                        >
                                                            View Preview
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Right Column) */}
                        <div className="space-y-6">

                            {/* Messages */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Messages</h3>
                                <div className="space-y-3">
                                    {messages.map((msg: any) => (
                                        <div key={msg.id} className={`p-3 rounded-lg border-l-4 ${msg.is_read ? 'border-gray-300 bg-gray-50' : 'border-primary-500 bg-primary-50'}`}>
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-xs text-gray-700">{msg.sender}</span>
                                                <span className="text-xs text-gray-400">{msg.date}</span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900">{msg.subject}</p>
                                            <p className="text-xs text-gray-600 truncate">{msg.preview}</p>
                                        </div>
                                    ))}
                                    <div className="text-center pt-2">
                                        <Link href={route('messages.index')} className="text-xs text-primary-600 hover:text-primary-800 font-medium">View All Messages</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Universities */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Universities</h3>
                                <div className="space-y-4">
                                    {universities.map((uni: any) => (
                                        <div key={uni.id} className="flex items-center gap-3">
                                            {uni.logo ? (
                                                <img src={uni.logo} alt={uni.name} className="w-10 h-10 object-contain rounded border" />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">🎓</div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate">{uni.name}</h4>
                                                <p className="text-xs text-gray-500">{uni.location}</p>
                                            </div>
                                            <Link href={route('universities.show', uni.slug)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                                View
                                            </Link>
                                        </div>
                                    ))}
                                    <div className="text-center pt-2">
                                        <Link href={route('student.universities')} className="text-xs text-primary-600 hover:text-primary-800 font-medium">Browse All</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Application Preview Modal */}
            <Modal show={!!previewApp} onClose={closePreview}>
                <div className="p-6">
                    {previewApp && (
                        <>
                            <div className="flex justify-between items-start mb-4 border-b pb-2">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Application Preview</h2>
                                    <p className="text-sm text-gray-500">#{previewApp.id} - {previewApp.university}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${previewApp.statusColor}`}>{previewApp.status_label}</span>
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
                                <SecondaryButton onClick={closePreview}>Close Preview</SecondaryButton>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
