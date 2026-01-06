import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, universities, scholarships, hero, stats, features, options, counts }: PageProps & { universities: any[], scholarships: any[], hero: any, stats: any[], features: any[], options: any, counts: any }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Use admin-managed backgrounds, fallback to hero.background if backgrounds array is empty
    const sliderImages = (hero.backgrounds && hero.backgrounds.length > 0 && hero.backgrounds[0] !== null)
        ? hero.backgrounds.filter((img: any) => img && img.trim() !== '')
        : [hero.background || 'https://images.unsplash.com/photo-1523050335392-9ae38d19a09e?auto=format&fit=crop&q=80'];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const quickLinks = [
        { name: 'Universities', href: '/universities', icon: '🏛️', count: (counts?.universities > 0 ? counts.universities : universities?.length) + '+' },
        { name: 'Programs', href: '/programs', icon: '🎓', count: (counts?.programs > 0 ? counts.programs : '500') + '+' },
        { name: 'Scholarships', href: '/scholarships', icon: '💰', count: (counts?.scholarships > 0 ? counts.scholarships : scholarships?.length || '10') + '+' },
        { name: 'Expert Advice', href: '/appointments', icon: '🤝', count: 'Free' },
    ];

    return (
        <PublicLayout>
            <Head title="Study Abroad - EducationForLiberty" />

            {/* Premium Hero Slider Section - Reduced Height */}
            <section className="relative h-[45vh] w-full overflow-hidden bg-slate-900">
                {sliderImages.map((img: string, idx: number) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            }`}
                    >
                        {img && <img src={img} alt="Education" className="w-full h-full object-cover opacity-60" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    </div>
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-3xl">
                            {/* Announcement Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/20 border border-primary-500/30 backdrop-blur-md mb-6 animate-fade-in text-white">
                                <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-ping"></span>
                                <span className="text-xs font-bold uppercase tracking-widest">{hero.announcement || 'Announcement'}</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight animate-slide-up" dangerouslySetInnerHTML={{ __html: hero.title }}></h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed animate-slide-up delay-100" dangerouslySetInnerHTML={{ __html: hero.subtitle }}></p>

                            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                                <Link href="/register" className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-xl shadow-primary-500/20 hover:bg-primary-500 hover:scale-105 transition-all text-center">
                                    Apply Now
                                </Link>
                                <Link href="/universities" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-center">
                                    Explore Institutes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                    {sliderImages.map((img: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-primary-500' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Quick Navigation Grid - Minimize Scrolling */}
            <section className="relative -mt-16 z-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickLinks.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.03] transition-all group"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{link.icon}</div>
                                <h3 className="text-lg font-bold text-slate-900">{link.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{link.count} Opportunities</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Summary Bar */}
            <div className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-between gap-8 md:gap-0">
                        {stats.map((stat: any, index: number) => (
                            <div key={index} className="text-center flex-1 min-w-[120px]">
                                <div className="text-3xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-400 font-bold tracking-widest uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Universities - Horizontal Cards */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-slate-900 mb-2">Partner Institutes</h2>
                            <p className="text-slate-500 font-sans">Apply to top institutions globally.</p>
                        </div>
                        <Link href="/universities" className="text-primary-600 font-bold hover:gap-2 transition-all flex items-center gap-1">
                            Browse All <span>→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universities?.slice(0, 6).map((uni: any) => (
                            <Link key={uni.id} href={route('universities.show', uni.slug)} className="group bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all">
                                <div className="aspect-video bg-slate-50 rounded-[1.5rem] mb-6 overflow-hidden relative">
                                    {uni.logo ? (
                                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-indigo-600 opacity-20"></div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-tighter shadow-sm">
                                        Partnered
                                    </div>
                                </div>
                                <div className="px-2 pb-2">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{uni.name}</h3>
                                    <p className="text-sm text-slate-500 font-sans flex items-center gap-1">
                                        📍 {uni.country}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section - Premium Glassmorphism */}
            <section className="py-24 relative overflow-hidden">
                {/* Modern Mesh Background */}
                <div className="absolute inset-0 bg-slate-950">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-primary-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Knowledge Hub</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                                Success Resources <span className="text-primary-500">&</span> Insights
                            </h2>
                            <p className="text-slate-400 text-lg">Curated tools and expert advice designed to accelerate your international academic journey.</p>
                        </div>
                        <Link href="/blog" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all backdrop-blur-md">
                            View All Resources
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'E-Book Marketplace',
                                icon: '📚',
                                gradient: 'from-blue-500/20 to-indigo-500/20',
                                iconBg: 'bg-blue-500/10',
                                iconColor: 'text-blue-400',
                                href: '/shop',
                                desc: 'Gain exclusive access to premium study guides, IELTS journals, and success checklists.'
                            },
                            {
                                name: 'Student Stories',
                                icon: '✍️',
                                gradient: 'from-orange-500/20 to-rose-500/20',
                                iconBg: 'bg-orange-500/10',
                                iconColor: 'text-orange-400',
                                href: '/blog',
                                desc: 'Read inspiring journeys from students who successfully transitioned to their dream universities.'
                            },
                            {
                                name: 'Live Webinars',
                                icon: '📅',
                                gradient: 'from-purple-500/20 to-fuchsia-500/20',
                                iconBg: 'bg-purple-500/10',
                                iconColor: 'text-purple-400',
                                href: '/events',
                                desc: 'Join interactive sessions with university representatives and admission experts.'
                            },
                        ].map((item: any, idx: number) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] transition-all overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 ${item.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">{item.name}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                                    <div className="flex items-center gap-2 text-primary-400 font-bold group-hover:gap-3 transition-all">
                                        Explore <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Epic Modern Invitation */}
            <section className="py-24 px-4 overflow-hidden" id="cta-section">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden text-center">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-primary-50 blur-[80px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 bg-indigo-50 blur-[80px] rounded-full"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-8">{hero.cta_badge || 'Start Your Journey'}</span>
                            <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: hero.cta_title }}></h2>
                            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: hero.cta_subtitle }}></p>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link
                                    href="/register"
                                    className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all text-lg"
                                >
                                    Get Started Now
                                </Link>
                                <Link
                                    href="/appointments"
                                    className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all text-lg flex items-center justify-center gap-2"
                                >
                                    Talk to Counselor
                                </Link>
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-8 items-center text-slate-400 font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="text-primary-500 font-bold">✓</span> Free Assessment
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary-500 font-bold">✓</span> Global Reach
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary-500 font-bold">✓</span> Expert Support
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Core Features - Visual Balance & Premium Grid */}
            <section className="py-32 bg-slate-50/50 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-100/50 blur-[100px] rounded-full -ml-32"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-left">
                            <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-4 block">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: hero.features_title }}></h2>
                            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: hero.features_subtitle }}></p>

                            <div className="grid gap-8">
                                {features.slice(0, 3).map((f: any, i: number) => (
                                    <div key={i} className="group flex gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all">
                                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${f.color || 'bg-primary-50 text-primary-600'} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
                                            {f.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h4>
                                            <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            {/* Decorative Background for Image Grid */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-indigo-100 rounded-[3rem] rotate-3 scale-105 opacity-50"></div>

                            <div className="relative grid grid-cols-2 gap-6 p-4">
                                <div className="space-y-6 pt-16">
                                    <div className="aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-2deg] group">
                                        <img src={hero.features_images?.[0] || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80'} alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-xl border-4 border-white rotate-[3deg] group">
                                        <img src={hero.features_images?.[1] || 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80'} alt="Library" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-[2deg] group">
                                        <img src={hero.features_images?.[2] || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80'} alt="Lecture" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-xl border-4 border-white rotate-[-3deg] group">
                                        <img src={hero.features_images?.[3] || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'} alt="Collaboration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Success Badge */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce-slow hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🏆</div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Success Rate</div>
                                        <div className="text-primary-600 font-display font-bold text-xl">98% Success</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
