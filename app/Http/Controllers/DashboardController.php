<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Application;
use App\Models\University;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return $this->adminDashboard();
        } elseif ($user->role === 'staff') {
            return $this->staffDashboard();
        }
        return $this->studentDashboard();
    }

    private function adminDashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_students' => User::where('role', 'student')->count(),
                'active_applications' => Application::whereIn('status', ['submitted', 'under_review'])->count(),
                'total_universities' => University::count(),
                'pending_tasks' => Task::where('user_id', Auth::id())->where('status', 'pending')->count(),
            ],
            // Add more data as needed
        ]);
    }

    private function staffDashboard()
    {
        return Inertia::render('Staff/Dashboard', [
            'stats' => [
                'pending_applications' => Application::where('status', 'submitted')->count(), // Pretend these are assigned
                'my_tasks' => Task::where('user_id', Auth::id())->where('status', 'pending')->count(),
            ],
        ]);
    }

    private function studentDashboard()
    {
        $user = Auth::user();

        $stats = [
            ['label' => 'Active Applications', 'value' => $user->applications()->whereIn('status', ['submitted', 'under_review'])->count(), 'icon' => '📝', 'color' => 'bg-blue-100 text-blue-600'],
            ['label' => 'Total Applications', 'value' => $user->applications()->count(), 'icon' => '📂', 'color' => 'bg-green-100 text-green-600'],
            ['label' => 'Pending Tasks', 'value' => $user->tasks()->where('status', 'pending')->count(), 'icon' => '📅', 'color' => 'bg-purple-100 text-purple-600'],
            ['label' => 'Profile Completion', 'value' => '85%', 'icon' => '👤', 'color' => 'bg-orange-100 text-orange-600'], // hardcoded for now
        ];

        $recentApplications = $user->applications()
            ->with(['program.university'])
            ->latest()
            ->take(5)
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
                    'statusColor' => $this->getStatusColor($app->status),
                    'data' => $app->data, // For preview
                ];
            });

        // Mock Messages
        $messages = [
            ['id' => 1, 'sender' => 'Admissions Team', 'subject' => 'Welcome to Your Portal', 'preview' => 'Please complete your profile to start applying...', 'date' => '1 day ago', 'is_read' => false],
            ['id' => 2, 'sender' => 'System', 'subject' => 'Profile Updated', 'preview' => 'You successfully updated your contact details.', 'date' => '2 days ago', 'is_read' => true],
        ];

        // Recommended Universities
        $universities = University::inRandomOrder()->take(4)->get()->map(function ($uni) {
            return [
                'id' => $uni->id,
                'name' => $uni->name,
                'logo' => $uni->logo_url, // helper or direct
                'location' => $uni->country,
                'slug' => $uni->slug ?? $uni->id,
            ];
        });

        return Inertia::render('Student/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'messages' => $messages,
            'universities' => $universities,
            'userName' => $user->name,
        ]);
    }

    private function getStatusColor($status)
    {
        switch ($status) {
            case 'accepted':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            case 'under_review':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    }
}
