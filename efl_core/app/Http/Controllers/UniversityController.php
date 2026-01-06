<?php

namespace App\Http\Controllers;

use App\Models\University;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UniversityController extends Controller
{
    public function index()
    {
        $universities = University::orderBy('ranking')->paginate(12);

        return Inertia::render('Universities/Index', [
            'universities' => $universities,
        ]);
    }

    public function show($slug)
    {
        $university = University::with(['importantDates', 'stories'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Get programs for this university
        $programs = Program::where('university_id', $university->id)
            ->where('is_active', true)
            ->orderBy('level')
            ->get()
            ->groupBy('level');

        // Get other top universities (excluding current one)
        $relatedUniversities = University::where('id', '!=', $university->id)
            ->orderBy('ranking')
            ->limit(3)
            ->get();

        return Inertia::render('Universities/Show', [
            'university' => $university,
            'programs' => $programs,
            'relatedUniversities' => $relatedUniversities,
        ]);
    }
}
