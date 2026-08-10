<?php
namespace App\Interpreter;

/**
 * A class that helps to convert htmlentities to the right mathematical symbol.
 *
 * @package App\Interpreter
 */
class HtmlEntityTable
{

    const TABLE = [
        "&isin;"     => "∈",
        "&notin;"    => "∉",
        "&sube;"     => "⊆",
        "&sub;"      => "⊂",
        "&comp;"     => "∁",
        "&cup;"      => "∪",
        "&cap;"      => "∩",
        "&and;"      => "∧",
        "&or;"       => "∨",
        "&setminus;" => "∖",
        "&mid;"      => "∣",
        "&nmid;"     => "∤"
    ];
}