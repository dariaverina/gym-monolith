<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <script src="https://api-maps.yandex.ru/2.1/?apikey=16c2fbee-10d1-4945-80a3-fb1de5fcb83a&lang=ru_RU" type="text/javascript"></script>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/clubs.jsx'])
    </head>
    <body class="antialiased">
         <div id="clubs"></div>
    </body>
</html>
 