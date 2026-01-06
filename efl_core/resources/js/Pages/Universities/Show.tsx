import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Program {
    id: number;
    title: string;
    slug: string;
    level: string;
    duration: string;
    tuition_fee: number;
}

interface ImportantDate {
    id: number;
    title: string;
    date: string;
}

interface Story {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

interface University {
    id: number;
    name: string;
    slug: string;
    country: string;
    ranking: number;
    description: string;
    logo: string;
    hero_image: string;
    video_url: string;
    website: string;
    university_type: string;
    student_count: number;
    about_content: string;
    academics_content: string;
    admissions_content: string;
    costs_content: string;
    campus_life_content: string;
    important_dates: ImportantDate[];
    stories: Story[];
}

export default function UniversityShow({ university, programs, relatedUniversities }: { university: University; programs: any; relatedUniversities: University[] }) {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedLevel, setSelectedLevel] = useState('Undergraduate');
    const [selectedIntake, setSelectedIntake] = useState('Spring 2026');

    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'academics', label: 'Academics' },
        { id: 'admissions', label: 'Admissions' },
        { id: 'costs', label: 'Costs' },
        { id: 'campus', label: 'Campus Life' },
    ];

    const services = [
        {
            icon: '🔬',
            title: 'Research',
            description: 'Comprehensive research support and facilities to help you excel in your academic pursuits.',
        },
        {
            icon: '📝',
            title: 'Admissions',
            description: 'Personalized admissions guidance to navigate the application process successfully.',
        },
        {
            icon: '🎓',
            title: 'Enrollment',
            description: 'Streamlined enrollment services to ensure a smooth transition to university life.',
        },
    ];

    return (
        <PublicLayout>
            <Head title={university.name} />

            {/* Hero Section */}
            <div className="bg-white pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column */}
                        <div>
                            <h1 className="text-5xl font-serif font-bold text-[#0a1045] mb-6 leading-tight">
                                {university.name}
                            </h1>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Program Level</label>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option>Undergraduate</option>
                                        <option>Graduate</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Intake Term</label>
                                    <select
                                        value={selectedIntake}
                                        onChange={(e) => setSelectedIntake(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option>Spring 2026</option>
                                        <option>Fall 2026</option>
                                        <option>Spring 2027</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div
                                className="text-gray-600 leading-relaxed mb-6 prose prose-blue prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: university.description || `<p>${university.name} is a leading institution committed to academic excellence and innovation. We provide world-class education and research opportunities for international students.</p>` }}
                            />

                            {/* Ranking Badges */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                                    <span className="text-2xl">🏆</span>
                                    <div>
                                        <div className="text-xs text-gray-600">Top Public Schools</div>
                                        <div className="font-bold text-gray-900">#{university.ranking || 'N/A'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                                    <span className="text-2xl">📊</span>
                                    <div>
                                        <div className="text-xs text-gray-600">National Ranking</div>
                                        <div className="font-bold text-gray-900">#{university.ranking || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">📍</span>
                                    <span>{university.country}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">🏛️</span>
                                    <span>{university.university_type || 'Public'} University</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">👥</span>
                                    <span>{university.student_count?.toLocaleString() || '16,000'}+ Students</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Video */}
                        <div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                <img
                                    src={university.hero_image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
                                    alt={university.name}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                                    <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <Link
                                    href="/apply"
                                    className="bg-[#0a1045] text-white text-center py-4 px-6 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                                >
                                    Apply Now
                                </Link>
                                <Link
                                    href="/appointments"
                                    className="bg-white text-[#0a1045] text-center py-4 px-6 rounded-lg font-semibold border-2 border-[#0a1045] hover:bg-gray-50 transition-colors"
                                >
                                    Ask an Advisor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-20 bg-white border-b border-gray-200 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-2 font-semibold text-sm border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    <div className="bg-white rounded-2xl p-8 shadow-sm min-h-[400px]">
                        {activeTab === 'about' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="prose max-w-none text-gray-600">
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">About {university.name}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: university.about_content || '<p>No description available.</p>' }} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'academics' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="prose max-w-none text-gray-600">
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Academics</h2>
                                    <div dangerouslySetInnerHTML={{ __html: university.academics_content || '<p>No academics information available.</p>' }} />
                                </div>
                                {/* Future: List Programs Here */}
                            </div>
                        )}

                        {activeTab === 'admissions' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="prose max-w-none text-gray-600">
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Admissions</h2>
                                    <div dangerouslySetInnerHTML={{ __html: university.admissions_content || '<p>No admissions information available.</p>' }} />
                                </div>

                                {/* Important Dates */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h3>
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                        {university.important_dates && university.important_dates.length > 0 ? university.important_dates.map((item: ImportantDate, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-semibold text-gray-900">{item.title}</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-600 text-sm">{item.date}</span>
                                                    <button className="text-blue-600 text-xs font-semibold hover:text-blue-700 uppercase">
                                                        Add to calendar
                                                    </button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-6 text-center text-gray-500">No important dates available</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'costs' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="prose max-w-none text-gray-600">
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Costs & Scholarship</h2>
                                    <div dangerouslySetInnerHTML={{ __html: university.costs_content || '<p>No cost information available.</p>' }} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'campus' && (
                            <div className="space-y-12 animate-fade-in">
                                <div className="prose max-w-none text-gray-600">
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Campus Life</h2>
                                    <div dangerouslySetInnerHTML={{ __html: university.campus_life_content || '<p>No campus life information available.</p>' }} />
                                </div>

                                {/* Stories */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Stories</h3>
                                    <div className="space-y-6">
                                        {university.stories && university.stories.length > 0 ? university.stories.map((story: Story, index) => (
                                            <div key={index} className="flex flex-col md:flex-row gap-6 bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                                                <img
                                                    src={story.image}
                                                    alt={story.title}
                                                    className="w-full md:w-48 h-32 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                                                    <p className="text-gray-600 mb-3 line-clamp-2">{story.description}</p>
                                                    <Link href="#" className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                                                        Read more →
                                                    </Link>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl">No stories available</div>
                                        )}
                                    </div>
                                </div>

                                {/* Services Section - optional here or about */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Student Services</h3>
                                    <p className="text-gray-600 text-center mb-8">
                                        Supporting you at every stage of your journey.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {services.map((service, index) => (
                                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="text-4xl mb-4">{service.icon}</div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* More Top Universities */}
                    <section>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">More Top Universities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedUniversities.map((uni) => (
                                <Link
                                    key={uni.id}
                                    href={route('universities.show', uni.slug)}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {uni.logo ? (
                                            <img src={uni.logo} alt={uni.name} className="w-16 h-16 object-contain" />
                                        ) : (
                                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl font-bold text-blue-600">
                                                {uni.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {uni.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">{uni.country}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex justify-between">
                                            <span>Ranking:</span>
                                            <span className="font-semibold">#{uni.ranking || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span className="font-semibold">{uni.country}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        Learn more
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
