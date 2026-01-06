import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce/tinymce';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/ui/oxide/skin.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?inline';
import contentCss from 'tinymce/skins/content/default/content.min.css?inline';

export default function PostIndex({ posts }: { posts: any }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        content: '',
        status: 'draft',
        image: '',
    });

    const openCreateModal = () => {
        setEditingPost(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (blogPost: any) => {
        setEditingPost(blogPost);
        setData({
            title: blogPost.title,
            content: blogPost.content || '',
            status: blogPost.status,
            image: blogPost.image || '',
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPost) {
            put(route('admin.posts.update', editingPost.id), {
                onSuccess: () => setShowModal(false)
            });
        } else {
            post(route('admin.posts.store'), {
                onSuccess: () => setShowModal(false)
            });
        }
    };

    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('admin.posts.destroy', id));
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title', className: 'font-semibold' },
        { header: 'Author', accessor: 'author.name', render: (row: any) => row.author?.name || 'Unknown' },
        { header: 'Date', render: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Status',
            render: (row: any) => {
                let variant: any = 'gray';
                if (row.status === 'published') variant = 'green';
                return <Badge variant={variant}>{row.status.toUpperCase()}</Badge>;
            }
        },
    ];

    return (
        <AuthenticatedLayout header="Blog Posts">
            <Head title="Blog Management" />

            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
                    <PrimaryButton onClick={openCreateModal}>
                        + New Post
                    </PrimaryButton>
                </div>

                <Card>
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={posts.data}
                            pagination={posts}
                            actions={(row) => (
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => openEditModal(row)}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deletePost(row.id)}
                                        className="text-rose-600 hover:text-rose-900 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                </Card>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="2xl">
                <form onSubmit={submit} className="p-6">
                    <h3 className="text-lg font-bold mb-6">
                        {editingPost ? 'Edit Post' : 'Create New Post'}
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Post Title" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full text-lg"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="image" value="Featured Image URL" />
                                <TextInput
                                    id="image"
                                    className="mt-1 block w-full"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                    placeholder="https://..."
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="content" value="Post Content" className="mb-2" />
                            <Editor
                                licenseKey='gpl'
                                value={data.content}
                                init={{
                                    height: 400,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | image link code help',
                                    skin: false,
                                    content_css: false,
                                    content_style: `${contentUiCss}\n${contentCss}`,
                                }}
                                onEditorChange={(content) => setData('content', content)}
                            />
                            <InputError message={errors.content} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingPost ? 'Update Post' : 'Publish Post'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
