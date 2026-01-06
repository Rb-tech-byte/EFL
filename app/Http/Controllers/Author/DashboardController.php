<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\OrderItem;
use App\Models\BookReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display author dashboard
     */
    public function index()
    {
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        // Statistics
        $totalBooks = Book::where('author_id', $author->id)->count();
        $publishedBooks = Book::where('author_id', $author->id)->published()->count();
        $totalEarnings = $author->total_earnings ?? 0;

        $totalSales = OrderItem::where('author_id', $author->id)
            ->whereHas('order', function ($query) {
                $query->where('status', 'completed');
            })
            ->sum('quantity');

        $totalDownloads = Book::where('author_id', $author->id)->sum('downloads');

        $averageRating = Book::where('author_id', $author->id)
            ->where('reviews_count', '>', 0)
            ->avg('average_rating');

        // Recent books
        $recentBooks = Book::where('author_id', $author->id)
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'slug' => $book->slug,
                    'cover_image' => $book->cover_url,
                    'status' => $book->status,
                    'downloads' => $book->downloads,
                    'average_rating' => $book->average_rating,
                    'created_at' => $book->created_at->format('M d, Y'),
                ];
            });

        // Recent sales
        $recentSales = OrderItem::with(['order.user', 'book'])
            ->where('author_id', $author->id)
            ->whereHas('order', function ($query) {
                $query->where('status', 'completed');
            })
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'order_number' => $item->order->order_number,
                    'book_title' => $item->title,
                    'buyer' => $item->order->user->name,
                    'earnings' => $item->author_earnings,
                    'date' => $item->created_at->diffForHumans(),
                ];
            });

        // Recent reviews
        $recentReviews = BookReview::with(['book', 'user'])
            ->whereHas('book', function ($query) use ($author) {
                $query->where('author_id', $author->id);
            })
            ->approved()
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'book_title' => $review->book->title,
                    'rating' => $review->rating,
                    'review' => $review->review,
                    'user' => $review->user->name,
                    'date' => $review->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('Author/Dashboard', [
            'stats' => [
                'total_books' => $totalBooks,
                'published_books' => $publishedBooks,
                'total_earnings' => $totalEarnings,
                'total_sales' => $totalSales,
                'total_downloads' => $totalDownloads,
                'average_rating' => round($averageRating ?? 0, 2),
            ],
            'recentBooks' => $recentBooks,
            'recentSales' => $recentSales,
            'recentReviews' => $recentReviews,
            'authorStatus' => $author->status,
        ]);
    }
}
