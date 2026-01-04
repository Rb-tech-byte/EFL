import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, universities, scholarships, hero, stats, features, options }: PageProps & { universities: any[], scholarships: any[], hero: any, stats: any[], features: any[], options: any }) {
    return (
        <PublicLayout>
            <Head title="Welcome" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden">
                {hero.background ? (
                    <div className="absolute inset-0 -z-10">
                        <img src={hero.background} alt="Hero Background" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-secondary-100 blur-3xl opacity-50 animate-pulse delay-1000"></div>
                    </>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary-100 bg-white/50 backdrop-blur-sm mb-8 animate-fade-in shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
                            <span className="text-sm font-medium text-primary-900">New Universities Added Just Now</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight animate-slide-up" dangerouslySetInnerHTML={{ __html: hero.title }}></h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-100" dangerouslySetInnerHTML={{ __html: hero.subtitle }}></p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                            <Link href={auth?.user ? "/dashboard" : "/register"} className="btn-primary w-full sm:w-auto px-8 py-4 text-lg text-center">
                                Start Your Journey
                            </Link>
                            <Link href="/universities" className="px-8 py-4 text-lg font-semibold text-gray-700 hover:text-primary-600 bg-white rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-center">
                                Browse Universities
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Glass Stats Bar */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group hover:-translate-y-1 transition-transform">
                                <div className="text-3xl font-display font-bold text-gradient mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose EducationForLiberty?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We provide end-to-end support for your study abroad journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 bg-white">
                                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Highlight Carousel (Mockup) */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Featured Universities</h2>
                        <p className="text-gray-600">Top ranked institutions partnering with us.</p>
                    </div>
                    <Link href="/universities" className="hidden md:inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                        View All <span className="ml-2">→</span>
                    </Link>
                </div>

                {/* Horizontal Scroll Snap */}
                <div className="flex overflow-x-auto pb-8 gap-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory hide-scrollbar">
                    {universities && universities.length > 0 ? (
                        universities.map((uni) => (
                            <div key={uni.id} className="flex-none w-80 snap-center">
                                <Link href={route('universities.show', uni.slug)}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col cursor-pointer">
                                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                                            {/* Dynamic Placeholder Gradient or Image */}
                                            {uni.logo && uni.logo.startsWith('http') ? (
                                                <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-20 group-hover:scale-110 transition-transform duration-700`}></div>
                                            )}
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-white/50 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                                Top Ranked
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{uni.name}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{uni.country}</p>
                                            <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-4">
                                                <Link href={`/programs?university=${encodeURIComponent(uni.name)}`} className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded hover:bg-primary-100 transition-colors">View Programs</Link>
                                                <Link href={`/programs?university=${encodeURIComponent(uni.name)}`} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                    +
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No universities found. Please check back later.
                        </div>
                    )}
                </div>
            </section>

            {/* Scholarship Highlight Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Latest Scholarships</h2>
                            <p className="text-gray-600">Find funding opportunities for your studies.</p>
                        </div>
                        <Link href="/scholarships" className="hidden md:inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
                            View All <span className="ml-2">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scholarships && scholarships.length > 0 ? (
                            scholarships.map((scholarship: any) => (
                                <div key={scholarship.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                                    <div className="h-48 bg-gradient-to-tr from-purple-500 to-indigo-500 relative overflow-hidden rounded-t-2xl">
                                        {scholarship.university?.logo ? (
                                            <img src={scholarship.university.logo} alt={scholarship.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl">🎓</div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                                            {scholarship.funding_type || 'Scholarship'}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">{scholarship.title}</h3>
                                        <p className="text-sm font-medium text-gray-500 mb-4">{scholarship.university?.name}</p>

                                        <div className="mt-auto space-y-2">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span className="mr-2">📍</span> {scholarship.university?.country || 'International'}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span className="mr-2">🎓</span> {scholarship.study_level || 'All Levels'}
                                            </div>
                                        </div>

                                        <Link href="/scholarships" className="mt-6 w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all text-center">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl">
                                <p className="text-gray-500">No scholarships available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-90"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 relative text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to shape your future?</h2>
                    <p className="text-xl text-blue-100 mb-10">Join thousands of students who have found their dream university through EducationForLiberty.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/register" className="px-8 py-4 bg-white text-primary-900 font-bold rounded-full shadow-xl hover:bg-gray-50 hover:scale-105 transition-all text-center">
                            Create Free Account
                        </Link>
                        <Link href="/contact" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-center">
                            Talk to a Counselor
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout >
    );
}
