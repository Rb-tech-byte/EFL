import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white tracking-widest uppercase">Join Us</h2>
                <p className="text-gray-400 mt-2 text-sm font-bold uppercase tracking-widest">Start your journey today</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="John Doe"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="your@email.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Choose Password</label>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Confirm Password</label>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                        placeholder="••••••••"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>

                <div className="pt-4 text-center">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
                        Already have an account? {' '}
                        <Link
                            href={route('login')}
                            className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
