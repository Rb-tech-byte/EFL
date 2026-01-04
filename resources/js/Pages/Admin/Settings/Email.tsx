import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EmailSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        mail_driver: settings.mail_driver?.value || 'smtp',
        mail_host: settings.mail_host?.value || '',
        mail_port: settings.mail_port?.value || '587',
        mail_username: settings.mail_username?.value || '',
        mail_password: settings.mail_password?.value || '',
        mail_encryption: settings.mail_encryption?.value || 'tls',
        mail_from_address: settings.mail_from_address?.value || '',
        mail_from_name: settings.mail_from_name?.value || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.email.update'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Email Server Configuration</h2>}>
            <Head title="Email Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="mail_driver" value="Mail Driver" />
                                    <select
                                        id="mail_driver"
                                        value={data.mail_driver}
                                        onChange={(e) => setData('mail_driver', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="smtp">SMTP</option>
                                        <option value="sendmail">Sendmail</option>
                                        <option value="mailgun">Mailgun</option>
                                        <option value="ses">Amazon SES</option>
                                    </select>
                                    <InputError message={errors.mail_driver} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="mail_host" value="Mail Host" />
                                        <TextInput
                                            id="mail_host"
                                            value={data.mail_host}
                                            onChange={(e) => setData('mail_host', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="smtp.gmail.com"
                                        />
                                        <InputError message={errors.mail_host} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="mail_port" value="Mail Port" />
                                        <TextInput
                                            id="mail_port"
                                            value={data.mail_port}
                                            onChange={(e) => setData('mail_port', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="587"
                                        />
                                        <InputError message={errors.mail_port} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="mail_username" value="Mail Username" />
                                    <TextInput
                                        id="mail_username"
                                        value={data.mail_username}
                                        onChange={(e) => setData('mail_username', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.mail_username} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="mail_password" value="Mail Password" />
                                    <TextInput
                                        id="mail_password"
                                        type="password"
                                        value={data.mail_password}
                                        onChange={(e) => setData('mail_password', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.mail_password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="mail_encryption" value="Encryption" />
                                    <select
                                        id="mail_encryption"
                                        value={data.mail_encryption}
                                        onChange={(e) => setData('mail_encryption', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="tls">TLS</option>
                                        <option value="ssl">SSL</option>
                                        <option value="">None</option>
                                    </select>
                                    <InputError message={errors.mail_encryption} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="mail_from_address" value="From Email Address" />
                                        <TextInput
                                            id="mail_from_address"
                                            type="email"
                                            value={data.mail_from_address}
                                            onChange={(e) => setData('mail_from_address', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="noreply@example.com"
                                        />
                                        <InputError message={errors.mail_from_address} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="mail_from_name" value="From Name" />
                                        <TextInput
                                            id="mail_from_name"
                                            value={data.mail_from_name}
                                            onChange={(e) => setData('mail_from_name', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="EducationForLiberty"
                                        />
                                        <InputError message={errors.mail_from_name} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Email Settings
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
