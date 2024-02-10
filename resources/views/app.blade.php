<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Add Icon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json">

    <title inertia>{{ $page['props']['meta_data']['title'] ?? 'RUMAH PERFUM' }}</title>
    <meta name="description" content="{{ $page['props']['meta_data']['description'] ?? 'عالم العطور ، عالم يجسد الرقي و الجمال والبهجة ، والعطور الفاخرة تدل على تفرد المنتجات الممتازة ؛ الرماح للعطور شركة شغوفة تأسست بفضل الله عام 2019 م في وقت نهضة العطور الحديثة  . من الهضاب العليا شمال بلدي الجزائر نأخذ طريقا رائدا في في مجال بيع العطور الزيتية و صناعة مواد التجميل و التنظيف البدني' }}">
    <meta name="author" content="Rumah Perfum">
    <meta name="keywords" content="{{ $page['props']['meta_data']['keywords'] ?? 'عطور, عطور زيتية, عطور فرنسية, عطور عربية, عطور ماركات, عطور مميزة, عطور فاخر , عطور مميزة, عطور مميزة للرجال, عطور مميزة للنساء, عطور مميزة للأطفال, عطور مميزة للمنزل, عطور مميزة للسيارات, عطور مميزة للملابس, عطور مميزة للمكتب, عطور مميزة للمطبخ, عطور مميزة للحمام' }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="{{ $page['props']['meta_data']['title'] ?? 'RUMAH PERFUM' }}" />
    <meta property="og:description" content="{{ $page['props']['meta_data']['description'] ?? 'عالم العطور ، عالم يجسد الرقي و الجمال والبهجة ، والعطور الفاخرة تدل على تفرد المنتجات الممتازة ؛ الرماح للعطور شركة شغوفة تأسست بفضل الله عام 2019 م في وقت نهضة العطور الحديثة  . من الهضاب العليا شمال بلدي الجزائر نأخذ طريقا رائدا في في مجال بيع العطور الزيتية و صناعة مواد التجميل و التنظيف البدني' }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page['props']['meta_data']['url'] ?? 'https://www.https://rumah-parfum.com/' }}" />
    <meta property="og:image" content="{{ $page['props']['meta_data']['image'] ?? '/image/meta-logo.jpg' }}" />

    <!-- Twitter -->
    <meta property="twitter:title" content="{{ $page['props']['meta_data']['title'] ?? 'RUMAH PERFUM' }}" />
    <meta property="twitter:description" content="{{ $page['props']['meta_data']['description'] ?? 'عالم العطور ، عالم يجسد الرقي و الجمال والبهجة ، والعطور الفاخرة تدل على تفرد المنتجات الممتازة ؛ الرماح للعطور شركة شغوفة تأسست بفضل الله عام 2019 م في وقت نهضة العطور الحديثة  . من الهضاب العليا شمال بلدي الجزائر نأخذ طريقا رائدا في في مجال بيع العطور الزيتية و صناعة مواد التجميل و التنظيف البدني' }}" />
    <meta property="twitter:card" content="{{ $page['props']['meta_data']['twitter_card'] ?? 'summary_large_image' }}" />
    <meta property="twitter:url" content="{{ $page['props']['meta_data']['url'] ?? 'https://www.https://rumah-parfum.com/' }}" />
    <meta property="twitter:image" content="{{ $page['props']['meta_data']['image'] ?? '/image/meta-logo.jpg' }}" />


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