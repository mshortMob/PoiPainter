<?php
    $fileName=$_GET['fn'];
    $myfile = fopen($fileName, "r") or die("Unable to open file!");
    echo fread($myfile,filesize($fileName));
    fclose($myfile);
?>