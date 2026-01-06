<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\MenuColumn;
use App\Models\MenuLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::with(['columns.links'])->orderBy('order')->get();

        return Inertia::render('Admin/Menu/Index', [
            'menuItems' => $menuItems,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $menuItem = MenuItem::create($validated);

        return back()->with('success', 'Menu item created successfully');
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $menuItem->update($validated);

        return back()->with('success', 'Menu item updated successfully');
    }

    public function destroy($id)
    {
        MenuItem::findOrFail($id)->delete();
        return back()->with('success', 'Menu item deleted successfully');
    }

    // Column management
    public function storeColumn(Request $request)
    {
        $validated = $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        MenuColumn::create($validated);

        return back()->with('success', 'Column created successfully');
    }

    public function updateColumn(Request $request, $id)
    {
        $column = MenuColumn::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $column->update($validated);

        return back()->with('success', 'Column updated successfully');
    }

    public function destroyColumn($id)
    {
        MenuColumn::findOrFail($id)->delete();
        return back()->with('success', 'Column deleted successfully');
    }

    // Link management
    public function storeLink(Request $request)
    {
        $validated = $request->validate([
            'menu_column_id' => 'required|exists:menu_columns,id',
            'name' => 'required|string|max:255',
            'href' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        MenuLink::create($validated);

        return back()->with('success', 'Link created successfully');
    }

    public function updateLink(Request $request, $id)
    {
        $link = MenuLink::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'href' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $link->update($validated);

        return back()->with('success', 'Link updated successfully');
    }

    public function destroyLink($id)
    {
        MenuLink::findOrFail($id)->delete();
        return back()->with('success', 'Link deleted successfully');
    }
}
