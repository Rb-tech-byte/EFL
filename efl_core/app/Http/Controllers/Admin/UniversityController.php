<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UniversityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Universities', [
            'universities' => University::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'ranking' => 'nullable|integer',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'university_type' => 'nullable|string',
            'student_count' => 'nullable|integer',
            'logo' => 'nullable|string',
            'logo_file' => 'nullable|image|max:10240', // 10MB max
            'hero_image' => 'nullable|string',
            'hero_image_file' => 'nullable|image|max:10240', // 10MB max
            'video_url' => 'nullable|string',
            'about_content' => 'nullable|string',
            'academics_content' => 'nullable|string',
            'admissions_content' => 'nullable|string',
            'costs_content' => 'nullable|string',
            'campus_life_content' => 'nullable|string',
        ]);

        $logo = $request->logo;
        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('universities/logos', 'public');
            $logo = '/storage/' . $path;
        }

        $heroImage = $request->hero_image;
        if ($request->hasFile('hero_image_file')) {
            $path = $request->file('hero_image_file')->store('universities/heroes', 'public');
            $heroImage = '/storage/' . $path;
        }

        University::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'country' => $request->country,
            'ranking' => $request->ranking,
            'description' => $request->description,
            'website' => $request->website,
            'university_type' => $request->university_type ?? 'Public',
            'student_count' => $request->student_count,
            'logo' => $logo ?? 'https://ui-avatars.com/api/?name=' . urlencode($request->name),
            'hero_image' => $heroImage,
            'video_url' => $request->video_url,
            'about_content' => $request->about_content,
            'academics_content' => $request->academics_content,
            'admissions_content' => $request->admissions_content,
            'costs_content' => $request->costs_content,
            'campus_life_content' => $request->campus_life_content,
        ]);

        return redirect()->back()->with('success', 'University created successfully.');
    }

    public function update(Request $request, University $university)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'ranking' => 'nullable|integer',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'university_type' => 'nullable|string',
            'student_count' => 'nullable|integer',
            'logo' => 'nullable|string',
            'logo_file' => 'nullable|image|max:10240',
            'hero_image' => 'nullable|string',
            'hero_image_file' => 'nullable|image|max:10240',
            'video_url' => 'nullable|string',
            'about_content' => 'nullable|string',
            'academics_content' => 'nullable|string',
            'admissions_content' => 'nullable|string',
            'costs_content' => 'nullable|string',
            'campus_life_content' => 'nullable|string',
        ]);

        $logo = $university->logo; // Keep existing logo by default
        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('universities/logos', 'public');
            $logo = '/storage/' . $path;
        } elseif ($request->filled('logo')) {
            $logo = $request->logo;
        }

        $heroImage = $university->hero_image; // Keep existing hero image by default
        if ($request->hasFile('hero_image_file')) {
            $path = $request->file('hero_image_file')->store('universities/heroes', 'public');
            $heroImage = '/storage/' . $path;
        } elseif ($request->filled('hero_image')) {
            $heroImage = $request->hero_image;
        }

        $university->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'country' => $request->country,
            'ranking' => $request->ranking,
            'description' => $request->description,
            'website' => $request->website,
            'university_type' => $request->university_type,
            'student_count' => $request->student_count,
            'logo' => $logo,
            'hero_image' => $heroImage,
            'video_url' => $request->video_url,
            'about_content' => $request->about_content,
            'academics_content' => $request->academics_content,
            'admissions_content' => $request->admissions_content,
            'costs_content' => $request->costs_content,
            'campus_life_content' => $request->campus_life_content,
        ]);

        return redirect()->back()->with('success', 'University updated successfully.');
    }

    public function destroy(University $university)
    {
        $university->delete();
        return redirect()->back()->with('success', 'University deleted successfully.');
    }
}
