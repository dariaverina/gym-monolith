<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/workers.jsx'])
    </head>
    <body class="antialiased">
         <div id="workers"></div>
    </body>
</html>