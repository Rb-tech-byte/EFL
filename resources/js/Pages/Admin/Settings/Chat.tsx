import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ChatSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        chat_enabled: settings.chat_enabled?.value === 'true' || false,
        pusher_app_id: settings.pusher_app_id?.value || '',
        pusher_key: settings.pusher_key?.value || '',
        pusher_secret: settings.pusher_secret?.value || '',
        pusher_cluster: settings.pusher_cluster?.value || 'mt1',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.chat.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Chat Messenger Settings</h2>}>
            <Head title="Chat Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="flex items-center">
                                    <input
                                        id="chat_enabled"
                                        type="checkbox"
                                        checked={data.chat_enabled}
                                        onChange={(e) => setData('chat_enabled', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <label htmlFor="chat_enabled" className="ml-2 text-sm text-gray-700">
                                        Enable Real-time Chat
                                    </label>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">Pusher Configuration</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="pusher_app_id" value="Pusher App ID" />
                                            <TextInput
                                                id="pusher_app_id"
                                                value={data.pusher_app_id}
                                                onChange={(e) => setData('pusher_app_id', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.pusher_app_id} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pusher_key" value="Pusher Key" />
                                            <TextInput
                                                id="pusher_key"
                                                value={data.pusher_key}
                                                onChange={(e) => setData('pusher_key', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.pusher_key} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pusher_secret" value="Pusher Secret" />
                                            <TextInput
                                                id="pusher_secret"
                                                type="password"
                                                value={data.pusher_secret}
                                                onChange={(e) => setData('pusher_secret', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.pusher_secret} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pusher_cluster" value="Pusher Cluster" />
                                            <TextInput
                                                id="pusher_cluster"
                                                value={data.pusher_cluster}
                                                onChange={(e) => setData('pusher_cluster', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="mt1"
                                            />
                                            <InputError message={errors.pusher_cluster} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Chat Settings
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
