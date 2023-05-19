<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/reporting.jsx'])
    </head>
    <body class="antialiased">
         <div id="reporting"></div>
    </body>
</html>