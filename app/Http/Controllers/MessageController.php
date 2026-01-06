<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Fetch threads where user is sender or recipient and is a root message
        $messages = Message::with(['sender', 'replies.sender'])
            ->whereNull('parent_id')
            ->where(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                    ->orWhere('recipient_id', $user->id);
            })
            ->latest()
            ->get()
            ->map(function ($msg) use ($user) {
                // Determine the "other" person
                $otherUser = $msg->sender_id === $user->id ? $msg->recipient : $msg->sender;

                return [
                    'id' => $msg->id,
                    'sender' => $msg->sender->name, // Or specific logic if user is sender
                    'sender_id' => $msg->sender_id,
                    'reply_to_id' => $msg->sender_id === $user->id ? $msg->recipient_id : $msg->sender_id,
                    'subject' => $msg->subject,
                    'body' => $msg->body,
                    'preview' => substr($msg->body, 0, 50) . '...',
                    'date' => $msg->created_at->diffForHumans(),
                    'is_read' => $msg->recipient_id === $user->id ? $msg->is_read : true,
                    'bg_color' => 'bg-blue-100 text-blue-800', // Dynamic later
                    'attachments' => $msg->attachments ?? [],
                    'replies' => $msg->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'sender' => $reply->sender->name,
                            'sender_id' => $reply->sender_id,
                            'body' => $reply->body,
                            'date' => $reply->created_at->diffForHumans(),
                            'attachments' => $reply->attachments ?? [],
                        ];
                    }),
                ];
            });

        // Fetch "advisors" (Recipients) based on role
        if ($user->role === 'admin' || $user->role === 'staff') {
            // Admins/Staff can message Students and Authors
            $advisors = User::whereIn('role', ['student', 'author'])->select('id', 'name', 'role')->get();
        } else {
            // Students and Authors can message Admins and Staff
            $advisors = User::whereIn('role', ['admin', 'staff'])->select('id', 'name', 'role')->get();
        }

        return Inertia::render('Student/Messages', [
            'messages' => $messages,
            'advisors' => $advisors,
            'auth' => [
                'user' => $user,
                // Add any other auth props needed
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'recipient_id' => 'required|exists:users,id',
            'subject' => 'nullable|string|max:255',
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:messages,id',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Handle Attachments
        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                // Store file
                $path = $file->store('attachments', 'public');
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize(), // bytes
                    'type' => $file->getClientOriginalExtension(),
                    'mime' => $file->getMimeType(),
                ];
            }
        }

        $message = Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $request->recipient_id,
            'parent_id' => $request->parent_id,
            'subject' => $request->subject ?? ($request->parent_id ? 'Re: ' . Message::find($request->parent_id)->subject : 'No Subject'),
            'body' => $request->body,
            'attachments' => $attachments, // Save array (auto-cast to JSON)
            'is_read' => false,
        ]);

        return redirect()->back()->with('success', 'Message sent successfully.');
    }

    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($message->recipient_id === $user->id) {
            $message->update(['is_read' => true, 'read_at' => now()]);
        }

        return redirect()->back();
    }
}
