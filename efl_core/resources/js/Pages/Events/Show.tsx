import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const IconCalendar = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconClock = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconMapPin = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconGlobe = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>;
const IconVideo = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const IconUsers = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconCheckCircle = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconArrowRight = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const IconShare = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;
const IconCalendarCheck = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16l2 2 4-4" /></svg>;

export default function EventShow({ event }: { event: any }) {
    const isOnline = event.type?.toLowerCase() === 'webinar' || event.location?.toLowerCase().includes('online') || event.location?.toLowerCase().includes('zoom');

    return (
        <PublicLayout>
            <Head title={event.title} />

            <div className="bg-slate-50 min-h-screen">
                {/* Hero Header */}
                <div className="bg-slate-900 pt-32 pb-64 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -ml-64 -mb-64"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className="bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                    {event.type || 'Webinar'}
                                </span>
                                <div className="flex items-center text-slate-400 gap-2 text-sm font-medium">
                                    <IconUsers className="w-4 h-4" />
                                    Live Session
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-8">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-slate-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                                        <IconCalendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</div>
                                        <div className="font-bold text-white">{new Date(event.start_time).toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shadow-inner">
                                        <IconClock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Time</div>
                                        <div className="font-bold text-white">{new Date(event.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-50 pb-6">About this Event</h3>
                                <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-sans">
                                    {event.description?.split('\n').map((para: string, i: number) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>

                                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                                        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                            <IconCheckCircle className="w-5 h-5" />
                                            What you'll learn
                                        </h4>
                                        <ul className="space-y-3 text-sm text-blue-800 font-medium">
                                            <li>• Comprehensive university selection guide</li>
                                            <li>• Application process & documentation</li>
                                            <li>• Scholarship & funding opportunities</li>
                                        </ul>
                                    </div>
                                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <IconShare className="w-5 h-5 text-slate-400" />
                                            Share event
                                        </h4>
                                        <div className="flex gap-2">
                                            {['Link', 'Twi', 'Fac'].map(s => (
                                                <button key={s} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <IconGlobe className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg mb-1">Global Reach</h4>
                                        <p className="text-slate-500 text-sm">Open to students from all countries interested in international education.</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <IconVideo className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg mb-1">Recording</h4>
                                        <p className="text-slate-500 text-sm">Registrants will receive a link to the session recording via email.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Registration Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-200/50 border border-blue-50 sticky top-12">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Reserve your spot</h3>
                                <p className="text-slate-500 text-sm mb-8 font-medium">Limited capacity available for this session.</p>

                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <IconMapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            {isOnline ? 'Online via Zoom' : event.location}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <IconCalendarCheck className="w-5 h-5" />
                                        </div>
                                        <div>Free Registration</div>
                                    </div>
                                </div>

                                {event.link ? (
                                    <a
                                        href={event.link}
                                        target="_blank"
                                        className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold text-center flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/30 group"
                                    >
                                        Register via External Link
                                        <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                ) : (
                                    <PrimaryButton className="w-full py-5 rounded-[1.5rem] justify-center text-lg">
                                        Confirm Attendance
                                    </PrimaryButton>
                                )}

                                <p className="text-center text-slate-400 text-xs mt-6 font-medium">
                                    By registering, you agree to our terms of service and privacy policy.
                                </p>
                            </div>

                            {/* Help Box */}
                            <div className="bg-indigo-900 rounded-[2rem] p-8 text-white">
                                <h4 className="font-bold text-xl mb-3">Need Help?</h4>
                                <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                                    If you have trouble registering or accessing the event, contact our support team.
                                </p>
                                <button className="text-white font-bold text-sm bg-white/10 w-full py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                    support@efl-global.com
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
