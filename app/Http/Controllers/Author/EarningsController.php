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
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        // Get earnings summary
        $totalEarnings = $author->total_earnings ?? 0;
        $pendingEarnings = $author->pending_earnings ?? 0;
        $availableForWithdrawal = $totalEarnings - $pendingEarnings;

        // Get transactions
        $transactions = OrderItem::with(['order', 'book'])
            ->where('author_id', $author->id)
            ->whereHas('order', function ($query) {
                $query->where('status', 'completed');
            })
            ->latest()
            ->paginate(20)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'order_number' => $item->order->order_number,
                    'book_title' => $item->title,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'author_earnings' => $item->author_earnings,
                    'platform_commission' => $item->platform_commission,
                    'date' => $item->created_at->format('M d, Y'),
                ];
            });

        // Monthly earnings chart data
        $monthlyEarnings = OrderItem::where('author_id', $author->id)
            ->whereHas('order', function ($query) {
                $query->where('status', 'completed');
            })
            ->select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(author_earnings) as total')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get()
            ->reverse()
            ->values();

        return Inertia::render('Author/Earnings', [
            'summary' => [
                'total_earnings' => $totalEarnings,
                'pending_earnings' => $pendingEarnings,
                'available_for_withdrawal' => $availableForWithdrawal,
                'commission_rate' => $author->commission_rate ?? 70,
            ],
            'transactions' => $transactions,
            'monthlyEarnings' => $monthlyEarnings,
        ]);
    }
}
