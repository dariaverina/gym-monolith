<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/groups.jsx'])
    </head>
    <body class="antialiased">
         <div id="groups"></div>
    </body>
</html>