<?php
namespace App\Interpreter;

/**
 * A class that helps to convert between Unicode and notation format.
 *
 * @package App\Interpreter
 */
class SymbolTable
{

    const TABLE = [
        '\isin'     => '∈',
        '\notin'    => '∉',
        '\sube'     => '⊆',
        '\sub'      => '⊂',
        '\comp'     => '∁',
        '\cup'      => '∪',
        '\cap'      => '∩',
        '\and'      => '∧',
        '\or'       => '∨',
        '\setminus' => '∖',
        '\mid'      => '∣',
        '\nmid'     => '∤'
    ];

    public static function toUnicode($string) {
        return str_replace(array_keys(SymbolTable::TABLE),array_values(SymbolTable::TABLE),$string);
    }

    public static function toNotation($string) {
        return str_replace(array_values(SymbolTable::TABLE),array_keys(SymbolTable::TABLE),$string);
    }

}