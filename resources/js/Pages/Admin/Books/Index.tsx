import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Badge from '@/Components/Badge';
import RichTextEditor from '@/Components/RichTextEditor';
import { useState } from 'react';

export default function AdminBooksIndex({ books, authors, categories }: any) {
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        author_id: '',
        category_id: '',
        description: '',
        type: 'ebook',
        price: 0,
        is_free: false,
        status: 'pending',
        cover_image: '',
        file_path: '',
    });

    const openCreateModal = () => {
        setEditingBook(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (book: any) => {
        setEditingBook(book);
        setData({
            title: book.title || '',
            author_id: book.author_id || '',
            category_id: book.category_id || '',
            description: book.description || '',
            type: book.type || 'ebook',
            price: book.price || 0,
            is_free: !!book.is_free,
            status: book.status || 'pending',
            cover_image: book.cover_image || '',
            file_path: book.file_path || '',
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            put(route('admin.books.update', editingBook.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.books.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deleteBook = (id: number) => {
        if (confirm('Are you sure you want to delete this book?')) {
            destroy(route('admin.books.destroy', id));
        }
    };

    const togglePublish = (id: number, status: string) => {
        const action = status === 'published' ? 'unpublish' : 'publish';
        if (confirm(`Are you sure you want to ${action} this book?`)) {
            router.patch(route(`admin.books.${action}`, id));
        }
    };

    return (
        <AuthenticatedLayout header="Manage Books">
            <Head title="Manage Books" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Management</h1>
                        <p className="text-gray-600">Overview of all content in the marketplace.</p>
                    </div>
                    <PrimaryButton onClick={openCreateModal}>
                        + Add New Book
                    </PrimaryButton>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Book</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Author</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Category</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Price</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Revenue</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {books.data.length > 0 ? books.data.map((book: any) => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                    {book.cover_image ? (
                                                        <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">📖</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 truncate">{book.title}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{book.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{book.author_name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{book.category_name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {book.is_free ? 'Free' : `$${book.price}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">${book.total_revenue || 0}</p>
                                            <p className="text-[10px] text-gray-500">{book.sales_count || 0} sales</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase ${book.status === 'published' ? 'bg-green-100 text-green-700' :
                                                book.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => togglePublish(book.id, book.status)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${book.status === 'published' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                                        }`}
                                                >
                                                    {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(book)}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-bold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteBook(book.id)}
                                                    className="text-rose-600 hover:text-rose-900 text-sm font-bold"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center text-gray-500 font-medium italic">No books found. Add your first book to get started!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="2xl">
                <form onSubmit={submit} className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
                        {editingBook ? '✏️ Edit Book' : '📚 Add New Book'}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Book Title" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="author_id" value="Author" />
                                <select
                                    id="author_id"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.author_id}
                                    onChange={(e) => setData('author_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select Author</option>
                                    {authors.map((author: any) => (
                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.author_id} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="category_id" value="Category" />
                                <select
                                    id="category_id"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category: any) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Full Description" />
                            <RichTextEditor
                                id="description"
                                value={data.description}
                                onChange={(content) => setData('description', content)}
                                placeholder="Enter full book description..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="type" value="Content Type" />
                                <select
                                    id="type"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    required
                                >
                                    <option value="ebook">E-Book</option>
                                    <option value="audiobook">Audio Book</option>
                                    <option value="course">Course</option>
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price ($)" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                                    required={!data.is_free}
                                    disabled={data.is_free}
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div className="flex items-center pt-8">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={data.is_free}
                                            onChange={(e) => setData('is_free', e.target.checked)}
                                        />
                                        <div className={`w-10 h-6 rounded-full transition-colors ${data.is_free ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${data.is_free ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Mark as Free</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="status" value="Publishing Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm h-12"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option value="pending">Pending Review</option>
                                    <option value="published">Published</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="cover_image" value="Cover Image URL" />
                                <TextInput
                                    id="cover_image"
                                    className="mt-1 block w-full"
                                    value={data.cover_image}
                                    onChange={(e) => setData('cover_image', e.target.value)}
                                    placeholder="https://..."
                                />
                                <InputError message={errors.cover_image} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="file_path" value="Upload/File Path (Optional for now)" />
                            <TextInput
                                id="file_path"
                                className="mt-1 block w-full"
                                value={data.file_path}
                                onChange={(e) => setData('file_path', e.target.value)}
                                placeholder="storage/books/..."
                            />
                            <InputError message={errors.file_path} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3 border-t pt-6">
                        <SecondaryButton onClick={() => setShowModal(false)} className="px-6">Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="px-8 bg-indigo-600 hover:bg-indigo-700">
                            {editingBook ? 'Update Details' : 'Save Book'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
