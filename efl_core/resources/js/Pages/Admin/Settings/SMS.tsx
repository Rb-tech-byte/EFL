import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SMSSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        sms_provider: settings.sms_provider?.value || 'twilio',
        twilio_sid: settings.twilio_sid?.value || '',
        twilio_token: settings.twilio_token?.value || '',
        twilio_from: settings.twilio_from?.value || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.sms.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SMS Settings</h2>}>
            <Head title="SMS Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="sms_provider" value="SMS Provider" />
                                    <select
                                        id="sms_provider"
                                        value={data.sms_provider}
                                        onChange={(e) => setData('sms_provider', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="twilio">Twilio</option>
                                        <option value="nexmo">Nexmo</option>
                                        <option value="africastalking">Africa's Talking</option>
                                    </select>
                                    <InputError message={errors.sms_provider} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="twilio_sid" value="Twilio Account SID" />
                                    <TextInput
                                        id="twilio_sid"
                                        value={data.twilio_sid}
                                        onChange={(e) => setData('twilio_sid', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.twilio_sid} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="twilio_token" value="Twilio Auth Token" />
                                    <TextInput
                                        id="twilio_token"
                                        type="password"
                                        value={data.twilio_token}
                                        onChange={(e) => setData('twilio_token', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.twilio_token} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="twilio_from" value="From Phone Number" />
                                    <TextInput
                                        id="twilio_from"
                                        value={data.twilio_from}
                                        onChange={(e) => setData('twilio_from', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="+1234567890"
                                    />
                                    <InputError message={errors.twilio_from} className="mt-2" />
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save SMS Settings
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
