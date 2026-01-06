import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SystemSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name?.value || '',
        site_description: settings.site_description?.value || '',
        site_logo: settings.site_logo?.value || '',
        site_logo_file: null as File | null,
        site_favicon: settings.site_favicon?.value || '',
        site_favicon_file: null as File | null,
        timezone: settings.timezone?.value || 'UTC',
        date_format: settings.date_format?.value || 'Y-m-d',
        time_format: settings.time_format?.value || 'H:i:s',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.system.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">System Settings</h2>}>
            <Head title="System Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="site_name" value="Site Name" />
                                    <TextInput
                                        id="site_name"
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.site_name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="site_description" value="Site Description" />
                                    <textarea
                                        id="site_description"
                                        value={data.site_description}
                                        onChange={(e) => setData('site_description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={3}
                                    />
                                    <InputError message={errors.site_description} className="mt-2" />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Site Logo</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="site_logo" value="Option 1: Image URL" />
                                            <TextInput
                                                id="site_logo"
                                                value={data.site_logo}
                                                onChange={(e) => setData('site_logo', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="https://example.com/logo.png"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="site_logo_file" value="Option 2: Upload File" />
                                            <input
                                                type="file"
                                                id="site_logo_file"
                                                onChange={(e) => setData('site_logo_file', e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                accept="image/*"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Uploading will override URL</p>
                                        </div>
                                    </div>
                                    <InputError message={errors.site_logo} className="mt-2" />
                                    {data.site_logo && !data.site_logo_file && (
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                            <img src={data.site_logo} alt="Logo" className="h-16 object-contain border rounded p-2 bg-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Site Favicon</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="site_favicon" value="Option 1: Image URL" />
                                            <TextInput
                                                id="site_favicon"
                                                value={data.site_favicon}
                                                onChange={(e) => setData('site_favicon', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="site_favicon_file" value="Option 2: Upload File" />
                                            <input
                                                type="file"
                                                id="site_favicon_file"
                                                onChange={(e) => setData('site_favicon_file', e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                accept="image/*"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Uploading will override URL</p>
                                        </div>
                                    </div>
                                    <InputError message={errors.site_favicon} className="mt-2" />
                                    {data.site_favicon && !data.site_favicon_file && (
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                            <img src={data.site_favicon} alt="Favicon" className="h-8 w-8 object-contain border rounded p-1 bg-white" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <InputLabel htmlFor="timezone" value="Timezone" />
                                    <select
                                        id="timezone"
                                        value={data.timezone}
                                        onChange={(e) => setData('timezone', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="Africa/Nairobi">Africa/Nairobi</option>
                                        <option value="America/New_York">America/New_York</option>
                                        <option value="Europe/London">Europe/London</option>
                                        <option value="Asia/Dubai">Asia/Dubai</option>
                                    </select>
                                    <InputError message={errors.timezone} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="date_format" value="Date Format" />
                                        <select
                                            id="date_format"
                                            value={data.date_format}
                                            onChange={(e) => setData('date_format', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option value="Y-m-d">YYYY-MM-DD</option>
                                            <option value="d/m/Y">DD/MM/YYYY</option>
                                            <option value="m/d/Y">MM/DD/YYYY</option>
                                        </select>
                                        <InputError message={errors.date_format} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="time_format" value="Time Format" />
                                        <select
                                            id="time_format"
                                            value={data.time_format}
                                            onChange={(e) => setData('time_format', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        >
                                            <option value="H:i:s">24 Hour</option>
                                            <option value="h:i:s A">12 Hour</option>
                                        </select>
                                        <InputError message={errors.time_format} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save System Settings
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
