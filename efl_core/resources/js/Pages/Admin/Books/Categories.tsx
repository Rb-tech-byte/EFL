import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function AdminBookCategories({ categories }: any) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        icon: '',
        order: 0,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingCategory(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (category: any) => {
        setEditingCategory(category);
        setData({
            name: category.name || '',
            description: category.description || '',
            icon: category.icon || '',
            order: category.order || 0,
            is_active: !!category.is_active,
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.book-categories.update', editingCategory.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.book-categories.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('admin.book-categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="Book Categories">
            <Head title="Book Categories" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
                        <p className="text-gray-600">Organize books by genre or topic.</p>
                    </div>
                    <PrimaryButton onClick={openCreateModal}>
                        + Add New Category
                    </PrimaryButton>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Category</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Books</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Order</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.length > 0 ? categories.map((category: any) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                                                    {category.icon || '📁'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{category.name}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{category.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{category.books_count}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">{category.order}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${category.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {category.is_active ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => openEditModal(category)}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-bold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteCategory(category.id)}
                                                    className="text-rose-600 hover:text-rose-900 text-sm font-bold dropdown-ignore"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-500 font-medium italic">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="lg">
                <form onSubmit={submit} className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
                        {editingCategory ? '✏️ Edit Category' : '📁 Create Category'}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Category Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="icon" value="Icon (Emoji or CSS Class)" />
                                <TextInput
                                    id="icon"
                                    className="mt-1 block w-full"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="e.g. 📙, 🎧, 🎓"
                                />
                                <InputError message={errors.icon} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="order" value="Display Order" />
                                <TextInput
                                    id="order"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                />
                                <InputError message={errors.order} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <div className={`w-10 h-6 rounded-full transition-colors ${data.is_active ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${data.is_active ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Visible in Store</span>
                            </label>
                            <InputError message={errors.is_active} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3 border-t pt-6">
                        <SecondaryButton onClick={() => setShowModal(false)} className="px-6">Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="px-8 bg-indigo-600 hover:bg-indigo-700">
                            {editingCategory ? 'Update Category' : 'Create Category'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
