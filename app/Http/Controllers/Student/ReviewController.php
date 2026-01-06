<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\BookReview;
use App\Models\Book;
use App\Models\UserLibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a new review
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $book = Book::findOrFail($request->book_id);

        // Check if user owns the book
        $ownsBook = UserLibrary::where('user_id', Auth::id())
            ->where('book_id', $book->id)
            ->exists();

        if (!$ownsBook) {
            return back()->with('error', 'You must purchase the book before reviewing it.');
        }

        // Check if user already reviewed this book
        $existingReview = BookReview::where('user_id', Auth::id())
            ->where('book_id', $book->id)
            ->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->update([
                'rating' => $request->rating,
                'review' => $request->review,
                'is_approved' => false, // Reset approval status
            ]);

            return back()->with('success', 'Review updated successfully!');
        }

        // Create new review
        BookReview::create([
            'user_id' => Auth::id(),
            'book_id' => $book->id,
            'rating' => $request->rating,
            'review' => $request->review,
            'is_approved' => false, // Requires admin approval
        ]);

        return back()->with('success', 'Review submitted! It will be visible after approval.');
    }
}
