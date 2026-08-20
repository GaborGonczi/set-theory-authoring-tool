<?php

namespace App\Services;

use App\Interpreter\SymbolTable;
use App\Models\File;

class FileExporter
{
    public function export(File $file) {
        $content=$this->usage();

        foreach ($file->expressions as $expression) {
            if($expression->noparse===false) {
                $content[]='@execute';
                $content[]= SymbolTable::toNotation($expression->statement);
                $content[]='@result';
                $content[]=$expression->result;
            }
            else {
                $content[]=$expression->statement;
            }
        }

        return implode("\n",$content);
    }

    private function usage() {
        return ['# Ez a fájl speciális utasításokat tartalmaz, amelyek a fájl feldolgozását szabályozzák.
#
# A megjegyzéseket # jelöli.
#
# A meglévő utasításokat ne törölje és ne módosítsa, csak akkor ha tisztában van annak következményeivel!
#
# Új végrehajtandó utasítás hozzáadásához használja az @execute parancsot.
# Az @execute parancs kizárólag a közvetlenül utána következő sort jelöli végrehajtandó utasításként,
# ezért azt mindig közvetlenül a végrehajtandó utasítás elé helyezze.
#
# Példa:
#
# @execute
# A := {1,2,3}
#
# @execute
# B := {4,5,6}
#
# Ez egy szövegként értelmezett utasítás.

'];
    }
}
