import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import DangerButton from '@/Components/DangerButton';
import { Editor } from '@tinymce/tinymce-react';

export default function Programs({ programs, universities }: { programs: any[], universities: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProg, setEditingProg] = useState<any>(null);
    const [progToDelete, setProgToDelete] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        university_id: '',
        title: '',
        level: 'Undergraduate',
        duration: '',
        tuition_fee: '',
        description: '',
        requirements: '',
        intake_date: '',
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingProg(null);
        reset();
        // Default to first university if available
        if (universities.length > 0) setData('university_id', universities[0].id);
        setIsModalOpen(true);
    };

    const openEditModal = (prog: any) => {
        setEditingProg(prog);
        setData({
            university_id: prog.university_id,
            title: prog.title,
            level: prog.level,
            duration: prog.duration || '',
            tuition_fee: prog.tuition_fee || '',
            description: prog.description || '',
            requirements: Array.isArray(prog.requirements) ? prog.requirements.join('\n') : (typeof prog.requirements === 'string' ? JSON.parse(prog.requirements).join('\n') : ''), // Handle array or json string
            intake_date: prog.intake_date || '',
            is_active: prog.is_active !== undefined ? Boolean(prog.is_active) : true,
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (prog: any) => {
        setProgToDelete(prog);
        setIsDeleteModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setProgToDelete(null);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProg) {
            put(route('admin.programs.update', editingProg.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.programs.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteProg = () => {
        if (progToDelete) {
            destroy(route('admin.programs.destroy', progToDelete.id), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    const handleEditorChange = (content: string) => {
        setData('description', content);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Programs</h2>}>
            <Head title="Manage Programs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">All Academic Programs</h3>
                                <PrimaryButton onClick={openCreateModal}>Add Program</PrimaryButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {programs.map((prog) => (
                                            <tr key={prog.id}>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{prog.title}</div>
                                                    <div className="text-xs text-gray-500">{prog.duration} • {prog.tuition_fee}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{prog.university?.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {prog.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openEditModal(prog)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                                    <button onClick={() => openDeleteModal(prog)} className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingProg ? 'Edit Program' : 'Add New Program'}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="university_id" value="University" />
                            <select
                                id="university_id"
                                value={data.university_id}
                                onChange={(e) => setData('university_id', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Select University</option>
                                {universities.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.university_id} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="title" value="Program Title" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full"
                                isFocused
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="level" value="Level" />
                            <select
                                id="level"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Graduate">Graduate</option>
                                <option value="PhD">PhD</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                            <InputError message={errors.level} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="duration" value="Duration" />
                            <TextInput
                                id="duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="e.g. 4 Years"
                            />
                            <InputError message={errors.duration} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="tuition_fee" value="Tuition Fee" />
                            <TextInput
                                id="tuition_fee"
                                value={data.tuition_fee}
                                onChange={(e) => setData('tuition_fee', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="e.g. $20,000 / year"
                            />
                            <InputError message={errors.tuition_fee} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="intake_date" value="Intake Date" />
                            <TextInput
                                id="intake_date"
                                type="date"
                                value={data.intake_date}
                                onChange={(e) => setData('intake_date', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.intake_date} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="requirements" value="Requirements (One per line)" />
                            <textarea
                                id="requirements"
                                value={data.requirements}
                                onChange={(e) => setData('requirements', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32"
                                placeholder="High School Diploma&#10;IELTS 6.5&#10;Math Level 2"
                            ></textarea>
                            <InputError message={errors.requirements} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2 flex items-center">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                Active Program
                            </label>
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="description" value="Program Description" />
                            <div className="mt-1">
                                <Editor
                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                    licenseKey="gpl"
                                    value={data.description}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={handleEditorChange}
                                />
                            </div>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>{editingProg ? 'Update' : 'Create'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Confirm Deletion</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this program?
                    </p>
                    <div className="mt-6 flex justify-end gap-4">
                        <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteProg} disabled={processing}>Delete Program</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
