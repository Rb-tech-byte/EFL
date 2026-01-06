<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\UserLibrary;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LibraryController extends Controller
{
    /**
     * Display user's library
     */
    public function index()
    {
        $library = UserLibrary::with(['book.author.user', 'book.category'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'book' => [
                        'id' => $item->book->id,
                        'title' => $item->book->title,
                        'slug' => $item->book->slug,
                        'description' => $item->book->description,
                        'cover_image' => $item->book->cover_url,
                        'type' => $item->book->type,
                        'format' => $item->book->format,
                        'author' => [
                            'name' => $item->book->author->user->name,
                        ],
                        'category' => $item->book->category ? [
                            'name' => $item->book->category->name,
                        ] : null,
                    ],
                    'download_count' => $item->download_count,
                    'purchased_at' => $item->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Student/Library', [
            'library' => $library,
        ]);
    }

    /**
     * Download a book from library
     */
    public function download($id)
    {
        $libraryItem = UserLibrary::with('book')
            ->where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $book = $libraryItem->book;

        // Increment download count
        $libraryItem->increment('download_count');

        // Check if file exists
        if (!Storage::exists($book->file_path)) {
            return back()->with('error', 'File not found.');
        }

        // Return file download
        return Storage::download($book->file_path, $book->title . '.' . $book->format);
    }
}
