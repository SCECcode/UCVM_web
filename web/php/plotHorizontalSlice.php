<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$z = ($_GET['z']);
$zmode = ($_GET['zmode']);
$model = ($_GET['model']);


$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();

$zval=(int) $z;

$lval= ($secondlat - $firstlat)/60;
$llval=($secondlon - $firstlon)/60;

$file="../result/horizontal.png";

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$zval;
$qstub=" -d vs -c ".$model." -s ".$lval." -a d -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET ";

$query= $envstr." ../model/UCVMC_TARGET/utilities/plot_horizontal_slice.py ".$qstub.$lstr;

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {
    $resultstring = htmlspecialchars("horizontal.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"horizontalSlice\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}  
?>
</body>
</html>

