import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface MenuLink {
    id: number;
    name: string;
    href: string;
    order: number;
}

interface MenuColumn {
    id: number;
    title: string;
    order: number;
    links: MenuLink[];
}

interface MenuItem {
    id: number;
    name: string;
    order: number;
    is_active: boolean;
    columns: MenuColumn[];
}

export default function MenuIndex({ menuItems }: { menuItems: MenuItem[] }) {
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [editingColumn, setEditingColumn] = useState<MenuColumn | null>(null);
    const [editingLink, setEditingLink] = useState<MenuLink | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<number | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

    // Menu Item Form
    const menuItemForm = useForm({
        name: '',
        order: 0,
        is_active: true,
    });

    // Column Form
    const columnForm = useForm({
        menu_item_id: 0,
        title: '',
        order: 0,
    });

    // Link Form
    const linkForm = useForm({
        menu_column_id: 0,
        name: '',
        href: '',
        order: 0,
    });

    const handleCreateMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        menuItemForm.post(route('admin.menu.store'), {
            onSuccess: () => {
                menuItemForm.reset();
            },
        });
    };

    const handleUpdateMenuItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            menuItemForm.put(route('admin.menu.update', editingItem.id), {
                onSuccess: () => {
                    setEditingItem(null);
                    menuItemForm.reset();
                },
            });
        }
    };

    const handleDeleteMenuItem = (id: number) => {
        if (confirm('Are you sure you want to delete this menu item? All columns and links will be deleted.')) {
            menuItemForm.delete(route('admin.menu.destroy', id));
        }
    };

    const handleCreateColumn = (e: React.FormEvent) => {
        e.preventDefault();
        columnForm.post(route('admin.menu.column.store'), {
            onSuccess: () => {
                columnForm.reset();
                setSelectedMenuItem(null);
            },
        });
    };

    const handleUpdateColumn = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingColumn) {
            columnForm.put(route('admin.menu.column.update', editingColumn.id), {
                onSuccess: () => {
                    setEditingColumn(null);
                    columnForm.reset();
                },
            });
        }
    };

    const handleDeleteColumn = (id: number) => {
        if (confirm('Are you sure you want to delete this column? All links will be deleted.')) {
            columnForm.delete(route('admin.menu.column.destroy', id));
        }
    };

    const handleCreateLink = (e: React.FormEvent) => {
        e.preventDefault();
        linkForm.post(route('admin.menu.link.store'), {
            onSuccess: () => {
                linkForm.reset();
                setSelectedColumn(null);
            },
        });
    };

    const handleUpdateLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            linkForm.put(route('admin.menu.link.update', editingLink.id), {
                onSuccess: () => {
                    setEditingLink(null);
                    linkForm.reset();
                },
            });
        }
    };

    const handleDeleteLink = (id: number) => {
        if (confirm('Are you sure you want to delete this link?')) {
            linkForm.delete(route('admin.menu.link.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Header Menu Management</h2>}>
            <Head title="Menu Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Create Menu Item Form */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-bold mb-4">Add New Menu Item</h3>
                                <form onSubmit={handleCreateMenuItem} className="grid grid-cols-4 gap-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            value={menuItemForm.data.name}
                                            onChange={(e) => menuItemForm.setData('name', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={menuItemForm.errors.name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="order" value="Order" />
                                        <TextInput
                                            id="order"
                                            type="number"
                                            value={menuItemForm.data.order.toString()}
                                            onChange={(e) => menuItemForm.setData('order', parseInt(e.target.value))}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={menuItemForm.data.is_active}
                                                onChange={(e) => menuItemForm.setData('is_active', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Active</span>
                                        </label>
                                    </div>
                                    <div className="flex items-end">
                                        <PrimaryButton disabled={menuItemForm.processing}>Add Menu Item</PrimaryButton>
                                    </div>
                                </form>
                            </div>

                            {/* Menu Items List */}
                            <div className="space-y-6">
                                {menuItems.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-xl font-bold">{item.name}</h3>
                                                <span className={`px-2 py-1 text-xs rounded ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                                <span className="text-sm text-gray-500">Order: {item.order}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setEditingItem(item);
                                                        menuItemForm.setData({
                                                            name: item.name,
                                                            order: item.order,
                                                            is_active: item.is_active,
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </SecondaryButton>
                                                <DangerButton onClick={() => handleDeleteMenuItem(item.id)}>Delete</DangerButton>
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setSelectedMenuItem(item.id);
                                                        columnForm.setData('menu_item_id', item.id);
                                                    }}
                                                >
                                                    + Add Column
                                                </SecondaryButton>
                                            </div>
                                        </div>

                                        {/* Add Column Form */}
                                        {selectedMenuItem === item.id && (
                                            <div className="mb-4 p-3 bg-blue-50 rounded">
                                                <form onSubmit={handleCreateColumn} className="grid grid-cols-4 gap-3">
                                                    <div className="col-span-2">
                                                        <InputLabel htmlFor="column_title" value="Column Title" />
                                                        <TextInput
                                                            id="column_title"
                                                            value={columnForm.data.title}
                                                            onChange={(e) => columnForm.setData('title', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="column_order" value="Order" />
                                                        <TextInput
                                                            id="column_order"
                                                            type="number"
                                                            value={columnForm.data.order.toString()}
                                                            onChange={(e) => columnForm.setData('order', parseInt(e.target.value))}
                                                            className="mt-1 block w-full"
                                                        />
                                                    </div>
                                                    <div className="flex items-end gap-2">
                                                        <PrimaryButton disabled={columnForm.processing}>Add</PrimaryButton>
                                                        <SecondaryButton type="button" onClick={() => setSelectedMenuItem(null)}>Cancel</SecondaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {/* Columns */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {item.columns.map((column) => (
                                                <div key={column.id} className="bg-gray-50 p-3 rounded">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-semibold">{column.title}</h4>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedColumn(column.id);
                                                                    linkForm.setData('menu_column_id', column.id);
                                                                }}
                                                                className="text-xs text-blue-600 hover:text-blue-800"
                                                            >
                                                                + Link
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteColumn(column.id)}
                                                                className="text-xs text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Add Link Form */}
                                                    {selectedColumn === column.id && (
                                                        <div className="mb-2 p-2 bg-white rounded border">
                                                            <form onSubmit={handleCreateLink} className="space-y-2">
                                                                <TextInput
                                                                    placeholder="Link Name"
                                                                    value={linkForm.data.name}
                                                                    onChange={(e) => linkForm.setData('name', e.target.value)}
                                                                    className="block w-full text-sm"
                                                                    required
                                                                />
                                                                <TextInput
                                                                    placeholder="URL (e.g., /universities)"
                                                                    value={linkForm.data.href}
                                                                    onChange={(e) => linkForm.setData('href', e.target.value)}
                                                                    className="block w-full text-sm"
                                                                    required
                                                                />
                                                                <div className="flex gap-2">
                                                                    <PrimaryButton className="text-xs py-1" disabled={linkForm.processing}>Add</PrimaryButton>
                                                                    <SecondaryButton className="text-xs py-1" type="button" onClick={() => setSelectedColumn(null)}>Cancel</SecondaryButton>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    )}

                                                    {/* Links */}
                                                    <ul className="space-y-1">
                                                        {column.links.map((link) => (
                                                            <li key={link.id} className="flex justify-between items-center text-sm">
                                                                <span className="text-gray-700">{link.name}</span>
                                                                <button
                                                                    onClick={() => handleDeleteLink(link.id)}
                                                                    className="text-xs text-red-600 hover:text-red-800"
                                                                >
                                                                    ×
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
