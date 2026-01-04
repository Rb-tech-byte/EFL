import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
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

export default function PaymentSettings({ settings }: { settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        pesapal_consumer_key: settings.pesapal_consumer_key?.value || '',
        pesapal_consumer_secret: settings.pesapal_consumer_secret?.value || '',
        pesapal_environment: settings.pesapal_environment?.value || 'sandbox',
        offline_payment_enabled: settings.offline_payment_enabled?.value === 'true' || false,
        offline_payment_instructions: settings.offline_payment_instructions?.value || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.payment.update'));
    };

    const handleEditorChange = (content: string) => {
        setData('offline_payment_instructions', content);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payment Gateway Settings</h2>}>
            <Head title="Payment Settings" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Pesapal Settings */}
                                <div className="border-b pb-6">
                                    <h3 className="text-lg font-bold mb-4">Pesapal Configuration</h3>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <InputLabel htmlFor="pesapal_consumer_key" value="Pesapal Consumer Key" />
                                            <TextInput
                                                id="pesapal_consumer_key"
                                                value={data.pesapal_consumer_key}
                                                onChange={(e) => setData('pesapal_consumer_key', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.pesapal_consumer_key} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pesapal_consumer_secret" value="Pesapal Consumer Secret" />
                                            <TextInput
                                                id="pesapal_consumer_secret"
                                                type="password"
                                                value={data.pesapal_consumer_secret}
                                                onChange={(e) => setData('pesapal_consumer_secret', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.pesapal_consumer_secret} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="pesapal_environment" value="Environment" />
                                            <select
                                                id="pesapal_environment"
                                                value={data.pesapal_environment}
                                                onChange={(e) => setData('pesapal_environment', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            >
                                                <option value="sandbox">Sandbox (Testing)</option>
                                                <option value="live">Live (Production)</option>
                                            </select>
                                            <InputError message={errors.pesapal_environment} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Offline Payment Settings */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4">Offline Payment</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="offline_payment_enabled"
                                                type="checkbox"
                                                checked={data.offline_payment_enabled}
                                                onChange={(e) => setData('offline_payment_enabled', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <label htmlFor="offline_payment_enabled" className="ml-2 text-sm text-gray-700">
                                                Enable Offline Payment
                                            </label>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="offline_payment_instructions" value="Offline Payment Instructions" />
                                            <div className="mt-1">
                                                <Editor
                                                    licenseKey='gpl'
                                                    value={data.offline_payment_instructions}
                                                    init={{
                                                        height: 300,
                                                        menubar: false,
                                                        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
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
                                            <p className="mt-1 text-sm text-gray-500">
                                                Provide bank account details or payment instructions for offline payments
                                            </p>
                                            <InputError message={errors.offline_payment_instructions} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Payment Settings
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
