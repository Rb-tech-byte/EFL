import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface Program {
    id: number;
    title: string;
    slug: string;
    level: string;
    duration: string;
    tuition_fee: string;
    description: string;
    requirements: string[] | null;
    intake_date: string;
    university: {
        id: number;
        name: string;
        slug: string;
        logo: string;
        country: string;
    };
}

export default function ProgramShow({ program, relatedPrograms }: { program: Program; relatedPrograms: Program[] }) {
    return (
        <PublicLayout>
            <Head title={program.title} />

            {/* Hero Section */}
            <div className="bg-[#0a1045] pt-32 pb-16 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${program.level === 'Undergraduate' ? 'bg-blue-500 text-white' :
                                    program.level === 'Graduate' ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
                                    }`}>
                                    {program.level}
                                </span>
                                <Link href={route('universities.show', program.university.slug)} className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                                    <span className="text-sm font-semibold">{program.university.name}</span>
                                </Link>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                                {program.title}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">🕒</span>
                                    <span>Duration: {program.duration || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">💰</span>
                                    <span>Tuition: {program.tuition_fee || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">📅</span>
                                    <span>Next Intake: {program.intake_date ? new Date(program.intake_date).toLocaleDateString() : 'Rolling'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 flex flex-col justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                                <div className="text-center mb-6">
                                    <img src={program.university.logo} alt={program.university.name} className="h-16 w-auto mx-auto object-contain bg-white rounded p-1 mb-3" />
                                    <Link href={route('universities.show', program.university.slug)} className="text-sm font-semibold hover:underline">
                                        View University Profile
                                    </Link>
                                </div>
                                <Link href={route('application.create', { program_id: program.id })} className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mb-4">
                                    Apply Now
                                </Link>
                                <Link href="/contact" className="block w-full bg-white text-[#0a1045] text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                    Request Information
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Program Overview</h2>
                                <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: program.description || '<p>No description available.</p>' }} />
                            </section>

                            {/* Requirements */}
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Admission Requirements</h2>
                                {program.requirements && Array.isArray(program.requirements) && program.requirements.length > 0 ? (
                                    <ul className="space-y-3">
                                        {program.requirements.map((req, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-600">
                                                <span className="mt-1 text-green-500">✓</span>
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">Please contact the university for specific admission requirements.</p>
                                )}
                            </section>
                        </div>

                        {/* Sidebar - Related Programs */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Other Programs at {program.university.name}</h3>
                            <div className="space-y-4">
                                {relatedPrograms.length > 0 ? relatedPrograms.map((rp) => (
                                    <Link key={rp.id} href={route('programs.show', rp.slug)} className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                        <div className="text-xs font-semibold text-blue-600 mb-1 uppercase">{rp.level}</div>
                                        <h4 className="font-bold text-gray-900 mb-2">{rp.title}</h4>
                                        <div className="text-xs text-gray-500">
                                            {rp.duration}
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-gray-500 text-sm">No other programs listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
