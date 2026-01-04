import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
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
import 'tinymce/skins/ui/oxide/skin.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?inline';
import contentCss from 'tinymce/skins/content/default/content.min.css?inline';

interface University {
    id: number;
    name: string;
    slug: string;
    country: string;
    ranking: number;
    description: string;
    logo: string;
    hero_image: string;
    video_url: string;
    website: string;
    university_type: string;
    student_count: number;
    about_content: string;
    academics_content: string;
    admissions_content: string;
    costs_content: string;
    campus_life_content: string;
    important_dates: any[];
    stories: any[];
}

export default function Universities({ universities }: { universities: University[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUni, setEditingUni] = useState<University | null>(null);
    const [activeTab, setActiveTab] = useState('basic');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        country: '',
        ranking: '',
        description: '',
        logo: '',
        logo_file: null as File | null,
        hero_image: '',
        hero_image_file: null as File | null,
        video_url: '',
        website: '',
        university_type: 'Public',
        student_count: '',
        about_content: '',
        academics_content: '',
        admissions_content: '',
        costs_content: '',
        campus_life_content: '',
    });

    const openModal = (uni: University | null = null) => {
        if (uni) {
            setEditingUni(uni);
            setData({
                name: uni.name || '',
                country: uni.country || '',
                ranking: uni.ranking?.toString() || '',
                description: uni.description || '',
                logo: uni.logo || '',
                logo_file: null,
                hero_image: uni.hero_image || '',
                hero_image_file: null,
                video_url: uni.video_url || '',
                website: uni.website || '',
                university_type: uni.university_type || 'Public',
                student_count: uni.student_count?.toString() || '',
                about_content: uni.about_content || '',
                academics_content: uni.academics_content || '',
                admissions_content: uni.admissions_content || '',
                costs_content: uni.costs_content || '',
                campus_life_content: uni.campus_life_content || '',
            });
        } else {
            setEditingUni(null);
            reset();
        }
        setIsModalOpen(true);
        setActiveTab('basic');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUni(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUni) {
            if (data.logo_file || data.hero_image_file) {
                router.post(route('admin.universities.update', editingUni.id), {
                    _method: 'put',
                    ...data,
                }, {
                    onSuccess: () => closeModal(),
                });
            } else {
                put(route('admin.universities.update', editingUni.id), {
                    onSuccess: () => closeModal(),
                });
            }
        } else {
            post(route('admin.universities.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteUniversity = (id: number) => {
        if (confirm('Are you sure you want to delete this university?')) {
            router.delete(route('admin.universities.destroy', id));
        }
    };

    const tinymceConfig = {
        height: 300,
        menubar: false,
        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        skin: false,
        content_css: false,
        content_style: `${contentUiCss}\n${contentCss}`,
    };

    const tabs = [
        { id: 'basic', label: '📋 Basic Info', description: 'Name, country, and general details' },
        { id: 'about', label: '📖 About', description: 'About section content' },
        { id: 'academics', label: '🎓 Academics', description: 'Academic programs and offerings' },
        { id: 'admissions', label: '✅ Admissions', description: 'Admission requirements and process' },
        { id: 'costs', label: '💰 Costs', description: 'Tuition and financial information' },
        { id: 'campus', label: '🏫 Campus Life', description: 'Student life and facilities' },
        { id: 'media', label: '🖼️ Media', description: 'Images and videos' },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Universities Management</h2>}>
            <Head title="Universities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">All Universities</h3>
                                    <p className="text-sm text-gray-500 mt-1">Manage university profiles and information</p>
                                </div>
                                <PrimaryButton onClick={() => openModal()}>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add University
                                    </span>
                                </PrimaryButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {universities.map((uni) => (
                                            <tr key={uni.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {uni.logo ? (
                                                            <img src={uni.logo} alt={uni.name} className="h-10 w-10 rounded-full mr-3 object-cover" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full mr-3 bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                                {uni.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div className="text-sm font-medium text-gray-900">{uni.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{uni.country}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${uni.university_type === 'Private' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {uni.university_type || 'Public'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{uni.ranking || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{uni.student_count?.toLocaleString() || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <SecondaryButton onClick={() => openModal(uni)} className="mr-2">Edit</SecondaryButton>
                                                    <DangerButton onClick={() => deleteUniversity(uni.id)}>Delete</DangerButton>
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

            {/* Full-Screen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

                        <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl">
                            <form onSubmit={submit} className="flex flex-col max-h-[90vh]">
                                {/* Header */}
                                <div className="bg-indigo-600 px-6 py-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white">
                                            {editingUni ? '✏️ Edit University' : '➕ Add New University'}
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {editingUni && (
                                        <p className="mt-2 text-sm text-indigo-100">
                                            Editing: {editingUni.name}
                                        </p>
                                    )}
                                </div>

                                {/* Tabs Navigation */}
                                <div className="border-b border-gray-200 bg-gray-50 px-6">
                                    <div className="flex space-x-1 overflow-x-auto">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium hover:bg-gray-100 focus:z-10 transition-colors ${activeTab === tab.id
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                <span className="whitespace-nowrap">{tab.label}</span>
                                                {activeTab === tab.id && (
                                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Area with Scroll */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="px-6 py-6">
                                        {/* Tab Description */}
                                        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                                            <p className="text-sm text-blue-800">
                                                <span className="font-semibold">📌 </span>
                                                {tabs.find(t => t.id === activeTab)?.description}
                                            </p>
                                        </div>

                                        {/* Basic Info Tab */}
                                        {activeTab === 'basic' && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <InputLabel htmlFor="name" value="University Name *" />
                                                        <TextInput
                                                            id="name"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="e.g., Harvard University"
                                                            required
                                                        />
                                                        <InputError message={errors.name} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="country" value="Country *" />
                                                        <TextInput
                                                            id="country"
                                                            value={data.country}
                                                            onChange={(e) => setData('country', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="e.g., United States"
                                                            required
                                                        />
                                                        <InputError message={errors.country} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <InputLabel htmlFor="university_type" value="University Type" />
                                                        <select
                                                            id="university_type"
                                                            value={data.university_type}
                                                            onChange={(e) => setData('university_type', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        >
                                                            <option value="Public">Public</option>
                                                            <option value="Private">Private</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="ranking" value="National Ranking" />
                                                        <TextInput
                                                            id="ranking"
                                                            type="number"
                                                            value={data.ranking}
                                                            onChange={(e) => setData('ranking', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="e.g., 15"
                                                        />
                                                        <InputError message={errors.ranking} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="student_count" value="Total Students" />
                                                        <TextInput
                                                            id="student_count"
                                                            type="number"
                                                            value={data.student_count}
                                                            onChange={(e) => setData('student_count', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="e.g., 16000"
                                                        />
                                                        <InputError message={errors.student_count} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="website" value="Official Website" />
                                                    <TextInput
                                                        id="website"
                                                        value={data.website}
                                                        onChange={(e) => setData('website', e.target.value)}
                                                        className="mt-1 block w-full"
                                                        placeholder="https://www.university.edu"
                                                    />
                                                    <InputError message={errors.website} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="description" value="Short Description" />
                                                    <textarea
                                                        id="description"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        rows={4}
                                                        placeholder="Brief overview of the university (2-3 sentences)"
                                                    />
                                                    <InputError message={errors.description} className="mt-2" />
                                                    <p className="mt-1 text-xs text-gray-500">This appears on the university card and hero section</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* About Tab */}
                                        {activeTab === 'about' && (
                                            <div>
                                                <InputLabel value="About Section Content" />
                                                <p className="text-sm text-gray-500 mb-3">Detailed information about the university's history, mission, and values</p>
                                                <Editor
                                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                                    licenseKey="gpl"
                                                    value={data.about_content}
                                                    init={tinymceConfig}
                                                    onEditorChange={(content) => setData('about_content', content)}
                                                />
                                            </div>
                                        )}

                                        {/* Academics Tab */}
                                        {activeTab === 'academics' && (
                                            <div>
                                                <InputLabel value="Academics Section Content" />
                                                <p className="text-sm text-gray-500 mb-3">Information about academic programs, departments, and research opportunities</p>
                                                <Editor
                                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                                    licenseKey="gpl"
                                                    value={data.academics_content}
                                                    init={tinymceConfig}
                                                    onEditorChange={(content) => setData('academics_content', content)}
                                                />
                                            </div>
                                        )}

                                        {/* Admissions Tab */}
                                        {activeTab === 'admissions' && (
                                            <div>
                                                <InputLabel value="Admissions Section Content" />
                                                <p className="text-sm text-gray-500 mb-3">Admission requirements, application process, and deadlines</p>
                                                <Editor
                                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                                    licenseKey="gpl"
                                                    value={data.admissions_content}
                                                    init={tinymceConfig}
                                                    onEditorChange={(content) => setData('admissions_content', content)}
                                                />
                                            </div>
                                        )}

                                        {/* Costs Tab */}
                                        {activeTab === 'costs' && (
                                            <div>
                                                <InputLabel value="Costs & Financial Aid Content" />
                                                <p className="text-sm text-gray-500 mb-3">Tuition fees, living costs, scholarships, and financial aid information</p>
                                                <Editor
                                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                                    licenseKey="gpl"
                                                    value={data.costs_content}
                                                    init={tinymceConfig}
                                                    onEditorChange={(content) => setData('costs_content', content)}
                                                />
                                            </div>
                                        )}

                                        {/* Campus Life Tab */}
                                        {activeTab === 'campus' && (
                                            <div>
                                                <InputLabel value="Campus Life Content" />
                                                <p className="text-sm text-gray-500 mb-3">Student activities, housing, dining, sports, and campus facilities</p>
                                                <Editor
                                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                                    licenseKey="gpl"
                                                    value={data.campus_life_content}
                                                    init={tinymceConfig}
                                                    onEditorChange={(content) => setData('campus_life_content', content)}
                                                />
                                            </div>
                                        )}

                                        {/* Media Tab */}
                                        {activeTab === 'media' && (
                                            <div className="space-y-6">
                                                {/* Logo Section */}
                                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">University Logo</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <InputLabel htmlFor="logo" value="Option 1: Image URL" />
                                                            <TextInput
                                                                id="logo"
                                                                value={data.logo}
                                                                onChange={(e) => setData('logo', e.target.value)}
                                                                className="mt-1 block w-full"
                                                                placeholder="https://example.com/logo.png"
                                                            />
                                                            <InputError message={errors.logo} className="mt-2" />
                                                        </div>
                                                        <div>
                                                            <InputLabel htmlFor="logo_file" value="Option 2: Upload File" />
                                                            <div className="mt-1 flex items-center">
                                                                <input
                                                                    type="file"
                                                                    id="logo_file"
                                                                    onChange={(e) => setData('logo_file', e.target.files ? e.target.files[0] : null)}
                                                                    className="block w-full text-sm text-gray-500
                                                                    file:mr-4 file:py-2 file:px-4
                                                                    file:rounded-full file:border-0
                                                                    file:text-sm file:font-semibold
                                                                    file:bg-indigo-50 file:text-indigo-700
                                                                    hover:file:bg-indigo-100"
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-2">Uploading a file will override the URL field.</p>
                                                        </div>
                                                    </div>
                                                    {data.logo && !data.logo_file && (
                                                        <div className="mt-4">
                                                            <p className="text-xs text-gray-500 mb-2">Current Preview:</p>
                                                            <img src={data.logo} alt="Logo preview" className="h-20 w-20 object-contain border rounded-lg p-2 bg-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Hero Image Section */}
                                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Hero/Banner Image</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <InputLabel htmlFor="hero_image" value="Option 1: Image URL" />
                                                            <TextInput
                                                                id="hero_image"
                                                                value={data.hero_image}
                                                                onChange={(e) => setData('hero_image', e.target.value)}
                                                                className="mt-1 block w-full"
                                                                placeholder="https://example.com/hero.jpg"
                                                            />
                                                            <InputError message={errors.hero_image} className="mt-2" />
                                                        </div>
                                                        <div>
                                                            <InputLabel htmlFor="hero_image_file" value="Option 2: Upload File" />
                                                            <div className="mt-1 flex items-center">
                                                                <input
                                                                    type="file"
                                                                    id="hero_image_file"
                                                                    onChange={(e) => setData('hero_image_file', e.target.files ? e.target.files[0] : null)}
                                                                    className="block w-full text-sm text-gray-500
                                                                    file:mr-4 file:py-2 file:px-4
                                                                    file:rounded-full file:border-0
                                                                    file:text-sm file:font-semibold
                                                                    file:bg-indigo-50 file:text-indigo-700
                                                                    hover:file:bg-indigo-100"
                                                                    accept="image/*"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-2">Uploading a file will override the URL field.</p>
                                                        </div>
                                                    </div>
                                                    {data.hero_image && !data.hero_image_file && (
                                                        <div className="mt-4">
                                                            <p className="text-xs text-gray-500 mb-2">Current Preview:</p>
                                                            <img src={data.hero_image} alt="Hero preview" className="w-full h-48 object-cover rounded-lg" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="video_url" value="Campus Tour Video URL" />
                                                    <TextInput
                                                        id="video_url"
                                                        value={data.video_url}
                                                        onChange={(e) => setData('video_url', e.target.value)}
                                                        className="mt-1 block w-full"
                                                        placeholder="https://youtube.com/watch?v=..."
                                                    />
                                                    <InputError message={errors.video_url} className="mt-2" />
                                                    <p className="mt-1 text-xs text-gray-500">YouTube or Vimeo URL for campus tour video</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer with Actions */}
                                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            {activeTab !== 'basic' && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const currentIndex = tabs.findIndex(t => t.id === activeTab);
                                                        if (currentIndex > 0) {
                                                            setActiveTab(tabs[currentIndex - 1].id);
                                                        }
                                                    }}
                                                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                                                >
                                                    ← Previous
                                                </button>
                                            )}
                                        </p>
                                        <div className="flex gap-3">
                                            <SecondaryButton type="button" onClick={closeModal}>Cancel</SecondaryButton>
                                            {activeTab !== tabs[tabs.length - 1].id ? (
                                                <SecondaryButton
                                                    type="button"
                                                    onClick={() => {
                                                        const currentIndex = tabs.findIndex(t => t.id === activeTab);
                                                        if (currentIndex < tabs.length - 1) {
                                                            setActiveTab(tabs[currentIndex + 1].id);
                                                        }
                                                    }}
                                                >
                                                    Next →
                                                </SecondaryButton>
                                            ) : null}
                                            <PrimaryButton disabled={processing}>
                                                {processing ? 'Saving...' : (editingUni ? '💾 Update University' : '✨ Create University')}
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
