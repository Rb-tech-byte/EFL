import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import { useState, FormEvent } from 'react';

export default function Universities({ universities, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(route('student.universities'), { search }, { preserveState: true, preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Explore Universities</h2>}>
            <Head title="Universities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Search Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <TextInput
                                type="text"
                                className="w-full md:w-1/2"
                                placeholder="Search by name or country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition">
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Universities Grid */}
                    {universities.data.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-xl">No universities found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {universities.data.map((uni: any) => (
                                <Link key={uni.id} href={route('universities.show', uni.slug)} className="block group">
                                    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition duration-300 border border-transparent hover:border-primary-200">
                                        <div className="h-32 bg-gray-100 relative">
                                            {/* Hero Placeholder or Image if available */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 flex items-center">
                                                <div className="w-16 h-16 bg-white rounded-lg p-1 shadow-md">
                                                    {uni.logo ? (
                                                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl">🎓</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 pt-6">
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition">{uni.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">📍 {uni.location}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{uni.programs_count} Programs</span>
                                                <span className="text-sm font-medium text-primary-600">View Details →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {universities.links && universities.links.length > 3 && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex gap-1">
                                {universities.links.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 border rounded-md text-sm ${link.active
                                                ? 'bg-primary-600 text-white border-primary-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
