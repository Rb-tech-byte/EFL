import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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

export default function AppointmentIndex({ appointments, students, consultants }: { appointments: any, students: any[], consultants: any[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        user_id: '',
        consultant_id: '',
        date: '',
        time: '',
        status: 'pending',
        type: 'virtual',
        notes: '',
        meeting_link: '',
    });

    const openCreateModal = () => {
        setEditingAppointment(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (appointment: any) => {
        setEditingAppointment(appointment);
        setData({
            user_id: appointment.user_id,
            consultant_id: appointment.consultant_id || '',
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            type: appointment.type,
            notes: appointment.notes || '',
            meeting_link: appointment.meeting_link || '',
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAppointment) {
            put(route('admin.appointments.update', editingAppointment.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.appointments.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deleteAppointment = (id: number) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            destroy(route('admin.appointments.destroy', id));
        }
    };

    const columns = [
        { header: 'Student', accessor: 'user.name', render: (row: any) => row.user?.name || 'N/A' },
        { header: 'Date', accessor: 'date' },
        { header: 'Time', accessor: 'time' },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'confirmed') variant = 'green';
                if (row.status === 'cancelled') variant = 'red';
                if (row.status === 'pending') variant = 'yellow';
                return <Badge variant={variant}>{row.status}</Badge>;
            }
        },
        { header: 'Consultant', accessor: 'consultant.name', render: (row: any) => row.consultant?.name || 'Unassigned' },
    ];

    return (
        <AuthenticatedLayout header="Appointments">
            <Head title="Appointments" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>
                    <PrimaryButton onClick={openCreateModal}>
                        + New Appointment
                    </PrimaryButton>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={appointments.data}
                            pagination={appointments}
                            actions={(row) => (
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => openEditModal(row)}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteAppointment(row.id)}
                                        className="text-rose-600 hover:text-rose-900 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                </Card>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={submit} className="p-6">
                    <h3 className="text-lg font-bold mb-6">
                        {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="user_id" value="Student" />
                            <select
                                id="user_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                                required
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.user_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="consultant_id" value="Consultant" />
                            <select
                                id="consultant_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.consultant_id}
                                onChange={(e) => setData('consultant_id', e.target.value)}
                            >
                                <option value="">Select Consultant</option>
                                {consultants.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.consultant_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="date" value="Date" />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required
                            />
                            <InputError message={errors.date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="time" value="Time" />
                            <TextInput
                                id="time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.time}
                                onChange={(e) => setData('time', e.target.value)}
                                required
                            />
                            <InputError message={errors.time} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <select
                                id="status"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="type" value="Type" />
                            <select
                                id="type"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                required
                            >
                                <option value="virtual">Virtual</option>
                                <option value="in-person">In-Person</option>
                            </select>
                            <InputError message={errors.type} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="meeting_link" value="Meeting Link (URL)" />
                        <TextInput
                            id="meeting_link"
                            type="url"
                            className="mt-1 block w-full"
                            value={data.meeting_link}
                            onChange={(e) => setData('meeting_link', e.target.value)}
                            placeholder="https://zoom.us/j/..."
                        />
                        <InputError message={errors.meeting_link} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="notes" value="Internal Notes" />
                        <textarea
                            id="notes"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows={3}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
