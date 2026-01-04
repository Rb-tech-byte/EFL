<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Scholarship;
use App\Models\University;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scholarships = Scholarship::with('university')->latest()->get();
        $universities = University::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Admin/Scholarships', [
            'scholarships' => $scholarships,
            'universities' => $universities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'university_id' => 'required|exists:universities,id',
            'study_level' => 'nullable|string',
            'funding_type' => 'nullable|string',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);

        Scholarship::create($validated);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $scholarship = Scholarship::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'university_id' => 'required|exists:universities,id',
            'study_level' => 'nullable|string',
            'funding_type' => 'nullable|string',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        if ($scholarship->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        }

        $scholarship->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Scholarship::findOrFail($id)->delete();
        return redirect()->back();
    }
}
