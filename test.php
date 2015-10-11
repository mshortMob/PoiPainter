<?php

//$fileName=$_GET['key'];///'Y33_PIANO_1';
//$desiredTempo=$_GET['tempo'];///202;
//$soxPath='/users/gtcmt/Desktop/Earsketch/sox-14.4.1/sox/sox';
//$cwdPath='/users/gtcmt/Desktop/Earsketch/Sound Browser/';
//passthru($soxPath.' '.escapeshellarg($inputPath).' -t ogg -e signed-integer - tempo '.$stretchAmount.' rate 44.1k channels 1');

$formInput=$_GET['key'];
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = $formInput;
fwrite($myfile, $txt);
fclose($myfile);

?>