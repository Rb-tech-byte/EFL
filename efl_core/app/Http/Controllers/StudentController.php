<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Application;
use App\Models\University;

class StudentController extends Controller
{
    public function applications()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $applications = $user->applications()
            ->with(['program.university'])
            ->latest()
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'university' => $app->program?->university?->name ?? 'Unknown University',
                    'university_logo' => $app->program?->university?->logo_url ?? null,
                    'program' => $app->program?->title ?? 'Unknown Program',
                    'program_id' => $app->program_id,
                    'status' => $app->status,
                    'status_label' => ucfirst(str_replace('_', ' ', $app->status)),
                    'date' => $app->created_at->format('M d, Y'),
                    'data' => $app->data,
                ];
            });

        return Inertia::render('Student/Applications', [
            'applications' => $applications
        ]);
    }

    public function universities(Request $request)
    {
        $query = University::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('country', 'like', "%{$search}%");
        }

        $universities = $query->latest()->paginate(12)->through(function ($uni) {
            return [
                'id' => $uni->id,
                'name' => $uni->name,
                'slug' => $uni->slug ?? $uni->id,
                'location' => $uni->country,
                'logo' => $uni->logo_url,
                'programs_count' => $uni->programs()->count(),
            ];
        });

        return Inertia::render('Student/Universities', [
            'universities' => $universities,
            'filters' => $request->only(['search']),
        ]);
    }

    public function appointments()
    {
        $appointments = \App\Models\Appointment::with('consultant')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        // Get available consultants
        $consultants = \App\Models\User::whereIn('role', ['admin', 'staff'])->get(['id', 'name']);

        return Inertia::render('Student/Appointments', [
            'appointments' => $appointments,
            'consultants' => $consultants
        ]);
    }

    public function storeAppointment(Request $request)
    {
        $validated = $request->validate([
            'consultant_id' => 'nullable|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required',
            'type' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $appointment = new \App\Models\Appointment($validated);
        $appointment->user_id = Auth::id();
        $appointment->status = 'pending';
        $appointment->save();

        return back()->with('success', 'Appointment requested successfully');
    }

    public function blog()
    {
        $posts = \App\Models\Post::with('author')
            ->where('status', 'published')
            ->latest()
            ->paginate(12);

        return Inertia::render('Student/Blog', ['posts' => $posts]);
    }

    public function events()
    {
        // Students see public events or events they are invited to (logic to be improved later)
        // For now, show public events
        $events = \App\Models\Event::where('is_public', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('Student/Events', ['events' => $events]);
    }

    public function messages()
    {
        // Mock Messages - Keep existing logic or replace with real data eventually
        $messages = [
            [
                'id' => 1,
                'sender' => 'Admissions Team',
                'bg_color' => 'bg-blue-100 text-blue-600',
                'subject' => 'Welcome to Your Portal',
                'preview' => 'Please complete your profile to start applying...',
                'body' => 'Welcome to the Education For Liberty platform! We are excited to assist you in your academic journey. Please ensure your profile is fully updated with accurate information to streamline your application process.',
                'date' => '1 day ago',
                'is_read' => false,
                'attachments' => [
                    ['name' => 'Student_Guide.pdf', 'size' => '2.5 MB', 'type' => 'pdf'],
                ]
            ],
            // ... (keeping other mocks same for simpler diff, or rely on real DB)
        ];

        return Inertia::render('Student/Messages', [
            'messages' => $messages
        ]);
    }

    public function becomeAuthor()
    {
        $user = Auth::user();
        if ($user->authorProfile) {
            return redirect()->route('author.dashboard');
        }

        return Inertia::render('Student/BecomeAuthor');
    }

    public function submitAuthorApplication(Request $request)
    {
        $user = Auth::user();

        if ($user->authorProfile) {
            return back()->with('error', 'You already have an author profile or application.');
        }

        $validated = $request->validate([
            'pen_name' => 'required|string|max:255',
            'bio' => 'required|string|max:1000',
        ]);

        \App\Models\Author::create([
            'user_id' => $user->id,
            'pen_name' => $validated['pen_name'],
            'bio' => $validated['bio'],
            'status' => 'pending',
            'commission_rate' => 30.00,
        ]);

        return redirect()->route('dashboard')->with('success', 'Author application submitted successfully! Waiting for admin approval.');
    }
}
