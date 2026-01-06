<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'unreadCount' => $request->user() ? \App\Models\Message::where('recipient_id', $request->user()->id)->where('is_read', false)->count() : 0,
                'cartCount' => count(session()->get('cart', [])),
            ],
            'menuItems' => \App\Models\MenuItem::with(['columns.links'])
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'settings' => [
                'system' => \App\Models\Setting::where('category', 'system')->pluck('value', 'key'),
            ],
        ];
    }
}
