<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/help.jsx'])
    </head>
    <body class="antialiased">
         <div id="help"></div>
    </body>
</html>