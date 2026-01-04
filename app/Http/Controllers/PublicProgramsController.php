<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\University;
use Inertia\Inertia;

class PublicProgramsController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::with('university')->where('is_active', true);

        if ($request->filled('destination')) {
            $query->whereHas('university', function ($q) use ($request) {
                $q->where('country', 'like', '%' . $request->destination . '%');
            });
        }

        if ($request->filled('university')) {
            $query->whereHas('university', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->university . '%');
            });
        }

        if ($request->filled('level')) {
            $query->where('level', $request->level);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $programs = $query->latest()->paginate(9)->withQueryString();

        // Get dropdown data
        $destinations = University::select('country')->distinct()->pluck('country');
        $universitiesList = University::select('name')->orderBy('name')->pluck('name');

        return Inertia::render('Programs/Index', [
            'programs' => $programs,
            'destinations' => $destinations,
            'universitiesList' => $universitiesList,
            'filters' => $request->only(['destination', 'university', 'level', 'search']),
        ]);
    }

    public function show($slug)
    {
        $program = Program::with(['university'])->where('slug', $slug)->firstOrFail();

        $relatedPrograms = Program::where('university_id', $program->university_id)
            ->where('id', '!=', $program->id)
            ->take(3)
            ->get();

        return Inertia::render('Programs/Show', [
            'program' => $program,
            'relatedPrograms' => $relatedPrograms
        ]);
    }
}
