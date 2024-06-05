<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Laravel</title>
        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/entrypoints/upload-schedule.jsx'])
    </head>
    <body class="antialiased">
         <div id="upload-schedule"></div>
    </body>
</html>