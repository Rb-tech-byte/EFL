<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Show the form for editing the author profile
     */
    public function edit()
    {
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        return Inertia::render('Author/Profile', [
            'author' => [
                'id' => $author->id,
                'bio' => $author->bio,
                'avatar' => $author->avatar,
                'website' => $author->website,
                'social_links' => $author->social_links,
                'status' => $author->status,
                'commission_rate' => $author->commission_rate,
            ],
        ]);
    }

    /**
     * Update the author profile
     */
    public function update(Request $request)
    {
        $author = Auth::user()->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        $request->validate([
            'bio' => 'nullable|string|max:1000',
            'website' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $data = [
            'bio' => $request->bio,
            'website' => $request->website,
            'social_links' => $request->social_links,
        ];

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($author->avatar) {
                Storage::delete($author->avatar);
            }

            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $author->update($data);

        return back()->with('success', 'Profile updated successfully!');
    }
}
