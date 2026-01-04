<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Applications', [
            'applications' => Application::with(['user:id,name,email', 'program.university'])->latest()->get()
        ]);
    }

    public function show(Application $application)
    {
        $application->load(['user', 'program.university']);
        return Inertia::render('Admin/Applications/Show', [
            'application' => $application
        ]);
    }

    public function update(Request $request, Application $application)
    {
        $request->validate([
            'status' => 'required|string|in:draft,submitted,under_review,accepted,rejected',
            'notes' => 'nullable|string'
        ]);

        $application->update([
            'status' => $request->status,
            'notes' => $request->notes
        ]);

        return redirect()->back()->with('success', 'Application status updated.');
    }

    public function destroy(Application $application)
    {
        $application->delete();
        return redirect()->back()->with('success', 'Application deleted.');
    }
}
