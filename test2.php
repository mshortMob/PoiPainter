<?php

//$fileName=$_GET['key'];///'Y33_PIANO_1';
//$desiredTempo=$_GET['tempo'];///202;
//$soxPath='/users/gtcmt/Desktop/Earsketch/sox-14.4.1/sox/sox';
//$cwdPath='/users/gtcmt/Desktop/Earsketch/Sound Browser/';
//passthru($soxPath.' '.escapeshellarg($inputPath).' -t ogg -e signed-integer - tempo '.$stretchAmount.' rate 44.1k channels 1');

$fileName=$_GET['key'];
$myfile = fopen($fileName, "r") or die("Unable to open file!");
echo fread($myfile,filesize($fileName));
fclose($myfile);

?>