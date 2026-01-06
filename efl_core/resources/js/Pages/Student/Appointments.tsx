import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function StudentAppointments({ appointments, consultants }: { appointments: any, consultants: any[] }) {
    const [showBookingModal, setShowBookingModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        consultant_id: '',
        date: '',
        time: '',
        type: 'virtual',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('student.appointments.store'), {
            onSuccess: () => {
                setShowBookingModal(false);
                reset();
            }
        });
    };

    const columns = [
        {
            header: 'Consultant',
            accessor: 'consultant.name',
            render: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {row.consultant?.name?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium">{row.consultant?.name || 'Technical Support'}</span>
                </div>
            )
        },
        { header: 'Date', accessor: 'date', render: (row: any) => new Date(row.date).toLocaleDateString() },
        { header: 'Time', accessor: 'time' },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'confirmed') variant = 'green';
                if (row.status === 'cancelled') variant = 'red';
                if (row.status === 'pending') variant = 'yellow';
                return <Badge variant={variant}>{row.status.toUpperCase()}</Badge>;
            }
        },
        {
            header: 'Action',
            render: (row: any) => row.meeting_link ? (
                <a
                    href={row.meeting_link}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold"
                >
                    Join Meeting ↗
                </a>
            ) : <span className="text-gray-400 italic text-sm">Link will appear here</span>
        },
    ];

    return (
        <AuthenticatedLayout header="My Appointments">
            <Head title="My Appointments" />

            <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900">Education Counseling</h2>
                        <p className="text-gray-500 mt-1">Manage your sessions with our expert consultants.</p>
                    </div>
                    <PrimaryButton
                        onClick={() => setShowBookingModal(true)}
                        className="shadow-lg shadow-indigo-100 py-3 px-6"
                    >
                        Book New Session
                    </PrimaryButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <div className="p-0">
                                <Table
                                    columns={columns}
                                    data={appointments.data}
                                    pagination={appointments}
                                />
                                {appointments.data.length === 0 && (
                                    <div className="p-12 text-center">
                                        <div className="text-4xl mb-4">🗓️</div>
                                        <h3 className="text-lg font-bold text-gray-900">No appointments yet</h3>
                                        <p className="text-gray-500 mb-6">Need help with your application? Schedule a session today.</p>
                                        <SecondaryButton onClick={() => setShowBookingModal(true)}>
                                            Request Your First Appointment
                                        </SecondaryButton>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100">
                            <h3 className="text-xl font-bold mb-4">Quick Tip</h3>
                            <p className="text-indigo-50 leading-relaxed mb-6">
                                Prepare your academic transcripts and identity documents before your session for a more productive discussion.
                            </p>
                            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                                <div className="text-sm font-medium text-indigo-100 opacity-80 uppercase tracking-wider mb-2">Support Available</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">🤝</div>
                                    <div>
                                        <div className="font-bold">24/7 Academic Support</div>
                                        <div className="text-xs text-indigo-200">Via messaging portal</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="bg-white border-slate-100 rounded-[2rem]">
                            <div className="p-6">
                                <h4 className="font-bold text-slate-900 mb-4">Application Progress</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Profile Completion</span>
                                        <span className="font-bold text-slate-900">85%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full w-[85%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Modal show={showBookingModal} onClose={() => setShowBookingModal(false)}>
                <form onSubmit={submit} className="p-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-display font-bold text-gray-900">Request a Counseling Session</h3>
                        <p className="text-gray-500 mt-1">Our experts will confirm your slot within 24 hours.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="consultant_id" value="Preferred Consultant (Optional)" />
                            <select
                                id="consultant_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                value={data.consultant_id}
                                onChange={(e) => setData('consultant_id', e.target.value)}
                            >
                                <option value="">Any Available Specialist</option>
                                {consultants.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.consultant_id} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="date" value="Preferred Date" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="mt-1 block w-full h-12 rounded-xl"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="time" value="Preferred Time" />
                                <TextInput
                                    id="time"
                                    type="time"
                                    className="mt-1 block w-full h-12 rounded-xl"
                                    value={data.time}
                                    onChange={(e) => setData('time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.time} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="type" value="Meeting Format" />
                            <div className="grid grid-cols-2 gap-4 mt-1">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'virtual')}
                                    className={`py-3 rounded-xl border-2 transition-all ${data.type === 'virtual' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                                >
                                    💻 Virtual Zoom
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'in-person')}
                                    className={`py-3 rounded-xl border-2 transition-all ${data.type === 'in-person' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                                >
                                    🤝 In-Person
                                </button>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="notes" value="What would you like to discuss?" />
                            <textarea
                                id="notes"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm"
                                rows={3}
                                placeholder="E.g. Visa assistance, University selection for Spring 2026..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={() => setShowBookingModal(false)}
                            className="rounded-xl px-6 h-12"
                        >
                            Back
                        </SecondaryButton>
                        <PrimaryButton
                            disabled={processing}
                            className="rounded-xl px-8 h-12 shadow-lg shadow-indigo-100"
                        >
                            Request Booking
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
