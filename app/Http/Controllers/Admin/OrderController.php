<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')
            ->latest()
            ->paginate(15)
            ->through(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'user_name' => $order->user->name,
                    'user_email' => $order->user->email,
                    'total_amount' => $order->total,
                    'total_commission' => $order->items()->sum('admin_commission'),
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i'),
                ];
            });

        $stats = [
            'total_revenue' => Order::where('status', 'completed')->sum('total'),
            'total_commission' => \App\Models\OrderItem::sum('admin_commission'),
            'total_orders' => Order::count(),
        ];

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.book.author.user']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'user' => $order->user,
                'total' => $order->total,
                'subtotal' => $order->subtotal,
                'tax' => $order->tax,
                'status' => $order->status,
                'payment_method' => $order->payment_method,
                'transaction_id' => $order->transaction_id,
                'created_at' => $order->created_at->format('Y-m-d H:i'),
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'book_title' => $item->book->title,
                        'author_name' => $item->book->author->pen_name ?? $item->book->author->user->name,
                        'price' => $item->price,
                        'quantity' => $item->quantity,
                        'total_price' => $item->price,
                        'commission_amount' => $item->admin_commission,
                    ];
                }),
            ]
        ]);
    }
}
