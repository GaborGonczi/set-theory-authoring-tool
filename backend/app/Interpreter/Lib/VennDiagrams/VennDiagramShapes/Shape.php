<?php
namespace App\Interpreter\Lib\VennDiagrams\VennDiagramShapes;


use App\Interpreter\Lib\VennDiagrams\VennDiagramShapes\Point;

use \GdImage;

abstract class Shape 
{
    abstract public function isPointInside(Point $point);
    abstract public function draw(GdImage $image,$color);
}
