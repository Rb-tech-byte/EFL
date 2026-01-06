<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->paginate(10);
        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'location' => 'nullable|string',
            'type' => 'required|string',
            'link' => 'nullable|url',
            'is_public' => 'required|boolean',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . time();

        Event::create($validated);

        return back()->with('success', 'Event created successfully');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'location' => 'nullable|string',
            'type' => 'required|string',
            'link' => 'nullable|url',
            'is_public' => 'required|boolean',
        ]);

        if ($validated['title'] !== $event->title) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . time();
        }

        $event->update($validated);

        return back()->with('success', 'Event updated successfully');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return back()->with('success', 'Event deleted successfully');
    }
}
