<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\BookReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of book reviews for the author.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $author = $user->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        $reviews = BookReview::with(['user', 'book'])
            ->whereHas('book', function ($query) use ($author) {
                $query->where('author_id', $author->id);
            })
            ->latest()
            ->paginate(15)
            ->through(function ($review) {
                return [
                    'id' => $review->id,
                    'book_title' => $review->book->title,
                    'user_name' => $review->user->name,
                    'rating' => $review->rating,
                    'comment' => $review->review,
                    'date' => $review->created_at->format('M d, Y'),
                    'response' => $review->response, // Authors might respond in the future
                ];
            });

        return Inertia::render('Author/Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }
}
