<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['user', 'consultant'])->latest()->paginate(10);
        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments
        ]);
    }
}
