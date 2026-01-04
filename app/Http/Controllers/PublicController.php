<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Scholarship;
use App\Models\University;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function scholarships(Request $request)
    {
        $query = Scholarship::with('university')->where('is_active', true);

        if ($request->filled('destination')) {
            $query->whereHas('university', function ($q) use ($request) {
                $q->where('country', 'like', '%' . $request->destination . '%');
            });
        }

        if ($request->filled('level')) {
            $query->where('study_level', $request->level);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $scholarships = $query->latest()->paginate(9)->withQueryString();

        // Get unique countries for filter
        $destinations = University::select('country')->distinct()->pluck('country');

        return Inertia::render('Scholarships/Index', [
            'scholarships' => $scholarships,
            'destinations' => $destinations,
            'filters' => $request->only(['destination', 'level', 'search']),
        ]);
    }
}
