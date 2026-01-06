<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Appointment;
use App\Models\Payment;
use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StaffController extends Controller
{
    public function appointments()
    {
        // Fetch appointments where the staff is the consultant
        $appointments = Appointment::with('user')
            ->where('consultant_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Staff/Appointments', ['appointments' => $appointments]);
    }

    public function payments()
    {
        // Staff might see all payments or just relevant ones. Let's show all for now or empty if restricted.
        // Assuming staff can view payments for now.
        $payments = Payment::with('user')->latest()->paginate(10);
        return Inertia::render('Staff/Payments', ['payments' => $payments]);
    }

    public function events()
    {
        $events = Event::latest()->paginate(10);
        return Inertia::render('Staff/Events', ['events' => $events]);
    }

    public function blog()
    {
        $posts = \App\Models\Post::with('author')->latest()->paginate(10);
        return Inertia::render('Staff/Blog', ['posts' => $posts]);
    }
}
