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

    public function create()
    {
        return Inertia::render('Admin/Applications/Create', [
            'users' => \App\Models\User::select('id', 'name', 'email')->get(),
            'programs' => \App\Models\Program::with('university:id,name')->select('id', 'title', 'university_id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'program_id' => 'required|exists:programs,id',
            'status' => 'required|string',
            'notes' => 'nullable|string',
            'statement' => 'nullable|string',
        ]);

        Application::create([
            'user_id' => $request->user_id,
            'program_id' => $request->program_id,
            'status' => $request->status,
            'notes' => $request->notes,
            'data' => ['statement' => $request->statement],
            'current_step' => 1
        ]);

        return redirect()->route('admin.applications.index')->with('success', 'Application created successfully.');
    }

    public function edit(Application $application)
    {
        return Inertia::render('Admin/Applications/Edit', [
            'application' => $application,
            'users' => \App\Models\User::select('id', 'name', 'email')->get(),
            'programs' => \App\Models\Program::with('university:id,name')->select('id', 'title', 'university_id')->get(),
        ]);
    }

    public function update(Request $request, Application $application)
    {
        $request->validate([
            'status' => 'required|string|in:draft,submitted,under_review,accepted,rejected',
            'notes' => 'nullable|string',
            'statement' => 'nullable|string',
        ]);

        $data = $application->data ?? [];
        if ($request->has('statement')) {
            $data['statement'] = $request->statement;
        }

        $application->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'data' => $data,
        ]);

        return redirect()->back()->with('success', 'Application updated.');
    }

    public function destroy(Application $application)
    {
        $application->delete();
        return redirect()->back()->with('success', 'Application deleted.');
    }
}
