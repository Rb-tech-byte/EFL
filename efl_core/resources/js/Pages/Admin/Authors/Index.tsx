import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function AdminAuthorsIndex({ authors, users }: any) {
    const [showModal, setShowModal] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        user_id: '',
        pen_name: '',
        bio: '',
        commission_rate: 10,
        status: 'pending',
    });

    const openCreateModal = () => {
        setEditingAuthor(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (author: any) => {
        setEditingAuthor(author);
        setData({
            user_id: author.user_id || '',
            pen_name: author.pen_name || '',
            bio: author.bio || '',
            commission_rate: author.commission_rate || 10,
            status: author.status || 'pending',
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAuthor) {
            put(route('admin.authors.update', editingAuthor.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.authors.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deleteAuthor = (id: number) => {
        if (confirm('Are you sure you want to delete this author? This will not delete the user account.')) {
            destroy(route('admin.authors.destroy', id));
        }
    };

    const handleStatusUpdate = (id: number, action: 'approve' | 'reject') => {
        if (confirm(`Are you sure you want to ${action} this author?`)) {
            router.patch(`/admin/authors/${id}/${action}`);
        }
    };

    return (
        <AuthenticatedLayout header="Manage Authors">
            <Head title="Manage Authors" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Author Management</h1>
                        <p className="text-gray-600">Review author applications and manage existing profiles.</p>
                    </div>
                    <PrimaryButton onClick={openCreateModal}>
                        + Register New Author
                    </PrimaryButton>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Author</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Registered</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Books</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Comm. (%)</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {authors.data.length > 0 ? authors.data.map((author: any) => (
                                    <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                                                    {author.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{author.name}</p>
                                                    <p className="text-xs text-gray-500 lowercase">{author.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{author.created_at}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{author.books_count}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-bold text-center">{author.commission_rate}%</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${author.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                author.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {author.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {author.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(author.id, 'approve')}
                                                            className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(author.id, 'reject')}
                                                            className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => openEditModal(author)}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-bold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteAuthor(author.id)}
                                                    className="text-rose-600 hover:text-rose-900 text-sm font-bold"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-gray-500 font-medium italic">No authors found. Register the first author to start!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="xl">
                <form onSubmit={submit} className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
                        {editingAuthor ? '✏️ Edit Author' : '✍️ Register Author'}
                    </h3>

                    <div className="space-y-6">
                        {!editingAuthor && (
                            <div>
                                <InputLabel htmlFor="user_id" value="Select User (Role: Author)" />
                                <select
                                    id="user_id"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user: any) => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="pen_name" value="Pen Name (Display Name)" />
                            <TextInput
                                id="pen_name"
                                className="mt-1 block w-full"
                                value={data.pen_name}
                                onChange={(e) => setData('pen_name', e.target.value)}
                                placeholder="Public name..."
                            />
                            <InputError message={errors.pen_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Author Bio" />
                            <textarea
                                id="bio"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm"
                                rows={4}
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                            />
                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="commission_rate" value="Commission Rate (%)" />
                                <TextInput
                                    id="commission_rate"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.commission_rate}
                                    onChange={(e) => setData('commission_rate', parseInt(e.target.value))}
                                    required
                                />
                                <InputError message={errors.commission_rate} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="status" value="Application Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option value="pending">Pending Review</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3 border-t pt-6">
                        <SecondaryButton onClick={() => setShowModal(false)} className="px-6">Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="px-8 bg-indigo-600 hover:bg-indigo-700">
                            {editingAuthor ? 'Update Profile' : 'Register Author'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
