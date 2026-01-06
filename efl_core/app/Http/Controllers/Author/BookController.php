<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the author's books
     */
    public function index()
    {
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        $books = Book::with('category')
            ->where('author_id', $author->id)
            ->latest()
            ->paginate(12)
            ->through(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'slug' => $book->slug,
                    'cover_image' => $book->cover_url,
                    'type' => $book->type,
                    'format' => $book->format,
                    'price' => $book->price,
                    'formatted_price' => $book->formatted_price,
                    'status' => $book->status,
                    'downloads' => $book->downloads,
                    'average_rating' => $book->average_rating,
                    'reviews_count' => $book->reviews_count,
                    'category' => $book->category ? $book->category->name : null,
                    'created_at' => $book->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Author/Books/Index', [
            'books' => $books,
        ]);
    }

    /**
     * Show the form for creating a new book
     */
    public function create()
    {
        $categories = BookCategory::active()->get();

        return Inertia::render('Author/Books/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created book
     */
    public function store(Request $request)
    {
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:book_categories,id',
            'type' => 'required|in:ebook,novel,magazine,audiobook',
            'format' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_free' => 'boolean',
            'cover_image' => 'required|image|max:2048',
            'file' => 'required|file|max:51200', // 50MB max
            'preview_file' => 'nullable|file|max:10240', // 10MB max
            'isbn' => 'nullable|string|max:20',
            'pages' => 'nullable|integer',
            'language' => 'nullable|string|max:50',
            'publisher' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'allow_reviews' => 'boolean',
            'screenshot_protected' => 'boolean',
        ]);

        $data = $request->except(['cover_image', 'file', 'preview_file']);
        $data['author_id'] = $author->id;
        $data['slug'] = Str::slug($request->title) . '-' . Str::random(6);
        $data['status'] = 'pending'; // Requires admin approval

        // Upload cover image
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('books/covers', 'public');
        }

        // Upload book file
        if ($request->hasFile('file')) {
            $data['file_path'] = $request->file('file')->store('books/files', 'public');
        }

        // Upload preview file
        if ($request->hasFile('preview_file')) {
            $data['preview_file'] = $request->file('preview_file')->store('books/previews', 'public');
        }

        Book::create($data);

        return redirect()->route('author.books.index')->with('success', 'Book uploaded successfully! Awaiting admin approval.');
    }

    /**
     * Display the specified book
     */
    public function show($id)
    {
        $author = Auth::user()->authorProfile;

        $book = Book::with(['category', 'reviews.user'])
            ->where('author_id', $author->id)
            ->findOrFail($id);

        return Inertia::render('Author/Books/Show', [
            'book' => [
                'id' => $book->id,
                'title' => $book->title,
                'slug' => $book->slug,
                'description' => $book->description,
                'cover_image' => $book->cover_url,
                'type' => $book->type,
                'format' => $book->format,
                'price' => $book->price,
                'is_free' => $book->is_free,
                'isbn' => $book->isbn,
                'pages' => $book->pages,
                'language' => $book->language,
                'publisher' => $book->publisher,
                'published_date' => $book->published_date?->format('Y-m-d'),
                'status' => $book->status,
                'downloads' => $book->downloads,
                'average_rating' => $book->average_rating,
                'reviews_count' => $book->reviews_count,
                'tags' => $book->tags,
                'allow_reviews' => $book->allow_reviews,
                'screenshot_protected' => $book->screenshot_protected,
                'category' => $book->category,
                'reviews' => $book->reviews->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'review' => $review->review,
                        'user' => $review->user->name,
                        'is_approved' => $review->is_approved,
                        'created_at' => $review->created_at->format('M d, Y'),
                    ];
                }),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified book
     */
    public function edit($id)
    {
        $author = Auth::user()->authorProfile;

        $book = Book::where('author_id', $author->id)->findOrFail($id);
        $categories = BookCategory::active()->get();

        return Inertia::render('Author/Books/Edit', [
            'book' => $book,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified book
     */
    public function update(Request $request, $id)
    {
        $author = Auth::user()->authorProfile;

        $book = Book::where('author_id', $author->id)->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:book_categories,id',
            'type' => 'required|in:ebook,novel,magazine,audiobook',
            'format' => 'required|string',
            'price' => 'required|numeric|min:0',
            'is_free' => 'boolean',
            'cover_image' => 'nullable|image|max:2048',
            'file' => 'nullable|file|max:51200',
            'preview_file' => 'nullable|file|max:10240',
            'isbn' => 'nullable|string|max:20',
            'pages' => 'nullable|integer',
            'language' => 'nullable|string|max:50',
            'publisher' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'allow_reviews' => 'boolean',
            'screenshot_protected' => 'boolean',
        ]);

        $data = $request->except(['cover_image', 'file', 'preview_file']);

        // Upload new cover image
        if ($request->hasFile('cover_image')) {
            if ($book->cover_image) {
                Storage::delete($book->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('books/covers', 'public');
        }

        // Upload new book file
        if ($request->hasFile('file')) {
            if ($book->file_path) {
                Storage::delete($book->file_path);
            }
            $data['file_path'] = $request->file('file')->store('books/files', 'public');
        }

        // Upload new preview file
        if ($request->hasFile('preview_file')) {
            if ($book->preview_file) {
                Storage::delete($book->preview_file);
            }
            $data['preview_file'] = $request->file('preview_file')->store('books/previews', 'public');
        }

        $book->update($data);

        return redirect()->route('author.books.index')->with('success', 'Book updated successfully!');
    }

    /**
     * Remove the specified book
     */
    public function destroy($id)
    {
        $author = Auth::user()->authorProfile;

        $book = Book::where('author_id', $author->id)->findOrFail($id);

        // Delete files
        if ($book->cover_image) {
            Storage::delete($book->cover_image);
        }
        if ($book->file_path) {
            Storage::delete($book->file_path);
        }
        if ($book->preview_file) {
            Storage::delete($book->preview_file);
        }

        $book->delete();

        return redirect()->route('author.books.index')->with('success', 'Book deleted successfully!');
    }
}
