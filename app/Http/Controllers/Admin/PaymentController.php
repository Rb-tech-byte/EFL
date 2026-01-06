<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Payment;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('user')->latest()->paginate(10);

        $stats = [
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
            'pending_amount' => Payment::where('status', 'pending')->sum('amount'),
            'successful_count' => Payment::where('status', 'paid')->count(),
            'pending_count' => Payment::where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'stats' => $stats
        ]);
    }
}
