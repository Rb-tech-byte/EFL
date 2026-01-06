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
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $author = $user->authorProfile()->with('user')->first();

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        return Inertia::render('Author/Profile', [
            'profile' => [
                'id' => $author->id,
                'name' => $author->display_name,
                'bio' => $author->bio,
                'avatar' => $author->profile_image,
                'avatar_url' => $author->profile_image ? asset('storage/' . $author->profile_image) : null,
                'website' => $author->website,
                'social_links' => $author->social_links ?? [],
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
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $author = $user->authorProfile;

        if (!$author) {
            return redirect()->route('dashboard')->with('error', 'Author profile not found.');
        }

        $request->validate([
            'bio' => 'nullable|string|max:1000',
            'website' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $data = [
            'bio' => $request->bio,
            'website' => $request->website,
            'social_links' => [
                'facebook' => $request->facebook_url,
                'twitter' => $request->twitter_url,
                'instagram' => $request->instagram_url,
                'linkedin' => $request->linkedin_url,
            ],
        ];

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($author->profile_image) {
                Storage::disk('public')->delete($author->profile_image);
            }

            $data['profile_image'] = $request->file('avatar')->store('avatars', 'public');
        }

        $author->update($data);

        return back()->with('success', 'Profile updated successfully!');
    }
}
