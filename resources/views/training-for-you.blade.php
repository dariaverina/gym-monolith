<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/training-for-you.jsx'])
    </head>
    <body class="antialiased">
         <div id="training-for-you"></div>
    </body>
</html>