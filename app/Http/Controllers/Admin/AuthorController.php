<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Author;
use App\Models\User;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::with('user')
            ->withCount('books')
            ->latest()
            ->paginate(10)
            ->through(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->pen_name ?? $author->user->name,
                    'email' => $author->user->email,
                    'pen_name' => $author->pen_name,
                    'bio' => $author->bio,
                    'profile_image' => $author->profile_image,
                    'status' => $author->status,
                    'commission_rate' => $author->commission_rate,
                    'total_earnings' => $author->total_earnings,
                    'books_count' => $author->books_count,
                    'created_at' => $author->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('Admin/Authors/Index', [
            'authors' => $authors,
            'users' => User::where('role', 'author')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:authors,user_id',
            'pen_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'commission_rate' => 'required|numeric|min:0|max:100',
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        Author::create($validated);

        return back()->with('success', 'Author created successfully');
    }

    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'pen_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'commission_rate' => 'required|numeric|min:0|max:100',
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $author->update($validated);

        return back()->with('success', 'Author updated successfully');
    }

    public function destroy(Author $author)
    {
        $author->delete();
        return back()->with('success', 'Author deleted successfully');
    }

    public function approve(Author $author)
    {
        $author->update(['status' => 'approved']);
        return back()->with('success', 'Author approved successfully');
    }

    public function reject(Author $author)
    {
        $author->update(['status' => 'rejected']);
        return back()->with('success', 'Author rejected successfully');
    }
}
