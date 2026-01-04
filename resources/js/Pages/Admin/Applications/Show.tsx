import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Show({ application }: any) {
    const { data, setData, put, processing } = useForm({
        status: application.status,
        notes: application.notes || '',
    });

    const updateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.applications.update', application.id));
    };

    const appData = application.data || {};

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Application Details</h2>}>
            <Head title={`Application #${application.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Card: Status & Actions */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Application #{application.id}</h3>
                                <p className="text-sm text-gray-500">Submitted: {application.submitted_at ? new Date(application.submitted_at).toLocaleString() : 'Draft'}</p>
                            </div>
                            <form onSubmit={updateStatus} className="flex items-end gap-4">
                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <PrimaryButton disabled={processing}>Update Status</PrimaryButton>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1: Applicant & Program Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Applicant Info</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">User:</span> {application.user.name}</p>
                                    <p><span className="font-semibold">Email:</span> {application.user.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {appData.phone || 'N/A'}</p>
                                    <p><span className="font-semibold">DOB:</span> {appData.dob || 'N/A'}</p>
                                    <p><span className="font-semibold">Passport:</span> {appData.passport_no || 'N/A'}</p>
                                    <p><span className="font-semibold">Nationality:</span> {appData.nationality || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Program Details</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">Program:</span> {application.program.title}</p>
                                    <p><span className="font-semibold">University:</span> {application.program.university.name}</p>
                                    <p><span className="font-semibold">Level:</span> {application.program.level}</p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Application Data & Attachments */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Academic History</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-semibold">Institution:</span> {appData.prev_institution}</div>
                                    <div><span className="font-semibold">Qualification:</span> {appData.prev_qualification}</div>
                                    <div><span className="font-semibold">Year:</span> {appData.completion_year}</div>
                                    <div><span className="font-semibold">GPA:</span> {appData.gpa}</div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Statement of Purpose</h4>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{appData.statement || 'No statement provided.'}</p>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Attachments</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {appData.passport_path ? (
                                        <a href={appData.passport_path} target="_blank" className="block p-4 border rounded hover:bg-gray-50 text-center">
                                            <div className="text-2xl mb-2">🛂</div>
                                            <div className="text-sm font-bold text-blue-600">Passport Check</div>
                                            <span className="text-xs text-gray-500">View Document</span>
                                        </a>
                                    ) : <div className="p-4 border border-dashed rounded text-center text-gray-400">No Passport</div>}

                                    {appData.transcript_path ? (
                                        <a href={appData.transcript_path} target="_blank" className="block p-4 border rounded hover:bg-gray-50 text-center">
                                            <div className="text-2xl mb-2">📜</div>
                                            <div className="text-sm font-bold text-blue-600">Transcript</div>
                                            <span className="text-xs text-gray-500">View Document</span>
                                        </a>
                                    ) : <div className="p-4 border border-dashed rounded text-center text-gray-400">No Transcript</div>}

                                    {appData.english_test_path ? (
                                        <a href={appData.english_test_path} target="_blank" className="block p-4 border rounded hover:bg-gray-50 text-center">
                                            <div className="text-2xl mb-2">🗣️</div>
                                            <div className="text-sm font-bold text-blue-600">English Test</div>
                                            <span className="text-xs text-gray-500">View Document</span>
                                        </a>
                                    ) : <div className="p-4 border border-dashed rounded text-center text-gray-400">No English Test</div>}
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h4 className="font-bold border-b pb-2 mb-4">Admin Notes</h4>
                                <textarea
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Add internal notes about this application..."
                                ></textarea>
                                <div className="mt-2 text-right">
                                    <PrimaryButton onClick={updateStatus} disabled={processing}>Save Notes</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
