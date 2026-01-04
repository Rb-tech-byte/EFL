import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProgramsIndex({ programs, destinations, universitiesList, filters }: { programs: any, destinations: string[], universitiesList: string[], filters: any }) {
    const { data, setData, get, processing } = useForm({
        destination: filters.destination || '',
        university: filters.university || '',
        level: filters.level || '',
        search: filters.search || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('programs.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Programs" />

            {/* Hero Section */}
            <div className="relative bg-[#e0f2fe] pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-purple-100 to-blue-50 opacity-70"></div>
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-[#0a1045] mb-8 leading-tight">
                        Select Any Subject For <br />
                        <span className="text-[#0a1045]">Degree From Any University.</span>
                    </h1>

                    {/* Filter Card */}
                    <div className="bg-[#f0f2f5] rounded-3xl p-6 max-w-5xl mx-auto mt-12 shadow-sm">
                        {/* Tabs */}
                        <div className="flex justify-center mb-6 space-x-2 bg-white inline-flex rounded-full p-1 shadow-sm">
                            <Link href="/universities" className="px-6 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition">Universities</Link>
                            <span className="px-6 py-2 bg-purple-100 text-[#0a1045] font-bold rounded-full">Subjects</span>
                            <Link href="/scholarships" className="px-6 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition">Scholarships</Link>
                        </div>

                        <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-left">
                            <div className="md:col-span-3">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Study Destination *</label>
                                <select
                                    className="w-full rounded-lg border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                    value={data.destination}
                                    onChange={e => setData('destination', e.target.value)}
                                >
                                    <option value="">Sort by Country</option>
                                    {destinations.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Select University</label>
                                <select
                                    className="w-full rounded-lg border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                    value={data.university}
                                    onChange={e => setData('university', e.target.value)}
                                >
                                    <option value="">Any University</option>
                                    {universitiesList.map((uni) => (
                                        <option key={uni} value={uni}>{uni}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Study Level</label>
                                <select
                                    className="w-full rounded-lg border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                    value={data.level}
                                    onChange={e => setData('level', e.target.value)}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit" disabled={processing} className="w-full bg-[#0a1045] hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Use grid for programs */}
            <div className="bg-white py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.data.length > 0 ? (
                            programs.data.map((program: any) => (
                                <div key={program.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
                                    {/* Image Placeholder - use different logic or random gradients */}
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${['from-blue-600 to-indigo-600', 'from-purple-600 to-pink-600', 'from-teal-500 to-emerald-500'][program.id % 3]} opacity-90 group-hover:scale-110 transition-transform duration-700`}></div>

                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                                            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mb-auto border border-white/30 text-white text-2xl">
                                                📚
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col bg-white">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{program.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{program.level}</p>

                                        <div className="space-y-3 mb-6 mt-auto">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span className="mr-2 w-4">🎓</span>
                                                {program.level}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span className="mr-2 w-4">📍</span>
                                                {program.university?.name}, {program.university?.country}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span className="mr-2 w-4">📅</span>
                                                Intake: {program.intake_date || 'Rolling Admissions'}
                                            </div>
                                        </div>

                                        <Link href={route('programs.show', program.slug)} className="text-[#0a1045] font-bold text-sm flex items-center mt-4 group-hover:translate-x-1 transition-transform">
                                            More Details & Subject <span className="ml-1">→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No programs found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {programs.links && programs.links.length > 3 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex flex-wrap gap-2">
                                {programs.links.map((link: any, key: number) => (
                                    <Link
                                        key={key}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.active
                                            ? 'bg-[#0a1045] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
