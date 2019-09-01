<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$firstz = ($_GET['firstz']);
$firstzmode = ($_GET['firstzmode']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();

$file="../result/cross.png";

$vval= intval((float)$firstz/500);
$hval=  intval(((float)$secondlat - (float)$firstlat)*200);

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$firstz;
$qstub=" -h ".$hval." -d vs -c cvmh -a d -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET "."-v ".$vval;

if ($firstzmode == 'e') 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_cross_section.py -s 200 ".$qstub.$lstr;
if ($firstzmode == 'd') 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_cross_section.py -s 0 ".$qstub.$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {

    $resultstring = htmlspecialchars("cross.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"crossSection\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

