<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BookCategoryController extends Controller
{
    public function index()
    {
        $categories = BookCategory::withCount('books')
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Books/Categories', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        BookCategory::create($validated);

        return back()->with('success', 'Category created successfully');
    }

    public function update(Request $request, BookCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($validated['name'] !== $category->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return back()->with('success', 'Category updated successfully');
    }

    public function destroy(BookCategory $category)
    {
        if ($category->books()->count() > 0) {
            return back()->with('error', 'Cannot delete category with associated books');
        }

        $category->delete();
        return back()->with('success', 'Category deleted successfully');
    }
}
