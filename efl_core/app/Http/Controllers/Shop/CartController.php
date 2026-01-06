<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $total = 0;

        foreach ($cart as $item) {
            $total += $item['price'];
        }

        $coupon = session()->get('coupon');
        $discount = 0;
        if ($coupon) {
            if ($coupon['type'] === 'percentage') {
                $discount = ($total * $coupon['value']) / 100;
            } else {
                $discount = $coupon['value'];
            }
        }

        $finalTotal = max(0, $total - $discount);

        return Inertia::render('Shop/Cart', [
            'cart' => $cart,
            'total' => $total,
            'discount' => $discount,
            'finalTotal' => $finalTotal,
            'coupon' => $coupon,
        ]);
    }

    public function add(Request $request)
    {
        $book = Book::findOrFail($request->book_id);

        $cart = session()->get('cart', []);

        // Check if item already in cart
        if (isset($cart[$book->id])) {
            return redirect()->back()->with('success', 'Book is already in your cart.');
        }

        $cart[$book->id] = [
            'id' => $book->id,
            'title' => $book->title,
            'price' => $book->price,
            'formatted_price' => '$' . number_format($book->price, 2),
            'cover' => $book->cover_url,
            'author' => $book->author->name,
            'slug' => $book->slug,
        ];

        session()->put('cart', $cart);

        return redirect()->back()->with('success', 'Book added to cart!');
    }

    public function remove($id)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', 'Book removed from cart.');
    }

    public function applyCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$coupon) {
            return redirect()->back()->with('error', 'Invalid or expired coupon code.');
        }

        session()->put('coupon', [
            'code' => $coupon->code,
            'type' => $coupon->type,
            'value' => $coupon->value,
        ]);

        return redirect()->back()->with('success', 'Coupon applied successfully!');
    }

    public function removeCoupon()
    {
        session()->forget('coupon');
        return redirect()->back()->with('success', 'Coupon removed.');
    }

    public function checkout()
    {
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        // Redirect to purchase flow in BookController or handle here
        // For simplicity, we'll redirect to a checkout page
        return Inertia::render('Shop/Checkout', [
            'cart' => $cart,
            'coupon' => session()->get('coupon'),
        ]);
    }
}
