<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function create(Request $request)
    {
        $programId = $request->query('program_id');

        if (!$programId) {
            return redirect()->route('programs.index')->with('error', 'Please select a program first.');
        }

        $program = Program::with('university')->findOrFail($programId);

        // Find existing draft
        $application = Application::where('user_id', Auth::id())
            ->where('program_id', $programId)
            ->where('status', 'draft')
            ->first();

        if (!$application) {
            $user = Auth::user();

            // Initialize with user data if available
            $initialData = [
                'first_name' => $user->name, // Simple name split usually better
                'email' => $user->email,
                'phone' => '', // If user has phone
            ];

            $application = Application::create([
                'user_id' => Auth::id(),
                'program_id' => $programId,
                'status' => 'draft',
                'data' => $initialData,
                'current_step' => 1
            ]);
        }

        return Inertia::render('Application/Apply', [
            'program' => $program,
            'application' => $application
        ]);
    }

    public function update(Request $request, Application $application)
    {
        // Ensure user owns application
        if ($application->user_id !== Auth::id()) {
            abort(403);
        }

        $currentData = $application->data ?? [];
        $inputData = $request->input('data', []);

        // Handle File Uploads
        $fileKeys = ['passport_file', 'transcript_file', 'english_test_file'];
        foreach ($fileKeys as $key) {
            $pathKey = $key . '_path';
            if ($request->hasFile("data.{$key}")) {
                $path = $request->file("data.{$key}")->store("applications/{$application->id}", 'public');
                $inputData[$pathKey] = '/storage/' . $path;
            } else {
                // Safeguard: If no new file uploaded, do not overwrite existing path with empty value from input
                if (isset($inputData[$pathKey]) && empty($inputData[$pathKey]) && !empty($currentData[$pathKey])) {
                    unset($inputData[$pathKey]);
                }
            }
        }

        // Merge recursively or simple merge? Simple merge of top keys usually enough for wizard steps.
        $mergedData = array_merge($currentData, $inputData);

        $application->update([
            'data' => $mergedData,
            'current_step' => $request->input('current_step', $application->current_step),
        ]);

        // Check top level or data level?
        // Use boolean input specifically
        // $request->input('data.submit') might be where it is

        // Check submission in data or root
        $isSubmit = $request->input('data.submit') || $request->boolean('submit');

        if ($isSubmit) {
            $application->update([
                'status' => 'submitted',
                'submitted_at' => now(),
            ]);
            return redirect()->route('dashboard')->with('success', 'Application Submitted Successfully!');
        }

        return redirect()->back();
    }
}
