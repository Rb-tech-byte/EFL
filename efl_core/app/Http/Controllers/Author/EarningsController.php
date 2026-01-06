<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EarningsController extends Controller
{
    /**
     * Display author earnings
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $author = $user->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        // Get earnings summary
        $stats = [
            'total_earnings' => $author->total_earnings ?? 0,
            'pending_earnings' => OrderItem::where('author_id', $author->id)
                ->whereHas('order', function ($query) {
                    $query->where('status', 'pending');
                })
                ->sum('author_earning'),
            'total_sales' => OrderItem::where('author_id', $author->id)
                ->whereHas('order', function ($query) {
                    $query->where('status', 'completed');
                })
                ->count(),
        ];

        // Get transactions
        $transactions = OrderItem::with(['order', 'book'])
            ->where('author_id', $author->id)
            ->latest()
            ->paginate(15)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'order_number' => $item->order->order_number,
                    'book_title' => $item->book->title ?? 'Unknown Book',
                    'amount' => $item->price,
                    'commission' => $item->admin_commission,
                    'earnings' => $item->author_earning,
                    'date' => $item->created_at->format('M d, Y'),
                    'status' => $item->order->status,
                ];
            });

        // Monthly earnings chart data for last 6 months
        $monthlyData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $month = $date->format('M');
            $year = $date->year;
            $monthNum = $date->month;

            $earnings = OrderItem::where('author_id', $author->id)
                ->whereHas('order', function ($query) {
                    $query->where('status', 'completed');
                })
                ->whereYear('created_at', $year)
                ->whereMonth('created_at', $monthNum)
                ->sum('author_earning');

            $monthlyData[] = [
                'month' => $month,
                'earnings' => (float)$earnings,
            ];
        }

        return Inertia::render('Author/Earnings', [
            'stats' => $stats,
            'transactions' => $transactions,
            'monthlyData' => $monthlyData,
        ]);
    }
}
