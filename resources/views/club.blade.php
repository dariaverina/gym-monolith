<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/club.jsx'])
    </head>
    <body class="antialiased">
         <div id="club"></div>
    </body>
</html>