import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function FirebaseSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        firebase_api_key: settings.firebase_api_key?.value || '',
        firebase_auth_domain: settings.firebase_auth_domain?.value || '',
        firebase_project_id: settings.firebase_project_id?.value || '',
        firebase_storage_bucket: settings.firebase_storage_bucket?.value || '',
        firebase_messaging_sender_id: settings.firebase_messaging_sender_id?.value || '',
        firebase_app_id: settings.firebase_app_id?.value || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.firebase.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Firebase Configuration</h2>}>
            <Head title="Firebase Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="firebase_api_key" value="Firebase API Key" />
                                    <TextInput
                                        id="firebase_api_key"
                                        value={data.firebase_api_key}
                                        onChange={(e) => setData('firebase_api_key', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.firebase_api_key} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="firebase_auth_domain" value="Auth Domain" />
                                    <TextInput
                                        id="firebase_auth_domain"
                                        value={data.firebase_auth_domain}
                                        onChange={(e) => setData('firebase_auth_domain', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="your-app.firebaseapp.com"
                                    />
                                    <InputError message={errors.firebase_auth_domain} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="firebase_project_id" value="Project ID" />
                                    <TextInput
                                        id="firebase_project_id"
                                        value={data.firebase_project_id}
                                        onChange={(e) => setData('firebase_project_id', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.firebase_project_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="firebase_storage_bucket" value="Storage Bucket" />
                                    <TextInput
                                        id="firebase_storage_bucket"
                                        value={data.firebase_storage_bucket}
                                        onChange={(e) => setData('firebase_storage_bucket', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="your-app.appspot.com"
                                    />
                                    <InputError message={errors.firebase_storage_bucket} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="firebase_messaging_sender_id" value="Messaging Sender ID" />
                                    <TextInput
                                        id="firebase_messaging_sender_id"
                                        value={data.firebase_messaging_sender_id}
                                        onChange={(e) => setData('firebase_messaging_sender_id', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.firebase_messaging_sender_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="firebase_app_id" value="App ID" />
                                    <TextInput
                                        id="firebase_app_id"
                                        value={data.firebase_app_id}
                                        onChange={(e) => setData('firebase_app_id', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.firebase_app_id} className="mt-2" />
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Firebase Settings
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
