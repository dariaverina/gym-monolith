<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/trainer.jsx'])
    </head>
    <body class="antialiased">
         <div id="trainer"></div>
    </body>
</html>