import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Editor } from '@tinymce/tinymce-react';

export default function Edit({ application, users, programs }: any) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: application.user_id,
        program_id: application.program_id,
        status: application.status,
        notes: application.notes || '',
        statement: application.data?.statement || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.applications.update', application.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Application #{application.id}</h2>}>
            <Head title={`Edit Application #${application.id}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="user_id" value="Applicant (User)" />
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm bg-gray-100"
                                    disabled // Prevent changing user usually? Or allow. I'll disable to keep it simple as changing user is rare.
                                >
                                    <option value="">Select User</option>
                                    {users.map((user: any) => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="program_id" value="Program" />
                                <select
                                    id="program_id"
                                    value={data.program_id}
                                    onChange={(e) => setData('program_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    disabled // Changing program might invalidate data.
                                >
                                    <option value="">Select Program</option>
                                    {programs.map((prog: any) => (
                                        <option key={prog.id} value={prog.id}>{prog.title} - {prog.university?.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.program_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="under_review">Under Review</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="statement" value="Statement of Purpose" />
                            <div className="mt-1">
                                <Editor
                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                    licenseKey="gpl"
                                    value={data.statement}
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
                                    onEditorChange={(content) => setData('statement', content)}
                                />
                            </div>
                            <InputError message={errors.statement} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="notes" value="Admin Notes" />
                            <div className="mt-1">
                                <Editor
                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js"
                                    licenseKey="gpl"
                                    value={data.notes}
                                    init={{
                                        height: 200,
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
                                    onEditorChange={(content) => setData('notes', content)}
                                />
                            </div>
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        <div className="flex justify-end pt-4 gap-4">
                            <Link href={route('admin.applications.index')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</Link>
                            <PrimaryButton disabled={processing}>Update Application</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
