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

export default function EventIndex({ events }: { events: any }) {
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        type: 'webinar',
        link: '',
        is_public: true,
    });

    const openCreateModal = () => {
        setEditingEvent(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (event: any) => {
        setEditingEvent(event);
        setData({
            title: event.title,
            description: event.description || '',
            start_time: event.start_time ? event.start_time.substring(0, 16) : '',
            end_time: event.end_time ? event.end_time.substring(0, 16) : '',
            location: event.location || '',
            type: event.type,
            link: event.link || '',
            is_public: !!event.is_public,
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEvent) {
            put(route('admin.events.update', editingEvent.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.events.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            destroy(route('admin.events.destroy', id));
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title', className: 'font-semibold' },
        { header: 'Type', accessor: 'type', render: (row: any) => <span className="capitalize">{row.type}</span> },
        { header: 'Date', render: (row: any) => new Date(row.start_time).toLocaleDateString() },
        { header: 'Location', accessor: 'location' },
        {
            header: 'Visibility',
            render: (row: any) => {
                return row.is_public ? <Badge variant="green">Public</Badge> : <Badge variant="gray">Private</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Events">
            <Head title="Events" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
                    <PrimaryButton onClick={openCreateModal}>
                        + Create Event
                    </PrimaryButton>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={events.data}
                            pagination={events}
                            actions={(row) => (
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => openEditModal(row)}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteEvent(row.id)}
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
                        {editingEvent ? 'Edit Event' : 'Create New Event'}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="title" value="Event Title" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="start_time" value="Start Time" />
                                <TextInput
                                    id="start_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_time} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="end_time" value="End Time (Optional)" />
                                <TextInput
                                    id="end_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                />
                                <InputError message={errors.end_time} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="type" value="Event Type" />
                                <select
                                    id="type"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    required
                                >
                                    <option value="webinar">Webinar</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="info-session">Info Session</option>
                                    <option value="conference">Conference</option>
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="is_public" value="Visibility" />
                                <select
                                    id="is_public"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.is_public ? '1' : '0'}
                                    onChange={(e) => setData('is_public', e.target.value === '1')}
                                    required
                                >
                                    <option value="1">Public</option>
                                    <option value="0">Private</option>
                                </select>
                                <InputError message={errors.is_public} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="location" value="Location / Venue" />
                            <TextInput
                                id="location"
                                className="mt-1 block w-full"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                placeholder="E.g. Zoom, Online, or Physical Address"
                            />
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="link" value="Registration Link (Optional URL)" />
                            <TextInput
                                id="link"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                placeholder="https://..."
                            />
                            <InputError message={errors.link} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingEvent ? 'Update Event' : 'Create Event'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
