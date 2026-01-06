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

        // Get students and staff for the form
        $students = \App\Models\User::where('role', 'student')->get(['id', 'name']);
        $consultants = \App\Models\User::whereIn('role', ['admin', 'staff'])->get(['id', 'name']);

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments,
            'students' => $students,
            'consultants' => $consultants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'consultant_id' => 'nullable|exists:users,id',
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|string',
            'type' => 'required|string',
            'notes' => 'nullable|string',
            'meeting_link' => 'nullable|url',
        ]);

        Appointment::create($validated);

        return back()->with('success', 'Appointment created successfully');
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'consultant_id' => 'nullable|exists:users,id',
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|string',
            'type' => 'required|string',
            'notes' => 'nullable|string',
            'meeting_link' => 'nullable|url',
        ]);

        $appointment->update($validated);

        return back()->with('success', 'Appointment updated successfully');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return back()->with('success', 'Appointment deleted successfully');
    }
}
