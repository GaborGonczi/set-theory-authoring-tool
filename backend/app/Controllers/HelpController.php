<?php

namespace App\Controllers;

class HelpController
{
    public function usage()
    {
        $markdown=file_get_contents(
            resource_path('docs/usage.md')
        );
        return response($markdown,200)
        ->header('Content-Type', 'text/markdown; charset=UTF-8');
    }
}
