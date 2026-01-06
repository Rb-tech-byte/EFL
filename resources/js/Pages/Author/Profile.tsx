import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuthorProfile({ profile }: any) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        bio: profile.bio || '',
        avatar: null as File | null,
        website: profile.website || '',
        facebook_url: profile.facebook_url || '',
        twitter_url: profile.twitter_url || '',
        linkedin_url: profile.linkedin_url || '',
        instagram_url: profile.instagram_url || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/author/profile');
    };

    return (
        <AuthenticatedLayout header="My Author Profile">
            <Head title="My Author Profile" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary-600"></div>
                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-8 flex items-end gap-6">
                            <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-bold text-4xl uppercase">
                                        {profile.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="pb-4">
                                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                                <p className="text-gray-500 lowercase">@{profile.name.replace(/\s+/g, '').toLowerCase()}</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-full">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">About You (Bio)</label>
                                    <textarea
                                        value={data.bio}
                                        onChange={e => setData('bio', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all h-32"
                                        placeholder="Write a brief bio about yourself as an author..."
                                    />
                                    {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Author Avatar</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                        accept="image/*"
                                    />
                                    {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Website (URL)</label>
                                    <input
                                        type="url"
                                        value={data.website}
                                        onChange={e => setData('website', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                <div className="col-span-full pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Social Media Links</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                                            <input
                                                type="url"
                                                value={data.facebook_url}
                                                onChange={e => setData('facebook_url', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter / X</label>
                                            <input
                                                type="url"
                                                value={data.twitter_url}
                                                onChange={e => setData('twitter_url', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                            <input
                                                type="url"
                                                value={data.linkedin_url}
                                                onChange={e => setData('linkedin_url', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                                            <input
                                                type="url"
                                                value={data.instagram_url}
                                                onChange={e => setData('instagram_url', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
