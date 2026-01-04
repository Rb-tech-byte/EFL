import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

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

export default function HomepageSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        hero_title: settings.hero_title?.value || '',
        hero_subtitle: settings.hero_subtitle?.value || '',
        hero_background: settings.hero_background?.value || '',
        hero_background_file: null as File | null,
        featured_section_enabled: settings.featured_section_enabled?.value === 'true' || false,
        testimonials_enabled: settings.testimonials_enabled?.value === 'true' || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.homepage.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Homepage Settings</h2>}>
            <Head title="Homepage Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="hero_title" value="Hero Section Title" />
                                    <Editor
                                        licenseKey='gpl'
                                        value={data.hero_title}
                                        init={{
                                            height: 150,
                                            menubar: false,
                                            plugins: 'link code',
                                            toolbar: 'undo redo | bold italic | removeformat | code',
                                            skin: false,
                                            content_css: false,
                                            content_style: `${contentUiCss}\n${contentCss}`,
                                        }}
                                        onEditorChange={(content) => setData('hero_title', content)}
                                    />
                                    <InputError message={errors.hero_title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hero_subtitle" value="Hero Section Subtitle" />
                                    <Editor
                                        licenseKey='gpl'
                                        value={data.hero_subtitle}
                                        init={{
                                            height: 150,
                                            menubar: false,
                                            plugins: 'link code',
                                            toolbar: 'undo redo | bold italic | removeformat | code',
                                            skin: false,
                                            content_css: false,
                                            content_style: `${contentUiCss}\n${contentCss}`,
                                        }}
                                        onEditorChange={(content) => setData('hero_subtitle', content)}
                                    />
                                    <InputError message={errors.hero_subtitle} className="mt-2" />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Hero Background Image</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="hero_background" value="Option 1: Image URL" />
                                            <TextInput
                                                id="hero_background"
                                                value={data.hero_background}
                                                onChange={(e) => setData('hero_background', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="https://example.com/hero.jpg"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="hero_background_file" value="Option 2: Upload File" />
                                            <input
                                                type="file"
                                                id="hero_background_file"
                                                onChange={(e) => setData('hero_background_file', e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                accept="image/*"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Uploading will override URL</p>
                                        </div>
                                    </div>
                                    <InputError message={errors.hero_background} className="mt-2" />
                                    {data.hero_background && !data.hero_background_file && (
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                            <img src={data.hero_background} alt="Hero Background" className="w-full h-48 object-cover rounded-lg" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            id="featured_section_enabled"
                                            type="checkbox"
                                            checked={data.featured_section_enabled}
                                            onChange={(e) => setData('featured_section_enabled', e.target.checked)}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        />
                                        <label htmlFor="featured_section_enabled" className="ml-2 text-sm text-gray-700">
                                            Enable Featured Section
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="testimonials_enabled"
                                            type="checkbox"
                                            checked={data.testimonials_enabled}
                                            onChange={(e) => setData('testimonials_enabled', e.target.checked)}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        />
                                        <label htmlFor="testimonials_enabled" className="ml-2 text-sm text-gray-700">
                                            Enable Testimonials Section
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Homepage Settings
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
