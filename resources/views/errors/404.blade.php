<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    @vite(['resources/css/app.css'])
    <style>
        body {
            background: linear-gradient(to bottom, #0f172a, #1e293b, #0f172a);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body>
    <div class="text-center px-4">
        <div class="mb-8">
            <svg class="w-24 h-24 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <h1 class="text-6xl font-bold text-white mb-4">404</h1>
        <p class="text-xl text-slate-300 mb-8">Page Not Found</p>
        <p class="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div class="space-x-4">
            <a href="/" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Go Home
            </a>
            <a href="/dashboard" class="inline-block px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
                Dashboard
            </a>
        </div>
    </div>
</body>
</html>
