<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display user's wishlist
     */
    public function index()
    {
        $wishlist = Wishlist::with(['book.author.user', 'book.category'])
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
                        'price' => $item->book->price,
                        'formatted_price' => $item->book->formatted_price,
                        'is_free' => $item->book->is_free,
                        'average_rating' => $item->book->average_rating,
                        'author' => [
                            'name' => $item->book->author->user->name,
                        ],
                        'category' => $item->book->category ? [
                            'name' => $item->book->category->name,
                        ] : null,
                    ],
                    'added_at' => $item->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Student/Wishlist', [
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Add book to wishlist
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        // Check if already in wishlist
        $exists = Wishlist::where('user_id', Auth::id())
            ->where('book_id', $request->book_id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Book already in wishlist.');
        }

        Wishlist::create([
            'user_id' => Auth::id(),
            'book_id' => $request->book_id,
        ]);

        return back()->with('success', 'Book added to wishlist!');
    }

    /**
     * Remove book from wishlist
     */
    public function destroy($id)
    {
        Wishlist::where('user_id', Auth::id())
            ->where('id', $id)
            ->delete();

        return back()->with('success', 'Book removed from wishlist.');
    }
}
