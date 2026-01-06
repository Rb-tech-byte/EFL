import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';

export default function BecomeAuthor() {
    const { data, setData, post, processing, errors } = useForm({
        pen_name: '',
        bio: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('student.submit-author'));
    };

    return (
        <AuthenticatedLayout header="Become an Author">
            <Head title="Become an Author" />

            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Share Your Knowledge with the World</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join our community of expert authors and educators. Build your brand, reach thousands of students, and earn from your expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">📚</div>
                        <h3 className="font-bold text-gray-900 mb-2">Publish Easily</h3>
                        <p className="text-sm text-gray-500 text-balance">Our intuitive platform makes uploading and managing your books a breeze.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">💰</div>
                        <h3 className="font-bold text-gray-900 mb-2">Earn Revenue</h3>
                        <p className="text-sm text-gray-500 text-balance">Receive 70% of every sale. We handle the payments and distribution for you.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">🌍</div>
                        <h3 className="font-bold text-gray-900 mb-2">Global Reach</h3>
                        <p className="text-sm text-gray-500 text-balance">Your work will be visible to thousands of students and lifelong learners globally.</p>
                    </div>
                </div>

                <Card className="p-8 border-t-4 border-t-indigo-600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Author Application</h2>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="pen_name" value="Pen Name / Professional Name" />
                            <TextInput
                                id="pen_name"
                                className="mt-1 block w-full"
                                value={data.pen_name}
                                onChange={(e) => setData('pen_name', e.target.value)}
                                placeholder="How you want to be known as an author..."
                                required
                            />
                            <InputError message={errors.pen_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Author Bio" />
                            <textarea
                                id="bio"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-32"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Tell us about yourself and your expertise..."
                                required
                            />
                            <InputError message={errors.bio} className="mt-2" />
                            <p className="mt-2 text-xs text-gray-500 italic">This will be displayed on your author profile after approval.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Agreement</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                By submitting this application, you agree to our Author Terms of Service. You confirm that all work uploaded will be your original content and that you hold all necessary rights. All submissions are subject to editorial review.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton className="px-10 py-3 text-lg h-auto" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit My Application'}
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
