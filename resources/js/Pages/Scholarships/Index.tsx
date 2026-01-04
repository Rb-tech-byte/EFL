import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ScholarshipsIndex({ scholarships, destinations, filters }: { scholarships: any, destinations: string[], filters: any }) {
    const { data, setData, get, processing } = useForm({
        destination: filters.destination || '',
        level: filters.level || '',
        search: filters.search || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('scholarships'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Scholarships" />

            {/* Hero Section */}
            <div className="relative bg-[#f8f9fc] pt-32 pb-24 overflow-hidden">
                {/* Background Decoration matching screenshot style (gradient/noise) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 opacity-60"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight">
                        Scholarships System For <br />
                        <span className="text-white drop-shadow-md">Degree From Any University.</span>
                    </h1>

                    {/* Filter Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto mt-12">
                        {/* Tabs (Visual only based on screenshot) */}
                        <div className="flex justify-center mb-6 space-x-2">
                            <span className="px-4 py-2 text-gray-500 font-medium cursor-pointer hover:text-primary-600">Universities</span>
                            <span className="px-4 py-2 text-gray-500 font-medium cursor-pointer hover:text-primary-600">Subjects</span>
                            <span className="px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-full">Scholarships</span>
                        </div>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-left">
                            <div className="md:col-span-5">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Study Destination *</label>
                                <select
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                                    value={data.destination}
                                    onChange={e => setData('destination', e.target.value)}
                                >
                                    <option value="">Sort by Country</option>
                                    {destinations.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-5">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Study Level</label>
                                <select
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                                    value={data.level}
                                    onChange={e => setData('level', e.target.value)}
                                >
                                    <option value="">Post Graduate</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit" disabled={processing} className="w-full bg-[#0a1045] hover:bg-blue-900 text-white font-bold py-3.5 px-6 rounded-full transition-colors shadow-lg">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-gray-50 py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scholarships.data.length > 0 ? (
                            scholarships.data.map((scholarship: any) => (
                                <div key={scholarship.id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
                                    {/* Card Image (Placeholder) */}
                                    <div className="h-56 bg-gradient-to-br from-blue-400 to-cyan-300 relative overflow-hidden">
                                        {/* If university has image use it, else generic */}
                                        {scholarship.university?.logo ? (
                                            <img src={scholarship.university.logo} alt={scholarship.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-6xl font-bold">🎓</div>
                                        )}
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-display font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                                            {scholarship.title}
                                        </h3>
                                        <div className="text-gray-500 text-sm mb-4 font-medium">
                                            {scholarship.university?.name}
                                        </div>

                                        <div className="space-y-2 mb-6 mt-auto">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span className="w-5 text-center mr-2">🌍</span>
                                                {scholarship.university?.country || 'International'}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span className="w-5 text-center mr-2">🎓</span>
                                                {scholarship.study_level || 'All Levels'}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span className="w-5 text-center mr-2">💵</span>
                                                Funding Type : {scholarship.funding_type || 'Full Funded'}
                                            </div>
                                        </div>

                                        <Link href={`/scholarships`} className="inline-flex items-center text-[#0a1045] font-bold text-sm group-hover:translate-x-1 transition-transform">
                                            More Details & Subject
                                            <span className="ml-2">→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900">No scholarships found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {scholarships.links && scholarships.links.length > 3 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex flex-wrap gap-2">
                                {scholarships.links.map((link: any, key: number) => (
                                    <Link
                                        key={key}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.active
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
