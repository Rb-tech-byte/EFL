<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Book;
use App\Models\Author;
use App\Models\BookCategory;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with(['author.user', 'category'])
            ->latest()
            ->paginate(10)
            ->through(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'type' => $book->type,
                    'status' => $book->status,
                    'price' => $book->price,
                    'is_free' => $book->is_free,
                    'cover_image' => $book->cover_image,
                    'author_name' => $book->author->pen_name ?? $book->author->user->name,
                    'category_name' => $book->category->name ?? 'Uncategorized',
                    'sales_count' => $book->orderItems()->count(),
                    'total_revenue' => $book->orderItems()->sum('price'),
                ];
            });

        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
            'authors' => Author::with('user')->get()->map(fn($a) => ['id' => $a->id, 'name' => $a->pen_name ?? $a->user->name]),
            'categories' => BookCategory::active()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:book_categories,id',
            'description' => 'required|string',
            'type' => 'required|string|in:ebook,audiobook,course',
            'price' => 'required|numeric|min:0',
            'is_free' => 'required|boolean',
            'status' => 'required|string|in:pending,published,rejected',
            'cover_image' => 'nullable|string',
            'file_path' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        Book::create($validated);

        return back()->with('success', 'Book created successfully');
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:book_categories,id',
            'description' => 'required|string',
            'type' => 'required|string|in:ebook,audiobook,course',
            'price' => 'required|numeric|min:0',
            'is_free' => 'required|boolean',
            'status' => 'required|string|in:pending,published,rejected',
            'cover_image' => 'nullable|string',
            'file_path' => 'nullable|string',
        ]);

        if ($validated['title'] !== $book->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        }

        $book->update($validated);

        return back()->with('success', 'Book updated successfully');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return back()->with('success', 'Book deleted successfully');
    }

    public function publish(Book $book)
    {
        $book->update(['status' => 'published']);
        return back()->with('success', 'Book published successfully');
    }

    public function unpublish(Book $book)
    {
        $book->update(['status' => 'pending']);
        return back()->with('success', 'Book unpublished successfully');
    }
}
