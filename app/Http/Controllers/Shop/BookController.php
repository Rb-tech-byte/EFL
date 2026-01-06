<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookCategory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\UserLibrary;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of books in the shop
     */
    public function index(Request $request)
    {
        $query = Book::with(['author.user', 'category'])
            ->published();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        // Filter by type (ebook, novel, magazine, audiobook)
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // Filter by price
        if ($request->has('price_filter')) {
            if ($request->price_filter === 'free') {
                $query->free();
            } elseif ($request->price_filter === 'paid') {
                $query->paid();
            }
        }

        // Price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('downloads', 'desc');
                break;
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            default:
                $query->latest();
        }

        $books = $query->paginate(12)->through(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'slug' => $book->slug,
                'description' => $book->description,
                'cover_image' => $book->cover_url,
                'type' => $book->type,
                'format' => $book->format,
                'price' => $book->price,
                'is_free' => $book->is_free,
                'formatted_price' => $book->formatted_price,
                'average_rating' => $book->average_rating,
                'reviews_count' => $book->reviews_count,
                'downloads' => $book->downloads,
                'author' => [
                    'id' => $book->author->id,
                    'name' => $book->author->user->name,
                    'bio' => $book->author->bio,
                ],
                'category' => $book->category ? [
                    'id' => $book->category->id,
                    'name' => $book->category->name,
                ] : null,
            ];
        });

        $categories = BookCategory::active()->get();

        return Inertia::render('Shop/Books/Index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => (object)$request->only(['search', 'category', 'type', 'price_filter', 'min_price', 'max_price', 'sort']),
        ]);
    }

    /**
     * Display the specified book
     */
    public function show($slug)
    {
        $book = Book::with(['author.user', 'category', 'reviews.user'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        // Check if user already owns this book
        $userOwnsBook = false;
        if (Auth::check()) {
            $userOwnsBook = UserLibrary::where('user_id', Auth::id())
                ->where('book_id', $book->id)
                ->exists();
        }

        // Get related books
        $relatedBooks = Book::with(['author.user'])
            ->published()
            ->where('category_id', $book->category_id)
            ->where('id', '!=', $book->id)
            ->limit(4)
            ->get();

        return Inertia::render('Shop/Books/Show', [
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
                'formatted_price' => $book->formatted_price,
                'isbn' => $book->isbn,
                'pages' => $book->pages,
                'language' => $book->language,
                'publisher' => $book->publisher,
                'published_date' => $book->published_date?->format('M d, Y'),
                'average_rating' => $book->average_rating,
                'reviews_count' => $book->reviews_count,
                'downloads' => $book->downloads,
                'tags' => $book->tags,
                'allow_reviews' => $book->allow_reviews,
                'author' => [
                    'id' => $book->author->id,
                    'name' => $book->author->user->name,
                    'bio' => $book->author->bio,
                    'avatar' => $book->author->avatar,
                ],
                'category' => $book->category ? [
                    'id' => $book->category->id,
                    'name' => $book->category->name,
                ] : null,
                'reviews' => $book->reviews->where('is_approved', true)->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'review' => $review->review,
                        'user' => [
                            'name' => $review->user->name,
                        ],
                        'created_at' => $review->created_at->diffForHumans(),
                    ];
                }),
            ],
            'userOwnsBook' => $userOwnsBook,
            'relatedBooks' => $relatedBooks->map(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'slug' => $book->slug,
                    'cover_image' => $book->cover_url,
                    'price' => $book->price,
                    'formatted_price' => $book->formatted_price,
                    'author' => [
                        'name' => $book->author->user->name,
                    ],
                ];
            }),
        ]);
    }

    /**
     * Purchase a book
     */
    public function purchase(Request $request)
    {
        $request->validate([
            'book_id' => 'required_without:cart|exists:books,id',
            'cart' => 'required_without:book_id|array',
            'cart.*' => 'exists:books,id',
            'payment_method' => 'required|in:pesapal,stripe,paypal,credit_card',
            'coupon_code' => 'nullable|string',
        ]);

        $bookIds = $request->has('cart') ? $request->cart : [$request->book_id];
        $books = Book::with('author')->whereIn('id', $bookIds)->get();

        if ($books->isEmpty()) {
            return back()->with('error', 'No valid books found for purchase.');
        }

        // Check ownership
        $ownedBookIds = UserLibrary::where('user_id', Auth::id())
            ->whereIn('book_id', $bookIds)
            ->pluck('book_id')
            ->toArray();

        if (!empty($ownedBookIds)) {
            $ownedTitles = $books->whereIn('id', $ownedBookIds)->pluck('title')->implode(', ');
            return back()->with('error', "You already own the following books: {$ownedTitles}");
        }

        // Calculate pricing
        $subtotal = $books->sum('price');
        $discount = 0;
        $coupon = null;

        if ($request->coupon_code) {
            $coupon = Coupon::active()->byCode($request->coupon_code)->first();
            if ($coupon && $coupon->isValid()) {
                if ($subtotal >= ($coupon->min_purchase ?? 0)) {
                    $discount = $coupon->calculateDiscount($subtotal);
                }
            }
        }

        $total = max(0, $subtotal - $discount);

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => Auth::id(),
                'subtotal' => $subtotal,
                'tax' => 0,
                'discount' => $discount,
                'total' => $total,
                'status' => 'completed', // Assuming payment success for now
                'payment_method' => $request->payment_method,
                'coupon_code' => $coupon?->code,
                'completed_at' => now(),
            ]);

            foreach ($books as $book) {
                // Determine item-level discount (pro-rated or simple)
                // For simplicity, we apply platform default or author rate
                $commissionRate = $book->author->commission_rate ?? 70;
                $itemPrice = $book->price;

                // If there's a global discount, we should ideally pro-rate it, 
                // but here we mark the price as is and note the global discount on the order.
                $authorEarnings = ($itemPrice * $commissionRate) / 100;
                $platformCommission = $itemPrice - $authorEarnings;

                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $book->id,
                    'author_id' => $book->author_id,
                    'title' => $book->title,
                    'price' => $itemPrice,
                    'quantity' => 1,
                    'author_earnings' => $authorEarnings,
                    'platform_commission' => $platformCommission,
                ]);

                // Add to library
                UserLibrary::create([
                    'user_id' => Auth::id(),
                    'book_id' => $book->id,
                ]);

                // Stats
                $book->increment('downloads');
                $book->author->increment('total_earnings', $authorEarnings);
            }

            if ($coupon) {
                $coupon->incrementUsage();
            }

            // Clear cart from session if checking out from cart
            if ($request->has('cart')) {
                session()->forget('cart');
            }

            DB::commit();

            return redirect()->route('student.library')->with('success', 'Purchase successful! Books added to your library.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Purchase failed: ' . $e->getMessage());
        }
    }
}
