<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Programs', [
            'programs' => Program::with('university')->latest()->get(),
            'universities' => University::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'university_id' => 'required|exists:universities,id',
            'title' => 'required|string|max:255',
            'level' => 'required|string|max:255',
            'duration' => 'nullable|string',
            'tuition_fee' => 'nullable|string',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string', // Expecting rich text or string for now, could be array if needed
            'intake_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        Program::create([
            'university_id' => $request->university_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title . '-' . Str::random(4)),
            'level' => $request->level,
            'duration' => $request->duration,
            'tuition_fee' => $request->tuition_fee,
            'description' => $request->description,
            'requirements' => $request->requirements ? json_encode(explode("\n", $request->requirements)) : null, // Simple split for now or use editor content
            'intake_date' => $request->intake_date,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->back()->with('success', 'Program created successfully.');
    }

    public function update(Request $request, Program $program)
    {
        $request->validate([
            'university_id' => 'required|exists:universities,id',
            'title' => 'required|string|max:255',
            'level' => 'required|string|max:255',
            'duration' => 'nullable|string',
            'tuition_fee' => 'nullable|string',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'intake_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $program->update([
            'university_id' => $request->university_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title . '-' . Str::random(4)),
            'level' => $request->level,
            'duration' => $request->duration,
            'tuition_fee' => $request->tuition_fee,
            'description' => $request->description,
            'requirements' => $request->requirements ? json_encode(explode("\n", $request->requirements)) : $program->requirements,
            'intake_date' => $request->intake_date,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->back()->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->back()->with('success', 'Program deleted successfully.');
    }
}
