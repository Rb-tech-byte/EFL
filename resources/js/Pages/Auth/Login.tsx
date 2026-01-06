import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Secure Login" />

            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white tracking-widest uppercase">Welcome back</h2>
                <p className="text-gray-400 mt-2 text-sm font-bold uppercase tracking-widest">Access your learning portal</p>
            </div>

            {status && (
                <div className="mb-6 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-sm font-black text-emerald-400 text-center uppercase tracking-widest">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="your@email.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2 px-1">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] font-black text-primary-400 hover:text-primary-300 uppercase tracking-widest transition-colors"
                            >
                                Forgot?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-white/5 border-white/10 rounded-2xl text-white focus:ring-primary-500 focus:border-primary-500 py-4 px-6 font-bold"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', (e.target.checked || false) as false)
                        }
                        className="bg-white/5 border-white/10 rounded-lg text-primary-600 focus:ring-offset-[#1e293b]"
                    />
                    <span className="ms-3 text-xs font-black text-gray-400 uppercase tracking-widest">
                        Stay logged in
                    </span>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Authorizing...' : 'Log In'}
                    </button>
                </div>

                <div className="pt-4 text-center">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
                        New here? {' '}
                        <Link
                            href={route('register')}
                            className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4"
                        >
                            Create an Account
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
