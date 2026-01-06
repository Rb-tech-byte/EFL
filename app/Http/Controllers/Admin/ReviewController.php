<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of reviews
     */
    public function index(Request $request)
    {
        $query = BookReview::with(['book', 'user']);

        // Filter by approval status
        if ($request->has('status')) {
            if ($request->status === 'pending') {
                $query->where('is_approved', false);
            } elseif ($request->status === 'approved') {
                $query->where('is_approved', true);
            }
        }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('book', function ($bookQuery) use ($search) {
                    $bookQuery->where('title', 'like', "%{$search}%");
                })
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('review', 'like', "%{$search}%");
            });
        }

        $reviews = $query->latest()->paginate(20)->through(function ($review) {
            return [
                'id' => $review->id,
                'book' => [
                    'id' => $review->book->id,
                    'title' => $review->book->title,
                ],
                'user' => [
                    'id' => $review->user->id,
                    'name' => $review->user->name,
                ],
                'rating' => $review->rating,
                'review' => $review->review,
                'is_approved' => $review->is_approved,
                'created_at' => $review->created_at->format('M d, Y'),
            ];
        });

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Approve a review
     */
    public function approve($id)
    {
        $review = BookReview::findOrFail($id);
        $review->update(['is_approved' => true]);

        // Update book's average rating and review count
        $book = $review->book;
        $approvedReviews = $book->reviews()->approved()->get();
        $book->update([
            'average_rating' => $approvedReviews->avg('rating'),
            'reviews_count' => $approvedReviews->count(),
        ]);

        return back()->with('success', 'Review approved successfully!');
    }

    /**
     * Delete a review
     */
    public function destroy($id)
    {
        $review = BookReview::findOrFail($id);
        $book = $review->book;
        $review->delete();

        // Update book's average rating and review count
        $approvedReviews = $book->reviews()->approved()->get();
        $book->update([
            'average_rating' => $approvedReviews->avg('rating') ?? 0,
            'reviews_count' => $approvedReviews->count(),
        ]);

        return back()->with('success', 'Review deleted successfully!');
    }
}
