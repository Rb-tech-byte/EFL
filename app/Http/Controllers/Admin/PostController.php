<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('author')->latest()->paginate(10);
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $validated['author_id'] = \Illuminate\Support\Facades\Auth::id();
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . time();

        Post::create($validated);

        return back()->with('success', 'Post created successfully');
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|string',
            'image' => 'nullable|string',
        ]);

        if ($validated['title'] !== $post->title) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . time();
        }

        $post->update($validated);

        return back()->with('success', 'Post updated successfully');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return back()->with('success', 'Post deleted successfully');
    }
}
