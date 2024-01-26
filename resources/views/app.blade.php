<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Add Icon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json">

    <title inertia>{{ config('app.name', 'RUMAH PERFUM') }}</title>
    <meta name="description" content="اكتشف عالمًا من العطور الفاخرة والساعات الأنيقة في Rumah Perfum. استكشف مجموعتنا المختارة بعناية من العطور الفاخرة والأوقات الأنيقة. تسوق بثقة مع التوصيل في الوقت المناسب، وتغطية واسعة عبر 58 ولاية، ودعم العملاء المخصص.">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.rumahperfum.com/" />
    <meta property="og:image" content="/image/meta-logo.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.rumahperfum.com/" />
    <meta property="twitter:image" content="/image/meta-logo.jpg" />


    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>