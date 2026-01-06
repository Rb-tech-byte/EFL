import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Apply({ program, application, auth }: any) {
    const steps = ['Personal Details', 'Academic History', 'Documents', 'Review'];

    // Initial data setup
    const { data, setData, post, processing, errors, transform } = useForm({
        _method: 'PATCH',
        current_step: application.current_step || 1,
        submit: false,
        data: {
            first_name: application.data?.first_name || auth.user.name.split(' ')[0] || '',
            last_name: application.data?.last_name || (auth.user.name.split(' ').length > 1 ? auth.user.name.split(' ').slice(1).join(' ') : ''),
            email: application.data?.email || auth.user.email || '',
            phone: application.data?.phone || '',
            dob: application.data?.dob || '',
            gender: application.data?.gender || '',
            nationality: application.data?.nationality || '',
            passport_no: application.data?.passport_no || '',
            address: application.data?.address || '',

            prev_institution: application.data?.prev_institution || '',
            prev_qualification: application.data?.prev_qualification || '',
            completion_year: application.data?.completion_year || '',
            gpa: application.data?.gpa || '',

            statement: application.data?.statement || '',

            // Files
            passport_file: null as File | null,
            transcript_file: null as File | null,
            english_test_file: null as File | null,

            // Saved paths
            passport_path: application.data?.passport_path || '',
            transcript_path: application.data?.transcript_path || '',
            english_test_path: application.data?.english_test_path || '',
        }
    });

    const updateField = (field: string, value: any) => {
        setData('data', { ...data.data, [field]: value });
    };

    const handleFileChange = (field: string, e: any) => {
        if (e.target.files && e.target.files[0]) {
            updateField(field, e.target.files[0]);
        }
    };

    const nextStep = () => {
        if (data.current_step < steps.length) {
            // Save progress
            post(route('application.update', application.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setData('current_step', data.current_step + 1);
                }
            });
        }
    };

    const prevStep = () => {
        if (data.current_step > 1) {
            setData('current_step', data.current_step - 1);
        }
    };

    const finalSubmit = () => {
        transform((data) => ({
            ...data,
            submit: true
        }));

        post(route('application.update', application.id));
    };

    const renderStep = () => {
        switch (data.current_step) {
            case 1:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="first_name" value="First Name" />
                            <TextInput id="first_name" value={data.data.first_name} onChange={e => updateField('first_name', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="last_name" value="Last Name" />
                            <TextInput id="last_name" value={data.data.last_name} onChange={e => updateField('last_name', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput id="email" value={data.data.email} readOnly className="mt-1 block w-full bg-gray-100" />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <TextInput id="phone" value={data.data.phone} onChange={e => updateField('phone', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="dob" value="Date of Birth" />
                            <TextInput id="dob" type="date" value={data.data.dob} onChange={e => updateField('dob', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="gender" value="Gender" />
                            <select
                                value={data.data.gender}
                                onChange={e => updateField('gender', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel htmlFor="nationality" value="Nationality" />
                            <TextInput id="nationality" value={data.data.nationality} onChange={e => updateField('nationality', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="passport_no" value="Passport Number" />
                            <TextInput id="passport_no" value={data.data.passport_no} onChange={e => updateField('passport_no', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="address" value="Full Address" />
                            <textarea
                                value={data.data.address}
                                onChange={e => updateField('address', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <h3 className="font-semibold text-lg mb-2">Previous Education</h3>
                        </div>
                        <div>
                            <InputLabel htmlFor="prev_institution" value="Institution Name" />
                            <TextInput id="prev_institution" value={data.data.prev_institution} onChange={e => updateField('prev_institution', e.target.value)} className="mt-1 block w-full" placeholder="e.g. High School Name" />
                        </div>
                        <div>
                            <InputLabel htmlFor="prev_qualification" value="Qualification" />
                            <TextInput id="prev_qualification" value={data.data.prev_qualification} onChange={e => updateField('prev_qualification', e.target.value)} className="mt-1 block w-full" placeholder="e.g. A Levels, IB, HSC" />
                        </div>
                        <div>
                            <InputLabel htmlFor="completion_year" value="Completion Year" />
                            <TextInput id="completion_year" value={data.data.completion_year} onChange={e => updateField('completion_year', e.target.value)} className="mt-1 block w-full" />
                        </div>
                        <div>
                            <InputLabel htmlFor="gpa" value="GPA / Percentage" />
                            <TextInput id="gpa" value={data.data.gpa} onChange={e => updateField('gpa', e.target.value)} className="mt-1 block w-full" />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="statement" value="Statement of Purpose" />
                            <textarea
                                value={data.data.statement}
                                onChange={e => updateField('statement', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-md shadow-sm h-32"
                                placeholder="Why do you want to study this program?"
                            />
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-lg mb-4">Documents Upload</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="border p-4 rounded bg-gray-50">
                                    <InputLabel htmlFor="passport_file" value="Passport Copy" />
                                    <input type="file" id="passport_file" onChange={e => handleFileChange('passport_file', e)} className="mt-2" />
                                    {data.data.passport_path && <p className="text-green-600 text-sm mt-1">✓ File uploaded: <a href={data.data.passport_path} target="_blank" className="underline">View</a></p>}
                                </div>

                                <div className="border p-4 rounded bg-gray-50">
                                    <InputLabel htmlFor="transcript_file" value="Academic Transcripts" />
                                    <input type="file" id="transcript_file" onChange={e => handleFileChange('transcript_file', e)} className="mt-2" />
                                    {data.data.transcript_path && <p className="text-green-600 text-sm mt-1">✓ File uploaded: <a href={data.data.transcript_path} target="_blank" className="underline">View</a></p>}
                                </div>

                                <div className="border p-4 rounded bg-gray-50">
                                    <InputLabel htmlFor="english_test_file" value="English Test Result (IELTS/TOEFL)" />
                                    <input type="file" id="english_test_file" onChange={e => handleFileChange('english_test_file', e)} className="mt-2" />
                                    {data.data.english_test_path && <p className="text-green-600 text-sm mt-1">✓ File uploaded: <a href={data.data.english_test_path} target="_blank" className="underline">View</a></p>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Review Application</h3>
                        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><span className="font-bold">Name:</span> {data.data.first_name} {data.data.last_name}</div>
                                <div><span className="font-bold">Email:</span> {data.data.email}</div>
                                <div><span className="font-bold">Program:</span> {program.title}</div>
                                <div><span className="font-bold">University:</span> {program.university.name}</div>
                            </div>
                            <hr />
                            <div>
                                <span className="font-bold">Statement:</span>
                                <p className="text-sm mt-1">{data.data.statement || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="font-bold">Documents:</span>
                                <ul className="list-disc pl-5 mt-1">
                                    <li>Passport: {data.data.passport_path ? 'Uploaded' : 'Pending'}</li>
                                    <li>Transcripts: {data.data.transcript_path ? 'Uploaded' : 'Pending'}</li>
                                    <li>English Test: {data.data.english_test_path ? 'Uploaded' : 'Pending'}</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">By clicking Submit, you confirm that all information is accurate.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Apply for {program.title}</h2>}>
            <Head title={`Apply - ${program.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            {steps.map((step, index) => (
                                <div key={index} className={`text-sm font-medium ${index + 1 === data.current_step ? 'text-primary-600' : 'text-gray-500'}`}>
                                    {index + 1}. {step}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(data.current_step / steps.length) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {renderStep()}

                        <div className="mt-8 flex justify-between">
                            <SecondaryButton onClick={prevStep} disabled={data.current_step === 1 || processing}>
                                Previous
                            </SecondaryButton>

                            {data.current_step < steps.length ? (
                                <PrimaryButton onClick={nextStep} disabled={processing}>
                                    Next Step
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton onClick={finalSubmit} disabled={processing} className="bg-primary-600 hover:bg-primary-700">
                                    Submit Application
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
