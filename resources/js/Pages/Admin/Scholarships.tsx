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

import 'tinymce/tinymce';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// Plugin imports
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

// Skin and Content CSS
import 'tinymce/skins/ui/oxide/skin.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?inline';
import contentCss from 'tinymce/skins/content/default/content.min.css?inline';

export default function Scholarships({ scholarships, universities }: { scholarships: any[], universities: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingScholarship, setEditingScholarship] = useState<any>(null);
    const [scholarshipToDelete, setScholarshipToDelete] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        university_id: '',
        study_level: '',
        funding_type: '',
        deadline: '',
        description: '',
    });

    const openCreateModal = () => {
        setEditingScholarship(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (scholarship: any) => {
        setEditingScholarship(scholarship);
        setData({
            title: scholarship.title,
            university_id: scholarship.university_id,
            study_level: scholarship.study_level || '',
            funding_type: scholarship.funding_type || '',
            deadline: scholarship.deadline || '',
            description: scholarship.description || '',
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (scholarship: any) => {
        setScholarshipToDelete(scholarship);
        setIsDeleteModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setScholarshipToDelete(null);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingScholarship) {
            put(route('admin.scholarships.update', editingScholarship.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.scholarships.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteScholarship = () => {
        if (scholarshipToDelete) {
            destroy(route('admin.scholarships.destroy', scholarshipToDelete.id), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    const handleEditorChange = (content: string) => {
        setData('description', content);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Scholarships</h2>}>
            <Head title="Manage Scholarships" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">All Scholarships</h3>
                                <PrimaryButton onClick={openCreateModal}>Add Scholarship</PrimaryButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {scholarships.map((scholarship) => (
                                            <tr key={scholarship.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scholarship.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scholarship.university?.name || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scholarship.study_level}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scholarship.deadline}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openEditModal(scholarship)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                                    <button onClick={() => openDeleteModal(scholarship)} className="text-red-600 hover:text-red-900">Delete</button>
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
                        {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="title" value="Scholarship Title" />
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
                            <InputLabel htmlFor="university_id" value="University" />
                            <select
                                id="university_id"
                                value={data.university_id}
                                onChange={(e) => setData('university_id', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Select University</option>
                                {universities.map((uni) => (
                                    <option key={uni.id} value={uni.id}>{uni.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.university_id} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="study_level" value="Study Level" />
                            <select
                                id="study_level"
                                value={data.study_level}
                                onChange={(e) => setData('study_level', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Select Level</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="PhD">PhD</option>
                                <option value="Vocational">Vocational</option>
                            </select>
                            <InputError message={errors.study_level} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="funding_type" value="Funding Type" />
                            <select
                                id="funding_type"
                                value={data.funding_type}
                                onChange={(e) => setData('funding_type', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Select Funding</option>
                                <option value="Full Funded">Full Funded</option>
                                <option value="Partial">Partial Funding</option>
                                <option value="Self Funded">Self Funded</option>
                            </select>
                            <InputError message={errors.funding_type} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="deadline" value="Deadline" />
                            <TextInput
                                id="deadline"
                                type="date"
                                value={data.deadline}
                                onChange={(e) => setData('deadline', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.deadline} className="mt-2" />
                        </div>

                        <div className="mb-4 col-span-2">
                            <InputLabel htmlFor="description" value="Description (Cover What is Covered, Eligibility, etc.)" />
                            <div className="mt-1">
                                <Editor
                                    licenseKey='gpl'
                                    value={data.description}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help',
                                        skin: false,
                                        content_css: false,
                                        content_style: `${contentUiCss}\n${contentCss}`,
                                    }}
                                    onEditorChange={handleEditorChange}
                                />
                            </div>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>{editingScholarship ? 'Update' : 'Create'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Confirm Deletion</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this scholarship?
                    </p>
                    <div className="mt-6 flex justify-end gap-4">
                        <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteScholarship} disabled={processing}>Delete Scholarship</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
